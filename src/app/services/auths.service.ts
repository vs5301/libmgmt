import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth, signInWithEmailAndPassword } from 'firebase/auth';
import { from } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthsService {


  constructor( private http: HttpClient,
    @Inject('auth') private auth: Auth) { }

login(email: string, password: string){
  return from(signInWithEmailAndPassword(this.auth, email, password));
}

logout(){
  return from(this.auth.signOut());
}



}
