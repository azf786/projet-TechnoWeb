import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Client} from 'src/app/models/Client.model';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  client: Client;
  clientSubject = new Subject<Client>();


  constructor() { }

  emitClients() {
    this.clientSubject.next(this.client);
  }

  saveClients(email: string) {
    const ref = '/clients/' + email.replace('.', '_');
    firebase.database().ref(ref).set(this.client);
  }

  getUser(email: string) {
    firebase.database().ref('/clients/' + email.replace('.', '_')).on('value', (data) => {
      this.client = new Client(data.val().nom, data.val().prenom, data.val().telephone, data.val().rue, data.val().nomRue,
        data.val().codePostal, data.val().ville, data.val().complement, data.val().email);
      console.log(this.client);
      this.emitClients();
    });
  }

  createNewClient(newClient: Client) {
    this.client = newClient;
    this.saveClients(newClient.email);
    this.emitClients();
  }

}
