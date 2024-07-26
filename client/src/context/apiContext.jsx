import { createContext, useState, useContext } from 'react';

// Create a Context
const ApiContext = createContext();

// Create a Provider component
const ApiProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiUrl = 'http://localhost:5000/api';

    const register = async (data) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log(await response.json())
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const login = async (data) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            setAccount(json);
            
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ApiContext.Provider value={{ account, loading, error, register, login }}>
            {children}
        </ApiContext.Provider>
    );
};


export {ApiContext, ApiProvider};