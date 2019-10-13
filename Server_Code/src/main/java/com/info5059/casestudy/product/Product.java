package com.info5059.casestudy.product;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.math.BigDecimal;
@Entity
@Data
@RequiredArgsConstructor
public class Product {
    @Id
    private String Id;
    private int vendorid;
    private String name;
    private BigDecimal costprice;
    private BigDecimal msrp;
    private int rop;
    private int eoq;
    private int qoh;
    private int qoo;
    private String qrcode;
    private String qrcodetxt;

    public String getId() {
        return Id;
    }

    public int getVendorid() {
        return vendorid;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getCostprice() {
        return costprice;
    }

    public BigDecimal getMsrp() {
        return msrp;
    }

    public int getRop() {
        return rop;
    }

    public int getEoq() {
        return eoq;
    }

    public int getQoh() {
        return qoh;
    }

    public int getQoo() {
        return qoo;
    }

    public String getQrcode() {
        return qrcode;
    }

    public String getQrcodetxt() {
        return qrcodetxt;
    }

    public void setId(String id) {
        Id = id;
    }

    public void setVendorid(int vendorid) {
        this.vendorid = vendorid;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCostprice(BigDecimal costprice) {
        this.costprice = costprice;
    }

    public void setMsrp(BigDecimal msrp) {
        this.msrp = msrp;
    }

    public void setRop(int rop) {
        this.rop = rop;
    }

    public void setEoq(int eoq) {
        this.eoq = eoq;
    }

    public void setQoh(int qoh) {
        this.qoh = qoh;
    }

    public void setQoo(int qoo) {
        this.qoo = qoo;
    }

    public void setQrcode(String qrcode) {
        this.qrcode = qrcode;
    }

    public void setQrcodetxt(String qrcodetxt) {
        this.qrcodetxt = qrcodetxt;
    }
}
