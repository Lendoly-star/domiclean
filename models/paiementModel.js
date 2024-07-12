const bcrypt = require('bcrypt');
const { sqlConnection } = require('../config/db');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// var charge = await stripe.charges.retrieve(
//     'ch_3LiiC52eZvKYlo2C1da66ZSQ',
//     {
//       apiKey: 'sk_test_51PSwtbIY1efflZolJGEo9FEzTHCuZcKM7REBGnCJXKTulaSWn0UeL8iGEEK9C5E0uvDm1B4xIhtKybQ9T1jPeSDx00gTbtFWr6'
//     }
//   );

// stripe.charges.retrieve('ch_3LmjSR2eZvKYlo2C1cPZxlbL', {
//     stripeAccount: 'acct_1032D82eZvKYlo2C'
//   });

exports.paiementCard = async (req, res) => {
  try {
    const { token, amount, currency } = req.body;
    const charge = await stripe.charges.create({
      amount,
      currency,
      source: token,
      description: 'Test charge'
    });

    res.status(200).json({ success: true, charge });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}