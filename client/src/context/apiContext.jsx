/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a Context
const ApiContext = createContext();

// Create a Provider component
const ApiProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const apiUrl = 'http://localhost:5000/api';

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Fetch all questions
                const questionsResponse = await fetch(`${apiUrl}/questions`);
                if (!questionsResponse.ok) {
                    throw new Error(`HTTP error! status: ${questionsResponse.status}`);
                }
                const questionsData = await questionsResponse.json();
                setQuestions(questionsData);

                // Fetch all users
                const usersResponse = await fetch(`${apiUrl}/users`);
                if (!usersResponse.ok) {
                    throw new Error(`HTTP error! status: ${usersResponse.status}`);
                }
                const usersData = await usersResponse.json();
                setUsers(usersData);

                // Fetch all answers
                const answersResponse = await fetch(`${apiUrl}/answers`);
                if (!answersResponse.ok) {
                    throw new Error(`HTTP error! status: ${answersResponse.status}`);
                }
                const answersData = await answersResponse.json();
                setAnswers(answersData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);


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
            navigate("/login");
            console.log(await response.json());
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const getUserQuestions = async (userId) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/users/${userId}/questions`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log(response);
            return await response.json();
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

            // Fetch user questions after setting the account
            const questions = await getUserQuestions(json._id);
            setAccount(prev => ({ ...prev, questions }));

            return response.ok;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const askQuestion = async (data) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/questions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const newQuestion = await response.json();
            setQuestions(prev => ([...prev, newQuestion]));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const deleteQuestion = async (questionId) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/questions/${questionId}`, {
                method: 'DELETE',
            });

            await getUserQuestions(account._id);
            setQuestions(prev => prev.filter(question => question._id !== questionId));
        } catch(error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const updateQuestion = async (questionId, data) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/questions/${questionId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const updatedQuestion = await response.json();
            setQuestions(prev => prev.map(question => question._id === questionId? updatedQuestion : question));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const addAnswer = async (data) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/answers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const newAnswer = await response.json();
            setAnswers(prev => ([...prev, newAnswer]));
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            setError(error.message);
        } finally { 
            setLoading(false);
        }
    }

    const getSpecificQuestion = async (questionId) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/questions/${questionId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const updatePerson = async (data) => {
        console.log("updatePerson", data);
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/users/${account._id}`, {
                method: 'PUT',
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

    // const getUser = async (userId) => {
    //     try {
    //         setLoading(true);
    //         const response = await fetch(`${apiUrl}/users/${userId}`);
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         setError(error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    const logout = () => {
        setAccount(null);
        navigate('/login');
    }

    return (
        <ApiContext.Provider value={{ account, loading, error, register, login, logout, askQuestion, questions, users, addAnswer, answers, setAnswers, deleteQuestion, updateQuestion, getSpecificQuestion, updatePerson }}>
            {children}
        </ApiContext.Provider>
    );
};

export { ApiContext, ApiProvider };
