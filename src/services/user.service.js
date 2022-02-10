import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getAllDocument(){
    return axios.get('http://localhost:8080/documents', {headers : authHeader()});
  }

  getDocumentsSent(id){
    
    return axios.get(`http://localhost:8080/document-sent/${id}`, {headers : authHeader()});
  }

  getDocumentsReceived(id){
    return axios.get(`http://localhost:8080/document-received/${id}`, {headers : authHeader()});
  }

}

export default new UserService();
