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
            Paragraph mainHead = new Paragraph(String.format("%55s", "PURCHASE ORDER"), catFont);
            preface.add(mainHead);
            preface.add(new Paragraph(String.format("%90s", "PO#:" + poid), subFont));
            addEmptyLine(preface, 3);// 3 column table
            Optional<Vendor> opt = vendorRepository.findById(purchaseOrder.getVendorid());
            if (opt.isPresent()) {
                Vendor vendor = opt.get();
                PdfPTable table = new PdfPTable(2);
                PdfPCell cell = new PdfPCell(new Phrase("VENDOR:", smallBold));
                PdfPCell cell1 = new PdfPCell(new Phrase(vendor.getName() + "\n" + vendor.getAddress1() , smallBold));
                cell1.setBackgroundColor(BaseColor.LIGHT_GRAY);
                table.setWidthPercentage(30);
                table.addCell(cell);
                table.addCell(cell1);
                preface.add(table);
            }
            addEmptyLine(preface, 2);
            BigDecimal tot = new BigDecimal(0.0);
            PdfPTable table = new PdfPTable(5);
            PdfPCell cell = new PdfPCell(new Paragraph("Product Code", smallBold));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
            cell = new PdfPCell(new Paragraph("Product Description", smallBold));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
            cell = new PdfPCell(new Paragraph("Quantity Sold", smallBold));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
            cell = new PdfPCell(new Paragraph("Price", smallBold));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
            cell = new PdfPCell(new Paragraph("Ext Price", smallBold));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);
            for (PurchaseOrderLineItem line : purchaseOrder.getItems()) {
                Optional<Product> optx = productRepository.findById(line.getProductid());
                if (optx.isPresent()) {
                    Product product = optx.get();
                    tot = tot.add(product.getCostprice(), new MathContext(8, RoundingMode.UP));
                    cell = new PdfPCell(new Phrase(product.getId()));
                    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    table.addCell(cell);
                    cell = new PdfPCell(new Phrase(product.getName()));
                    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    table.addCell(cell);
                    cell = new PdfPCell(new Phrase(Integer.toString(line.getQty())));
                    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    table.addCell(cell);
                    cell = new PdfPCell(new Phrase(formatter.format(product.getCostprice())));
                    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    table.addCell(cell);
                    cell = new PdfPCell(new Phrase
                            (
                                    formatter.format(line.getPrice()
                                    )
                            )
                    );
                    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                    table.addCell(cell);
                }

            }
            cell = new PdfPCell(new Phrase(""));
            cell.setBorder(0);
            cell.setColspan(2);
            table.addCell(cell);
            cell = new PdfPCell(new Phrase("Report Total:"));
            cell.setBorder(0);
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            table.addCell(cell);
            cell = new PdfPCell(new Phrase(formatter.format(tot)));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setBackgroundColor(BaseColor.YELLOW);
            table.addCell(cell);
            preface.add(table);

            addEmptyLine(preface, 3);
            preface.setAlignment(Element.ALIGN_CENTER);
            preface.add(new Paragraph(String.format("%60s", "Purchase order Generated :- "+new Date()), subFont));
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
