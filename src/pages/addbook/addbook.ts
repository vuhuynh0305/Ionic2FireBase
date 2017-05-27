import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { } from 'angularfire2/storage';
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
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    targetHeight: 640,
    correctOrientation: true
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public afd: AngularFireDatabase,
    public camera: Camera) {
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
      console.log(newBook);
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
    .then(imagePath => {
      alert('file name: : '+ imagePath.split('/').pop());
      alert ('got image path ' + imagePath);
      return this.convertImageToBlob(imagePath);
    }).then(imageBlob => {
      alert ('got image blob ' + imageBlob);
      return this.uploadImageToFirebase(imageBlob);
    }).then((uploadSnapshot:any) => {
      alert('file upload successfully ' + uploadSnapshot.downloadURL);

    }, (error) => {
      alert(error);
    })
  }

  convertImageToBlob(imagePath) {
    return fetch(imagePath).then((response) => {
      return response.blob();
    }).then(blob => {
      return blob;
    })
  }

  uploadImageToFirebase(imageBlob) {
    var fileName = 'sample' + new Date().getTime() + '.jpg';
    return new Promise((resolve, reject) => {
      var fileRef = firebase.storage().ref('image/' + fileName);
      alert(imageBlob);
      var uploadtask = fileRef.put(imageBlob);
      uploadtask.on('state_changed', (snapshot) => {
        console.log('snapshot progress ' + snapshot);
      }, (error) => {
        reject(error);
      }, () => {
        resolve(uploadtask.snapshot);
      })
    })
  }
}
