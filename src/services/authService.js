import axios from 'axios';

import authHeader from './auth-header';

const API_URL = 'https://pacific-beach-26992.herokuapp.com/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL+'login', {
        email: user.email,
        password: user.motdepasse
      }, { headers: authHeader() })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.token));
          }

        return response.data.user;
      });
  }


  logout() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();