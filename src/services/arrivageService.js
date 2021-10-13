import http from "../http-common";

import authHeader from './auth-header';

class ArrivageService {
  getAll() {
    return http.get("/api/autos", { headers: authHeader() });
  }
  getMonthly({m,y}) {
    return http.get("/api/monthly/"+m+'/'+y, { headers: authHeader() });
  }

  get(id) {
    return http.get(`/api/autos/${id}`, { headers: authHeader() });
  }
}

export default new ArrivageService();