import React, { useState } from "react";
const url = process.env.REACT_APP_APIURL;

const Edit = ({ expense }) => {
  const [description, setDescription] = useState(expense.description);
  const editAmount = async (id) => {
    try {
      const body = { amount, description };

      await fetch(`${url}/expense/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  const [amount, setAmount] = useState(expense.amount);

  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${expense.id}`}
      >
        Edit
      </button>

      {/* <div className="modal" id={`id${expense.id}`}></div> */}
      <div
        className="modal fade"
        id={`id${expense.id}`}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        onClick={() => {
            setAmount(expense.amount);
            setDescription(expense.description);
          }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Edit Expense
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setAmount(expense.amount);
                  setDescription(expense.description);
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control my-3"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              ></input>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => {
                    setAmount(expense.amount);
                    setDescription(expense.description);
                  }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => editAmount(expense.id)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
