const { requireSignIn, isAdmin } = require('./Middleware/Auth_Middleware');

const Express = require("express");
const Route = Express.Router();
const User = require('./API/User/User_Route');
const Auth = require('./API/Auth/Auth');
const Employee = require('./API/Employee/Employee_Route');
const Expense_Category = require('./API/Expense/Expense_Category/Expense_Category_Route');
const Expense = require('./API/Expense/Expense_Route');



Route.use('/auth', Auth);
Route.use('/users', User);
Route.use('/employees', Employee);
Route.use('/expense_categories', Expense_Category);
Route.use('/expenses', Expense);


module.exports = Route