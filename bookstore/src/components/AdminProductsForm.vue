<template>
 <v-layout row justify-center>
    <v-dialog persistent max-width="510" v-model="productsDialog">
      <v-btn slot="activator" color="light-blue darken-4" dark>
      	{{ $t('admin.productsTable.newProduct') }}
      </v-btn>
      <v-card>
        <v-card-title class="headline">{{ $t('admin.productsTable.newProduct') }}</v-card-title>
        <v-card-text>
        	<v-container grid-list-md>
        		<v-layout wrap>
        			<v-flex>
        				<v-text-field :label="$t('admin.productsTable.name')"
        				v-model="productForEdit.name"
        				/>
        			</v-flex>
        			<v-spacer/>
        			<v-flex>
        				<v-text-field :label="$t('admin.productsTable.price')" 
						v-model="productForEdit.price"
        				/>
        			</v-flex>
        			<v-spacer/>
        			<v-flex xs12> 
        				<a v-if="productForEdit.url" 
        				  :href="productForEdit.url" target="_blank">
        				{{ $t('admin.productsTable.openFile') }}</a>
						<file-input accept="image/*" @input="getUploadFile"/>
        			</v-flex>

        		</v-layout>
        	</v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="close">
          	{{$t('common.close')}}
          </v-btn>
          <v-btn color="green darken-1" flat 
                  v-if="$store.getters.productsDialogEditMode" @click="update">Actualizar</v-btn>
          <v-btn  v-else color="green darken-1" @click="add" flat>Agregar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
 </v-layout>
</template>
<script>
import {db} from "@/main";
import * as faker from 'faker';
import {mapGetters} from 'vuex';
import FileInput from "@/components/helpers/FileInput";
	export default{
		name:"admin-products-form",
		components:{FileInput},
		methods:{
			close(){
				this.$store.commit('toggleProductsDialog',{
					editMode:false,
					product:{
						id:null,
						name:'',
						price:'',
						url:'',
						file_id:''
					}
				})
			},
			add(){
				this.productForEdit.id=faker.random.alphaNumeric(16);
				const product=Object.assign({},this.productForEdit);
				product.createdAt=Date.now();
				db.collection('products').doc(this.productForEdit.id)
					.set(product).then(()=>{
						if(this.image){
							this.$store.dispatch('pushFileToStorage',{
								fileToUpload:this.image,id:product.id
							}).then(()=>{
								alert('guardado');
							})
						}else{
							alert('guardado');
						}
					});
			},
			getUploadFile(e){
				this.image=e;
			},
			update(){
				const product=Object.assign({},this.productForEdit);
				db.collection('products').doc(product.id).update(product).then(
					()=>{
						if(this.image){
							if(product.url){
								this.$store.dispatch('removeFile',product).then(
									()=>{
										this.$store.dispatch('updateDeletedProduct',product.id);
									}
								)
							}
							this.$store.dispatch('pushFileToStorage',{fileToUpload:this.image,id: product.id}).then(()=>{
								alert('actualizado');
							})	
						}else{
							alert('actualizado');
						}
					}
				)
			}
		},
		computed:{
			productsDialog:{
				get(){
					return this.$store.getters.productsDialog;
				},
				set(){
					this.close();
				}
			},
			...mapGetters(['productForEdit'])
		},

		
	}
</script>