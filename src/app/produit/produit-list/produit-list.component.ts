import {Component, OnDestroy, OnInit} from '@angular/core';
import {Laptop} from '../../models/Laptop.model';
import {Subscription} from 'rxjs';
import {ProductService} from '../../services/product-service.service';
import {Router} from '@angular/router';
import {PanierService} from '../../services/panier-service.service';


@Component({
  selector: 'app-produit-list',
  templateUrl: './produit-list.component.html',
  styleUrls: ['./produit-list.component.scss']
})
export class ProduitListComponent implements OnInit, OnDestroy {

  laptops: Laptop[] = [];
  laptopSubscription: Subscription;

  constructor(private productService: ProductService, private router: Router, private panierService: PanierService) { }

  ngOnInit(): void {
    this.productService.laptopsSearch = [];
    this.laptopSubscription = this.productService.laptopSearchSubject.subscribe(
      (laptops: Laptop[]) => {
        this.laptops = laptops;
        for (let i = 0; i < this.laptops.length; i++) {
          if (this.laptops[i].visible === false) {
            console.log('removing');
            this.laptops[i].visible = true;
          }
        }
      }
    );
    this.productService.getLaptops();
    this.productService.emitLaptops();
    this.productService.emitLaptopsSearch();
  }


  /*inVisible(id: number) {
    this.searchables[id].visible = false;
    this.productSearchService.emitSearchables();
  }*/

  onViewLaptop(id: number) {
    this.router.navigate(['/produits', 'view', id]);
  }

  ngOnDestroy() {
    this.laptopSubscription.unsubscribe();
  }

  getVisible(visible: boolean){
    if (visible){
      return 'visible';
    }
    else {
      return 'invisible';
    }
  }

  update(id: number) {
    console.log(this.laptops.length);
    this.productService.invisible(id);
    console.log(this.laptops.length);
  }
}
