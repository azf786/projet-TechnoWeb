import {Achat} from './Achat.model';

export class Commande {
  achats: Achat[];
  etat: string;
  dateLivraison: string;
  constructor(public dateAchat: string, public paiment: string) {
    this.achats = [];
    this.etat = 'commandé';
  }

}
