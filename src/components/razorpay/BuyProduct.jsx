"use client";
import React, { Suspense } from "react";
import Buy from "./Buy";
import { useRouter  } from 'next/navigation';
import Loading from "@/app/loading";


const BuyProduct = () => {

  const router = useRouter()


  const makePayment = async ({ productId = null }) => {
    // "use server"
    const key = process.env.RAZORPAY_API_KEY;
    console.log(key);
    // Make API call to the serverless API
    const data = await fetch("http://localhost:3005/api/razorpay");
    const { order } = await data.json();
    console.log(order.id);
    const options = {
      key: key,
      name: "mmantratech",
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      description: "Understanding RazorPay Integration",
      // image: logoBase64,
      handler: async function (response) {
        // if (response.length==0) return <Loading/>;
        console.log(response);

        const data = await  fetch("http://localhost:3005/api/paymentverify", {
          method: "POST",
          // headers: {
          //   // Authorization: 'YOUR_AUTH_HERE'
          // },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });



        const res = await data.json();

        console.log("response verify==",res)

        if(res?.message=="success")
        {


          console.log("redirected.......")
          router.push("/paymentsuccess?paymentid="+response.razorpay_payment_id)

        }

        // Validate payment at server - using webhooks is a better idea.
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: "mmantratech",
        email: "mmantratech@gmail.com",
        contact: "000000000",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      alert("Payment failed. Please try again. Contact support for help");
    });
  };

  return (
    <>
    <Suspense fallback={<Loading/>}>
      <Buy makePayment={makePayment} />
      </Suspense>
    </>
  );
};

export default BuyProduct;
