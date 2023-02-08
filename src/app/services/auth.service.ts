import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private auth: Auth) { }

  login(email: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }
  
  logout(){
  return from(this.auth.signOut());
  }


  signUp(name: string,email: string, password: string){
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }
  

}
