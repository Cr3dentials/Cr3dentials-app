import { useState } from 'react'

import { gql, useMutation, useQuery } from '@apollo/client'
import axios from 'axios'

import Modal from 'src/components/Modal'

const ALL_INVOICES_QUERY = gql`
  query AllInvoices {
    invoices {
      id
      dueDate
      payerEmail
      payerPhone
      currency
      lateFee
      description
      status
      createdAt
      amount
    }
  }
`

const DELETE_INVOICE_MUTATION = gql`
  mutation DeleteInvoice($id: Int!) {
    deleteInvoice(id: $id) {
      id
    }
  }
`

const UPDATE_INVOICE_MUTATION = gql`
  mutation UpdateInvoice($id: Int!, $input: UpdateInvoiceInput!) {
    updateInvoice(id: $id, input: $input) {
      id
      status
    }
  }
`

const PayerTable = () => {
  const { data, loading, error } = useQuery(ALL_INVOICES_QUERY)
  const [deleteInvoice] = useMutation(DELETE_INVOICE_MUTATION, {
    update(cache, { data: { deleteInvoice } }) {
      const existingInvoices = cache.readQuery({
        query: ALL_INVOICES_QUERY,
      }) as { invoices: any[] }
      const newInvoices = existingInvoices.invoices.filter(
        (invoice) => invoice.id !== deleteInvoice.id
      )
      cache.writeQuery({
        query: ALL_INVOICES_QUERY,
        data: { invoices: newInvoices },
      })
    },
  })
  const [updateInvoice] = useMutation(UPDATE_INVOICE_MUTATION)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [modalType, setModalType] = useState(null)

  const handleSign = (invoice) => {
    setSelectedInvoice(invoice)
    setModalType('sign')
  }

  const handleReject = (invoice) => {
    setSelectedInvoice(invoice)
    setModalType('reject')
  }

  const handleConfirmSign = async () => {
    try {
      await updateInvoice({
        variables: {
          id: selectedInvoice.id,
          input: {
            status: 'Unpaid',
          },
        },
      })
      setSelectedInvoice(null)
      setModalType(null)
    } catch (error) {
      console.error('Error updating invoice:', error)
    }
  }

  const handleConfirmReject = async () => {
    try {
      await deleteInvoice({ variables: { id: selectedInvoice.id } })
      setSelectedInvoice(null)
      setModalType(null)
    } catch (error) {
      console.error('Error deleting invoice:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    console.error(error)
    return <div>Error loading invoices</div>
  }

  const handlePay = async (invoice) => {
    try {
      const response = await axios.post('http://localhost:8917/pay', invoice)
      const data = response.data

      if (response.status === 200) {
        console.log('Payment successful:', data)
        // Update the invoice status in your state and/or database here
      } else {
        console.error('Payment failed:', data)
        // Handle the error here
      }
    } catch (error) {
      console.error('An error occurred while making the payment:', error)
      // Handle the error here
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.dueDate}</td>
              <td>{invoice.status}</td>
              <td>
                {invoice.status === 'Active' ? (
                  <button onClick={() => handlePay(invoice)}>Pay</button>
                ) : (
                  <>
                    <button onClick={() => handleSign(invoice)}>Sign</button>
                    <button onClick={() => handleReject(invoice)}>
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedInvoice && (
        <Modal
          invoice={selectedInvoice}
          type={modalType}
          onConfirmSign={handleConfirmSign}
          onConfirmReject={handleConfirmReject}
        />
      )}
    </div>
  )
}

export default PayerTable
