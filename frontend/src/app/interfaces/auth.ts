// src/app/interfaces/auth.ts

export interface RegisterPostData {
  username: string;
  email: string;
  password: string;
}

export interface User {
  username: string;
  email: string;
  password?: string; 
}
