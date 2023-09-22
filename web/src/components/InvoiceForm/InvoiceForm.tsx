import React, { useState } from 'react'

import {
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  Heading,
} from '@chakra-ui/react'

function InvoiceForm() {
  const [selectedOption, setSelectedOption] = useState('Dollar')
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10))
  const [payerEmail, setPayerEmail] = useState('')
  const [payerPhoneNumber, setPayerPhoneNumber] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [lateFee, setLateFee] = useState('')

  const sendInvoice = async () => {
    // Create a JSON object with the invoice data
    const invoiceData = {
      selectedOption,
      dueDate,
      payerEmail,
      payerPhoneNumber,
      description,
      amount,
      lateFee,
    }

    console.log('Invoice Data:', invoiceData)

    // Send the invoice data to your server
    try {
      // Optionally, you can handle the response here (e.g., show a success message).

      // After sending the invoice, you may want to refetch the data from the InvoiceCell
      // to update the list of invoices displayed on the page.
      // Uncomment the following line to refetch the data:
      // revalidate();
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
    <Container maxW="container.lg" p="4">
      <Heading as="h1" textAlign="center" mb="4">
        Create an Invoice
      </Heading>
      <Flex flexWrap="wrap" justifyContent="space-between">
        <FormControl flexBasis="48%">
          <FormLabel htmlFor="input9">Currency</FormLabel>
          <Select
            id="input9"
            name="token"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="Dollar">Dollar</option>
            <option value="CEDI">CEDI</option>
            <option value="Naira">Naira</option>
          </Select>
        </FormControl>
        <FormControl flexBasis="48%">
          <FormLabel htmlFor="input1">Amount</FormLabel>
          <Input
            value={amount}
            onChange={handleAmountChange}
            type="number"
            min="1"
            step="any"
            id="input1"
            placeholder="Enter Amount"
          />
        </FormControl>
      </Flex>
      <Flex flexWrap="wrap" justifyContent="space-between" mt="4">
        <FormControl flexBasis="48%">
          <FormLabel htmlFor="input4">Payers Email</FormLabel>
          <Input
            type="email"
            id="input4"
            value={payerEmail}
            onChange={handlePayerEmailChange}
            placeholder="Payers Email"
          />
        </FormControl>
        <FormControl flexBasis="48%">
          <FormLabel htmlFor="input5">Payers Phone Number</FormLabel>
          <Input
            type="tel"
            id="input5"
            value={payerPhoneNumber}
            onChange={handlePayerPhoneNumberChange}
            placeholder="Payers Phone Number"
          />
        </FormControl>
      </Flex>
      <Flex flexWrap="wrap" justifyContent="space-between" mt="4">
        <FormControl flexBasis="48%">
          <FormLabel htmlFor="input3">Due Date</FormLabel>
          <Input
            type="date"
            id="input3"
            name="dueDate"
            value={dueDate}
            onChange={(e) => handleDueDateChange(e.target.value)}
          />
        </FormControl>
        <FormControl flexBasis="48%">
          <FormLabel htmlFor="input7">Late Fee</FormLabel>
          <Input
            value={lateFee}
            onChange={handleLateFeeChange}
            type="number"
            min="1"
            step="any"
            id="input7"
            placeholder=""
          />
        </FormControl>
      </Flex>
      <FormControl mt="4">
        <FormLabel htmlFor="input6">Description of Service</FormLabel>
        <Textarea
          id="input6"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter a Description"
        />
      </FormControl>
      <Button
        mt="4"
        colorScheme="teal"
        size="lg"
        width="25%"
        onClick={(event) => {
          event.preventDefault()
          sendInvoice()
        }}
      >
        Send
      </Button>
    </Container>
  )
}

export default InvoiceForm
