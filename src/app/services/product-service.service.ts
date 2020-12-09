import { Injectable } from '@angular/core';
import {Laptop} from '../models/Laptop.model';
import {Subject} from 'rxjs';
import firebase from 'firebase/app';
import '@firebase/database';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  laptops: Laptop[] = [];
  laptopSubject = new Subject<Laptop[]>();

  laptopsSearch: Laptop[] = [];
  laptopSearchSubject = new Subject<Laptop[]>();

  cpusComplet: string[] = [];

  marquesComplet: string[] = [];

  tailleEcransComplet: number[] = [];

  cpus: string[] = this.cpusComplet;
  marques: string[] = this.marquesComplet;
  tailleEcrans: number[] = this.tailleEcransComplet;
  prixInf = -1;
  prixSup = -1;

  constructor() { }

  emitLaptops() {
    this.laptopSubject.next(this.laptops);
  }

  emitLaptopsSearch() {
    this.laptopSearchSubject.next(this.laptopsSearch);
  }
  
  saveLaptops() {
    firebase.database().ref('/laptops').set(this.laptops);
  }

  getLaptops() {
    firebase.database().ref('/laptops').on('value', (data) => {
      this.laptops = data.val() ? data.val() : [];
      for (let i = 0; i < this.laptops.length; i++) {
        if (this.cpusComplet.indexOf(this.laptops[i].cpu, 0) === -1){
          this.cpusComplet.push(this.laptops[i].cpu);
        }

        if (this.marquesComplet.indexOf(this.laptops[i].marque, 0) === -1){
          this.marquesComplet.push(this.laptops[i].marque);
        }

        if (this.tailleEcransComplet.indexOf(this.laptops[i].tailleEcran, 0) === -1){
          this.tailleEcransComplet.push(this.laptops[i].tailleEcran);
        }
      }
      for (let i = 0; i < this.laptops.length; i++) {
        this.laptopsSearch.push(this.laptops[i]);
      }
      this.emitLaptopsSearch();
      this.emitLaptops();
    });
  }

  getSingleLaptop(id: number) {
    /*return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/laptops/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );*/
    return this.laptopsSearch[id];
  }

  createNewLaptop(newLaptop: Laptop) {
    this.laptops.push(newLaptop);
    this.saveLaptops();
    this.emitLaptops();
  }

  removeLaptop(laptop: Laptop) {
    const bookIndexToRemove = this.laptops.findIndex(
      (bookEl) => {
        return true;
      }
    );
    this.laptops.splice(bookIndexToRemove, 1);
    this.saveLaptops();
    this.emitLaptops();
  }

  removeInvisible() {
    for (let i = 0; i < this.laptops.length; i++){
      if (!this.laptops[i].visible){
        delete this.laptops[i];
      }
    }
  }

  searchLaptop(mot: string) {
    for (let i = 0; i < this.laptops.length; i++) {
      if (this.laptops[i].marque === mot) {
        this.laptopsSearch.push(this.laptops[i]);
      }
    }
    this.emitLaptopsSearch();
    console.log(this.laptopsSearch);
  }

  prixCostume(prixInf: number, prixSup: number) {
    this.prixInf = prixInf;
    this.prixSup = prixSup;
    this.update();
  }

  uploadFile(file: File)  {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref().child('images/laptops/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...');
          },
          (error) => {
            console.log('Erreur de chargement: ' + error);
            reject();
          },
          () => {
            console.log('Chargement Terminé');
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }

  invisible(id: number) {
    this.laptops[id].visible = false;
    // this.laptops.splice(id, 1);
  }

  addCpu(value: string) {
    if (this.cpus.length === this.cpusComplet.length){
      this.cpus = [];
    }
    this.cpus.push(value);
    this.update();
  }

  removeCpu(value: string) {
    this.cpus.splice(this.cpus.indexOf(value, 0), 1);

    if (this.cpus.length === 0){
      this.cpus = this.cpusComplet;
    }

    this.update();
  }


  addMarque(value: any) {
    if (this.marques.length === this.marquesComplet.length){
      this.marques = [];
    }
    this.marques.push(value);
    this.update();
  }

  removeMarque(value: string) {
    this.marques.splice(this.marques.indexOf(value, 0), 1);
    if (this.marques.length === 0){
      this.marques = this.marquesComplet;
    }
    this.update();
  }

  addTailleEcran(value: number) {
    if (this.tailleEcrans.length === this.tailleEcransComplet.length){
      this.tailleEcrans = [];
    }
    this.tailleEcrans.push(value);
    this.update();
  }

  removeTailleEcran(value: number) {
    this.tailleEcrans.splice(this.tailleEcrans.indexOf(value, 0), 1);
    if (this.tailleEcrans.length === 0){
      this.tailleEcrans = this.tailleEcransComplet;
    }
    this.update();
  }

  prixEstInf(prix: number) {
    if (this.prixInf === -1) {
      return false;
    }
    if (prix < this.prixInf) {
      return true;
    }else {
      return  false;
    }
  }

  prixEstSup(prix: number) {
    if (this.prixSup === -1) {
      return false;
    }
    if (prix > this.prixSup) {
      return true;
    }else {
      return  false;
    }
  }

  update() {
    this.laptopsSearch = [];
    for (let i = 0; i < this.laptops.length; i++) {
      if (this.nonConforme(i)) {
        this.laptops[i].visible = false;
      }else {
        this.laptops[i].visible = true;
        this.laptopsSearch.push(this.laptops[i]);
      }
    }
    this.emitLaptopsSearch();
  }

  private nonConforme(i: number) {
    return this.marques.indexOf(this.laptops[i].marque, 0) === -1 ||
      this.cpus.indexOf(this.laptops[i].cpu, 0) === -1 ||
      this.tailleEcrans.indexOf(this.laptops[i].tailleEcran, 0) === -1 ||
      this.prixEstInf(this.laptops[i].prix) ||
      this.prixEstSup(this.laptops[i].prix);
  }

  updateSearch() {

  }
}
