/* eslint-disable react/prop-types */
import { createContext, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a Context
const ApiContext = createContext();

// Create a Provider component
const ApiProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [users, setUsers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const apiUrl = 'http://localhost:5000/api';

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const [questionsResponse, usersResponse] = await Promise.all([
                    fetch(`${apiUrl}/questions`),
                    fetch(`${apiUrl}/users`),
                ]);

                if (!questionsResponse.ok || !usersResponse.ok) {
                    throw new Error(`HTTP error!`);
                }

                const [questionsData, usersData] = await Promise.all([
                    questionsResponse.json(),
                    usersResponse.json()
                ]);

                setQuestions(questionsData);
                setUsers(usersData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
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
    };

    const getUserQuestions = async (userId) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/users/${userId}/questions`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

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

            const questions = await getUserQuestions(json._id);
            setAccount(prev => ({ ...prev, questions }));

            return response.ok;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

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
    };

    const deleteQuestion = async (questionId) => {
        try {
            setLoading(true);
            await fetch(`${apiUrl}/questions/${questionId}`, {
                method: 'DELETE',
            });

            setQuestions(prev => prev.filter(question => question._id !== questionId));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateQuestion = async (questionId, data) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/questions/${questionId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const updatedQuestion = await response.json();
            setQuestions(prev => prev.map(question => question._id === questionId ? updatedQuestion : question));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getQuestion = async (questionId) => {
        let url = `${apiUrl}/questions/${questionId}?accountId=${account?._id}`;


        if (!account) {
            url = `${apiUrl}/questions/${questionId}`;
        }

 

        try {
            setLoading(true);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const addAnswer = async (question, data) => {
        try {
            
            setLoading(true);
            const response = await fetch(`${apiUrl}/answers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({answer: data, question: question._id, user: account._id }),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const newAnswer = await response.json();
            return newAnswer;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getAnswers = async (questionId) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/answers/question/${questionId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteAnswer = async (answerId) => {
        try {
            setLoading(true);
            await fetch(`${apiUrl}/answers/${answerId}`, {
                method: 'DELETE',
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateAnswer = async (answerId, data) => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/question/${answerId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }        
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
    };


    const logout = () => {
        setAccount(null);
        navigate('/login');
    };

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        account,
        loading,
        error,
        register,
        login,
        logout,
        askQuestion,
        questions,
        users,
        deleteQuestion,
        updateQuestion,
        updatePerson,
        getQuestion,
        getAnswers,
        addAnswer,
        deleteAnswer,
        updateAnswer
    }), [account, loading, error, questions, users]);

    return (
        <ApiContext.Provider value={contextValue}>
            {loading &&  (
                    <div className="absolute inset-0 flex items-center h-screen justify-center bg-black bg-opacity-50 z-10">
                        <div className="text-white text-2xl">Loading...</div>
                    </div>
                )
            }
            {
                error && (
                    <div className="text-red-500 text-center py-5">
                        {error}
                    </div>
                )
            }
            
            {children}
        </ApiContext.Provider>
    );
};

export { ApiContext, ApiProvider };
