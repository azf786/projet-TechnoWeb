import { Injectable } from '@angular/core';
import {Laptop} from '../models/Laptop.model';
import {Subject} from 'rxjs';
import firebase from 'firebase/app';
import '@firebase/database';
import 'firebase/storage';
import {ProduitPanier} from '../models/ProduitPanier.model';
import {Commande} from '../models/Commande.model';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  commandes: Commande[] = [];
  commandesSubject = new Subject<Commande[]>();

  getCommandes() {
    const commandeUser = '/commandes/' + firebase.auth().currentUser.email.replace('.', '_');
    firebase.database().ref(commandeUser).on('value', (data) => {
      this.commandes = data.val() ? data.val() : [];
    });
  }

  /*getSingleLaptop(id: number) {
    // return this.laptops[id];
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
  }*/

  saveCommandes() {
    const commandeUser = '/commandes/' + firebase.auth().currentUser.email.replace('.', '_');
    firebase.database().ref(commandeUser).set(this.commandes);
  }

  createNewCommandes(commande: Commande) {
    this.commandes.push(commande);
    this.saveCommandes();
    // this.emitLaptops();
  }
  emitCommandes() {
    this.commandesSubject.next(this.commandes);
  }

  total(id: number) {
    let total = 0;
    for (let i = 0; i < this.commandes[id].achats.length; i++) {
      total += (this.commandes[id].achats[i].prix * this.commandes[id].achats[i].quantity);
    }
    return total;
  }

}
