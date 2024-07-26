import { Link } from 'react-router-dom';
import logo from '../assets/1-removebg-preview - Copy.png'
import { useState } from 'react';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className='w-full bg-blue-900 text-white '>
            <nav className='flex flex-col md:flex-row gap-5 md:gap-10 justify-between items-center md:container md:mx-auto py-3 md:px-0 px-3'>
                <div className='flex justify-between w-full md:w-auto'>
                    <Link to={'/'}><img src={logo} alt='Logo' className='w-32 md:w-40' /></Link>
                    <button onClick={toggleMenu} className='md:hidden text-white'>
                        <svg className='w-8 h-8' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>

                <ul className={`flex-col md:flex-row gap-5 w-full md:w-auto md:gap-10 ${menuOpen ? 'flex' : 'hidden md:flex'}`}>
                    <li><Link to={'/about'} className='hover:text-gray-300'>About</Link></li>
                    <li><Link to={'/services'} className='hover:text-gray-300'>Services</Link></li>
                    <li><Link to={'/contact'} className='hover:text-gray-300'>Contact</Link></li>
                </ul>

                <form className='w-full md:w-auto flex gap-5 mt-5 md:mt-0'>
                    <input type='text' placeholder='Search...' className='border-2 border-white p-2 h-12 w-full bg-transparent focus:outline-none rounded-md' />
                </form>

                <div className='flex md:w-auto w-full gap-2 mt-5 md:mt-0'>
                    <Link to={'/login'} className='border-2 md:w-auto w-full py-2 px-4 rounded-md h-12 hover:bg-white hover:text-blue-900'>Login</Link>
                    <Link to={'/register'} className='border-2 md:w-auto w-full py-2 px-4 rounded-md h-12 hover:bg-white hover:text-blue-900'>Register</Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;