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
import { NgbCarouselConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SingleProduitComponent } from './produit/single-produit/single-produit.component';


const appRoutes: Routes = [
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'produits/listProduits', component: ProduitListComponent},
  {path: 'produits/new', component: ProduitFormComponent},
  {path: '', redirectTo: 'books',pathMatch:'full'},
  {path: '**', redirectTo: 'books'},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home',pathMatch:'full'},
  {path: '**', redirectTo: 'home'}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    ProduitFormComponent,
    ProduitListComponent,
    HomeComponent,
    SingleProduitComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule
  ],
  providers: [
    AuthService,
    ProductService,
    AuthGuardService,
    NgbCarouselConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
