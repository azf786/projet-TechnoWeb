import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProduitPanier} from '../models/ProduitPanier.model';
import {Subscription} from 'rxjs';
import {PanierService} from '../services/panier-service.service';
import {Laptop} from '../models/Laptop.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from '../models/Client.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import firebase from 'firebase';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-acheter',
  templateUrl: './acheter.component.html',
  styleUrls: ['./acheter.component.scss']
})
export class AcheterComponent implements OnInit, OnDestroy {

  produitsPanier: ProduitPanier[];
  produitsPanierSubscription: Subscription;

  client: Client;
  clientSubscription: Subscription;

  livraisonForm: FormGroup;

  constructor(private panierService: PanierService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.panierService.produitsPanier);
    this.produitsPanierSubscription = this.panierService.produitsPanierSubject.subscribe(
      (produitsPanier: ProduitPanier[]) => {
        this.produitsPanier = produitsPanier;
        console.log('produits' + this.produitsPanier);
      }
    );
    // this.panierService.getPanier();
    this.panierService.emitPanier();

    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user){
          this.clientSubscription = this.userService.clientSubject.subscribe(
            (client: Client) => {
              this.client = client;
              console.log(this.client);
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

  ngOnDestroy(): void {
  }

  ajouterQauntite(id: number) {
    this.panierService.addQuantity(id);
  }
  reduireQauntite(id: number) {
    this.panierService.reduceQuantity(id);
  }
  supprimer(id: number) {
    this.panierService.supprimerProduit(id);
  }

  getTotal() {
    return this.panierService.total();
  }

}
