import axios from 'axios';

const API_URL = 'http://localhost:8000/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL+'login', {
        email: user.email,
        password: user.motdepasse
      })
      .then(response => {
        console.log(response.data)
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          }

        return response.data;
      });
  }

  profile() {
    let tokenStr = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : null ;
    return axios.get(API_URL + 'api/myprofile', { headers: {"Authorization" : 'Bearer ' + tokenStr} }).then(response => {
      
      return response.data;
    }).catch(error => {
      return error.response
      
    });
  }

  logout() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();