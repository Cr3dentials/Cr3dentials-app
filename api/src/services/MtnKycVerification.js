import axios from "axios";
require('dotenv').config()

const consumerKey = process.env.MTN_CONSUMER_KEY;
const consumerSecret = process.env.MTN_CONSUMER_SECRET;
// services/mtnService.js


//get access to kyc
export const getCustomers = async () => {
  const options = {
    method: 'GET',
    url: 'https://api.mtn.com/v1/kycVerification/customers',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': consumerKey,
      Authorization: consumerSecret,
      transactionId: '',
      targetSystem: '',
      bvns: ''
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};