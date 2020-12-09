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

  clientForm: FormGroup;
  client: Client;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.userService.getClients();
    this.userService.getSingleClient(this.authService.getCurrentUserEmail());
    this.client = this.userService.userSearch;
    this.initForm();
    console.log(this.client);
  }

  initForm() {
    this.clientForm = this.formBuilder.group( {
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
    const nom = this.clientForm.get('nom').value;
    const prenom = this.clientForm.get('prenom').value;
    const telephone = this.clientForm.get('telephone').value;
    const rue = this.clientForm.get('rue').value;
    const nomRue = this.clientForm.get('nomRue').value;
    const codePostal = this.clientForm.get('codePostal').value;
    const ville = this.clientForm.get('ville').value;
    const complement = this.clientForm.get('complement').value;
    this.userService.updateClient(nom,prenom,telephone,rue,nomRue,codePostal,ville,complement,this.client.email);
  }

}
