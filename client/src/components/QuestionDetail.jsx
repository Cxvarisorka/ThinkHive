import { Link, useParams } from "react-router-dom";
import { ApiContext } from "../context/apiContext.jsx";
import { useContext, useEffect, useState, useCallback } from "react";

const QuestionDetail = () => {
    const [info, setInfo] = useState({});

    const { users, getQuestion, getAnswers, addAnswer } = useContext(ApiContext);
    const { id } = useParams();

    useEffect(() => {
        const fetchInfo = async () => {
            const foundQuestion = await getQuestion(id);
            if (!(foundQuestion && JSON.stringify(foundQuestion) !== JSON.stringify(info?.question))) {
                return;
            }
            const fetchedAnswers = await getAnswers(id);
            if (!(JSON.stringify(fetchedAnswers) !== JSON.stringify(info?.answers))) {
                return;
            }
    
            setInfo({ question: foundQuestion, answers: fetchedAnswers });
        };
    
        fetchInfo();
    }, [id]);
    
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            await addAnswer(info?.question, e.target.answer.value);
        } catch (error) {
            console.error("Error submitting answer:", error);
        }
    }, [getQuestion, getAnswers]);


    const getUsername = useCallback((userId) => {
        const user = users.find(user => user._id === userId);
        return user ? user.username : 'Unknown';
    }, [users]);

    return (
        <main className="md:container md:mx-auto md:px-4 py-16">
            <section className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">{info?.question?.question}</h2>
                <div className="p-4 bg-blue-100 rounded-lg shadow-sm">
                    <p className="text-gray-700 mb-2">{info?.question?.description}</p>
                    <p className="text-gray-500 text-sm">
                        Asked by <span className="text-blue-600">{getUsername(info?.question?.user)}</span>
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                        <span>Views: {info?.question?.views}</span>
                        <span>Answers: {info?.question?.answersCount}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                        <p>Created at: {new Date(info?.question?.createdAt).toLocaleString()}</p>
                        <p>Last updated: {new Date(info?.question?.updatedAt).toLocaleString()}</p>
                    </div>
                </div>
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Related Questions</h3>
                    <ul className="list-disc list-inside">
                        <li>
                            <Link to="#" className="text-blue-600 hover:underline">How to get HTML source of WebElement in Selenium WebDriver using Python?</Link>
                        </li>
                        <li>
                            <Link to="#" className="text-blue-600 hover:underline">Is there a way to get element by XPath using JavaScript in Selenium WebDriver?</Link>
                        </li>
                        <li>
                            <Link to="#" className="text-blue-600 hover:underline">How can I scroll a web page using selenium webdriver in python?</Link>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mt-8 max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Your Answer</h3>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <textarea
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        rows="5"
                        placeholder="Write your answer..."
                        name="answer"
                    >
                    </textarea>
                    <button className="mt-4 px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700">
                        Post Your Answer
                    </button>  
                </form>
                
            </section>

            <section className="mt-8 max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Answers</h3>
                <div>
                    {info?.answers?.map((answer) => (
                        <div key={answer._id} className="border-b py-4 flex flex-col gap-2">
                            <p>{answer.answer}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>Answered by <span className="text-blue-600">{getUsername(answer.user)}</span></span>
                                <span>Posted at: {new Date(answer.createdAt).toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default QuestionDetail;
