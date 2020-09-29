import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(res => resolve(res), err => reject(err))
    })

  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(res => resolve(res), err => reject(err))
    })
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.angularFireAuth.currentUser) {
        this.angularFireAuth.signOut().then(() => {
          console.log("LOG Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }

  userDetails() {
    return this.angularFireAuth.user
  }
}