import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

export const firebaseConfig = {
  apiKey: "AIzaSyCCCEQtVVC5YV5C0Fxc1CLpFRLqDsmjR1M",
  authDomain: "app-ionic-d36fc.firebaseapp.com",
  databaseURL: "https://app-ionic-d36fc-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "app-ionic-d36fc",
  storageBucket: "app-ionic-d36fc.appspot.com",
  messagingSenderId: "882631256708",
  appId: "1:882631256708:web:e32c24b687c7878e37f0d1"
};


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
