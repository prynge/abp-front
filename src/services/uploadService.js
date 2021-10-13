import http from "../http-common";

import authHeader from './auth-header';

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);
    return http.post("/api/file_objects", formData, {
      headers: authHeader(),
      onUploadProgress
    }).then((response)=>{
      this.store(response.data.filePath).then((data)=> {return data} )
      // http.get(response.data['@id'])
    });
  }

  store(file) {
    return http.get("/api/arrivageFiles/"+file,  {
      headers: authHeader(),
    }).then((response)=>{
      return response.data
    });
  }

  getFiles() {
    return http.get("/files");
  }
}

export default new UploadFilesService();