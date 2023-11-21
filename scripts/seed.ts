import { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    const data: Prisma.InvoiceCreateArgs['data'][] = [
      {
        amount: 1000, // Amount in cents (e.g., $10.00)
        dueDate: new Date('2023-10-01'), // Due date of the invoice
        payerEmail: 'customer1@example.com', // Payer's email (optional)
        payerPhone: '123-456-7890', // Payer's phone number
        currency: 'USD', // Currency of the invoice
        lateFee: 100, // Late fee in cents (e.g., $1.00)
        description: 'Invoice for services', // Description of the invoice (optional)
        paymentStatus: 'PaidOnTime', // Payment status (choose from 'PaidOnTime', 'Late', 'Paid', 'Unpaid')
      },
      {
        amount: 1500,
        dueDate: new Date('2023-10-15'),
        payerEmail: 'customer2@example.com',
        payerPhone: '987-654-3210',
        currency: 'EUR',
        lateFee: 0, // No late fee for this invoice
        description: 'Another invoice',
        paymentStatus: 'Unpaid', // Payment status
      },
      // Add more invoices as needed
    ]

    // Insert the seed data into the database
    await db.invoice.createMany({
      data,
    })

    console.log('Seed data inserted successfully.')
  } catch (error) {
    console.warn('Error inserting seed data.')
    console.error(error)
  }
}
