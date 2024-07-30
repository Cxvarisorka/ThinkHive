import { useContext, useEffect } from "react";
import { ApiContext } from "../context/apiContext.jsx";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const { login } = useContext(ApiContext);
    const navigate = useNavigate();

    const repeatClass = {
        input: "border p-3 rounded-md border-gray-300 focus:border-blue-500",
        label: "font-bold text-gray-700",
    }

    const inputs = [
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
            id: "password"
        }
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = e.target;
        const data = {
            email: email.value,
            password: password.value,
        };
        const ok = await login(data);

        if(ok) {
            navigate("/profile");
        }
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="inline-flex flex-col gap-8 w-96 p-8  bg-white rounded-md shadow-xl">
            <div className="flex flex-col gap-5">
                {inputs.map((input) => {
                    return (
                        <div key={input.name} className="flex flex-col gap-3">
                            <label htmlFor={input.name} className={repeatClass.label}>{input.placeholder}</label>
                            <input type={input.type} name={input.name} id={input.name} className={input.className + " focus:outline-none"} placeholder={input.placeholder} required />
                        </div>
                    )
                })}
            </div>
            
            <input type="submit" className="w-full bg-blue-900 text-white p-3 rounded-md"/>

            <hr />
        </form>
    );
};

export default Login;
