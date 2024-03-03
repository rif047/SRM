import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";


import Login from './Pages/Login/Login';

import Dashboard from './Pages/Dashboard/Dashboard';

import Employees from './Pages/Employee/Employees';
import CreateEmployee from './Pages/Employee/CreateEmployee';
import UpdateEmployee from './Pages/Employee/UpdateEmployee';

import Expenses from './Pages/Expense/Expenses';
import CreateExpense from './Pages/Expense/CreateExpense';
import UpdateExpense from './Pages/Expense/UpdateExpense';

import Expense_Categories from './Pages/Expense/Category/ExpenseCategories';
import CreateExpenseCategory from './Pages/Expense/Category/CreateExpenseCategory';
import UpdateExpenseCategory from './Pages/Expense/Category/UpdateExpenseCategory';

import Users from './Pages/User/Users';
import CreateUser from './Pages/User/CreateUser';
import UpdateUser from './Pages/User/UpdateUser';



export default function AllRoutes() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLoggedIn(true);
        }
    }, []);
    return (
        <Routes>
            <Route path="/login" element={loggedIn ? (<Navigate to="/" />) : (<Login setLoggedIn={setLoggedIn} />)} />

            <Route path="/" element={loggedIn ? <Dashboard /> : <Navigate to="/login" />} />


            <Route path="/employees" element={loggedIn ? <Employees /> : <Navigate to="/login" />} />
            <Route path="/employees/create" element={loggedIn ? <CreateEmployee /> : <Navigate to="/login" />} />
            <Route path="/employees/update/:phone" element={loggedIn ? <UpdateEmployee /> : <Navigate to="/login" />} />



            <Route path="/expenses" element={loggedIn ? <Expenses /> : <Navigate to="/login" />} />
            <Route path="/expenses/create" element={loggedIn ? <CreateExpense /> : <Navigate to="/login" />} />
            <Route path="/expenses/update/:id" element={loggedIn ? <UpdateExpense /> : <Navigate to="/login" />} />

            <Route path="/expense_categories" element={loggedIn ? <Expense_Categories /> : <Navigate to="/login" />} />
            <Route path="/expense_categories/create" element={loggedIn ? <CreateExpenseCategory /> : <Navigate to="/login" />} />
            <Route path="/expense_categories/update/:name" element={loggedIn ? <UpdateExpenseCategory /> : <Navigate to="/login" />} />



            <Route path="/users" element={loggedIn ? <Users /> : <Navigate to="/login" />} />
            <Route path="/users/create" element={loggedIn ? <CreateUser /> : <Navigate to="/login" />} />
            <Route path="/users/update/:phone" element={loggedIn ? <UpdateUser /> : <Navigate to="/login" />} />
        </Routes>
    )
}
