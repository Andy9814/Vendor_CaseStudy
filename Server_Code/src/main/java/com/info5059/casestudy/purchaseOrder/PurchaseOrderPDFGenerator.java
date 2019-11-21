package com.info5059.casestudy.purchaseOrder;

import com.info5059.casestudy.Vendor;
import com.info5059.casestudy.product.Product;
import com.info5059.casestudy.product.ProductRepository;
import com.info5059.casestudy.vendor.VendorRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.net.URL;
import java.text.NumberFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;
// add address to vendor


public class PurchaseOrderPDFGenerator {
    public static ByteArrayInputStream generateReport(String poid,
                                                      PurchaseOrderDAO repDAO,
                                                      VendorRepository vendorRepository,
                                                      ProductRepository productRepository) {
        URL imageUrl = com.info5059.casestudy.purchaseOrder.PurchaseOrderPDFGenerator.class.getResource("/public/images/logo.png");
        Document document = new Document();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Font catFont = new Font(Font.FontFamily.HELVETICA, 24, Font.BOLD);
        Font subFont = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD);
        Font smallBold = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
        Locale locale = new Locale("en", "US");
        NumberFormat formatter = NumberFormat.getCurrencyInstance(locale);
        try {
            PurchaseOrder purchaseOrder = repDAO.findOne(Long.parseLong(poid));
            PdfWriter.getInstance(document, baos);
            document.open();
            Paragraph preface = new Paragraph();
// add the logo here
            Image image1 = Image.getInstance(imageUrl);
            image1.setAbsolutePosition(55f, 750f);
            preface.add(image1);
            preface.setAlignment(Element.ALIGN_RIGHT);
// Lets write a big header
            Paragraph mainHead = new Paragraph(String.format("%55s", "PURCHASE ORDER "), catFont);
            preface.add(mainHead);
            preface.add(new Paragraph(String.format("%90s", "PO#:" + poid), subFont));
            addEmptyLine(preface, 3);
            BigDecimal tot = new BigDecimal(0.0);
            BigDecimal tax = new BigDecimal(0.13);
            BigDecimal ordertot = new BigDecimal(0.0);


            Optional<Vendor> opt = vendorRepository.findById(purchaseOrder.getVendorid());
            if (opt.isPresent()) {
                Vendor vendor = opt.get();


                PdfPTable tableName = new PdfPTable(2);
                PdfPCell c1 = new PdfPCell(new Paragraph("Vendor: ", smallBold));
                c1.setBorder(0);
                tableName.addCell(c1);


                PdfPCell efName = new PdfPCell(new Phrase( vendor.getName(), smallBold));
                efName.setHorizontalAlignment(Element.ALIGN_CENTER);
                efName.setBackgroundColor(BaseColor.LIGHT_GRAY);
                efName.setBorder(0);
                tableName.addCell(efName);

                PdfPCell empty = new PdfPCell(new Phrase( " "));
                empty.setHorizontalAlignment(Element.ALIGN_CENTER);
                empty.setBorder(0);
                tableName.addCell(empty);


                PdfPCell elName = new PdfPCell(new Phrase( vendor.getAddress1(), smallBold));
                elName.setHorizontalAlignment(Element.ALIGN_CENTER);
                elName.setBackgroundColor(BaseColor.LIGHT_GRAY);
                elName.setBorder(0);
                tableName.addCell(elName);

                PdfPCell empty1 = new PdfPCell(new Phrase( " "));
                empty1.setHorizontalAlignment(Element.ALIGN_CENTER);
                empty1.setBorder(0);
                tableName.addCell(empty1);

                PdfPCell city = new PdfPCell(new Phrase( vendor.getCity(), smallBold));
                city.setHorizontalAlignment(Element.ALIGN_CENTER);
                city.setBackgroundColor(BaseColor.LIGHT_GRAY);
                city.setBorder(0);
                tableName.addCell(city);

                empty.setHorizontalAlignment(Element.ALIGN_CENTER);
                empty.setBorder(0);
                tableName.addCell(empty);

                PdfPCell  province = new PdfPCell(new Phrase( vendor.getProvince(), smallBold));
                province.setHorizontalAlignment(Element.ALIGN_CENTER);
                province.setBackgroundColor(BaseColor.LIGHT_GRAY);
                province.setBorder(0);
                tableName.addCell(province);

                empty.setHorizontalAlignment(Element.ALIGN_CENTER);
                empty.setBorder(0);
                tableName.addCell(empty);

                PdfPCell  postal  = new PdfPCell(new Phrase( vendor.getPostalcode(), smallBold));
                postal.setHorizontalAlignment(Element.ALIGN_CENTER);
                postal.setBackgroundColor(BaseColor.LIGHT_GRAY);
                postal.setBorder(0);
                tableName.addCell(postal);

                preface.add(tableName);
                addEmptyLine(preface,4);
            }

            PdfPTable table = new PdfPTable(5);
            PdfPCell  cell = new PdfPCell(new Paragraph("Product Code", smallBold));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
            cell = new PdfPCell(new Paragraph("Product Description", smallBold));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
            cell = new PdfPCell(new Paragraph("Quantity Solid", smallBold));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
            cell = new PdfPCell(new Paragraph("Price", smallBold));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
            cell = new PdfPCell(new Paragraph("Exit Price", smallBold));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);

