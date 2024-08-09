import { useContext, useState, useEffect } from "react";
import { ApiContext } from "../context/apiContext";
import { Link } from "react-router-dom";
import getTimeDifference from "../utils/getTimeDifference";
import shortText from "../utils/shortText";

const Questions = () => {
    const { questions, users, account } = useContext(ApiContext);
    const [sortedQuestions, setSortedQuestions] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 6;

    useEffect(() => {
        handleSort();
    }, [questions, sortCriteria]);

    const getUsername = (userId) => {
        const user = users.find(user => user._id === userId);
        return user ? user.username : 'Unknown';
    };

    const handleSort = () => {
        let sortedArray = [...questions];

        switch (sortCriteria) {
            case 'votes':
                sortedArray.sort((a, b) => (b.votes || 0) - (a.votes || 0));
                break;
            case 'views':
                sortedArray.sort((a, b) => (b.views || 0) - (a.views || 0));
                break;
            case 'newest':
                sortedArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                sortedArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            default:
                break;
        }

        setSortedQuestions(sortedArray);
    };

    // Paginate questions
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = sortedQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    const totalPages = Math.ceil(sortedQuestions.length / questionsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    

    return (
        <main className="md:container md:mx-auto md:px-0 py-10 flex flex-col gap-5">
            <h1 className="text-center font-bold text-4xl text-blue-800">All Questions</h1>
            
            {/* Filter and Sort Options */}
            <div className="flex justify-between items-center bg-white shadow-md p-3 rounded-md">
                <div className="flex gap-3">
                    <button 
                        className={`px-4 py-2 rounded ${sortCriteria === 'newest' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => setSortCriteria('newest')}
                    >
                        Newest
                    </button>
                    <button 
                        className={`px-4 py-2 rounded ${sortCriteria === 'votes' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => setSortCriteria('votes')}
                    >
                        Votes
                    </button>
                    <button 
                        className={`px-4 py-2 rounded ${sortCriteria === 'views' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => setSortCriteria('views')}
                    >
                        Views
                    </button>
                    <button 
                        className={`px-4 py-2 rounded ${sortCriteria === 'oldest' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => setSortCriteria('oldest')}
                    >
                        Oldest
                    </button>
                </div>
                <Link to={account ? "/profile" : "/login"}><button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Ask Question</button></Link>
            </div>

            {/* Questions List */}
            <div className="flex flex-col gap-5">
                {
                    currentQuestions.map(question => (
                        <section key={question._id} className="p-4 bg-white rounded-md shadow-md flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-3 items-center">
                                    <div className="flex flex-col gap-2">
                                        <span className="font-bold text-sm text-blue-600">{question.votes || 0} votes</span>
                                        <span className="font-bold text-sm text-blue-600">{question.answers || 0} Answers</span>
                                        <span className="font-bold text-sm text-blue-600">{question.views || 0} Views</span>
                                    </div>
                                    
                                    <div className="flex flex-col gap-1">
                                        <h2 className=" text-xl text-blue-800">
                                            <Link to={`/question/${question._id}`} className="hover:underline">
                                                {question.question}
                                            </Link>
                                        </h2>
                                    
                                        <p className="text-gray-600">{shortText(question.description, 150)}</p>  
                                    </div>
                                    
                                </div>
                                <p className="text-sm text-gray-500">Asked by {getUsername(question.user)} {getTimeDifference(question.createdAt)}</p>
                            </div>
                            
                            <div className="flex gap-2">
                                {/* Tags */}
                                {question.tags?.map((tag, index) => (
                                    <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm">{tag}</span>
                                ))}
                            </div>
                        </section>
                    ))
                }
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-2 mt-5">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </main>
    );
};

export default Questions;
