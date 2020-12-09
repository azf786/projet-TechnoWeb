import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/app';
import '@firebase/auth';
import '@firebase/database';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){
      firebase.auth().onAuthStateChanged(
        (user) => {
          if (user){
            this.isAuth = true;
          }else
          {
            this.isAuth = false;
          }
        }
      )
  }

  onSignOut(){
    this.authService.signOutUser();
  }

  rechercher() {
    this.router.navigate(['/produits', 'listProduits']);
  }

  panier() {
    this.router.navigate(['/produits', 'acheter']);
  }
}
