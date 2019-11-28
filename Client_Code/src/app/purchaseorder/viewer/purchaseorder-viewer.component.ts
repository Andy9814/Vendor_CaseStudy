import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Purchaseorder } from '../purchaseorder';
import { Product } from 'src/app/product/product';
import { Vendor } from 'src/app/vendor/vendor';
import { PurchaseorderItem } from '../purchaseorder-item';
import { RestfulService } from 'src/app/restful.service';
import { BASEURL, PDFURL } from 'src/app/constants';
@Component({
    templateUrl: './purchaseorder-viewer-component.html'
})
export class PurchaseorderViewerComponent implements OnInit {
    // form
    viewerForm: FormGroup;
    vendorid: FormControl;
    purchaseorderid: FormControl;
    qtyid: FormControl;

    // component
    purchaseorders: Array<Purchaseorder>; // everybody's expenses
    products: Array<Product>; // everybody's expenses
    vendors: Array<Vendor>;

    items: Array<PurchaseorderItem>;
    selectedPurchaseorders: Array<Purchaseorder>; // expenses that being currently chosen
    vendorPurchaseorders: Array<Purchaseorder>; // all expenses for a particular employee
    selectedPurchaseOrder: Purchaseorder; // the current selected expense
    selectedVendor: Vendor; // the current selected employee

    selectedQTY: number;
    pickedPruchaeOrder: boolean;
    pickedVendor: boolean;
    pickedQty: boolean
    PurchaseOrderProducts: Array<Product>

    generated: boolean;
    haspickedPruchaeOrders: boolean;
    productName: string;
    costPrice: number;


    msg: string;
    total: number;
    sub: number;
    tax: number;
    pono: number;
    url: string;

    constructor(private builder: FormBuilder, private restService: RestfulService) {
        this.pickedVendor = false;
        this.pickedPruchaeOrder = false;
        this.pickedQty = false;
        this.generated = false;
        this.url = BASEURL + 'purchaseorder';
    } // constructor
    ngOnInit() {
        this.msg = '';
        this.vendorid = new FormControl('');
        this.purchaseorderid = new FormControl('');
        this.qtyid = new FormControl('');
        this.viewerForm = this.builder.group({
            purchaseorderid: this.purchaseorderid,
            vendorid: this.vendorid,
            qtyid: this.qtyid
        });
        this.onPickVendor();
        this.onPickPruchaseorder();
        // this.onPickQty();
        this.msg = 'loading vendors from server...';
        this.restService.load(BASEURL + 'vendors').subscribe(
            vendorPayload => {
                this.vendors = vendorPayload._embedded.vendors;
                this.msg = 'vendors loaded';
                this.msg = 'loading products from server...';

                this.restService.load(BASEURL + 'purchaseorder').subscribe(
                    purchaseOrderPayload => {
                        this.purchaseorders = purchaseOrderPayload._embedded.purchaseorder;
                        this.msg = 'purchaseorder server data loaded';
                        this.restService.load(BASEURL + 'products').subscribe(
                            productPayload => {
                                this.products = productPayload._embedded.products;
                                this.msg = 'server data loaded';
                            },
                            err => {
                                this.msg += `Error occurred - products not loaded - ${err.status} - ${err.statusText}`;
                            }
                        );

                    },
                    err => {
                        this.msg += `Error occurred - purchaseorder not loaded - ${err.status} - ${err.statusText}`;
                    }
                );

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
        this.viewerForm.get('vendorid').valueChanges.subscribe(val => {
            this.selectedPurchaseOrder = null;
            this.vendorPurchaseorders = [];
            this.selectedVendor = val;
            this.loadVendorPurchaseOrders();
            this.pickedPruchaeOrder = false;
            this.pickedQty = false;
            this.haspickedPruchaeOrders = false;
            this.msg = 'choose product for vendor';
            this.pickedVendor = true;
            this.generated = false;
            this.items = [];
            this.selectedPurchaseorders = [];
            // 
        });
    }
    /**
 * loadEmployeeExpenses - filter for a particular employee's expenses
 */
    loadVendorPurchaseOrders() {
        this.vendorPurchaseorders = [];
        this.vendorPurchaseorders = this.purchaseorders.filter(ex => ex.vendorid === this.selectedVendor.id); // filter expenses for single employee
    } // loadEmployeeExpenses
    /**
     * onPickExpense - subscribe to the select change event then
     * update array containing items.
     */
    onPickPruchaseorder(): void {

        this.viewerForm.get('purchaseorderid').valueChanges.subscribe(val => {
            this.selectedPurchaseOrder = val;
            if (this.selectedPurchaseOrder.items.length > 0) this.haspickedPruchaeOrders = true;
            this.PurchaseOrderProducts = [];
            this.products.forEach(prod => {
                this.selectedPurchaseOrder.items.forEach(it => {
                    if (it.productid === prod.id) {
                        this.PurchaseOrderProducts.push(prod);
                        this.productName = prod.name;
                        this.costPrice = prod.costprice;
                    }
                })
            })
            this.total = 0.0;
            this.tax = 0.0;
            this.sub = 0.0;
            this.selectedPurchaseOrder.items.forEach(exp => this.sub += exp.price);
            this.tax = this.sub * 0.13;
            this.total = this.sub + this.tax;
            this.generated = true;
            this.msg = "Details for PO" + this.selectedPurchaseOrder.id;

        });
    }

    returnProdName(prodid: String) {
        let name = "";
        let prod = this.PurchaseOrderProducts.find(rept => rept.id === prodid);
        return prod.name;
    }

    viewPdf() {
        window.open(PDFURL + this.selectedPurchaseOrder.id, '');
    } // viewPdf
}