            for (PurchaseOrderLineItem line : purchaseOrder.getItems()) {
                Optional<Product> optx = productRepository.findById(line.getProductid());
                if (optx.isPresent()) {
                    Product product = optx.get();


                    PdfPCell    c1 = new PdfPCell(new Phrase(product.getId()));
                    c1.setHorizontalAlignment(Element.ALIGN_CENTER);
                    table.addCell(c1);

                    c1 = new PdfPCell(new Phrase(product.getName()));
                    c1.setHorizontalAlignment(Element.ALIGN_CENTER);
                    table.addCell(c1);

                    c1 = new PdfPCell(new Paragraph(String.format( "" + line.getQty())));
                    c1.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    table.addCell(c1);

                    c1 = new PdfPCell(new Phrase(formatter.format(product.getCostprice()))); //needs to change
                    c1.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    table.addCell(c1);

                    c1 = new PdfPCell(new Phrase(formatter.format(product.getCostprice().multiply(BigDecimal.valueOf(line.getQty()))))); //cost * qty
                    c1.setHorizontalAlignment(Element.ALIGN_RIGHT);
                    table.addCell(c1);

                    tot = tot.add(product.getCostprice().multiply(BigDecimal.valueOf(line.getQty())), new MathContext(8, RoundingMode.UP));
                }

            }



            //  Total
            PdfPCell  c1 = new PdfPCell(new Phrase(""));
            c1.setBorder(0);
            c1.setColspan(3);
            table.addCell(c1);
            c1 = new PdfPCell(new Phrase("Total:"));
            c1.setBorder(0);
            c1.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(c1);


            c1 = new PdfPCell(new Phrase(formatter.format(tot)));  //
            c1.setHorizontalAlignment(Element.ALIGN_RIGHT);

            table.addCell(c1);

            //  Tax
            // tot = tot * 0.13;
            PdfPCell   Tax = new PdfPCell(new Phrase(" " ));  // total * 0.13 ;
            Tax.setBorder(0);
            Tax.setColspan(3);
            tax = tot.multiply(tax);
            table.addCell(Tax);
            Tax = new PdfPCell(new Phrase("Tax:"));
            Tax.setBorder(0);
            Tax.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(Tax);

            PdfPCell  Taxnum = new PdfPCell(new Phrase(formatter.format(tax)));
            Taxnum.setHorizontalAlignment(Element.ALIGN_RIGHT);

            table.addCell(Taxnum);

            // order total
            PdfPCell   ordertotal = new PdfPCell(new Phrase(""));
            ordertotal.setBorder(0);
            ordertotal.setColspan(3);
            table.addCell(ordertotal);
            ordertotal = new PdfPCell(new Phrase("Order Total:"));    // total + tax
            ordertotal.setBorder(0);
            ordertotal.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(ordertotal);
            ordertot=  tot.add(tax);
            ordertotal = new PdfPCell(new Phrase(formatter.format(ordertot)));
            ordertotal.setHorizontalAlignment(Element.ALIGN_RIGHT);
            ordertotal.setBackgroundColor(BaseColor.YELLOW);
            table.addCell(ordertotal);
            preface.add(table);
            addEmptyLine(preface, 3);
            preface.setAlignment(Element.ALIGN_CENTER);
            preface.add(new Paragraph(String.format("%60s", "PO Generated on: " + new Date())));
            document.add(preface);
            document.close();
        } catch (Exception ex) {
            Logger.getLogger(com.info5059.casestudy.purchaseOrder.PurchaseOrderPDFGenerator.class.getName()).log(Level.SEVERE, null, ex);
        }
        return new ByteArrayInputStream(baos.toByteArray());
    }

    private static void addEmptyLine(Paragraph paragraph, int number) {
        for (int i = 0; i < number; i++) {
            paragraph.add(new Paragraph(" "));
        }
    }
}
