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

  constructor() { }

  emitLaptops() {
    this.laptopSubject.next(this.laptops);
  }

  saveLaptops() {
    firebase.database().ref('/laptops').set(this.laptops);
  }

  getLaptops() {
    firebase.database().ref('/laptops').on('value', (data) => {
      this.laptops = data.val() ? data.val() : [];
      this.emitLaptops();
    });
  }

  getSingleLaptop(id: number) {
    return new Promise(
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
    );
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
}
