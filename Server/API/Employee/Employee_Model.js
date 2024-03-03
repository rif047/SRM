const Mongoose = require('mongoose');
const JOI = require('joi');

let current = new Date();
let timeStamp = current.setHours(current.getHours() + 6);

const EmployeeSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    work_id: {
        type: String,
        unique: true
    },
    nid: {
        type: String,
    },
    salary_account: {
        type: String,
    },
    alt_phone: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String
    },
    designation: {
        type: String,
    },
    createdOn: {
        type: Date,
        default: timeStamp
    },
});

const Employee = Mongoose.model('Employee', EmployeeSchema);



const validate = (data) => {
    const schema = JOI.object({
        name: JOI.string().required().label("Name"),
        phone: JOI.string().pattern(/^0[0-9]{10}$/).required().label("Phone Number").messages({ 'string.pattern.base': 'Phone Number start with 0 and must 11 digit' }),
        alt_phone: JOI.string().pattern(/^0[0-9]{10}$/).label("Alternative Phone Number").messages({ 'string.pattern.base': 'Alternative Phone Number start with 0 and must 11 digit' }),
        work_id: JOI.string().required().label("Work ID"),
        nid: JOI.string().required().label("NID or Birth Certificate"),
        salary_account: JOI.string().required().label("Salary Account Number"),
        designation: JOI.string().required().label("Designation"),
        address: JOI.string().required().label("Address"),
        email: JOI.string().required().email().label("Email"),
    });
    return schema.validate(data);
};

module.exports = { Employee, validate };
