import { createContext, useState, useContext } from 'react';

// Create a Context
const ApiContext = createContext();

// Create a Provider component
const ApiProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async (url, data) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/${url}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setData(await response.json());
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ApiContext.Provider value={{ data, loading, error }}>
        {children}
        </ApiContext.Provider>
    );
};


export {ApiContext, ApiProvider};