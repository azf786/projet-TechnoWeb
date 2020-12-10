import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/app';
import '@firebase/auth';
import '@firebase/database';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from '../models/Client.model';
import {Subscription} from 'rxjs';
import {UserService} from '../services/user.service';
import {PanierService} from '../services/panier-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  client: Client;
  clientSubscription: Subscription;

  isAuth: boolean;
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router,
              private userService: UserService, private panierService: PanierService) { }

  ngOnInit(){
      firebase.auth().onAuthStateChanged(
        (user) => {
          if (user){
            this.isAuth = true;
            console.log('enter');
            this.clientSubscription = this.userService.clientSubject.subscribe(
              (client: Client) => {
                this.client = client;
                console.log(this.client);
              }
            );
            this.userService.getUser(firebase.auth().currentUser.email);
            this.userService.emitClients();
          }else
          {
            this.isAuth = false;
          }
        }
      );
      console.log('enter' + this.isAuth);
      if (this.isAuth) {

      }
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

  totaltPanier() {
    return this.panierService.produitsPanier.length;
  }
}
