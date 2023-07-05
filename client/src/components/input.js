import React, { useState } from "react";
const url = process.env.BASE_URL;


const Input = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { amount, description };
      const response = await fetch(`${url}/expense`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
        <h1 className="text-center my-5">TAKA KOI</h1>
      <form className="d-flex my-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="Amount"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </>
  );
};

export default Input;
