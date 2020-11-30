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
      apiKey: "AIzaSyDtCMUjSe5ZiE-uTm4D0DrOyIVYuSYTS1U",
      authDomain: "technostar-6e7e2.firebaseapp.com",
      databaseURL: "https://technostar-6e7e2.firebaseio.com",
      projectId: "technostar-6e7e2",
      storageBucket: "technostar-6e7e2.appspot.com",
      messagingSenderId: "566302676966",
      appId: "1:566302676966:web:99f1189545ec80722be827",
      measurementId: "G-R4C3596KKQ"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
