import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Laptop } from 'src/app/models/Laptop.model';
import {ProductService} from 'src/app/services/product-service.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-single-produit',
  templateUrl: './single-produit.component.html',
  styleUrls: ['./single-produit.component.scss']
})

export class SingleProduitComponent implements OnInit {

  laptop : Laptop;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router : Router,config: NgbCarouselConfig) {
    config.interval = 5000;
    config.keyboard = true;
    config.pauseOnHover = true;
   }

  ngOnInit(){
    this.laptop = new Laptop("", "", "", "", "","", "", "","",null,null,"",null,"",null,null,null,null,null,null);
    const id = this.route.snapshot.params['id'];
    this.productService.getSingleLaptop(+id).then(
      (laptop: Laptop) => {
        this.laptop = laptop;
      }
    );
  }

  onBack(){
    this.router.navigate(['/produits','listProduit']);
  }
}
