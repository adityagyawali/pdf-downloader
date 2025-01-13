export interface User {
    id: string;
    email: string;
  }
  
  export interface LoginResponse {
    token: string;
    user: User;
  }
  
  export interface PdfResponse {
    url: string;
    filename: string;
  }