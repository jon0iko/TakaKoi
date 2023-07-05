const express = require("express");
const app = express();
const cors = require("cors"); // comm. between localhosts
const moment = require("moment");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

//middleware.
app.use(cors());
app.use(express.json()); // for req.body
// if(process.env.NODE_ENV === "production"){
//   app.use(express.static(path.join(__dirname, "client/build")));
// }

//ROUTES//

//get all expenses
app.get("/expense", async (req, res) => {
  try {
    const allExpenses = await pool.query("SELECT * FROM expense");
    res.json(allExpenses.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get an expense
app.get("/expense/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await pool.query("SELECT * FROM expense WHERE id = $1", [
      id,
    ]);
    res.json(expense.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//add an expense
app.post("/expense", async (req, res) => {
  try {
    const { amount, description } = req.body;
    const time = moment().format('LLL');
    const newExpense = await pool.query(
      "INSERT INTO expense (amount, description, datevalue) VALUES ($1, $2, $3) RETURNING *",
      [amount, description, time]
    );

    res.json(newExpense.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update an expense
app.put("/expense/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    const { description } = req.body;
    const updateExpense = await pool.query(
      "UPDATE expense SET amount = $1, description = $2 WHERE id = $3",
      [amount, description, id]
    );

    res.json("Expense was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete an expense
app.delete("/expense/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteExpense = await pool.query(
      "DELETE FROM expense WHERE id = $1",
      [id]
    );

    res.json("Expense was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.get("*", (req,res) => {
  res.send("This is not the page you are looking for");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
