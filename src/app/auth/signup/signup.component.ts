import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Client } from 'src/app/models/Client.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUp: FormGroup;
  errorMessage: string;

  clientForm: FormGroup;
  client: Client;

  email: string;
  password: string;

  onEmail = true;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(){
    this.signUp = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPwd: ['', [Validators.required]]
    });

    this.clientForm = this.formBuilder.group( {
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      rue: ['', Validators.required],
      nomRue: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      complement: [''],
    });
  }

  confirmPassword() {
    return this.signUp.get('password').value !== this.signUp.get('confirmPwd').value;
  }

  passwordGet() {
    return this.signUp.get('password');
  }

  onSubmitEmail(){
    this.email = this.signUp.get('email').value;
    this.password = this.signUp.get('password').value;
    this.onEmail = false;
  }

  onSubmit() {
    const nom = this.clientForm.get('nom').value;
    const prenom = this.clientForm.get('prenom').value;
    const telephone = this.clientForm.get('telephone').value;
    const rue = this.clientForm.get('rue').value;
    const nomRue = this.clientForm.get('nomRue').value;
    const codePostal = this.clientForm.get('codePostal').value;
    const ville = this.clientForm.get('ville').value;
    const complement = this.clientForm.get('complement').value;

    const client = new Client(nom, prenom, telephone, rue, nomRue, codePostal, ville, complement, this.email);

    this.userService.createNewClient(client);
    this.userService.getUser(this.email);


    this.authService.createNewUser(this.email, this.password).then(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
