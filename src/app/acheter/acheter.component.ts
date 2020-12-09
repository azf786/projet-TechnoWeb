import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProduitPanier} from '../models/ProduitPanier.model';
import {Subscription} from 'rxjs';
import {PanierService} from '../services/panier-service.service';
import {Laptop} from '../models/Laptop.model';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-acheter',
  templateUrl: './acheter.component.html',
  styleUrls: ['./acheter.component.scss']
})
export class AcheterComponent implements OnInit, OnDestroy {

  produitsPanier: ProduitPanier[];
  produitsPanierSubscription: Subscription;

  constructor(private panierService: PanierService, private route: ActivatedRoute, private router: Router) { }

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
