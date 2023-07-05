import React, { useState, useEffect } from "react";
import Edit from "./edit";
const url = process.env.REACT_APP_APIURL;


const List = () => {
  const [expenses, setExpenses] = useState([]);

  //delete function
  async function deleteExpense(id) {
    try {
      const response = await fetch(`${url}/expense/${id}`, {
        method: "DELETE",
      });

      setExpenses(expenses.filter((expense) => expense.id != id));
    } catch (error) {
      console.log(error.message);
    }
  }

  //list function
  async function getList() {
    const res = await fetch(`${url}/expense`);
    console.log(`${url}/expense`);
    const expenseArray = await res.json();
    setExpenses(expenseArray);
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      {" "}
      <table className="table my -5">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Amount</th>
            <th scope="col">Description</th>
            <th scope="col">Date</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.amount}</td> 
              <td>{expense.description}</td>
              <td>{expense.datevalue}</td>
              <td><Edit expense={expense}/></td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteExpense(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default List;
