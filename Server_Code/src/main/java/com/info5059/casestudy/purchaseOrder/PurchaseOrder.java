package com.info5059.casestudy.purchaseOrder;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Entity
@Data
@RequiredArgsConstructor
public class PurchaseOrder {
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private Long vendorid;
    private BigDecimal amount;

    @JsonFormat(pattern="yyyy-MM-dd")
    private Date podate;

    @OneToMany(mappedBy = "poid", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PurchaseOrderLineItem> items = new ArrayList<PurchaseOrderLineItem>();

    public Long getVendorid() {
        return vendorid;
    }

    public void setVendorid(Long vendorid) {
        this.vendorid = vendorid;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public List<PurchaseOrderLineItem> getItems() {
        return items;
    }

    public void setItems(List<PurchaseOrderLineItem> items) {
        this.items = items;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public void setPodate(Date podate) {
        this.podate = podate;
    }
}
