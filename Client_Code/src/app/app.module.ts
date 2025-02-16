import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule } from '@angular/material';
import { MatToolbarModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { VendorModule } from './vendor/vendor.module';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductModule } from './product/product.module';
import { PurchaseorderModule } from './purchaseorder/purchaseorder.module';
import { LoginModule } from './login/login.module';


@NgModule({
  declarations: [
    AppComponent, HomeComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    VendorModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    ProductModule,
    PurchaseorderModule,
    LoginModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
