import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { VendorHomeComponent } from './vendor/vendor-home.component';
import { ProductHomeComponent } from './product/product-home.component';
import { PurchaseorderGeneratorComponent } from './purchaseorder/generator/purchaseorder-generator.component';
import { PurchaseorderViewerComponent } from './purchaseorder/viewer/purchaseorder-viewer.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'vendors', component: VendorHomeComponent },
  { path: 'products', component: ProductHomeComponent },
  { path: 'generator', component: PurchaseorderGeneratorComponent },
  { path: 'viewer', component: PurchaseorderViewerComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
