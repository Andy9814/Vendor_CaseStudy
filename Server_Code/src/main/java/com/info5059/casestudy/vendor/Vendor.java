package com.info5059.casestudy;

import com.info5059.casestudy.product.Product;
import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Data
@Entity
public class Vendor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;
    private String name;
    private String address1;
    private String city;
    private String province;
    private String postalcode;
    private String phone;
    private String type;
    private String email;
    @OneToMany(mappedBy = "vendorid", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Product> products = new HashSet<>();


    public long getId() {
        return Id;
    }

    public String getName() {
        return name;
    }

    public String getAddress1() {
        return address1;
    }

    public String getCity() {
        return city;
    }

    public String getProvince() {
        return province;
    }

    public String getPostalcode() {
        return postalcode;
    }

    public String getPhone() {
        return phone;
    }

    public String getType() {
        return type;
    }

    public String getEmail() {
        return email;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setId(long id) {
        Id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public void setPostalcode(String postalcode) {
        this.postalcode = postalcode;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
}
