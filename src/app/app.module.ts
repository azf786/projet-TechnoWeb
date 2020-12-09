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
import { ProductService } from './services/product-service.service';
import { ProduitFormComponent } from './produit/produit-form/produit-form.component';
import {CommonModule} from '@angular/common';
import { ProduitListComponent } from './produit/produit-list/produit-list.component';
import { HomeComponent } from './home/home.component';
import { NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import { SingleProduitComponent } from './produit/single-produit/single-produit.component';
import { FiltreComponent } from './produit/produit-list/filtre/filtre.component';
import { AcheterComponent } from './acheter/acheter.component';
import {PanierService} from './services/panier-service.service';
import { CarteCreditComponent } from './acheter/carte-credit/carte-credit.component';


const appRoutes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'produits/listProduits', component: ProduitListComponent},
  {path: 'produits/new', component: ProduitFormComponent},
  {path: 'produits/view/:id', component: SingleProduitComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'produits/acheter', component: AcheterComponent},
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
    AcheterComponent,
    CarteCreditComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbCarouselModule
  ],
  providers: [
    AuthService,
    ProductService,
    AuthGuardService,
    PanierService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
