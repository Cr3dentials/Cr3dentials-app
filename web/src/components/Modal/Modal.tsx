import React from 'react'

const Modal = ({ invoice, type, onConfirmSign, onConfirmReject }) => {
  return (
    <div>
      <h2>Invoice Details</h2>
      <p>ID: {invoice.id}</p>
      <p>Amount: {invoice.amount}</p>
      <p>Due Date: {invoice.dueDate}</p>
      <p>Payer Email: {invoice.payerEmail}</p>
      <p>Payer Phone: {invoice.payerPhone}</p>
      <p>Currency: {invoice.currency}</p>
      <p>Late Fee: {invoice.lateFee}</p>
      <p>Description: {invoice.description}</p>
      <p>Status: {invoice.status}</p>
      {type === 'sign' && <button onClick={onConfirmSign}>Confirm Sign</button>}
      {type === 'reject' && (
        <button onClick={onConfirmReject}>Confirm Reject</button>
      )}
    </div>
  )
}

export default Modal
