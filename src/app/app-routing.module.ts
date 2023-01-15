import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { HomeComponent } from './pages/home/home.component';
import { RoutePath } from './phats/route-path.constant';

const routes: Routes = [
  {path: RoutePath.HOME_PATH, component: HomeComponent},
  {path: RoutePath.CONFIRMATION_PATH, component: ConfirmationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
