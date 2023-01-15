import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelRentComponent } from './cancel-rent/cancel-rent.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { FaqVlicarsComponent } from './faq-vlicars/faq-vlicars.component';
import { FormRentComponent } from './form-rent/form-rent.component';
import { HomeComponent } from './home/home.component';
import { RoutePath } from './phats/route-path.constant';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  {path: RoutePath.HOME_PATH, component: HomeComponent},
  {path: RoutePath.TERMS_PATH, component: TermsComponent},
  {path: RoutePath.CONFIMATION_PATH, component: ConfirmationComponent},
  {path: RoutePath.FAQ_PATH, component: FaqVlicarsComponent},
  {path: RoutePath.CANCEL_PATH, component: CancelRentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
