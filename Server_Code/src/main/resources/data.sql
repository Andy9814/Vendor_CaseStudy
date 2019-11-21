INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email)
    VALUES ('123 Maple St','London','On', 'N1N-1N1','(555)555-5555','Trusted','ABC Supply Co.','abc@supply.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email)
    VALUES ('543 Sycamore Ave','Toronto','On', 'N1P-1N1','(999)555-5555','Trusted','Big Bills Depot','bb@depot.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email)
    VALUES ('922 Oak St','London','On', 'N1N-1N1','(555)555-5599','Un Trusted','Shady Sams','ss@underthetable.com');
INSERT INTO Vendor (Address1,City,Province,PostalCode,Phone,Type,Name,Email)
VALUES ('26 West Road','London','On', 'N5Y-g2E','(555)555-5599','Un Trusted','Nripdeep Singh','nrip.doing@.com');

INSERT INTO Product (Id,vendorid,name,costprice,msrp,rop,eoq,qoh,qoo)
VALUES ('1X',1,'Apple',84.6,75.23,75,75,75,75);
INSERT INTO Product (Id,vendorid,name,costprice,msrp,rop,eoq,qoh,qoo)
VALUES ('2Y',2,'Google',84.6,75.23,75,75,75,75);
INSERT INTO Product (Id,vendorid,name,costprice,msrp,rop,eoq,qoh,qoo)
VALUES ('3X',1,'Eliot',84.6,75.23,75,75,75,75);
INSERT INTO Product (Id,vendorid,name,costprice,msrp,rop,eoq,qoh,qoo)
VALUES ('4X',1,'Ziggy',84.6,75.23,75,75,75,75);
INSERT INTO Product (Id,vendorid,name,costprice,msrp,rop,eoq,qoh,qoo)
VALUES ('5X',1,'Tesla',84.6,75.23,75,75,75,75);
INSERT INTO Product (Id,vendorid,name,costprice,msrp,rop,eoq,qoh,qoo)
VALUES ('6X',1,'3Com',84.6,75.23,75,75,75,75);
INSERT INTO Product (Id,vendorid,name,costprice,msrp,rop,eoq,qoh,qoo)
VALUES ('7X',4,'A&M Records',84.6,75.23,75,75,75,75);
INSERT INTO Product (Id,vendorid,name,costprice,msrp,rop,eoq,qoh,qoo)
VALUES ('8X',4,'Adobe Systems',84.6,75.23,75,75,75,75);
INSERT INTO Product (Id,vendorid,name,costprice,msrp,rop,eoq,qoh,qoo)
VALUES ('9X',4,'Microsoft',84.6,75.23,75,75,75,75);
INSERT INTO Product (Id,vendorid,name,costprice,msrp,rop,eoq,qoh,qoo)
VALUES ('10X',4,'Eclipse',84.6,75.23,75,75,75,75);
INSERT INTO Product (Id,vendorid,name,costprice,msrp,rop,eoq,qoh,qoo)
VALUES ('11X',2,'ThinkPad',84.6,75.23,75,75,75,75);
INSERT INTO Product (Id,vendorid,name,costprice,msrp,rop,eoq,qoh,qoo)
VALUES ('12X',3,'Tim Hortans',84.6,75.23,75,75,75,75);
INSERT INTO Product (Id,vendorid,name,costprice,msrp,rop,eoq,qoh,qoo)
VALUES ('13X',2,'MSi',84.6,75.23,75,75,75,75);
INSERT INTO Product (Id,vendorid,name,costprice,msrp,rop,eoq,qoh,qoo)
VALUES ('14X',3,'Targus',84.6,75.23,75,75,75,75);
INSERT INTO Product (Id,vendorid,name,costprice,msrp,rop,eoq,qoh,qoo)
VALUES ('15X',2,'Aoc',84.6,75.23,75,75,75,75);
INSERT INTO Product (Id,vendorid,name,costprice,msrp,rop,eoq,qoh,qoo)
VALUES ('16X',3,'Microsoft',84.6,75.23,75,75,75,75);
INSERT INTO Product (Id,vendorid,name,costprice,msrp,rop,eoq,qoh,qoo)
VALUES ('17X',2,'Surface',84.6,75.23,75,75,75,75);
INSERT INTO Product (Id,vendorid,name,costprice,msrp,rop,eoq,qoh,qoo)
VALUES ('18X',3,'Mac',84.6,75.23,75,75,75,75);
INSERT INTO Product (Id,vendorid,name,costprice,msrp,rop,eoq,qoh,qoo)
VALUES ('19X',2,'ThinkPad',84.6,75.23,75,75,75,75);
INSERT INTO Product (Id,vendorid,name,costprice,msrp,rop,eoq,qoh,qoo)
VALUES ('20X',3,'Tim Hortans',84.6,75.23,75,75,75,75);
-- -- sample report
-- INSERT INTO PURCHASE_ORDER  (vendorid,podate) VALUES (1, CURRENT_TIMESTAMP);
-- INSERT INTO PURCHASE_ORDER_LINE_ITEM (productid,poid,qty) VALUES ('1X',1,50);