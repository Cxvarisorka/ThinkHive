import { useContext } from "react"
import { ApiContext } from "../context/apiContext.jsx"

const Profile = () => {
    const { account, logout } = useContext(ApiContext);

    return (
        <div>
            <h1>Profile</h1>
            <p>Username: {account.username}</p>
            <p>Email: {account.email}</p>
            <p>Bio: {account.bio}</p>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Profile;
