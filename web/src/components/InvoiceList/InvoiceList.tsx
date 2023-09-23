import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

const invoices = [
  { id: 1, dueDate: '2023-09-30', status: 'unpaid' },
  { id: 2, dueDate: '2023-10-15', status: 'paid' },
  // Add more invoice data here
]

const InvoiceList = () => {
  const handlePayClick = (invoiceId) => {
    // Replace this with your payment logic
    console.log(`Payment for invoice with ID ${invoiceId} clicked.`)
  }

  return (
    <Table variant="striped" colorScheme="teal">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Due Date</Th>
          <Th>Status</Th>
          <Th>Pay</Th> {/* Empty column for Pay button */}
        </Tr>
      </Thead>
      <Tbody>
        {invoices.map((invoice) => (
          <Tr key={invoice.id}>
            <Td>{invoice.id}</Td>
            <Td>{invoice.dueDate}</Td>
            <Td>{invoice.status}</Td>
            <Td>
              {invoice.status === 'unpaid' && (
                <button onClick={() => handlePayClick(invoice.id)}>Pay</button>
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default InvoiceList
