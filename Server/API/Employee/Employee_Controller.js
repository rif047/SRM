const { Employee, validate } = require('./Employee_Model');
const Bcrypt = require("bcrypt");


const Employees = async (req, res) => {
    const Data = await Employee.find();
    res.json(Data)
}



const Create = async (req, res) => {
    try {
        const { name, phone, alt_phone, email, address, work_id, nid, salary_account, designation } = req.body;

        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const checkPhone = await Employee.findOne({ phone });
        const checkWorkId = await Employee.findOne({ work_id });
        const checkEmail = await Employee.findOne({ email });

        if (checkPhone) return res.status(400).send({ message: 'Phone Number already exists!' });
        if (checkWorkId && checkWorkId.work_id) { return res.status(400).send({ message: 'Work ID already exists!' }); }
        if (checkEmail && checkEmail.email) { return res.status(400).send({ message: 'Email already exists!' }); }


        const newEmployee = new Employee({
            name,
            phone,
            alt_phone,
            email: email.toLowerCase(),
            address,
            work_id,
            nid,
            salary_account,
            designation
        });

        await newEmployee.save();
        res.status(201).send(newEmployee);

    } catch (error) {
        res.status(501).send(error);
        console.log(error);
    }
}




const View = async (req, res) => {
    const viewOne = await Employee.findOne({ phone: req.params.phone });
    res.send(viewOne)
}



const Update = async (req, res) => {
    try {
        const { name, phone, alt_phone, email, address, work_id, nid, salary_account, designation } = req.body;

        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const checkPhone = await Employee.findOne({ phone: phone, _id: { $ne: req.params.id } });
        const checkWorkId = await Employee.findOne({ work_id: work_id, _id: { $ne: req.params.id } });
        const checkEmail = await Employee.findOne({ email: email, _id: { $ne: req.params.id } });

        if (checkPhone) return res.status(400).send({ message: 'Phone Number already exists!' });
        if (checkWorkId) return res.status(400).send({ message: 'Work ID already exists!' });
        if (checkEmail) return res.status(400).send({ message: 'Email already exists!' });

        const updateEmployee = await Employee.findById(req.params.id);

        updateEmployee.name = name;
        updateEmployee.phone = phone;
        updateEmployee.alt_phone = alt_phone;
        updateEmployee.email = email.toLowerCase();
        updateEmployee.work_id = work_id;
        updateEmployee.nid = nid;
        updateEmployee.salary_account = salary_account;
        updateEmployee.designation = designation;
        updateEmployee.address = address;

        await updateEmployee.save();
        res.send(updateEmployee);

    } catch (error) {
        res.status(501).send(error);
        console.log(error);
    }
};




const Delete = async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id)
    res.send('Deleted')
}

module.exports = { Employees, Create, View, Update, Delete }