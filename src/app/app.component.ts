import { Component } from '@angular/core';
import firebase from 'firebase/app';
import '@firebase/auth';
import '@firebase/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projet-TechnoWeb';
  constructor(){
    var firebaseConfig = {
    apiKey: "AIzaSyB8wR3lQFujvdHKWkaxX8K2lz86Js4412g",
    authDomain: "technostar-9ac57.firebaseapp.com",
    databaseURL: "https://technostar-9ac57.firebaseio.com",
    projectId: "technostar-9ac57",
    storageBucket: "technostar-9ac57.appspot.com",
    messagingSenderId: "1025564886141",
    appId: "1:1025564886141:web:28c47e7c38cded82de1d14"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  }
}
