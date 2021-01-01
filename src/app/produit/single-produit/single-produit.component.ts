import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Laptop } from 'src/app/models/Laptop.model';
import {ProductService} from 'src/app/services/product-service.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {PanierService} from '../../services/panier-service.service';

@Component({
  selector: 'app-single-produit',
  templateUrl: './single-produit.component.html',
  styleUrls: ['./single-produit.component.scss']
})

export class SingleProduitComponent implements OnInit, OnDestroy {

  laptop: Laptop;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router, config: NgbCarouselConfig,
              private panierService: PanierService) {
    config.interval = 5000;
    config.keyboard = true;
    config.pauseOnHover = true;
   }

  ngOnInit(){
    this.laptop = new Laptop('', '', '', '', '', '', '', '', '', null, null, '', null, '', null, null, null, null, null, null);
    const id = this.route.snapshot.params.id;
    this.productService.getSingleLaptop(+id).then(
      (laptop: Laptop) => {
        this.laptop = laptop;
      }
    );

    // this.laptop = this.productService.getSingleLaptop(this.route.snapshot.params.id);
  }

  onBack(){
    this.router.navigate(['/produits', 'listProduit']);
  }

  ajouter() {
    this.panierService.ajouterAuPanier(this.laptop, 1);
  }

  ngOnDestroy(): void {
  }
}
