import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'; ``
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Vendor } from './vendor';
@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html'
})
export class VendorDetailComponent implements OnInit {
  @Input() selectedVendor: Vendor;
  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  vendorForm: FormGroup;
  name: FormControl;
  address: FormControl;
  city: FormControl;
  province: FormControl;
  postalcode: FormControl;
  phone: FormControl;
  type: FormControl;
  email: FormControl;

  constructor(private builder: FormBuilder) {
    this.name = new FormControl();
    this.address = new FormControl();
    this.city = new FormControl();
    this.province = new FormControl();
    this.postalcode = new FormControl();
    this.phone = new FormControl();
    this.type = new FormControl();
    this.email = new FormControl();


  } // constructor
  ngOnInit() {
    this.vendorForm = new FormGroup({
      name: this.name,
      address: this.address,
      city: this.city,
      province: this.province,
      postalcode: this.postalcode,
      phone: this.phone,
      type: this.type,
      email: this.email
    });
    // patchValue doesn’t care if all values present
    this.vendorForm.patchValue({
      name: this.selectedVendor.name,
      address: this.selectedVendor.address1,
      city: this.selectedVendor.city,
      province: this.selectedVendor.phone,
      postalcode: this.selectedVendor.postalcode,
      phone: this.selectedVendor.phone,
      type: this.selectedVendor.type,
      email: this.selectedVendor.email
    });
  } // ngOnInit
  updateSelectedVendor() {
    this.selectedVendor.name = this.vendorForm.value.name;
    this.selectedVendor.address1 = this.vendorForm.value.address;
    this.selectedVendor.city = this.vendorForm.value.city;
    this.selectedVendor.province = this.vendorForm.value.province;
    this.selectedVendor.postalcode = this.vendorForm.value.postalcode;
    this.selectedVendor.phone = this.vendorForm.value.phone;
    this.selectedVendor.type = this.vendorForm.value.type;
    this.selectedVendor.email = this.vendorForm.value.email;
    this.saved.emit(this.selectedVendor);
  }
} // EmployeeDetailComponent