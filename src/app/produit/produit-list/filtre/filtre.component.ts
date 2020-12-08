import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../services/product-service.service';
import {Subject, Subscription} from 'rxjs';
import {Laptop} from '../../../models/Laptop.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.scss']
})
export class FiltreComponent implements OnInit {

  cpus: string[];
  marques: string[];
  tailleEcran: number[];

  prixForm: FormGroup;

  constructor(private productService: ProductService,
              private  formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.cpus = this.productService.cpusComplet;
    this.marques = this.productService.marquesComplet;
    this.tailleEcran = this.productService.tailleEcransComplet;
    this.prixForm = this.formBuilder.group( {
      prixInf: [''],
      prixSup: ['']
    });
  }

  prixInvalid() {
    const prixInf = this.prixForm.get('prixInf').value;
    const prixSup = this.prixForm.get('prixSup').value;
    if (prixSup < prixInf) {
      return true;
    } else {
      return false;
    }
  }

  marqueChange(event){
    if (event.target.checked) {
      this.productService.addMarque(event.target.value);
    }
    if (!event.target.checked) {
      this.productService.removeMarque(event.target.value);
    }
  }

  cpuChange(event){
    if (event.target.checked) {
      this.productService.addCpu(event.target.value);
    }
    if (!event.target.checked) {
      this.productService.removeCpu(event.target.value);
    }
  }

  tailleEcranChange(event){
    if (event.target.checked) {
      this.productService.addTailleEcran(event.target.value);
    }
    if (!event.target.checked) {
      this.productService.removeTailleEcran(event.target.value);
    }
  }

  prixChange() {
    const prixInf = this.prixForm.get('prixInf').value;
    const prixSup = this.prixForm.get('prixSup').value;

    this.productService.prixInf = prixInf;
    this.productService.prixSup = prixSup;
    this.productService.update();
  }
}
