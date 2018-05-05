<template>
 <v-layout row justify-center>
    <v-dialog persistent max-width="510">
      <v-btn slot="activator" color="light-blue darken-4" dark>
      	{{ $t('admin.productsTable.newProduct') }}
      </v-btn>
      <v-card>
        <v-card-title class="headline">{{ $t('admin.productsTable.newProduct') }}</v-card-title>
        <v-card-text>
        	<v-container grid-list-md>
        		<v-layout wrap>
        			<v-flex>
        				<v-text-field :label="$t('admin.productsTable.name')"/>
        			</v-flex>
        			<v-spacer/>
        			<v-flex>
        				<v-text-field :label="$t('admin.productsTable.price')"/>
        			</v-flex>
        			<v-spacer/>

        		</v-layout>
        	</v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="cerrar">
          	{{$t('common.close')}}
          </v-btn>
          <v-btn color="green darken-1" flat>Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
 </v-layout>
</template>
<script>
	export default{
		name:"admin-products-form",
		methods:{
			cerrar(){
				alert('cerrando');
			}
		}
	}
</script>