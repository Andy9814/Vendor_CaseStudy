import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { VendorHomeComponent } from './vendor/vendor-home.component';
import { ProductHomeComponent } from './product/product-home.component';
import { PurchaseorderGeneratorComponent } from './purchaseorder/generator/purchaseorder-generator.component';
import { PurchaseorderViewerComponent } from './purchaseorder/viewer/purchaseorder-viewer.component';
import { AuthGuard } from './login/auth-guard.service';
import { LoginHomeComponent } from './login/login-home.component';
const routes: Routes = [
  { path: 'login', component: LoginHomeComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'vendors', component: VendorHomeComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductHomeComponent, canActivate: [AuthGuard] },
  { path: 'generator', component: PurchaseorderGeneratorComponent, canActivate: [AuthGuard] },
  { path: 'viewer', component: PurchaseorderViewerComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
