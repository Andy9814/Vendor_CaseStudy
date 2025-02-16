import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from './product';
import { Vendor } from '../vendor/vendor';
import { RestfulService } from '../restful.service';
import { ValidateDecimal } from '../validator/decimal.validator';
import { ValidateInteger } from '../validator/integer.validator';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styles: []
})
export class ProductDetailComponent implements OnInit {

  // setter
  @Input() selectedProduct: Product;
  @Input() vendors: Vendor[];
  @Input() products: Product[];
  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() deleted = new EventEmitter();
  // products: Product[];
  // url: string;
  // msg: string;


  id: FormControl;
  productForm: FormGroup;
  vendorid: FormControl;
  name: FormControl;
  costprice: FormControl;
  msrp: FormControl;
  rop: FormControl;
  eoq: FormControl;
  qoh: FormControl;
  qoo: FormControl;
  qrcodetxt: FormControl;

  constructor(private builder: FormBuilder) {
    this.id = new FormControl('', Validators.compose([this.uniqueCodeValidator.bind(this), Validators.required]));
    this.vendorid = new FormControl('', Validators.compose([Validators.required]));
    this.name = new FormControl('', Validators.compose([Validators.required]));
    this.costprice = new FormControl('', Validators.compose([Validators.required, ValidateDecimal]));
    this.msrp = new FormControl('', Validators.compose([Validators.required, ValidateDecimal]));
    this.rop = new FormControl('', Validators.compose([Validators.required, ValidateInteger]));
    this.eoq = new FormControl('', Validators.compose([Validators.required, ValidateInteger]));
    this.qoh = new FormControl('', Validators.compose([Validators.required, ValidateInteger]));
    this.qoo = new FormControl('', Validators.compose([Validators.required, ValidateInteger]));
    this.qrcodetxt = new FormControl('', Validators.compose([Validators.required]));

  } // constructor
  private restService: RestfulService
  ngOnInit() {
    this.productForm = this.builder.group({
      id: this.id,
      vendorid: this.vendorid,
      name: this.name,
      costprice: this.costprice,
      msrp: this.msrp,
      rop: this.rop,
      eoq: this.eoq,
      qoh: this.qoh,
      qoo: this.qoo,
      qrcodetxt: this.qrcodetxt,
    });


    // patchValue doesn't care if all values are present
    this.productForm.patchValue({
      id: this.selectedProduct.id,
      vendorid: this.selectedProduct.vendorid,
      name: this.selectedProduct.name,
      costprice: this.selectedProduct.costprice,
      msrp: this.selectedProduct.msrp,
      rop: this.selectedProduct.rop,
      eoq: this.selectedProduct.eoq,
      qoh: this.selectedProduct.qoh,
      qoo: this.selectedProduct.qoo,
      qrcodetxt: this.selectedProduct.qrcodetxt,
      qrcode: this.selectedProduct.qrcode
    });
  }
  updateSelectedProduct() {
    this.selectedProduct.id = this.productForm.value.id;
    this.selectedProduct.name = this.productForm.value.name;
    this.selectedProduct.vendorid = this.productForm.value.vendorid;
    this.selectedProduct.costprice = this.productForm.value.costprice;
    this.selectedProduct.msrp = this.productForm.value.msrp;
    this.selectedProduct.rop = this.productForm.value.rop;
    this.selectedProduct.eoq = this.productForm.value.eoq;
    this.selectedProduct.qoh = this.productForm.value.qoh;
    this.selectedProduct.qoo = this.productForm.value.qoo;
    this.selectedProduct.qrcodetxt = this.productForm.value.qrcodetxt;
    this.saved.emit(this.selectedProduct);
  }

  uniqueCodeValidator(control) {
    /**
    * uniqueCodeValidator - needed access to products property so not
    * with the rest of the validators
    */
    if (this.products) {
      return this.products.find(p => p.id === control.value && !this.selectedProduct.id) ? { idExists: true } : null;
    } // uniqueCodeValidator

  }

}
