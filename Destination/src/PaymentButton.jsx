import React from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:8081";

function PaymentButton({ amount }) {
  const handlePayment = async () => {
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/payment/create_order`, {
        amount: amount,
      });

      const options = {
        key: "rzp_test_U6LXs2MWCEfepJ", 
        amount: data.amount,
        currency: data.currency,
        name: "Destination Booking",
        description: "Experience Booking Payment",
        order_id: data.orderId,
        handler: async function (response) {
          try {
            // 2. Verify payment
            const verifyRes = await axios.post(`${BACKEND_URL}/api/payment/verify_payment`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            alert("✅ Payment Successful: " + verifyRes.data);
          } catch (err) {
            console.error(err);
            alert("❌ Payment Verification Failed");
          }
        },
        prefill: {
          name: "Vishal", // you can fetch logged in user’s name
          email: "user@example.com",
          contact: "22552525212",
        },
        theme: {
          color: "#13C0A7",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiation failed:", err);
      alert("Something went wrong in creating the order");
    }
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        background: "#13c0a7",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      Pay ₹{amount}
    </button>
  );
}

export default PaymentButton;
