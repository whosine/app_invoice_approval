const express = require('express');
const router = express.Router();

const dummyInvoices = [
 { InvoiceNumber: 'INV-001', VendorName: 'Vendor A', DueDate: '2025-07-10', Amount: '₹12,500', Currency: 'INR', InvoiceType: 'Regular', Status: 'Pending' },
  { InvoiceNumber: 'INV-002', VendorName: 'Vendor B', DueDate: '2025-07-15', Amount: '₹8,800', Currency: 'INR', InvoiceType: 'Advance', Status: 'Pending' },
  { InvoiceNumber: 'INV-003', VendorName: 'Vendor C', DueDate: '2025-07-20', Amount: '₹19,300', Currency: 'INR', InvoiceType: 'Regular', Status: 'Pending' },
  { InvoiceNumber: 'INV-004', VendorName: 'Vendor D', DueDate: '2025-07-25', Amount: '₹7,450', Currency: 'INR', InvoiceType: 'Credit Note', Status: 'Pending' },
  { InvoiceNumber: 'INV-005', VendorName: 'Vendor E', DueDate: '2025-07-30', Amount: '₹21,000', Currency: 'INR', InvoiceType: 'Advance', Status: 'Pending' },
  { InvoiceNumber: 'INV-006', VendorName: 'Vendor F', DueDate: '2025-08-05', Amount: '₹11,200', Currency: 'INR', InvoiceType: 'Regular', Status: 'Pending' },
  { InvoiceNumber: 'INV-007', VendorName: 'Vendor G', DueDate: '2025-08-10', Amount: '₹9,750', Currency: 'INR', InvoiceType: 'Advance', Status: 'Pending' },
  { InvoiceNumber: 'INV-008', VendorName: 'Vendor H', DueDate: '2025-08-12', Amount: '₹15,000', Currency: 'INR', InvoiceType: 'Regular', Status: 'Pending' },
  { InvoiceNumber: 'INV-009', VendorName: 'Vendor I', DueDate: '2025-08-15', Amount: '₹18,950', Currency: 'INR', InvoiceType: 'Credit Note', Status: 'Pending' },
  { InvoiceNumber: 'INV-010', VendorName: 'Vendor J', DueDate: '2025-08-18', Amount: '₹6,500', Currency: 'INR', InvoiceType: 'Regular', Status: 'Pending' },
  { InvoiceNumber: 'INV-011', VendorName: 'Vendor K', DueDate: '2025-08-20', Amount: '₹13,700', Currency: 'INR', InvoiceType: 'Advance', Status: 'Pending' },
  { InvoiceNumber: 'INV-012', VendorName: 'Vendor L', DueDate: '2025-08-22', Amount: '₹14,200', Currency: 'INR', InvoiceType: 'Regular', Status: 'Pending' },
  { InvoiceNumber: 'INV-013', VendorName: 'Vendor M', DueDate: '2025-08-24', Amount: '₹16,800', Currency: 'INR', InvoiceType: 'Regular', Status: 'Pending' },
  { InvoiceNumber: 'INV-014', VendorName: 'Vendor N', DueDate: '2025-08-27', Amount: '₹5,600', Currency: 'INR', InvoiceType: 'Credit Note', Status: 'Pending' },
  { InvoiceNumber: 'INV-015', VendorName: 'Vendor O', DueDate: '2025-08-29', Amount: '₹12,900', Currency: 'INR', InvoiceType: 'Advance', Status: 'Pending' },
  { InvoiceNumber: 'INV-016', VendorName: 'Vendor P', DueDate: '2025-09-01', Amount: '₹20,000', Currency: 'INR', InvoiceType: 'Regular', Status: 'Pending' },
  { InvoiceNumber: 'INV-017', VendorName: 'Vendor Q', DueDate: '2025-09-03', Amount: '₹11,600', Currency: 'INR', InvoiceType: 'Advance', Status: 'Pending' },
  { InvoiceNumber: 'INV-018', VendorName: 'Vendor R', DueDate: '2025-09-05', Amount: '₹7,000', Currency: 'INR', InvoiceType: 'Regular', Status: 'Pending' },
  { InvoiceNumber: 'INV-019', VendorName: 'Vendor S', DueDate: '2025-09-07', Amount: '₹18,300', Currency: 'INR', InvoiceType: 'Credit Note', Status: 'Pending' },
  { InvoiceNumber: 'INV-020', VendorName: 'Vendor T', DueDate: '2025-09-10', Amount: '₹9,200', Currency: 'INR', InvoiceType: 'Regular', Status: 'Pending' },
  { InvoiceNumber: 'INV-021', VendorName: 'Vendor U', DueDate: '2025-09-12', Amount: '₹15,600', Currency: 'INR', InvoiceType: 'Advance', Status: 'Pending' },
  { InvoiceNumber: 'INV-022', VendorName: 'Vendor V', DueDate: '2025-09-15', Amount: '₹17,100', Currency: 'INR', InvoiceType: 'Regular', Status: 'Pending' },
  { InvoiceNumber: 'INV-023', VendorName: 'Vendor W', DueDate: '2025-09-17', Amount: '₹6,300', Currency: 'INR', InvoiceType: 'Credit Note', Status: 'Pending' },
  { InvoiceNumber: 'INV-024', VendorName: 'Vendor X', DueDate: '2025-09-19', Amount: '₹8,900', Currency: 'INR', InvoiceType: 'Regular', Status: 'Pending' },
  { InvoiceNumber: 'INV-025', VendorName: 'Vendor Y', DueDate: '2025-09-21', Amount: '₹10,500', Currency: 'INR', InvoiceType: 'Advance', Status: 'Pending' },
  { InvoiceNumber: 'INV-026', VendorName: 'Vendor Z', DueDate: '2025-09-23', Amount: '₹19,900', Currency: 'INR', InvoiceType: 'Regular', Status: 'Pending' },
  { InvoiceNumber: 'INV-027', VendorName: 'Vendor AA', DueDate: '2025-09-25', Amount: '₹14,800', Currency: 'INR', InvoiceType: 'Credit Note', Status: 'Pending' },
];

let submittedInvoices = [];

router.get('/', (req, res) => {
  res.json(dummyInvoices);
});

router.post('/submit', (req, res) => {
  const { invoices } = req.body;

  if (!invoices || !Array.isArray(invoices)) {
    return res.status(400).json({ success: false, message: "Invalid data" });
  }

  submittedInvoices = [...submittedInvoices, ...invoices];
  console.log("📥 Submitted Invoices Received:", invoices);
  res.json({ success: true, message: 'Invoices stored successfully' });
});

router.get('/submitted', (req, res) => {
  res.json(submittedInvoices);
});

module.exports = router;
