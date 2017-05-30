import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

import { HomePage } from "../home/home";

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  public email: string = "mariohuynh0305@gmail.com";
  public password: string = "03051994";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afu: AngularFireAuth,
    private toastCtrl: ToastController) {
      this.afu.auth.onAuthStateChanged(user => {
        user.updateProfile({
          displayName: 'Vu'
        })
        console.log(user);
      })
  }

  login() {
    if (this.email == "" || this.password == "") {
      let toast = this.toastCtrl.create({
        message: "Please Input Email or Password",
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
    else {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(response => {
        this.navCtrl.setRoot(HomePage);
      }).catch((error: any) => {
        let message = "";
        var errorCode = error.code;
        if (errorCode == "auth/user-not-found") {
          message = "Email Not Found";
        }
        else if (errorCode == "auth/wrong-password") {
          message = "Wrong Password";
        }
        else {
          message = "Email Format Is Invalid";
        }
        let toast = this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        console.log(error);
      })
    }
  }
}
