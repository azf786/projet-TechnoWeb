import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import{Client} from 'src/app/models/Client.model';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  clients: Client[] = [];
  noms: string[] = [];
  prenoms: string[] = [];
  telephones: string[] = [];
  rues: string[] = [];
  nomRues: string[] = [];
  codePostaux: string[] = [];
  villes: string[] = [];
  complements: string[] = [];
  ids: string[] = [];
  userSubject = new Subject<Client[]>();
  
  
  constructor() { }
  
  emitClients() {
    this.userSubject.next(this.clients);
  }
  
  saveClients() {
    firebase.database().ref('/clients').set(this.clients);
  }
  
  getClients() {
    firebase.database().ref('/clients').on('value', (data) => {
      this.clients = data.val() ? data.val() : [];
      this.emitClients();
    });
  }
  
  getSingleClient(email: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/clients/' + email).once('value').then(
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
    
      createNewClient(newClient: Client) {
        this.clients.push(newClient);
        this.saveClients();
        this.emitClients();
      }
      
      removeClient(client: Client) {
        const clientIndexToRemove = this.clients.findIndex(
          (client) => {
            return true;
          }
          );
          this.clients.splice(clientIndexToRemove, 1);
          this.saveClients();
          this.emitClients();
        }
        
        updateClient(nom: string,prenom: string,telephone: string,rue: string,nomRue: string,codePostal: string,ville: string,complement: string,email: string){
          firebase.database().ref('/clients/' + email).set({
            prenom: prenom,
            nom: nom,
            telephone: telephone,
            rue: rue,
            nomRue: nomRue,
            codePostal: codePostal,
            ville: ville,
            complement: complement,
          });
          this.saveClients();
          this.emitClients();
        }
      }
      