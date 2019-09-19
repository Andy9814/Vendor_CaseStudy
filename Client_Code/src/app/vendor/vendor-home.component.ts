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
  vendor: Vendor;
  hideEditForm: boolean;
  msg: string;
  todo: string;
  constructor(public vendorServices: VendorService) {
    this.hideEditForm = true;
  }

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
  select(vendor: Vendor) {
    this.todo = 'update';
    this.vendor = vendor;
    this.msg = `${vendor.name} selected`;
    this.hideEditForm = !this.hideEditForm;
  } // select
  /**
  * cancelled - event handler for cancel button
  */
  cancel(msg?: string) {
    if (msg) {
      this.msg = 'Operation cancelled';
    }
    this.hideEditForm = !this.hideEditForm;
  } // cancel
  /**
  * update - send changed update to service update local array
  */
  update(vendor: Vendor) {
    this.vendorServices.update(vendor).subscribe(payload => {
      if (payload.id > 0) {
        // update local array using ? operator with data returned from the server
        this.vendors = this.vendors.map(vend => vend.id === vendor.id ? ({ ...vend, payload }) : vend);
        this.msg = `Vendor [ ${vendor.id} ] updated!`;
      } else {
        this.msg = 'Vendor not updated! - server error';
      }
      this.hideEditForm = !this.hideEditForm;
    },
      err => {
        this.msg = `Error - Vendor not updated - ${err.status} - ${err.statusText}`;
      });
  } // update

}
