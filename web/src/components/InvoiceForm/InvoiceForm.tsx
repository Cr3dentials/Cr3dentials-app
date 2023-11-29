import React, { useState } from 'react'

import { gql, useMutation } from '@apollo/client'


export const CREATE_INVOICE_MUTATION = gql`
  mutation CreateInvoiceMutation($input: CreateInvoiceInput!) {
    createInvoice(input: $input) {
      id
    }
  }
`

function InvoiceForm({ onSave }) {
  const [selectedOption, setSelectedOption] = useState('Dollar')
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10))
  const [payerEmail, setPayerEmail] = useState('')
  const [payerPhoneNumber, setPayerPhoneNumber] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [lateFee, setLateFee] = useState('')
  const [createInvoice] = useMutation(CREATE_INVOICE_MUTATION)

  const sendInvoice = async () => {
    // Create a JSON object with the invoice data
    const invoiceData = {
      selectedOption,
      dueDate,
      payerEmail,
      payerPhoneNumber,
      description,
      amount: parseFloat(amount),
      lateFee: parseFloat(lateFee),
      paymentStatus: 'UNPAID',
    }

    console.log('Invoice Data:', invoiceData)

    // Send the invoice data to your server
    try {
      const { data } = await createInvoice({
        variables: { input: invoiceData },
      })

      console.log('Data from Mutation:', data)
      // Call the onSave function with the created invoice's id
      onSave(data.createInvoice.id)
    } catch (error) {
      console.error('Error sending invoice:', error)
      // Handle the error (e.g., display an error message to the user).
    }
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value)
  }

  const handleLateFeeChange = (event) => {
    setLateFee(event.target.value)
  }

  const handleDueDateChange = (timestamp) => {
    setDueDate(timestamp)
  }

  const handlePayerEmailChange = (event) => {
    setPayerEmail(event.target.value)
  }

  const handlePayerPhoneNumberChange = (event) => {
    setPayerPhoneNumber(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  return (
    <div>
      <h1>Create an Invoice</h1>
      <div>
        <label htmlFor="input9">Currency</label>
        <select
          id="input9"
          name="token"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="Dollar">Dollar</option>
          <option value="CEDI">CEDI</option>
          <option value="Naira">Naira</option>
        </select>
        <label htmlFor="input1">Amount</label>
        <input
          value={amount}
          onChange={handleAmountChange}
          type="number"
          min="1"
          step="any"
          id="input1"
          placeholder="Enter Amount"
        />
      </div>
      <div>
        <label htmlFor="input4">Payers Email</label>
        <input
          type="email"
          id="input4"
          value={payerEmail}
          onChange={handlePayerEmailChange}
          placeholder="Payers Email"
        />
        <label htmlFor="input5">Payers Phone Number</label>
        <input
          type="tel"
          id="input5"
          value={payerPhoneNumber}
          onChange={handlePayerPhoneNumberChange}
          placeholder="Payers Phone Number"
        />
      </div>
      <div>
        <label htmlFor="input3">Due Date</label>
        <input
          type="date"
          id="input3"
          name="dueDate"
          value={dueDate}
          onChange={(e) => handleDueDateChange(e.target.value)}
        />
        <label htmlFor="input7">Late Fee</label>
        <input
          value={lateFee}
          onChange={handleLateFeeChange}
          type="number"
          min="1"
          step="any"
          id="input7"
          placeholder=""
        />
      </div>
      <div>
        <label htmlFor="input6">Description of Service</label>
        <textarea
          id="input6"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter a Description"
        />
      </div>
      <button
        onClick={(event) => {
          event.preventDefault()
          sendInvoice()
        }}
      >
        Send
      </button>
    </div>
  )
}

export default InvoiceForm

