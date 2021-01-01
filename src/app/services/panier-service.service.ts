import {Laptop} from '../models/Laptop.model';
import {Subject} from 'rxjs';
import {ProduitPanier} from '../models/ProduitPanier.model';
import firebase from 'firebase/app';
import '@firebase/auth';
import '@firebase/database';


export class PanierService {
  produitsPanier: ProduitPanier[] = [];
  produitsPanierSubject = new Subject<ProduitPanier[]>();

  constructor() {
  }

  emitPanier() {
    this.produitsPanierSubject.next(this.produitsPanier);
  }

  /*getPanier() {
    const panierUser = '/' + firebase.auth().currentUser.email.replace('.', '_') + '_panier';
    firebase.database().ref(panierUser).on('value', (data) => {
      this.produitsPanier = data.val() ? data.val() : [];
      console.log(this.produitsPanier[0].quantity);
    });
    this.emitPanier();
  }*/

  ajouterAuPanier(laptop: Laptop, quantity: number) {
    for (let i = 0; i < this.produitsPanier.length; i++) {
      if (this.produitsPanier[i].laptop.serie === laptop.serie) {
        this.produitsPanier[i].quantity += quantity;
        return;
      }
    }
    this.produitsPanier.push(new ProduitPanier(laptop, quantity));
    this.emitPanier();
  }
  supprimerProduit(i: number) {
    this.produitsPanier.splice(i, 1);
    this.emitPanier();
  }

  addQuantity(i: number) {
    this.produitsPanier[i].quantity += 1;
  }

  reduceQuantity(i: number) {
    this.produitsPanier[i].quantity -= 1;
  }

  total() {
    let total = 0;
    for (let i = 0; i < this.produitsPanier.length; i++) {
      total += (this.produitsPanier[i].laptop.prix * this.produitsPanier[i].quantity);
    }
    return total;
  }

  savePanier() {
    // const panierUser = '/' + firebase.auth().currentUser.email.replace('.', '_') + '_panier';
    // firebase.database().ref(panierUser).set(this.produitsPanier);
  }

  viderPanier() {
    this.produitsPanier = [];
  }
}
