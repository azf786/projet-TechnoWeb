import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  onCommande: boolean;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.onCommande = false;
  }

  commandes() {
    this.onCommande = true;
  }

  information() {
    this.onCommande = false;
  }

  onSignOut(){
    this.authService.signOutUser();
    this.router.navigate(['/']);
  }

}
