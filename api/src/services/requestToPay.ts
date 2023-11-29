import fetch from 'node-fetch'
require('dotenv').config()

const bearerToken = process.env.BEARER_TOKEN;
const subscriptionKey = process.env.SUBSCRIPTION_KEY;


export const requestToPay = async (invoice) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: bearerToken,
      'X-Reference-Id': 'YOUR_REFERENCE_ID',
      'X-Target-Environment': 'sandbox',
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscriptionKey,
    },
    body: JSON.stringify({
      amount: invoice.amount,
      currency: 'EUR',
      externalId: invoice.id,
      payer: {
        partyIdType: 'MSISDN',
        partyId: '46733123453',
      },
      payerMessage: 'Payment for invoice ' + invoice.id,
      payeeNote: 'Payment for invoice ' + invoice.id,
    }),
  }

  const response = await fetch(
    'https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay',
    requestOptions
  )
  const data = await response.json()

  return data
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
