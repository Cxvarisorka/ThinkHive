import { Link, useParams } from "react-router-dom";
import { ApiContext } from "../context/apiContext.jsx";
import { useContext, useEffect, useState, useCallback } from "react";

const QuestionDetail = () => {
    const [info, setInfo] = useState({});
    const [editAnswerId, setEditAnswerId] = useState(null);
    const [editedAnswer, setEditedAnswer] = useState("");

    const { users, getQuestion, getAnswers, addAnswer, account, deleteAnswer, updateAnswer } = useContext(ApiContext);
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
    
    const handleSubmit = async (e) => {
        try {
            await addAnswer(info?.question._id, e.target.answer.value);
            // Fetch answers again after adding a new one
            const fetchedAnswers = await getAnswers(id);
            setInfo((prev) => ({ ...prev, answers: fetchedAnswers }));
        } catch (error) {
            console.error("Error submitting answer:", error);
        }
    };

    const handleEditSubmit = async (e, answerId) => {
        e.preventDefault();
        try {
            await updateAnswer(answerId, editedAnswer);
            setEditAnswerId(null); // Exit edit mode after successful update
            const fetchedAnswers = await getAnswers(id); // Fetch updated answers
            setInfo((prev) => ({ ...prev, answers: fetchedAnswers }));
        } catch (error) {
            console.error("Error updating answer:", error);
        }
    };

    const getUsername = useCallback((userId) => {
        const user = users.find(user => user._id === userId);
        return user ? user.username : 'Unknown';
    }, [users]);

    return (
        <main className="md:container md:mx-auto md:px-4 py-16">
            {/* Question section */}
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
            </section>

            {/* Answer form */}
            <section className="mt-8 max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Your Answer</h3>

                {account ? (
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
                ) : (
                    <Link to="/login" className="text-blue-600 hover:underline">Please log in</Link>
                )}
            </section>

            {/* Answers section */}
            <section className="mt-8 max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Answers</h3>
                <div>
                    {info?.answers?.map((answer) => (
                        <div key={answer._id} className="border-b py-4 flex flex-col gap-2">
                            {editAnswerId === answer._id ? (
                                <form onSubmit={(e) => handleEditSubmit(e, answer._id)}>
                                    <textarea
                                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        rows="4"
                                        value={editedAnswer}
                                        onChange={(e) => setEditedAnswer(e.target.value)}
                                    />
                                    <button type="submit" className="mt-2 px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700">
                                        Update Answer
                                    </button>
                                    <button type="button" onClick={() => setEditAnswerId(null)} className="ml-2 mt-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
                                        Cancel
                                    </button>
                                </form>
                            ) : (
                                <>
                                    <p>{answer.answer}</p>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <span>Answered by <span className="text-blue-600">{getUsername(answer.user)}</span></span>
                                        <span>Posted at: {new Date(answer.createdAt).toLocaleString()}</span>
                                    </div>

                                    {account?._id === answer?.user && (
                                        <form className="flex gap-2">
                                            <button type="button" onClick={() => {
                                                setEditAnswerId(answer._id);
                                                setEditedAnswer(answer.answer); // Set the current answer as the value
                                            }} className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
                                                Edit
                                            </button>
                                            <button onClick={() => deleteAnswer(answer._id)} className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-700">
                                                Delete
                                            </button>
                                        </form>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default QuestionDetail;
