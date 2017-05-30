import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { Camera } from "@ionic-native/camera";
import { FilePath } from '@ionic-native/file-path';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { AddbookPage } from '../pages/addbook/addbook';

export const config = {
  apiKey: "AIzaSyBCZXs-0SwXsns0m498HcyoCp_UqgWQy7o",
  authDomain: "fireblogger-fe798.firebaseapp.com",
  databaseURL: "https://fireblogger-fe798.firebaseio.com",
  projectId: "fireblogger-fe798",
  storageBucket: "fireblogger-fe798.appspot.com",
  messagingSenderId: "85843779785"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    AddbookPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    AddbookPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Camera,
    FilePath
  ]
})
export class AppModule { }
