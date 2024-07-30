import { Link } from 'react-router-dom';
import logo from '../assets/1-removebg-preview - Copy.png';
import { useContext } from 'react';
import { ApiContext } from '../context/apiContext.jsx';

const Footer = () => {
    const { account, logout } = useContext(ApiContext);

    return (
        <footer className="w-full bg-blue-900 text-white py-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-5 md:gap-10">
                <div className="flex flex-col items-center md:items-start">
                    <Link to={'/'}>
                        <img src={logo} alt='ThinkHive Logo' className='w-32 md:w-40' />
                    </Link>
                    <p className="mt-3 text-center md:text-left">© 2024 ThinkHive. All rights reserved.</p>
                </div>

                <ul className="flex flex-col md:flex-row gap-5">
                    <li><Link to={'/about'} className='hover:text-gray-300'>About</Link></li>
                    <li><Link to={'/services'} className='hover:text-gray-300'>Services</Link></li>
                    <li><Link to={'/contact'} className='hover:text-gray-300'>Contact</Link></li>
                </ul>

        
            </div>
        </footer>
    );
};

export default Footer;
