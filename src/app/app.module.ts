import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { ProductService } from './services/product-service.service';
import { ProduitFormComponent } from './produit/produit-form/produit-form.component';
import {CommonModule} from '@angular/common';
import { ProduitListComponent } from './produit/produit-list/produit-list.component';
import { HomeComponent } from './home/home.component';
import { NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import { SingleProduitComponent } from './produit/single-produit/single-produit.component';
import { FiltreComponent } from './produit/produit-list/filtre/filtre.component';
import { MyAccountComponent } from './user/my-account/my-account.component';
import {AcheterComponent} from './acheter/acheter.component';
import {PanierService} from './services/panier-service.service';
import { CommandeValideComponent } from './acheter/commande-valide/commande-valide.component';
import {CommandeService} from './services/commande-service.service';
import { ClientComponent } from './client/client.component';
import { CommandesComponent } from './client/commandes/commandes.component';
import { CommandeComponent } from './client/commandes/commande/commande.component';
import { InformationsComponent } from './client/informations/informations.component';


const appRoutes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'creerCompte', component: MyAccountComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'produits/listProduits', component: ProduitListComponent},
  {path: 'produits/new', component: ProduitFormComponent},
  {path: 'produits/view/:id', component: SingleProduitComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'produits/acheter', component: AcheterComponent},
  {path: 'produits/acheter/commandeValide', component: CommandeValideComponent},
  {path: 'user/myAccount', component: MyAccountComponent},
  {path: 'client', component: ClientComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home',pathMatch:'full'},
  {path: '**', redirectTo: 'home'}
]

@NgModule({
  declarations: [
    AcheterComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    ProduitFormComponent,
    ProduitListComponent,
    HomeComponent,
    SingleProduitComponent,
    FiltreComponent,
    MyAccountComponent,
    CommandeValideComponent,
    ClientComponent,
    CommandesComponent,
    CommandeComponent,
    InformationsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbCarouselModule,
  ],
  providers: [
    AuthService,
    ProductService,
    AuthGuardService,
    PanierService,
    UserService,
    CommandeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
