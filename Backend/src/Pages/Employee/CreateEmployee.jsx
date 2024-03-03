import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';


export default function CreateEmployee() {
    document.title = 'Add Employee';

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [alt_phone, setAltPhone] = useState('');
    const [email, setEmail] = useState('');
    const [work_id, setWorkId] = useState('');
    const [nid, setNid] = useState('');
    const [salary_account, setSalaryAccount] = useState('');
    const [designation, setDesignation] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState("");

    const navigate = useNavigate();

    let submit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/employees/create`, {
                name,
                phone,
                alt_phone,
                address,
                work_id,
                nid,
                salary_account,
                designation,
                email
            });

            const successMessageUrl = new URLSearchParams({ successMessage: 'Created successfully' });
            navigate({ pathname: '/employees', search: successMessageUrl.toString() });

        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }


    }


    return (
        <Layout>
            <div className="max-w-[700px] px-2 mx-auto">
                <div className="flex justify-end mb-2">
                    <NavLink to={'/employees'} className="flex justify-center bg-[#4c5165] text-gray-300 font-bold px-5 py-1 mb-2 rounded-md" >
                        <span className="mr-2">Employee List</span>
                        <ListAltOutlinedIcon />
                    </NavLink>
                </div>

                <form className="form" onSubmit={submit}>
                    <div className='mb-4'>
                        <label>Designation</label>
                        <select value={designation} onChange={(e) => setDesignation(e.target.value)}>
                            <option value="">Select</option>
                            <option value="Operator">Operator</option>
                            <option value="CP Agent">CP Agent</option>
                            <option value="Package Handler">Package Handler</option>
                            <option value="Rider">Rider</option>
                            <option value="Supporting Stuff">Supporting Stuff</option>
                            <option value="Cleaner">Cleaner</option>
                            <option value="Guard">Guard</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label>Name*</label>
                        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label>Work ID*</label>
                        <input type="text" placeholder="Work ID" onChange={(e) => setWorkId(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label>Phone Number*</label>
                        <input type="number" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label>Address*</label>
                        <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
                    </div>


                    <div className="mb-4">
                        <label>Alternative Phone Number*</label>
                        <input type="number" placeholder="Alternative Phone Number" onChange={(e) => setAltPhone(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label>NID*</label>
                        <input type="text" placeholder="NID" onChange={(e) => setNid(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label>Salary Account*</label>
                        <input type="text" placeholder="Salary Account" onChange={(e) => setSalaryAccount(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label>Email*</label>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    {error && <p className="text-red-500 ml-1 mt-1 font-bold">{error}</p>}

                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </Layout >
    );
}
