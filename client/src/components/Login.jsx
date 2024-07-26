import { useContext, useEffect } from "react";
import { ApiContext } from "../context/apiContext.jsx";

const Login = () => {
    const { login } = useContext(ApiContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = e.target;
        const data = {
            email: email.value,
            password: password.value,
        };
        await login(data);
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
