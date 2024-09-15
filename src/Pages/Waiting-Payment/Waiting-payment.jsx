import React from "react";
import "./Waiting-payment.css";

function WaitingPayment() {
  const data = [
    { price: 25, description: "In tree cutting" },
    { price: 25, description: "In tree cutting" },
    { price: 25, description: "In tree cutting" },
    { price: 25, description: "In tree cutting" },
    { price: 25, description: "In tree cutting" }
  ];

  const total = data.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="container">
      <div className="card-container">
        {data.map((item, index) => (
          <div className="card" key={index}>
            <h2>${item.price}</h2>
            <a href="#" className="link">
              Link
            </a>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <h2 className="total">Total: ${total}</h2>
    </div>
  );
}

export default WaitingPayment;
