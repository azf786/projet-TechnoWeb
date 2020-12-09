import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/Client.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  laptopForm: FormGroup;
  client: Client;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
    this.client = new Client("", "", "", "", "",null,"","",this.client.email);
    this.userService.getSingleClient(this.client.email).then(
      (client: Client) => {
        this.client = client;
      }
    );
  }

  initForm() {
    this.userService.getClients();
    this.laptopForm = this.formBuilder.group( {
      nom: [this.client.nom, Validators.required],
      prenom: [this.client.prenom, Validators.required],
      telephone: [this.client.prenom, Validators.required],
      rue: [this.client.rue, Validators.required],
      nomRue: [this.client.nomRue, Validators.required],
      codePostal: [this.client.codePostal, Validators.required],
      ville: [this.client.ville, Validators.required],
      complement: [this.client.complement],
    });
  }

  onUpdateClient() {
    const nom = this.laptopForm.get('nom').value;
    const prenom = this.laptopForm.get('prenom').value;
    const telephone = this.laptopForm.get('telephone').value;
    const rue = this.laptopForm.get('rue').value;
    const nomRue = this.laptopForm.get('nomRue').value;
    const codePostal = this.laptopForm.get('codePostal').value;
    const ville = this.laptopForm.get('ville').value;
    const complement = this.laptopForm.get('complement').value;
    this.userService.updateClient(nom,prenom,telephone,rue,nomRue,codePostal,ville,complement,this.client.email);
  }

}
