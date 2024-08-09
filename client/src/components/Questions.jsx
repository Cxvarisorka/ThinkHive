import { useContext } from "react";
import { ApiContext } from "../context/apiContext";
import { Link } from "react-router-dom";
import getTimeDifference from "../utils/getTimeDifference";

const Questions = () => {
    const { questions, users } = useContext(ApiContext);

    const getUsername = (userId) => {
        const user = users.find(user => user._id === userId);
        return user ? user.username : 'Unknown';
    }

    return (
        <main className="md:container md:mx-auto md:px-0 py-10 flex flex-col gap-5">
            <h1 className="text-center font-bold text-4xl text-blue-800">All Questions</h1>
            
            {/* Filter and Sort Options */}
            <div className="flex justify-between items-center bg-white shadow-md p-3 rounded-md">
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-gray-200 rounded">Newest</button>
                    <button className="px-4 py-2 bg-gray-200 rounded">Active</button>
                    <button className="px-4 py-2 bg-gray-200 rounded">Bountied</button>
                    <button className="px-4 py-2 bg-gray-200 rounded">Unanswered</button>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Ask Question</button>
            </div>

            {/* Questions List */}
            <div className="flex flex-col gap-5">
                {
                    questions.map(question => (
                        <section key={question._id} className="p-4 bg-white rounded-md shadow-md flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-3 items-center">
                                    <div className="flex flex-col gap-2">
                                        <span className="font-bold text-sm text-blue-600">{question.votes || 0} votes</span>
                                        <span className="font-bold text-sm text-blue-600">{question.votes || 0} Answers</span>
                                        <span className="font-bold text-sm text-blue-600">{question.votes || 0} Views</span>
                                    </div>
                                    
                                    <div className="flex flex-col gap-3">
                                        <h2 className="font-bold text-2xl text-blue-800">
                                            <Link to={`/question/${question._id}`} className="hover:underline">
                                                {question.question}
                                            </Link>
                                        </h2>
                                    
                                        <p className="text-gray-600">{question.description}</p>  
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
        </main>
    )
}

export default Questions;
