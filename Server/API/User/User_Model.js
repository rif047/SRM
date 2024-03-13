const Mongoose = require('mongoose');
const JOI = require('joi');

let current = new Date();
let timeStamp = current.setHours(current.getHours() + 6);

const UserSchema = new Mongoose.Schema({
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
    email: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    repeat_password: {
        type: String
    },
    answer: {
        type: String
    },
    role: {
        type: Number,
        default: 0,
        // 0 Means Employee, 1 Means Admin, 2 Means Manager
    },
    createdOn: {
        type: Date,
        default: timeStamp
    },
});

const User = Mongoose.model('User', UserSchema);



const validate = (data) => {
    const schema = JOI.object({
        name: JOI.string().required().label("Name"),
        phone: JOI.string().pattern(/^0[0-9]{10}$/).required().label("Phone Number").messages({ 'string.pattern.base': 'Phone Number start with 0 and must 11 digit' }),
        address: JOI.string().required().label("Address"),
        email: JOI.string().email().label("Email"),
        password: JOI.string().min(6).max(14).label("Password"),
        repeat_password: JOI.any().valid(JOI.ref('password')).messages({ "any.only": "Password did not match" }),
        answer: JOI.string().label("Answer"),
        role: JOI.string().label("Role"),
    });
    return schema.validate(data);
};

module.exports = { User, validate };
