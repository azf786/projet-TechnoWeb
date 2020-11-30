import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../services/product-service.service';
import {Router} from '@angular/router';
import {Laptop} from '../../models/Laptop.model';

@Component({
  selector: 'app-produit-form',
  templateUrl: './produit-form.component.html',
  styleUrls: ['./produit-form.component.scss']
})

export class ProduitFormComponent implements OnInit {

  laptopForm: FormGroup;
  fileisUploading = false;
  filesUrl: string[] = [];
  fileUploaded = false;

  cpus = ['i7', 'i5', 'AMD R Series', 'i3'];
  gpus = ['Neo', 'AMD', 'NVIDIA GeForce GTX 1660Ti', 'NVIDIA GeForce GTX 1650 Ti', 'Intel® Iris® Plus'];
  typePorts = ['USB 2.0', 'USB 3.0', 'c'];
  tailleEcrans = ['17.3', '15.6', '15', '13'];
  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.productService.getLaptops();
    this.laptopForm = this.formBuilder.group( {
      marque: ['', Validators.required],
      model: ['', Validators.required],
      serie: ['', Validators.required],
      couleur: ['', Validators.required],
      cpu: ['', Validators.required],
      gpu: ['', Validators.required],
      ram: ['', Validators.required],
      typeDisque: ['', Validators.required],
      tailleDisque: ['', Validators.required],
      tailleEcran: ['', Validators.required],
      connectivity: this.formBuilder.array([]),
      typePort: ['', Validators.required],
      nbrePort: ['', Validators.required],
      dimension: ['', Validators.required],
      poids: ['', Validators.required],
      description: this.formBuilder.array([]),
      prix: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  onSaveLaptops() {
    const marque = this.laptopForm.get('marque').value;
    const model = this.laptopForm.get('model').value;
    const serie = this.laptopForm.get('serie').value;
    const couleur = this.laptopForm.get('couleur').value;
    const cpu = this.laptopForm.get('cpu').value;
    const gpu = this.laptopForm.get('gpu').value;
    const ram = this.laptopForm.get('ram').value;
    const typeDisque = this.laptopForm.get('typeDisque').value;
    const tailleDisque = this.laptopForm.get('tailleDisque').value;
    const tailleEcran = this.laptopForm.get('tailleEcran').value;
    const connectivity = this.laptopForm.get('connectivity').value;
    const typePort = this.laptopForm.get('typePort').value;
    const nbrePort = this.laptopForm.get('nbrePort').value;
    const dimension = this.laptopForm.get('dimension').value;
    const poids = this.laptopForm.get('poids').value;
    const description = this.laptopForm.get('description').value;
    const etoiles = 0;
    const prix = this.laptopForm.get('prix').value;
    const quantity = this.laptopForm.get('quantity').value;
    const newLaptop = new Laptop(marque, model, serie, couleur, cpu, gpu, ram, typeDisque, tailleDisque, tailleEcran, connectivity,
      typePort, nbrePort, dimension, poids, description, etoiles, prix, quantity, true);
    if (this.filesUrl.length != 0) {
      newLaptop.photos = [];
      for (let i = 0; i < this.filesUrl.length; i++){
        newLaptop.photos.push(this.filesUrl[i]);
      }
    }
    console.log(newLaptop);
    this.productService.createNewLaptop(newLaptop);
  }

  onUploadFile(file: File) {
    this.fileisUploading = true;
    this.fileisUploading = true;
    this.productService.uploadFile(file).then(
      (url: string) => {
        console.log(url);
        this.filesUrl.push(url);
        this.fileisUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFile(event) {
    this.onUploadFile(event.target.files[0]);
  }

  getConnectivity() {
    return this.laptopForm.get('connectivity') as FormArray;
  }

  onAddConnectivity() {
    const newConnectivityControl = this.formBuilder.control('', Validators.required);
    this.getConnectivity().push(newConnectivityControl);
  }

  getDescriptions() {
    return this.laptopForm.get('description') as FormArray;
  }

  onAddDescription() {
    const newControl = this.formBuilder.control('', Validators.required);
    this.getDescriptions().push(newControl);
  }
}
