import { NavLink, useLocation } from "react-router-dom";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

export default function MenuItem() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname.startsWith(path);
    };


    return (
        <div className="mx-4 my-4">
            <div className="flex items-center mb-10">
                <img src={'/Assets/Img/BC.png'} alt="" className="w-[45px] mr-2 rounded-md" />
                <div className="text-sm">
                    <p className="font-bold">SRM Petty Cash</p>
                    <p>Rifath</p>
                </div>
            </div>
            <nav>
                <NavLink to={'/'} className="flex items-center my-2 px-2 py-2  hover:bg-[#A0A5B9] hover:rounded-md"><DashboardOutlinedIcon /><p className="ml-2">Dashboard</p></NavLink>
                <NavLink to={'/employees'} className="flex items-center my-2 px-2 py-2 hover:bg-[#A0A5B9] hover:rounded-md"><PeopleAltOutlinedIcon /><p className="ml-2">Employee</p></NavLink>
                <NavLink
                    to="/expenses"
                    className={`flex items-center my-2 px-2 py-2 hover:bg-[#A0A5B9] hover:rounded-md ${isActive('/expenses') || isActive('/expense_categories') ? 'bg-[#4C5165] text-[#e5e7eb] rounded-md shadow-xl' : ''}`}
                >
                    <RequestQuoteOutlinedIcon />
                    <p className="ml-2">Petty Cash</p>
                </NavLink>
                <NavLink to={'/reports'} className="flex items-center my-2 px-2 py-2 hover:bg-[#A0A5B9] hover:rounded-md"><AssessmentOutlinedIcon /><p className="ml-2">Report</p></NavLink>
            </nav>

        </div>
    )
}
