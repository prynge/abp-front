import UtilisateurService from "../services/utilisateurService";
const initialState = null
export const users = {
	namespaced: true,
	state: initialState,
	actions: {
		addUser({commit}, user){
			return UtilisateurService.create(user).then(
				user => {
					console.log(user)
					// commit('createSuccess', user);
					return Promise.resolve(user);
				},
				error => {
					commit('createFailure');
					return Promise.reject(error);
				}
			);
		},
		users({commit}){
			return UtilisateurService.getAll().then(
				users => {
					commit('users', users.data);
					return Promise.resolve(users.data);
				},
				error => {
					return Promise.reject(error);
				}
			);
		}
	},
	mutations: {
		createSuccess(state, user) {
			state.user = user;
		},
		createFailure(state) {
			state.user = null;
		},
		users(state, users){
			state.users = users;
		}
	}
}