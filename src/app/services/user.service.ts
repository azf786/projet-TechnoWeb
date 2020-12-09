import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import{Client} from 'src/app/models/Client.model';
import firebase from 'firebase/app';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  clients: Client[] = [];
  clientCourant: Client;
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
  userSearch: Client;
  
  constructor(authService : AuthService) {}
  
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
  
  getSingleClient(email: string) : Client {
    for (let i = 0; i < this.clients.length; i++) {
      if (this.clients[i].email == email) {
        this.userSearch = this.clients[i];
      }
    }
    console.log(this.userSearch);
    return this.userSearch;
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
      
      