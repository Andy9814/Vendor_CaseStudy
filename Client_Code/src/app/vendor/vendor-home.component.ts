import { Component, OnInit } from '@angular/core';
import { Vendor } from './vendor';
import { RestfulService } from '../restful.service';
import { BASEURL } from '../constants';

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
  url: string;
  constructor(public restService: RestfulService) {
    this.hideEditForm = true;
    this.url = BASEURL + 'vendors';

  }

  ngOnInit() {
    this.msg = 'Loading Vendor From the Server...';
    this.restService.load(this.url).subscribe(
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
    this.restService.update(`${this.url}/${vendor.id}`, vendor).subscribe(payload => {
      if (payload.id > 0) {
        // update local array using ? operator with data returned from the server
        this.vendors = this.vendors.map(vend => vend.id === vendor.id ? (Object as any).assign({}, vend, payload) : vend);
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


  save(vendor: Vendor) {
    console.log(vendor.id);
    (vendor.id) ? this.update(vendor) : this.add(vendor);
  } // save

  /**
* add - send employee to service, receive newid back
*/
  add(vendor: Vendor) {
    vendor.id = 0;
    this.restService.add(this.url, vendor)
      .subscribe(payload => {

        if (payload.id > 0) { // server returns new id
          this.vendors = [...this.vendors, payload]; // add employee to current array using spread
          vendor.id = payload.id;
          this.msg = `Vendor ${payload.id} added!`;
        } else {
          this.msg = 'Vendor not added!';
        }
        this.hideEditForm = !this.hideEditForm;
      },
        err => {
          this.msg = `Error - vendor not added - ${err.status} - ${err.statusText}`;
        });
  } // ad

  /**
* delete - send employee id to service for deletion and remove from local collection
*/
  delete(vendor: Vendor) {
    this.restService.delete(`${this.url}/search/deleteOne?vendorid=${vendor.id}`)
      .subscribe(payload => {
        if (payload === 1) { // server returns # rows deleted
          this.msg = `Vendor ${vendor.id} deleted!`;
          this.vendors = this.vendors.filter(emp => emp.id !== vendor.id);
        } else {
          this.msg = 'Vendor not deleted!';
        }
        this.hideEditForm = !this.hideEditForm;
      },
        err => {
          this.msg = `Error - vendor not deleted - ${err.status} - ${err.statusText}`;
        });
  } // delete
  /**
  * newEmployee - create new employee instance
  */
  newVendor() {
    this.vendor = { id: null, name: '', address1: '', city: '', province: '', postalcode: '', phone: '', type: '', email: '' };
    this.msg = 'New Vendor';
    this.hideEditForm = !this.hideEditForm;
  } // newEmployee

}
