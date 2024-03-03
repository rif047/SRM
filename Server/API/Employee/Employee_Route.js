const Express = require("express");
const Route = Express.Router();
const { Employees, Create, View, Update, Delete } = require('./Employee_Controller')

Route.get('/', Employees);
Route.post('/create', Create);
Route.get('/view/:phone', View);
Route.patch('/update/:id', Update);
Route.delete('/delete/:id', Delete);


module.exports = Route