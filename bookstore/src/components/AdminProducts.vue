<template>
	<div>
		<admin-products-form/>
		<v-data-table :headers="headers" :items="products" :loading="loading" 
		class="elevation-2" :no-data-text="$t('admin.productsTable.empty')">
			<template slot="items" slot-scope="props">
				<td>{{props.item.id}}</td>
				<td>{{props.item.name}}</td>
				<td>{{props.item.price}}</td>
				<td>
					<v-btn icon class="mx-0" @click="editarProducto(props.item)">
						<v-icon color="teal">edit</v-icon>
					</v-btn>
					<v-btn icon class="mx-0"  @click="eliminarProducto(props.item)">
						<v-icon color="primary">delete</v-icon>
					</v-btn>
				</td>
			</template>
		</v-data-table>

	</div>
</template>
<script >
	import {db} from '@/main';
	import AdminProductsForm from "@/components/AdminProductsForm";
	export default{
		components:{AdminProductsForm},
		name:"admin-product",
		methods:{
			editarProducto(product){
				this.$store.commit('toggleProductsDialog',{editMode:true,product}) 
			},
			eliminarProducto(product){
				db.collection('products').doc(product.id).delete().then(()=>{
					if(product.url){
						this.$store.dispatch('removeFile',product);
					}
				});
			}
		},
		data(){
			return{
				headers:[
					{text:'ID',value:'id',align:'center'},
					{text:'NOMBRE',value:'nombre',align:'center'},
					{text:'PRECIO',value:'precio',align:'center'},
					{text:'ACCIONES',value:'acciones',align:'center'}
				],
				products:[],
				loading:true
			}
		},
		mounted(){
				this.loading=true;
				db.collection('products').orderBy('createdAt').onSnapshot(
				snapshot =>{
					this.products=[];
					snapshot.forEach(snapProduct=>{
						const product=snapProduct.data();
						this.products.push({
							id:product.id,
							name:product.name,
							price:product.price,
							url:product.url || '',
							file_id:product.file_id || ''
						});
					});
					this.loading=false;
				},
				(error)=>{
					console.log('firebase  not connect');
				})
		}
	}
</script>