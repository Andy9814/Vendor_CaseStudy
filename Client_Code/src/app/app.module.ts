import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatMenuModule,
  MatToolbarModule, MatIconModule, MatListModule, MatFormFieldModule, MatInputModule
} from '@angular/material';
import { VendorListComponent } from './vendor/vendor-list.component';
import { VendorHomeComponent } from './vendor/vendor-home.component';
import { VendorDetailComponent } from './vendor/vendor-detail.component';

@NgModule({
  declarations: [
    VendorListComponent, VendorHomeComponent, VendorDetailComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  bootstrap: [VendorHomeComponent]
})
export class AppModule { }
