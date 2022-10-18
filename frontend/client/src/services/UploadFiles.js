import http from "http-common";
import axios from 'axios';

class UploadService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("fileUrl", file);
    console.log(formData);
    console.log(file);

    // return http.post("/api/files/submit/", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   onUploadProgress,
    // });
    return axios({
      url: 'http://127.0.0.1:8000/api/files/submit/',
      method: 'POST',
      headers:{
        "Content-Type": "multipart/form-data",
      },
      data: formData,
      onUploadProgress
    })
  }

  getFiles() {
    return http.get("/api/files/submit/");
  }

  getOutputCSV() {
    return http.get("/api/files/get-csv/")
  }
}

export default new UploadService();