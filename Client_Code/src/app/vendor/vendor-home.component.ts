import { Component, OnInit } from '@angular/core';
import { Vendor } from './vendor';
import { VendorService } from './vendor.service';


@Component({
  selector: 'app-vendors',
  templateUrl: './vendor-home.component.html',
  //styleUrls: ['./vendor-home.component.scss']
})
export class VendorHomeComponent implements OnInit {
  vendors: Array<Vendor>;
  msg: string;
  constructor(public vendorServices: VendorService) { }

  ngOnInit() {
    this.msg = 'Loading Vendor From the Server...';
    this.vendorServices.load().subscribe(
      payload => {
        this.vendors = payload._embedded.vendors;
        this.msg = 'vendors loaded!!';
      },
      err => {
        this.vendors = [];
        this.msg = `Error - Vendors not loaded - ${err.status} - ${err.statusText}`;
      }); // subscribe

  }

}
