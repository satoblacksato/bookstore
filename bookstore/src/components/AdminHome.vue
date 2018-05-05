<template>
	<v-layout row>
		<v-flex xs12 sm3>
			 <v-navigation-drawer permanent>
			    <v-toolbar flat>
			      <v-list>
			        <v-list-tile>
			          <v-list-tile-title class="title">
			             {{ $t('admin.home') }}
			          </v-list-tile-title>
			        </v-list-tile>
			      </v-list>
			    </v-toolbar>
			    <v-divider></v-divider>
			    <v-list dense class="pt-0">
			      <v-list-tile v-for="item in items" :key="item.title" 
			      :to="item.to">
			        <v-list-tile-action>
			          <v-icon>{{ item.icon }}</v-icon>
			        </v-list-tile-action>
			        <v-list-tile-content>
			          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
			        </v-list-tile-content>
			      </v-list-tile>
			    </v-list>
			  </v-navigation-drawer>
		</v-flex>
		<v-flex xs12 sm9 style="margin-left:12px">
			  <router-view/>
		</v-flex>
	</v-layout>
</template>
<script>
	export default{
		name: "admin-home",
		data(){
			return{
				items:[
					{title: this.$t('admin.products'),icon:'book',
						to:'/admin/products'}
				]
			}
		}
	}
</script>