import {Component, OnDestroy, OnInit} from '@angular/core';
import {Commande} from '../../models/Commande.model';
import {Subscription} from 'rxjs';
import {PanierService} from '../../services/panier-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {CommandeService} from '../../services/commande-service.service';
import {ProduitPanier} from '../../models/ProduitPanier.model';
import firebase from 'firebase';
import {Client} from '../../models/Client.model';
import {Laptop} from '../../models/Laptop.model';
import {ProductService} from '../../services/product-service.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit, OnDestroy {

  commandes: Commande[];
  commandesSubscription: Subscription;

  constructor(private panierService: PanierService, private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder, private userService: UserService, private commandeService: CommandeService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.commandesSubscription = this.commandeService.commandesSubject.subscribe(
      (commandes: Commande[]) => {
        this.commandes = commandes;
      }
    );
    this.commandeService.getCommandes();
    this.commandeService.emitCommandes();
  }

  ngOnDestroy(): void {
  }

  total(i: number) {
    return this.commandeService.total(i);
  }
}
