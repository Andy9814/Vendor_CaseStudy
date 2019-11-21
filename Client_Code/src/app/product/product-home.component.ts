import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, PageEvent, MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material/sort';

import { Product } from './product';
import { Vendor } from '../vendor/vendor';
import { RestfulService } from '../restful.service';
import { BASEURL, PRODAPIURL } from '../constants';

@Component({
  selector: 'app-product',
  templateUrl: './product-home.component.html',
  styles: []
})
export class ProductHomeComponent implements OnInit {
  products: Product[];
  vendors: Array<Vendor>;
  selectedProduct: Product;
  hideEditForm: boolean;
  msg: string;
  todo: string;
  url: string;
  emptyVendor: Vendor;
  displayedColumns: string[] = ['id', 'name', 'vendorid'];
  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatSort, null) sort: MatSort;
  totalElements: number;
  currentPage: number;
  // get reference to paginator
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  constructor(private restService: RestfulService) {
    this.hideEditForm = true;
    this.url = BASEURL + 'products';
    this.emptyVendor = { id: null, name: '', address1: '', city: '', province: '', postalcode: '', phone: '', type: '', email: '' };
  } // constructor
  ngOnInit() {
    this.msg = 'loading Vendor from server...';
    this.restService.load(BASEURL + 'vendors').subscribe(
      empPayload => {
        this.vendors = empPayload._embedded.vendors;
        this.msg = 'vendors loaded';
        this.msg = 'loading vendors from server...';
        this.currentPage = 0;
        this.getPagedProducts();
        // this.restService.load(this.url).subscribe(
        //   expPayload => {
        //     this.products = expPayload._embedded.products;
        //     this.msg = 'products loaded';
        //     this.dataSource = new MatTableDataSource(this.products);
        //     this.dataSource.sort = this.sort;
        //   },
        //   err => {
        //     this.msg += `Error occurred - products not loaded - ${err.status} - ${err.statusText}`;
        //   });
      },
      err => {
        this.msg += `Error occurred - vendors not loaded - ${err.status} - ${err.statusText}`;
      });
  }

  select(product: Product) {
    this.todo = 'update';
    this.selectedProduct = product;
    this.msg = `Product ${product.name} selected`;
    this.hideEditForm = !this.hideEditForm;
  } // select
  cancel(msg?: string) {
    // this.restService.load(this.url).subscribe(
    //   payload => {
    //     this.products = payload._embedded.products;
    //     this.msg = 'Operation Cancelled!';
    //     this.dataSource.data = this.products;
    //     this.dataSource.sort = this.sort;
    //   },
    //   err => {
    //     this.msg += `Error occurred - products not loaded - ${err.status} - ${err.statusText}`;
    //   });
    this.getPagedProducts();
    this.hideEditForm = !this.hideEditForm;
  } // cancel

  /**
* update - send changed update to service update local array
*/
  update(product: Product) {
    this.msg = 'Updating...';
    this.restService.update(PRODAPIURL, product).subscribe(payload => {
      if (payload.id !== '') {
        // update local array using ? operator
        this.products = this.products.map(exp => exp.id === product.id ? ({ ...exp, payload }) : exp);
        this.msg = `Product ${product.id} updated!`;
        this.dataSource.data = this.products;
        this.dataSource.sort = this.sort;
      } else {
        this.msg = 'Product not updated! - Server problem';
      }
    },
      err => {
        this.msg = `Error - Product not updated - ${err.status} - ${err.statusText}`;
      }
    );
    this.hideEditForm = !this.hideEditForm;
  } // update
  save(product: Product) {
    this.products.find(p => p.id === product.id) ? this.update(product) : this.add(product);
    //(product.id) ? this.update(product) : this.add(product);
  } // save


  /**
  * add - send Product to service, receive newid back
  */
  add(product: Product) {
    this.msg = 'Adding...';
    this.restService.add(PRODAPIURL, product).subscribe(
      payload => {
        if (payload.id != '') { // server returns new id
          this.products = [...this.products, product]; // add Product to current array using spread
          product.id = payload.id;
          this.msg = `Product ${product.id} added!`;
          this.dataSource.data = this.products;
          this.dataSource.sort = this.sort;
          this.getPagedProducts();
        } else {
          this.msg = 'Product not added! - server error';
        }
      },
      err => {
        this.msg = `Error - Product not added - ${err.status} - ${err.statusText}`;
      }
    );
    this.hideEditForm = !this.hideEditForm;
  } // add

  newProduct() {
    this.selectedProduct = {
      id: null, vendorid: null, name: '',
      costprice: null, eoq: null, msrp: null, qoh: null, qoo: null, rop: null, qrcode: null, qrcodetxt: null
    };
    this.msg = 'New Product';
    this.hideEditForm = !this.hideEditForm;
  } // Product
  /**
  * delete - send Product id to service for deletion and remove from local collection
  */
  delete(product: Product) {
    this.msg = 'Deleting...';
    this.restService.load(`${this.url}/search/deleteOne?productid=${product.id}`).subscribe(
      payload => {
        if (payload === 1) { // server returns # rows deleted
          this.msg = `Product ${product.id} deleted!`;
          this.products = this.products.filter(exp => exp.id !== product.id);
          this.dataSource.data = this.products;
          this.dataSource.sort = this.sort;
          this.getPagedProducts();
        } else {
          this.msg = 'Product not deleted! - server error';
        }
      },
      err => {
        this.msg = `Error - employees not deleted - ${err.status} - ${err.statusText}`;
      }
    );
    this.hideEditForm = !this.hideEditForm;
  } // delete
  changePage($pageEvent?: PageEvent) {
    this.currentPage = $pageEvent.pageIndex;
    this.getPagedProducts();
  } // changePage
  getPagedProducts() {
    this.msg = 'loading page of Products...';
    this.restService.load(`${BASEURL}api/pagedproducts?&p=${this.currentPage}&s=5`).subscribe(
      payload => {
        this.products = payload.content;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.sort = this.sort;
        this.msg = `page ${payload.number + 1} of products loaded `;
        if (this.totalElements !== payload.totalElements) {
          // reset paginator
          this.paginator.firstPage();
          this.totalElements = payload.totalElements;
        }
      },
      err => {
        this.msg += 'Error occurred - products  not loaded - ' + err.status + ' - ' +
          err.statusText;
      });
  }
}
