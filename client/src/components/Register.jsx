import { useContext } from "react"
import { ApiContext } from "../context/apiContext.jsx"

const Register = () => {
    const {loading, error, register} = useContext(ApiContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password, bio } = e.target;

        const user = {
            username: username.value,
            email: email.value,
            password: password.value,
            bio: bio.value
        };

        await register(user);
    }

    return (
        <section>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" name="username" placeholder="Username" />
                <input type="email" name="email" placeholder="Email" />
                <input type="password" name="password" minLength={6} maxLength={12} placeholder="Password" />
                <textarea placeholder="Bio" name="bio" minLength={30} maxLength={150}></textarea>

                {loading ? <button type="submit" disabled>Register</button> : <button type="submit">Register</button>}
                {error && <p>{error}</p>}
            </form>
        </section>
        
    )
}

export default Register;