import fetch from 'node-fetch'
require('dotenv').config()

const bearerToken = process.env.BEARER_TOKEN
const subscriptionKey = process.env.SUBSCRIPTION_KEY

export const requestToPay = async (invoice) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + bearerToken,
        'X-Reference-Id': 'f2639237-b01c-4c5e-8398-a48ffc1a35b1',
        'X-Target-Environment': 'sandbox',
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      },
      body: JSON.stringify({
        amount: String(invoice.amount), // convert amount to string        currency: 'EUR',
        externalId: String(invoice.id), // convert id to string
        payer: {
          partyIdType: 'MSISDN',
          partyId: '46733123453',
        },
        payerMessage: 'Payment for invoice ',
        payeeNote: 'Payment for invoice ',
      }),
    }
    console.log('Request headers:', requestOptions.headers)
    const response = await fetch(
      'https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay',
      requestOptions
    )
    console.log('Response status:', response.status)
    console.log('Response status text:', response.statusText)
    console.log('Raw response:', response)

    const responseBody = await response.text()
    console.log('Raw response body:', responseBody)

    // Then try to parse it as JSON
    const data = JSON.parse(responseBody)
    console.log('Parsed response body:', data)

    return data
  } catch (error) {
    console.error('Error during fetch:', error)
    return {
      status: 'error',
      message: 'An error occurred during the fetch request.',
      transactionStatus: 'failed',
    }
  }
}
// import axios from 'axios'

// const consumerKey = process.env.MTN_CONSUMER_KEY
// const consumerSecret = process.env.MTN_CONSUMER_SECRET

// // list of payments made on reference or by customer ID
// export const getPaymentHistory = async () => {
//   const options = {
//     method: 'GET',
//     url: 'https://api.mtn.com/v1/payments/id/history',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-Authorization': consumerKey,
//       transactionId: '1',
//       Authorization: consumerSecret,
//     },
//   }

//   try {
//     const response = await axios.request(options)
//     return response.data
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }

// // consumer generates payment agreement (promise to pay)
// export const createPaymentAgreement = async (data) => {
//   const options = {
//     method: 'POST',
//     url: 'https://api.mtn.com/v1/payments/payment-agreement',
//     headers: {
//       'Content-Type': 'application/json',
//       transactionId: '',
//       'X-Authorization': consumerKey,
//       Authorization: consumerSecret,
//     },
//     data: data,
//   }

//   try {
//     const response = await axios.request(options)
//     return response.data
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }

// //Status of Payment transaction
// export const getTransactionStatus = async () => {
//   const options = {
//     method: 'GET',
//     url: 'https://api.mtn.com/v1/payments/correlatorId/transactionStatus',
//     headers: {
//       'Content-Type': 'application/json',
//       transactionId: '',
//       'X-Authorization': consumerKey,
//       Authorization: consumerSecret,
//     },
//   }

//   try {
//     const response = await axios.request(options)
//     return response.data
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }

// // generate payment link for account payment
// export const createPaymentLink = async (data) => {
//   const options = {
//     method: 'POST',
//     url: 'https://api.mtn.com/v1/payments/payment-link',
//     headers: {
//       'Content-Type': 'application/json',
//       transactionId: '',
//       'X-Authorization': consumerKey,
//       Authorization: consumerSecret,
//     },
//     data: data,
//   }

//   try {
//     const response = await axios.request(options)
//     return response.data
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }
