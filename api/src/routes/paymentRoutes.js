// api/src/routes/paymentRoutes.js
import { Router } from 'express';
import { getPaymentHistory, createPaymentAgreement, getTransactionStatus, createPaymentLink } from '../services/MtnPayments';

const router = Router();

router.get('/payment-history', async (req, res) => {
  try {
    const data = await getPaymentHistory();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post('/payment-agreement', async (req, res) => {
  try {
    const data = await createPaymentAgreement(req.body);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get('/transaction-status', async (req, res) => {
  try {
    const data = await getTransactionStatus();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post('/payment-link', async (req, res) => {
  try {
    const data = await createPaymentLink(req.body);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;