import firebase from 'firebase';
import * as faker from 'faker';

export default{
	state:{
		admin:{
			products:{
				dialog:false,
				editMode:false,
				product:{
					id: null,
					name:'',
					price:'',
					file_id:'',
					url:''
				}
			}
		}
	},
	actions:{
		removeFile({commit},product){
			return firebase.storage().ref()
					.child(`products/${product.file_id}`).delete();
		},
		updateDeleteProduct({commit},id){
			let product= firebase.firestore().collection(`products`).doc(id);
			if(product){
				return product.update({
					url:'',
					file_id:''
				});
			}
		},
		pushFileToStorage({commit},{fileToUpload,id}){
			const storageRef=firebase.storage().ref();
			const fileId=faker.random.alphaNumeric(16);
			const uploadTask=storageRef.child(`/products/${fileId}`)
							 .put(fileToUpload);

			uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
				(snapshot)=>{
					const snap=firebase.storage.UploadTaskSnapshot;
			    },
			    (error)=>{
			    	console.log(error);
			    },
			    ()=>{
			    	fileToUpload.url=uploadTask.snapshot.downloadURL;
			    	let product= firebase.firestore().collection(`products`)
			    	.doc(id);
					if(product){
						return product.update({
							url:fileToUpload.url,
							file_id:fileId
						});
					}

			    }
			)
		}

	},
	getters:{
		productsDialog:(state)=>{
			return state.admin.products.dialog;
		},
		productForEdit:(state)=>{
			return state.admin.products.product;
		},
		productsDialogEditMode:(state)=>{
			return state.admin.products.editMode;
		}

	},
	mutations:{
		toggleProductsDialog:(state,data)=>{
			state.admin.products.dialog= !state.admin.products.dialog;
			state.admin.products.editMode= data.editMode;
			state.admin.products.product=data.product;
		}
	}
}
