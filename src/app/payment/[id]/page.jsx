"use client"

import axios from "axios";
import Script from "next/script";
import { useEffect } from "react";
// import { useRouter } from "next/router";

const Payment = ({params}) => {
//   const router = useRouter();
  
  const makePayment = async () => {
    const val = {
      id: params.id,
    };
    const { data } = await axios.post(`/api/razorpay`, val);

    const options = {
      key: process.env.RAZORPAY_KEY,
      name: "Nitesh",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thank You !",
      handler: function (response) {},
      prefill: {
        name: "Nitesh",
        email: "nkumar35101@gmail.com",
        contact: 7631124942,
      },
    };

    const paymentObj = new window.Razorpay(options);
    paymentObj.open();
  };

  useEffect(() => {
    makePayment();
  }, []);

  return (
    <>
      <Script src="http://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
};

export default Payment;