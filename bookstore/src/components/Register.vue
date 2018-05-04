<template>
	<div>

    <auth-form   action="register"
      v-on:process="register($event)"
    />

    <app-snack-bar
      v-if="snackBar"
      :snack-bar="snackBar"
      :text="message"
      :timeout="timeout"
    />
  </div>
</template>
<script>
	import AppSnackBar from "@/components/SnackBar";
	import AuthForm from "@/forms/Auth";
	import {db} from '@/main';
	export default{
		name: "register",
		components:{ AuthForm,AppSnackBar },
		 data () {
		  return {
		    	snackBar: false,
        		message: '',
        		timeout: 5000
      		}
    	},
		methods:{
			register(user){
				console.log(user);
				this.$store.dispatch('firebaseRegister',user)
				.then((userRegistered)=>{
					const data={
						uid:userRegistered.uid,
						email:user.email,
						role:'customer'
					};
					db.collection('users')
						.doc(userRegistered.uid).set(data)
						.then(()=>{
							this.$store.commit('setRole',data.role);
							this.$router.push('/');
						});
				}).catch((error)=>{
					 this.message = error.message.substr(0, 60);
          			 this.snackBar = true;
            		 setTimeout(() => {
              			this.snackBar = false;
            		 }, this.timeout);
				})
			}
		}
	}
</script>