import axios from 'axios';

// Get invoices from backend
export const fetchInvoicesFromAPI = async () => {
  const res = await axios.get('http://localhost:5000/api/invoices');
  return res.data;
};

// Submit selected invoices to backend
export const submitInvoicesToBackend = async (data) => {
  const res = await axios.post('http://localhost:5000/api/invoices/submit', { invoices: data });
  return res.data;
};

// Trigger email notification
export const sendEmailNotification = async (data) => {
  const res = await axios.post('http://localhost:5000/api/email/send', { invoices: data });
  return res.data;
};
