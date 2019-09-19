import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASEURL } from '../constants';
import { Vendor } from './vendor';
@Injectable({
  providedIn: 'root'
})


export class VendorService {
  resourceURL: string;
  status: string;
  constructor(public http: HttpClient) {
    this.resourceURL = BASEURL + "vendors";
  }
  load() {
    return this.http.get<any>(this.resourceURL);
  }
  /**
   * Update an employee on the server using http put, server returns updated employee
   */
  update(vendor: Vendor) {
    return this.http.put<Vendor>(`${this.resourceURL}/${vendor.id}`, vendor);
  } // update
}
