
// References:https://github.com/harshiiiz/donationreactwebsite
import React,{useState} from 'react';

import StripeCheckout from "react-stripe-checkout";
import  './checkout.css';

// import Background from '../../public/linkedin.png'

const checkoutpage={
//   backgroundImage: `url(${Background})`,
//  // backgroundPosition: 'center',
//     backgroundSize: '100%',
   // backgroundRepeat: 'no-repeat',
   width:'50%',
   textAlign:"center",
   height:'100%',
   position:'absolute',
   display:'inline-block'
   
  } 
  
 function Checkout() {
    
      var [number, setNumber] = useState('')

      const reginput = {
        
        border: "2px solid purple",
        borderRadius: "2px",
        textAlign:"center",
        display: "inline",
        fontFamily: "inherit",
        fontSize: "14px",
        padding: "10px" ,
        width: "75%",
        height:"30px",
        marginLeft: "0px",
        marginTop:"25px",
         
      }
      const numberHandle = (event) => {
        setNumber(event.target.value);
      }; 
      const makePayment = token => {
        const body = {
          token,
          number
        };
        const headers = {
          "Content-Type": "application/json"
        };
    
        return fetch(`http://localhost:8282/checkout`, {
          method: "POST",
          headers,
          body: JSON.stringify(body)
        })
          .then(response => {
            console.log("RESPONSE ", response);
            const { status } = response;
            console.log("STATUS ", status);
          })
          .catch(error => console.log(error));
      };
  return(
      
    

<>
<div style={checkoutpage}>
<label>Enter amount to donate</label>
<input onChange={numberHandle} style={reginput} type="number" placeholder="Enter Number" value={number} />
   
    <StripeCheckout
    stripeKey='pk_test_51KuLapAfg88deh2t8QujBOHlJRqtmI2CTlvuIiCiCg0dzmmqbEZqFMQ7EOyHl3GwbUdCDlSx6vtLdX5yYHLk07Ex00xgp0oAMq'
    token={makePayment}
    name="Donate"
    amount={number * 100}>
   <button  className='btn-large'>
      Donate{number}$
    </button>
  </StripeCheckout>
  </div>
  </>
  );
  };

  export default Checkout;
  