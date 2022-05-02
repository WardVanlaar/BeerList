const cors = require("cors");
const express = require("express");


const stripe = require("stripe")("sk_test_51KuLapAfg88deh2teyUL6f1l22pGMNUpQHAvx6qYQkCSnOhfs1RPA8G5IrLUUtnqYTbUxxyd7Sr2t5AlzZrq1tv500Bk0z6LfY");
//const stripe = Stripe('pk_test_51KuLapAfg88deh2t8QujBOHlJRqtmI2CTlvuIiCiCg0dzmmqbEZqFMQ7EOyHl3GwbUdCDlSx6vtLdX5yYHLk07Ex00xgp0oAMq');
const {v4: uuidv4}= require("uuid");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("IT WORKS ");
});


app.post("/checkout", (req, res) => {
  const { number, token } = req.body;
  console.log("AMOUNT ", number);

  const idempontencyKey = uuidv4();

  
 stripe.checkout.sessions.create({
    success_url: 'http://localhost:3000/success',
    cancel_url: 'https://localhost:3000/cancel',
    payment_method_types: ['card'],
    mode:'payment',
  
  })

  return stripe.customers
    .create({
      email: token.email,
      source: token.id
    })
    .then(customer => {
      stripe.charges.create(
        {
          amount: number * 100,
          currency: "inr",
          customer: customer.id,
          receipt_email: token.email,
          
        },
        { idempontencyKey }
      );
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err));
    
});

app.listen(8282, () => console.log("LISTENING AT PORT 8282"));


 

