// api/src/functions/pay.js
import fetch from 'node-fetch'

export const handler = async (event) => {
  const invoice = JSON.parse(event.body)

  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImNiYWE4Y2U3LWMwNDQtNDY4OC1iYzEwLWIzOGI2NTUyNGI1YyIsImV4cGlyZXMiOiIyMDIzLTExLTI5VDAyOjE2OjMyLjU4NSIsInNlc3Npb25JZCI6IjEwZGNjZTgzLTFmNWMtNDhiYS1hZjk3LTMyNzI1MjY1MzZhOCJ9.IXbqql9xGgtYi2oDOFd0oAQjYC65FzyKHX73fdMVIhnNlWZ54Sx_x7IA5i77SHtPxW4Z3gBXv-EZt_6CAgY0-e79EaXIKaHSeY8-kXlUf65YBj8kVWdG7vsyfgaah9nT9XZxOmxKCo0Y7yJvcF8x3kTPfnXi9KsQNdaY_TBF5IIB8cU2Xu0EVs1gRe6kh6cPMRpoA94uOHX8KPqVns1WBEsSA0sdmBEF0Djqf4vxaqsPqyhQnk9ZbRsKtMiXd996IQINFBxPN1V2Uq1RciciO7iDxPL39xsm3lT0GdmwSqPMXNZG1iSjHejLyLHqQyOm-l6GafSL4WTPuda8akT3JA',
      'X-Reference-Id': 'cbaa8ce7-c044-4688-bc10-b38b65524b5c',
      'X-Target-Environment': 'sandbox',
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': '218c082a315c40289ec23eb56d34e545',
    },
    body: JSON.stringify({
      amount: invoice.amount,
      currency: 'EUR', // replace with the actual currency
      externalId: invoice.id,
      payer: {
        partyIdType: 'MSISDN',
        partyId: '46733123453',
      },
      payerMessage: 'Payment for invoice ' + invoice.id,
      payeeNote: 'Payment for invoice ' + invoice.id,
    }),
  }

  try {
    const response = await fetch(
      'https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay',
      requestOptions
    )
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Access-Control-Allow-Origin': '*', // This is the important line
        'Content-Type': 'application/json',
      },
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
      headers: {
        'Access-Control-Allow-Origin': '*', // This is the important line
        'Content-Type': 'application/json',
      },
    }
  }
}
