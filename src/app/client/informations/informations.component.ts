import { Component, OnInit } from '@angular/core';
import {Client} from '../../models/Client.model';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PanierService} from '../../services/panier-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {CommandeService} from '../../services/commande-service.service';
import {ProduitPanier} from '../../models/ProduitPanier.model';
import firebase from 'firebase';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.scss']
})
export class InformationsComponent implements OnInit {

  client: Client;
  clientSubscription: Subscription;

  livraisonForm: FormGroup;
  constructor(private panierService: PanierService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder, private userService: UserService, private commandeService: CommandeService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user){
          this.clientSubscription = this.userService.clientSubject.subscribe(
            (client: Client) => {
              this.client = client;
            }
          );
          this.userService.getUser(firebase.auth().currentUser.email);
          this.userService.emitClients();
        }
      }
    );
    this.livraisonForm = this.formBuilder.group( {
      nom: [this.client.nom, Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required],
      rue: ['', Validators.required],
      nomRue: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      complement: [''],
    });
  }

}
