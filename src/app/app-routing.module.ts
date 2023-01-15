import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { FormComponent } from './pages/form/form.component';
import { RoutePath } from './phats/route-path.constant';

const routes: Routes = [
  {path: RoutePath.HOME_PATH, component: FormComponent},
  {path: RoutePath.CONFIRMATION_PATH, component: ConfirmationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
