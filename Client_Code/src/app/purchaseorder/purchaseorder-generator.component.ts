import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Vendor } from '../vendor/vendor';
import { RestfulService } from '../restful.service';
import { Product } from '../product/product';
import { PurchaseorderItem } from './purchaseorder-item';
import { Purchaseorder } from './purchaseorder';
import { BASEURL, PDFURL } from '../constants';
@Component({
  templateUrl: './purchaseorder-generator.component.html'
})
export class PurchaseorderGeneratorComponent implements OnInit {
  // form
  generatorForm: FormGroup;
  vendorid: FormControl;
  productid: FormControl;
  qtyid: FormControl;
  // component
  products: Array<Product>; // everybody's expenses
  vendors: Array<Vendor>; // all employees
  items: Array<PurchaseorderItem>; // expense items that will be in report
  selectedproducts: Array<Product>; // expenses that being currently chosen
  vendorproducts: Array<Product>; // all expenses for a particular employee
  selectedProduct: Product; // the current selected expense
  selectedVendor: Vendor; // the current selected employee
  selectedQTY: number;
  pickedProduct: boolean;
  pickedVendor: boolean;
  pickedQty: boolean
  generated: boolean;
  hasProducts: boolean;
  msg: string;
  total: number;
  sub: number;
  tax: number;
  pono: number;
  url: string;
  constructor(private builder: FormBuilder, private restService: RestfulService) {
    this.pickedVendor = false;
    this.pickedProduct = false;
    this.pickedQty = false;
    this.generated = false;
    this.url = BASEURL + 'purchaseOrder';
  } // constructor
  ngOnInit() {
    this.msg = '';
    this.vendorid = new FormControl('');
    this.productid = new FormControl('');
    this.qtyid = new FormControl('');
    this.generatorForm = this.builder.group({
      productid: this.productid,
      vendorid: this.vendorid,
      qtyid: this.qtyid
    });
    this.onPickVendor();
    this.onPickProduct();
    this.onPickQty();
    this.msg = 'loading vendors from server...';
    this.restService.load(BASEURL + 'vendors').subscribe(
      vendorPayload => {
        this.vendors = vendorPayload._embedded.vendors;
        this.msg = 'vendors loaded';
        this.msg = 'loading products from server...';
        this.restService.load(BASEURL + 'products').subscribe(
          productPayload => {
            this.products = productPayload._embedded.products;
            this.msg = 'server data loaded';
          },
          err => {
            this.msg += `Error occurred - products not loaded - ${err.status} - ${err.statusText}`;
          });
      },
      err => {
        this.msg += ` Error occurred - vendors not loaded - ${err.status} - ${err.statusText}`;
      });
  } // ngOnInit
  /**
   * onPickEmployee - subscribe to the select change event then load specific
   * employee expenses for subsequent selection
   */
  onPickVendor(): void {
    this.generatorForm.get('vendorid').valueChanges.subscribe(val => {
      this.selectedProduct = null;
      this.selectedVendor = val;
      this.loadVendorProducts();
      this.pickedProduct = false;
      this.pickedQty = false;
      this.hasProducts = false;
      this.msg = 'choose product for vendor';
      this.pickedVendor = true;
      this.generated = false;
      this.items = [];
      this.selectedproducts = [];
    });
  }
  /**
   * onPickExpense - subscribe to the select change event then
   * update array containing items.
   */
  onPickProduct(): void {
    this.generatorForm.get('productid').valueChanges.subscribe(val => {
      this.selectedProduct = val;
      this.msg = 'choose qty for product';
      this.pickedProduct = true;
      this.selectedQTY = null;
      this.pickedQty = false;
      this.generatorForm.get('qtyid').setValue('');
    });
  }

  onPickQty(): void {
    this.generatorForm.get('qtyid').valueChanges.subscribe(val => {
      if (val !== '') {
        if (val === 'EOQ') {
          this.selectedQTY = this.selectedProduct.eoq;
        } else {
          this.selectedQTY = +val;
        }
        this.pickedQty = true;
        const item: PurchaseorderItem = {
          id: 0,
          purchaseorderid: 0,
          productid: this.selectedProduct.id,
          qty: this.selectedQTY,
          price: this.selectedProduct.costprice * this.selectedQTY
        };
        if (this.items.find(it => it.productid === this.selectedProduct.id) && this.selectedQTY > 0) {
          this.items.find(it => it.productid === this.selectedProduct.id).qty = this.selectedQTY;
          this.items.find(it => it.productid === this.selectedProduct.id).price = this.selectedQTY * this.selectedProduct.costprice;
          this.msg = this.selectedProduct.name + ' amount changed to ' + this.selectedQTY;
        }
        else if (this.items.find(it => it.productid === this.selectedProduct.id) && this.selectedQTY === 0) {
          this.items.splice(this.items.indexOf(this.items.find(it => it.productid === this.selectedProduct.id)), 1);
          //this.selectedproducts
          this.msg = 'all ' + this.selectedProduct.name + 's removed';
        }
        else if (this.selectedQTY > 0) { // add entry
          this.items.push(item);
          //this.selectedproducts.push(this.selectedProduct);
          this.msg = this.selectedQTY + " " + this.selectedProduct.name + '(s) added';
        }
        if (this.items.length > 0) {
          this.hasProducts = true;
        } else {
          this.msg = "All items removed";
          this.hasProducts = false;
        }
        this.total = 0.0;
        this.tax = 0.0;
        this.sub = 0.0;

        this.items.forEach(exp => this.sub += this.products.find(it => it.id === exp.productid).costprice * exp.qty);
        this.tax = this.sub * 0.13;
        this.total = this.sub + this.tax;
      }
    });
  }
  /**
   * loadEmployeeExpenses - filter for a particular employee's expenses
   */
  loadVendorProducts() {
    this.vendorproducts = [];
    this.vendorproducts = this.products.filter(ex => ex.vendorid === this.selectedVendor.id); // filter expenses for single employee
  } // loadEmployeeExpenses
  /**
   * createReport - create the client side report
   */
  createPurchaseorder() {
    this.generated = false;
    const po: Purchaseorder = { id: 0, items: this.items, vendorid: this.selectedProduct.vendorid, amount: this.total };
    this.restService.add(this.url, po).subscribe(
      poid => {
        if (poid > 0) { // server returns new report#
          this.msg = `PO ${poid} created!`;
          this.generated = true;
          this.pono = poid;
        } else {
          this.msg = 'Report not created! - server error';
        }
        this.hasProducts = false;
        this.pickedVendor = false;
        this.pickedProduct = false;
      },
      err => {
        this.msg = `Error occurred - po not created - ${err.status} - ${err.statusText}`;
      }
    );
  } // createReport
  /**
* viewPdf - determine report number and pass to server
* for PDF generation in a new window
*/
  viewPdf() {
    window.open(PDFURL + this.pono, '');
  } // viewPdf
} // ReportGeneratorComponent

