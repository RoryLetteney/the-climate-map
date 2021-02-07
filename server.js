require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT;

app.set('views', './views');
app.set('view engine', 'ejs');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.render('./index');
});

// Thanks page.
app.post('/donate/thanks', function(req, res) {
  res.render('./thanks', { title: 'Thanks!' });
});

app.post('/donate', async (req, res, next) => {
  // TO ADD: data validation, storing errors in an `errors` variable!
  const name = req.body['cardholder-name'];
  const email = req.body.email;
  const amount = req.body.amount;
  if (true) { // Data is valid!
    try {
      // Create a PI:
      const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // In cents
        currency: 'usd',
        receipt_email: email,
      });
      res.render('./card', {NAME: name, AMOUNT: amount, INTENT_SECRET: paymentIntent.client_secret });
    } catch(err) {
      console.log('Error! ', err.message);
    }
  } else {
    res.render('donate', { title: 'Donate', errors: errors });
  }
});
// app.use(require('./routes/file-upload'));
// app.use(require('./routes/sprints'));

app.listen(port, () => console.log(`Listening on port ${port}`));