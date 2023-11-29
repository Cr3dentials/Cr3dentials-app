

const invoices = [

  // Add more invoice data here
]

const InvoiceList = () => {
  const handlePayClick = (invoiceId) => {
    console.log(`Payment for invoice with ID ${invoiceId} clicked.`)
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>Pay</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr key={invoice.id}>
            <td>{invoice.id}</td>
            <td>{invoice.dueDate}</td>
            <td>{invoice.paymentStatus}</td>
            <td>
              {invoice.paymentStatus === 'unpaid' && (
                <button onClick={() => handlePayClick(invoice.id)}>Pay</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default InvoiceList
