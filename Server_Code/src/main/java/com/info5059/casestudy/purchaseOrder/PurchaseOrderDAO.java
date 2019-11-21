package com.info5059.casestudy.purchaseOrder;

import com.info5059.casestudy.product.Product;
import com.info5059.casestudy.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import java.util.Date;

@Component
public class PurchaseOrderDAO {
    @Autowired
    private  ProductRepository prod  ;
    @PersistenceContext
    private EntityManager entityManager;



    @Transactional
    public Long create(PurchaseOrder clientrep) {
        PurchaseOrder realPurchaseOrder = new PurchaseOrder();

        realPurchaseOrder.setPodate(new Date());
        realPurchaseOrder.setVendorid(clientrep.getVendorid());
        realPurchaseOrder.setAmount((clientrep.getAmount()));
        entityManager.persist(realPurchaseOrder);

        for(PurchaseOrderLineItem item :clientrep.getItems()) {
            PurchaseOrderLineItem realItem = new PurchaseOrderLineItem();
            realItem.setPoid(realPurchaseOrder.getId());
            realItem.setProductid(item.getProductid());
            realItem.setPrice(item.getPrice());
            realItem.setQty(item.getQty());
            entityManager.persist(realItem);

            Product product = entityManager.find(Product.class, item.getProductid());
            product.increQOO(item.getQty());
            prod.saveAndFlush(product);
        }
        return  realPurchaseOrder.getId();
    }
    public PurchaseOrder findOne(Long id) {
        PurchaseOrder report = entityManager.find(PurchaseOrder.class, id);
        if (report == null) {
            throw new EntityNotFoundException("Can't find report for ID "
                    + id);
        }
        return report;
    }
    }
