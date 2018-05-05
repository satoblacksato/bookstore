<template>
  <v-layout>
     <v-container fluid grid-list-md>
      <v-card v-for="(product,idx) in products">
        <v-card-media :src="product.url" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{product.name}}</h3>
            <div><b>Precio: </b>{{product.price}}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-layout>
</template>
<script>
	import {db} from '@/main';
	export default{
		name:"shop",
		data(){
			return{
				products:[]
			}
		},
		mounted(){
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
				},
				(error)=>{
					console.log('firebase  not connect');
				})
		}
	}

</script>