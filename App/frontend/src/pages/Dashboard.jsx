import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchInvoicesFromAPI, submitInvoicesToBackend, sendEmailNotification } from '../services/dummyApi';
import '../styles/main.css';

export default function Dashboard() {
  const [invoices, setInvoices] = useState([]);
  const [selected, setSelected] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      fetchInvoicesFromAPI().then(fetched => {
        setInvoices(fetched);
        const initialSelected = {};
        fetched.forEach(inv => {
          initialSelected[inv.InvoiceNumber] = {
            checked: false,
            action: 'Pay Today',
            comment: '',
            date: new Date().toISOString().split('T')[0]
          };
        });
        setSelected(initialSelected);
      });
    }
  }, []);

  const handleCheck = (invoiceNumber) => {
    setSelected(prev => ({
      ...prev,
      [invoiceNumber]: {
        ...prev[invoiceNumber],
        checked: !prev[invoiceNumber].checked
      }
    }));
  };

  const handleSelectAll = (value) => {
    const updated = {};
    for (const key in selected) {
      updated[key] = { ...selected[key], checked: value };
    }
    setSelected(updated);
  };

  const handleChange = (invoiceNumber, field, value) => {
    setSelected(prev => ({
      ...prev,
      [invoiceNumber]: {
        ...prev[invoiceNumber],
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    const result = [];

    for (const key in selected) {
      const row = selected[key];
      if (row.checked) {
        const record = {
          InvoiceNumber: key,
          Action: row.action === 'Pay Today' ? 'PayToday' : 'Deferred',
        };
        if (row.action === 'Defer Payment') {
          record.DeferredDate = row.date;
          record.Comment = row.comment;
        }
        result.push(record);
      }
    }

    if (result.length === 0) {
      alert("Please select at least one invoice.");
      return;
    }

    try {
      await submitInvoicesToBackend(result);
      await sendEmailNotification(result);
      alert("✅ Submitted and email sent!");
    } catch (err) {
      console.error("Submission error:", err);
      alert("❌ Error submitting or emailing data.");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Invoice Approval Dashboard</h2>
        <div className="button-group">
          <button onClick={() => handleSelectAll(true)}>Select All</button>
          <button onClick={() => handleSelectAll(false)}>Unselect All</button>
        </div>
      </div>

      <div className="table-area">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Invoice #</th>
                <th>Vendor</th>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Action</th>
                <th>Deferred Date</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => {
                const sel = selected[inv.InvoiceNumber];
                return (
                  <tr key={inv.InvoiceNumber}>
                    <td><input type="checkbox" checked={sel?.checked || false} onChange={() => handleCheck(inv.InvoiceNumber)} /></td>
                    <td>{inv.InvoiceNumber}</td>
                    <td>{inv.VendorName}</td>
                    <td>{inv.DueDate}</td>
                    <td>{inv.Amount}</td>
                    <td>
                      <select value={sel?.action} onChange={(e) => handleChange(inv.InvoiceNumber, 'action', e.target.value)}>
                        <option>Pay Today</option>
                        <option>Defer Payment</option>
                      </select>
                    </td>
                    <td>
                      <input type="date" value={sel?.date} disabled={sel?.action !== 'Defer Payment'} onChange={(e) => handleChange(inv.InvoiceNumber, 'date', e.target.value)} />
                    </td>
                    <td>
                      <input type="text" placeholder="Enter comment" value={sel?.comment} disabled={sel?.action !== 'Defer Payment'} onChange={(e) => handleChange(inv.InvoiceNumber, 'comment', e.target.value)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-footer">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
