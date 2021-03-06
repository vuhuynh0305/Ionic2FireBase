import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Login } from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  books: FirebaseListObservable<any>;
  image: any;

  constructor(
    public navCtrl: NavController,
    private afd: AngularFireDatabase,
    private alertCtrl: AlertController) {
    this.books = this.afd.list('/Books');
  }

  addBook() {
    this.navCtrl.push("AddbookPage");
  }

  editBook(book) {
    let prompt = this.alertCtrl.create({
      title: "Update Book",
      inputs: [
        {
          name: 'title',
          placeholder: book.title
        },
        {
          name: 'author',
          placeholder: book.author
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel')
          }
        },
        {
          text: 'Save Book',
          handler: data => {
            let newBook = {
              title: book.title,
              author: book.author
            };

            if (data.title != "") {
              newBook.title = data.title;
            }

            if (data.author != "") {
              newBook.author = data.author;
            }

            this.books.update(book.$key, newBook);
          }
        }
      ]
    });

    prompt.present();
  }

  removeBook(bookID) {
    let prompt = this.alertCtrl.create({
      title: "Add New Book",
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel')
          }
        },
        {
          text: 'Delete Book',
          handler: data => {
            this.books.remove(bookID);
          }
        }
      ]
    });

    prompt.present();
  }

  logout() {
    firebase.auth().signOut();
    this.navCtrl.setRoot(Login);
    
  }
}
