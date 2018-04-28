import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
	state:{
		processing:false,
		loaded:false,
		alert:{
			type:'success',
			show:false,
			message:''
		}
	},
	mutations:{
		setLoaded:(state,loaded)=>{
			state.loaded=loaded;
		},
		setAlertMessage:(state,data)=>{
			state.alert.type=data.type;
			state.alert.show=data.show;
			state.alert.message=data.message;
			setTimeout(()=>{
				state.alert.type='success';
				state.alert.show=false;
				state.alert.message='';
			},data.timeout);
		}
	},
	modules:{
		
	}
});




