import {Component, OnDestroy, OnInit} from '@angular/core';
import {Laptop} from '../../models/Laptop.model';
import {Subscription} from 'rxjs';
import {ProductService} from '../../services/product-service.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-produit-list',
  templateUrl: './produit-list.component.html',
  styleUrls: ['./produit-list.component.scss']
})
export class ProduitListComponent implements OnInit, OnDestroy {

  laptops: Laptop[];
  laptopSubscription: Subscription;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.laptopSubscription = this.productService.laptopSubject.subscribe(
      (laptops: Laptop[]) => {
        this.laptops = laptops;
      }
    );
    this.productService.getLaptops();
    this.productService.emitLaptops();
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

}
