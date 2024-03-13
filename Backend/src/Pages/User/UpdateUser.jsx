import { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';


export default function UpdateUser() {
    const { phone } = useParams();
    const [users, setEmployees] = useState({});

    const [nameValue, setNameValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [addressValue, setAddressValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [answerValue, setAnswerValue] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/view/${phone}`);
                setEmployees(response.data);
                setNameValue(response.data.name);
                setPhoneValue(response.data.phone);
                setAddressValue(response.data.address);
                setEmailValue(response.data.email);
                setAnswerValue(response.data.answer);
                document.title = `Edit- ${response.data.name}`;
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchEmployees();
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/api/users/update/${users._id}`, {
                name: nameValue,
                phone: phoneValue,
                address: addressValue,
                answer: answerValue,
                email: emailValue
            });

            const successMessageUrl = new URLSearchParams({ successMessage: 'Updated successfully' });

            navigate({ pathname: '/users', search: successMessageUrl.toString() });

        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };


    return (
        <Layout>
            <div className="max-w-[700px] px-2 mx-auto">
                <div className="flex justify-end mb-2">
                    <NavLink to={'/users'} className="flex justify-center bg-[#4c5165] text-gray-300 font-bold px-5 py-1 mb-2 rounded-md"  >
                        <span className="mr-2">User List</span>
                        <ListAltOutlinedIcon />
                    </NavLink>
                </div>

                <form className="form" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label>Name*</label>
                        <input
                            type="text"
                            value={nameValue}
                            onChange={(e) => setNameValue(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label>Phone Number*</label>
                        <input
                            type="number"
                            value={phoneValue}
                            onChange={(e) => setPhoneValue(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label>Address*</label>
                        <input
                            type="text"
                            value={addressValue}
                            onChange={(e) => setAddressValue(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label>Email</label>
                        <input
                            type="text"
                            value={emailValue}
                            onChange={(e) => setEmailValue(e.target.value)}
                        />
                    </div>

                    <div className='mb-4'>
                        <label>Password Recovery Question</label>

                        <select>
                            <option>Select One</option>
                            <option>What is your most favourite Bike Shop?</option>
                            <option>Who is the most important person in your life?</option>
                            <option>Who was your childhood hero?</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label>Answer</label>
                        <input
                            type="text"
                            value={answerValue}
                            onChange={(e) => setAnswerValue(e.target.value)}
                        />
                    </div>

                    {error && <p className="text-red-500 ml-1 mt-1 font-bold">{error}</p>}

                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
