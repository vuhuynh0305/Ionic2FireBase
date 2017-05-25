import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  public email: string;
  public password: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afu:AngularFireAuth) {
  }

  login() {
    firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(response =>{
      this.navCtrl.setRoot(HomePage);
    }).catch(error => {
      console.log(error);
    })
  }
}
