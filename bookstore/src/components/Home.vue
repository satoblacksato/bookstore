<template>
  <v-jumbotron color="grey lighten-2">
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3">
            {{ $t('welcome.title',{app : 'Vuejs 2 + Firestore'}) }}
         </h3>
          <span class="subheading">{{ $t('welcome.content') }}</span>
          <v-divider class="my-3"></v-divider>
          <div class="title mb-3">{{$t('welcome.call_to_action') }}</div>
          <v-btn large color="primary" class="mx-0">{{$t('welcome.action_button') }}</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>
<script>
	export default{
		name: 'home'
	}
</script>