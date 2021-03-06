import AuthService from '../services/authService';
import UserProfile from "../models/loggeduser";

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user, userProfile: user.user }
  : { status: { loggedIn: false }, user: null, userProfile: new UserProfile() };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    connexion({ commit }, user) {
      
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          commit('userProfile', user)
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user.token;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
      state.userProfile = null;
    },
    userProfile(state, userProfile){
      state.userProfile = userProfile;
    }
  }
};