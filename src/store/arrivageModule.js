import ArrivageService from "../services/arrivageService";
const initialState = null
export const arrivage = {
	namespaced: true,
	state: initialState,
	actions: {
		load({ commit }){
			return ArrivageService.getAll().then((response)=>{
				commit('arrivage', response.data);
				return Promise.resolve(arrivage);
			}, 
			error => {
				commit('error');
				return Promise.reject(error);
			})
		},
		loadMonthly({ commit }, params){
			return ArrivageService.getMonthly(params).then((response)=>{
				commit('monthlyArrivage', response.data);
				return Promise.resolve(arrivage);
			}, 
			error => {
				commit('error');
				return Promise.reject(error);
			})
		}
	},
	mutations: {
		arrivage(state, arrivage) {
			state.arrivage = arrivage;
		},
		monthlyArrivage(state, arrivage) {
			state.monthlyArrivage = arrivage;
		},
		error(state) {
			state.arrivage = null;
		},
		uploaded(state, value) {
			state.uploaded = value;
		},
		uploading(state, value) {
			state.uploading = value;
		},
	}
}