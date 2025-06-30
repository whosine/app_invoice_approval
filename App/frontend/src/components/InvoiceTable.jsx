// import '../styles/main.css';

// export default function InvoiceTable({ data }) {
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Invoice #</th>
//           <th>Vendor</th>
//           <th>Due Date</th>
//           <th>Amount</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map(inv => (
//           <tr key={inv.InvoiceNumber}>
//             <td>{inv.InvoiceNumber}</td>
//             <td>{inv.VendorName}</td>
//             <td>{inv.DueDate}</td>
//             <td>{inv.Amount}</td>
//             <td>
//               <select>
//                 <option>Pay Today</option>
//                 <option>Defer</option>
//               </select>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
