import Login from "../components/Login.jsx";
import logoBlack from '../assets/Black Logo/vertical-black-logo.png'
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

const LoginPage = () => {
    const signInButtons = [
        {
            text: 'Sign in with Google',
            className: 'bg-orange-700 text-white w-full py-3 px-6 rounded-md text-sm ', 
            icon: faGoogle,
            link: '#'
        }, 
        {
            text: 'Sign in with Github',
            className: 'bg-gray-800 text-white w-full py-3 px-6 rounded-md text-sm',
            icon: faGithub,
            link: '#'
        },
        {
            text: 'Sign in with Facebook',
            className: 'bg-blue-600 text-white w-full py-3 px-6 rounded-md text-sm',
            icon: faFacebookF,
            link: '#'
        }
    ]
    return (
        <main className="bg-blue-50 flex py-60 flex-col justify-center items-center gap-5">
            <div className="flex flex-col gap-8 w-96 justify-center items-center text-center">
                <Link to={'/'}><img src={logoBlack} alt='ThinkHive Logo' className='w-32 md:w-40' /></Link>
                <div className="flex flex-col gap-2 w-full">
                    {
                        signInButtons.map((button, index) => (
                            <a key={index} href={button.link} target="_blank" className={button.className}>
                                <span className="inline-flex items-center gap-2 ">
                                    <FontAwesomeIcon icon={button.icon} className="text-2xl" />
                                    {button.text}
                                </span>
                            </a>
                        ))
                    }
                </div>
            </div>
            <Login />
        </main>
    )
}

export default LoginPage;