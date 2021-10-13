import http from "../http-common";

import authHeader from './auth-header';

class UtilisateurService {
  getAll() {
    return http.get("/api/users", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/api/users/${id}`, { headers: authHeader() });
  }

  create(data) {
    return http.post("/api/users", data, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/api/users/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/api/users/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/utilisateur`, { headers: authHeader() });
  }

  findByMail(mail) {
    return http.get(`/utilisateur?mail=${mail}`, { headers: authHeader() });
  }
}

export default new UtilisateurService();