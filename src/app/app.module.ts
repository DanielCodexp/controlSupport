import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormRentComponent } from './form-rent/form-rent.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { InfoConfirmationComponent } from './info-confirmation/info-confirmation.component';
import { HttpClientModule } from '@angular/common/http';
import { FaqVlicarsComponent } from './faq-vlicars/faq-vlicars.component';
import { LoadingButton } from './directives/loading-button.directive';
import { FooterComponent } from './footer/footer.component';
import { TermsComponent } from './terms/terms.component';
import { CancelRentComponent } from './cancel-rent/cancel-rent.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FormRentComponent,
    ConfirmationComponent,
    InfoConfirmationComponent,
    LoadingButton,
    FaqVlicarsComponent,
    FooterComponent,
    TermsComponent,
    CancelRentComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule, 
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
