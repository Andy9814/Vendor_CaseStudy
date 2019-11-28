package com.info5059.casestudy.purchaseOrder;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
@Repository
@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "purchaseorder", path = "purchaseorder")
public interface  PurchaseOrderRepository extends CrudRepository<PurchaseOrder, Long> {
    // will return all PurchaseOrder for a given vendor
    @Query("select r from PurchaseOrder r where r.vendorid = ?1")
    List<PurchaseOrder> findByVendor(Long vendorid);
}
