<template>
  <main>
      <v-app>
        <v-content  v-if="$store.state.loaded">
          <guest-navigation v-if="role === 'guest'" />
          <admin-navigation v-if="role === 'admin'" />
          

          <v-container class="mt-3 mb-3">
                <router-view/>
            </v-container>    
            <app-footer/>
        </v-content>
        <v-container v-else fill-height>
        <v-layout flex align-center justify-center>
          <v-progress-circular indeterminate :size="100" :width="10" color="green" />
        </v-layout>
      </v-container>
      </v-app>
  </main>
</template>

<script>
import AppFooter from "@/components/Footer";
import GuestNavigation from "@/navigations/guest";
import AdminNavigation from "@/navigations/admin";
import {mapGetters} from 'vuex';
export default {
  components:{
    AppFooter,GuestNavigation, AdminNavigation,
  },
  name: 'App',
   computed: {
      ...mapGetters(['role'])
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
