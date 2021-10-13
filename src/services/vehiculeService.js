import http from "../http-common";

import authHeader from './auth-header';

class VehiculeService {
  getAll() {
    return http.get("/vehicules", { headers: authHeader() });
  }

  getByUtilisateur(id) {
    return http.get(`/vehicules/utilisateur/${id}`, { headers: authHeader() });
  }

  get(id) {
    return http.get(`/vehicule/${id}`, { headers: authHeader() });
  }

  create(data) {
    return http.post("/vehicule", data, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/vehicule/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/vehicule/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/vehicules`, { headers: authHeader() });
  }

  findBySerie(serie) {
    return http.get(`/vehicules?serie=${serie}`, { headers: authHeader() });
  }
}

export default new VehiculeService()