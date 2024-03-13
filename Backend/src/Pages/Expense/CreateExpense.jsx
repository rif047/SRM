import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';


export default function CreateEmployee() {
    document.title = 'Add Expense';

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        let fetchData = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/expense_categories`);
            setCategories(response.data)
        }
        fetchData()
    }, [])



    let submit = async (e) => {
        e.preventDefault();
        setError('');

        if (!date) {
            setError('Date is required!');
            return;
        }

        try {
            const formData = new FormData();

            formData.append('category', selectedCategory);
            formData.append('name', name);
            formData.append('amount', amount);
            formData.append('date', new Date(date).toISOString());
            formData.append('description', description);
            formData.append('image', image);

            await axios.post(`${process.env.REACT_APP_API_URL}/api/expenses/create`, formData);

            const successMessageUrl = new URLSearchParams({ successMessage: 'Created successfully' });
            navigate({ pathname: '/expenses', search: successMessageUrl.toString() });

        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    }

    // Capitalize the first letter of a string
    const capitalizeFirst = (sentence) => {
        const words = sentence.split(' ');
        const capitalizedWords = words.map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        });
        return capitalizedWords.join(' ');
    };


    return (
        <Layout>
            <div className="max-w-[500px] px-2 mx-auto">
                <div className="flex justify-end mb-2">
                    <NavLink to={'/expenses'} className="flex justify-center bg-[#4c5165] text-gray-300 font-bold px-5 py-1 mb-2 rounded-md" >
                        <span className="mr-2">Expense List</span>
                        <ListAltOutlinedIcon />
                    </NavLink>
                </div>

                <form className="form" onSubmit={submit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label>Expense Category*</label>
                        <select
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            value={selectedCategory}
                        >
                            <option value="">Select Expense Type</option>
                            {categories?.map((category) => (
                                <option key={category?._id} value={category?._id}>
                                    {capitalizeFirst(category.name)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label>Date*</label>
                        <input type="date" placeholder="Date" onChange={(e) => setDate(e.target.value)} />
                    </div>

                    {/* <div className="mb-4">
                        <label>Employee*</label>
                        <input type="text" placeholder="Ecpense For" onChange={(e) => setName(e.target.value)} />
                    </div> */}

                    <div className='mb-4'>
                        <label>Cost For*</label>
                        <select value={name} onChange={(e) => setName(e.target.value)}>
                            <option value="">Select</option>
                            <option value="236157 - Jahed Ahmed">236157-Jahed Ahmed</option>
                            <option value="221029 - Mohammad Ali Roni">221029-Mohammad Ali Roni</option>
                            <option value="246909 - Nurul Amin Dalim">246909-Nurul Amin Dalim</option>
                            <option value="220345 - Ma Abdul Latif">220345-Ma Abdul Latif</option>
                            <option value="191703 - Golam Shahid">191703-Golam Shahid</option>
                            <option value="224744 - Nur Mohammad Rajon">224744-Nur Mohammad Rajon</option>
                            <option value="220844 - Ahsan Habib">220844-Ahsan Habib</option>
                            <option value="220343 - Rajib">220343-Rajib</option>
                            <option value="246683 - Shah Moynul Islam Mahim">246683-Shah Moynul Islam Mahim</option>

                            <option value="Latif Bike Fuel">Latif Bike Fuel</option>
                            <option value="Jahed Bike Fuel">Jahed Bike Fuel</option>

                            <option value="VAN Fuel">VAN Fuel</option>
                            <option value="VAN Toll">VAN Toll</option>
                            <option value="VAN Repair">VAN Repair</option>

                            <option value="Electricity Bill">Electricity Bill</option>
                            <option value="Water Bill">Water Bill</option>
                            <option value="Admin Other Bill">Admin Other Bill</option>

                            <option value="Bank Charge">Bank Charge</option>
                        </select>
                    </div>



                    <div className="mb-4">
                        <label>Amount*</label>
                        <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label>Description</label>
                        <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="mb-4">
                        <label>Vouhcer</label>
                        <input type="file" accept="image/*" onChange={(e) => { const selectedFile = e.target.files[0]; setImage(selectedFile) }} />
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
