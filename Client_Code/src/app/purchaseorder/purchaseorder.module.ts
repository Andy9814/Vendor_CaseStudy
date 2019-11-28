import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // model driven forms
import { BrowserModule } from '@angular/platform-browser';
import {
  MatSelectModule, MatButtonModule, MatInputModule, MatToolbarModule,
  MatIconModule, MatCardModule, MatTooltipModule, MatListModule
} from '@angular/material';
import { PurchaseorderGeneratorComponent } from './generator/purchaseorder-generator.component';
import { PurchaseorderViewerComponent } from './viewer/purchaseorder-viewer.component';



@NgModule({
  declarations: [PurchaseorderGeneratorComponent, PurchaseorderViewerComponent],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule

  ]
})
export class PurchaseorderModule { }
