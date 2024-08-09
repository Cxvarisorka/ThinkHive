import { useContext } from "react"
import { ApiContext } from "../context/apiContext.jsx"
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

const Register = () => {
    // eslint-disable-next-line no-unused-vars
    const {loading, error, register} = useContext(ApiContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = e.target;

        const user = {
            username: username.value,
            email: email.value,
            password: password.value,
        };

        await register(user);
    }

    const repeatClass = {
        input: "border p-3 rounded-md border-gray-300 focus:border-blue-500",
        label: "font-bold text-gray-700",
    }

    const inputs = [
        {
            name: "username",
            type: "text",
            placeholder: "Username",
            required: true,
            className: repeatClass.input,
            id: "username",
            minLength: 3,
            maxLength:12,
            // pattern: /^[a-zA-Z0-9]+$/
        },
        {
            name: "email",
            type: "email",
            placeholder: "Email",
            required: true,
            className: repeatClass.input,
            id: "email"
        }, 
        {
            name: "password",
            type: "password",
            placeholder: "Password",
            required: true,
            className: repeatClass.input,
            id: "password",
            minLength: 8,
            maxLength:16
        }
    ]

    const logInButtons = [
        {
            text: 'Sign up with Google',
            className: 'bg-orange-600 text-white w-full py-3 px-6 rounded-md text-sm ', 
            icon: faGoogle,
            link: '#'
        }, 
        {
            text: 'Sign up with Github',
            className: 'bg-gray-800 text-white w-full py-3 px-6 rounded-md text-sm',
            icon: faGithub,
            link: '#'
        }
    ]

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col md:w-1/2 w-full gap-7 bg-white p-8 rounded shadow-xl">
            <div className="flex flex-col gap-3">
                <h1 className="lg:text-4xl text-3xl font-bold text-gray-800">Create your account</h1>
                <p className="text-gray-800">By clicking “Sign up”, you agree to our <Link className="text-blue-600" to={"#"}>terms of service</Link> and acknowledge you have read our <Link className="text-blue-600" to={"#"}>privacy policy</Link>.</p>
            </div>

            {inputs.map((input) => {
                    return (
                    <div key={input.name} className="flex flex-col gap-3">
                        <label htmlFor={input.name} className={repeatClass.label}>{input.placeholder}</label>
                        <input {...input} className={repeatClass.input + " focus:outline-none"} />
                    </div>
                )
            })}
            

            <button type="submit" className="w-full bg-blue-900 text-white p-3 rounded-md">Sign Up</button>
            {error && <p>{error}</p>}

            <hr />

            <div className="flex flex-col gap-2 w-full">
                {
                    logInButtons.map((button, index) => (
                        <Link key={index} to={button.link} target="_blank" className={button.className}>
                            <span className="inline-flex items-center gap-2 ">
                                <FontAwesomeIcon icon={button.icon} className="text-2xl" />
                                {button.text}
                            </span>
                        </Link>
                    ))
                }
            </div>

            <p>Have an account? <Link className="text-blue-600" to={'/login'}>Log in</Link></p>
        </form>
    )
}

export default Register;