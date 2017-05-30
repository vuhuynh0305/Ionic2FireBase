import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import 'whatwg-fetch';

@IonicPage()
@Component({
  selector: 'page-addbook',
  templateUrl: 'addbook.html',
})
export class AddbookPage {
  books: FirebaseListObservable<any>;
  title: string = "";
  author: string = "";
  imageURL: string = "";
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public afd: AngularFireDatabase,
    public camera: Camera,
    public platform: Platform) {
    this.books = this.afd.list('/Books');
  }

  saveBook() {
    if (this.title == "" || this.author == "") {
      let toast = this.toastCtrl.create({
        message: 'Please input blank field',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
    else {
      let newBook = {
        title: this.title,
        author: this.author
      };
      this.books.push(newBook);
      let toast = this.toastCtrl.create({
        message: 'New Book Added',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }

  getPicture() {
    this.camera.getPicture(this.options)
      .then((imagePath) => {
        this.imageURL = 'data:image/jpeg;base64,' + imagePath;
        console.log(this.imageURL);
        // this.uploadImageToFirebase('data:image/jpeg;base64,' + imagePath);
      })
  }

  uploadImageToFirebase() {
    var fileName = 'sample' + new Date().getTime() + '.jpg';
    var fileRef = firebase.storage().ref();
    var imageRef = fileRef.child('image/' + fileName);
    imageRef.putString(this.imageURL,firebase.storage.StringFormat.DATA_URL);
  }
}
