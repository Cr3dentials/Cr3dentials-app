import axios from 'axios'
//import fetch from 'node-fetch'
require('dotenv').config()

// const bearerToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImY4MjZlMzYxLTQ4MGYtNDM4YS1hZGVlLTAwMDc4MjQxNTViMiIsImV4cGlyZXMiOiIyMDIzLTEyLTA3VDE2OjE3OjA2LjI3MSIsInNlc3Npb25JZCI6Ijk2Y2EyZGMyLWNmMzktNDUxNS04MWFiLTNjN2Q4YzIzNzgzOCJ9.LsPV86Zfrhro5fIPeKq6PznMW6-LhcWKqMPcuKMBCEeQWakBvhx594o4WiL_foF6XH3xzAjpZivJXC-9J7nW2vxaKzqe52IF3N6LnFOYVk9eORSARRrYOIcKNqNjBu4TWraRg40g48wNM-X9W_dWeINoGXkOVYjUcXEeb3-r8CdqXgKMnejWtUYxKd_RlQg6IWh5V59E3DZc0R4IBwqKXPCiELiUCDqXYIYZTI7JGabLLMTeRADrQ3KoslQPFu3SG_3W_IKSVTZQulHTtCldt6bF7WnFblXtpr8sRwnPi8GbA_C3s3Y4BSGEgVrFlQNSyxevHIdUKYmW7khM4XR2nQ'
// // const bearerToken = process.env.BEARER_TOKEN
// // const subscriptionKey = process.env.SUBSCRIPTION_KEY
const subscriptionKey = 'e7b1ece232fc455daed5bfea9a07457c'

const bearerToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjI4ZTA4NzQ2LTZkNTEtNDJmNC04YzRiLWM4ZjA5ZmE3YTQ0NCIsImV4cGlyZXMiOiIyMDIzLTEyLTA4VDIxOjQ1OjQzLjE3MCIsInNlc3Npb25JZCI6IjA0MzM0NzZkLTA2MGYtNDZmNS1hMzMzLTYxNWIwODU1OGRmNiJ9.SbEAj9AH71iYfsdtMVaqIy4ZwRcLrUEIlTwL1JTIj2w5cJGkFpETAHeXZhjZS7vUPKXJFYJcdQoD3nNxiqCZ5MtiI1lgidQ0JiDFADIRwbUcL3uap46q7KZt0A_XdNdPI0se7UB5WJ-IUqI15UY34IDKu3xjXwBcdj0T1P45cWnSbqqLXJXrV2qmcpeJj6PCiXdFWY9rH80wS89379Fl_ECZOHslAXOUwrcJ1vldDAvIH0L3DynAvsbvGBS69MtAEkkSt2lCI2j4Xw-iYlSyV_hzgZgE5sTmo3RC1e711EK2f-mo_YLTjkoTik4sZWzH3RvBX2X6AnZMswboPeL-Kg'

const xReferenceId = '940f6c78-af13-4ae7-91c9-ff6494c87e77'

export const requestToPay = async (invoice) => {
  try {
    const body = JSON.stringify({
      amount: `${invoice.input.amount}`,
      currency: `${invoice.input.currency}`,
      externalId: `${invoice.input.id}`,
      payer: {
        partyIdType: 'MSISDN',
        partyId: '46733123453',
      },
      payerMessage: 'Payment for order',
      payeeNote: 'Payment for order',
    })

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay',
      headers: {
        'X-Reference-Id': xReferenceId,
        'X-Target-Environment': 'sandbox',
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
      data: body,
    }
    console.log(body)
    const response = await axios.request(config)

    console.log('ALLLL OKAY')
    const data = response.data

    console.log('Parsed response body:', data, 'DONEEEEEEEEEEEE')
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
