import express from 'express';
import paymentRoutes from './routes/paymentRoutes';

const app = express();

// Use the paymentRoutes for all requests starting with '/api'
app.use('/api', paymentRoutes);

app.listen(8917, () => {
  console.log('Server is running on port 8917');
});