import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiContext } from "../context/apiContext.jsx";

const QuestionDetail = () => {
    const { id } = useParams();
    const { questions, users, account, answers, addAnswer, getSpecificQuestion, loading } = useContext(ApiContext);
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        (async () => {
            const specificQuestionData = await getSpecificQuestion(id);
            setQuestion(specificQuestionData);
        })()
    }, [id, questions]);

    const getUsername = (userId) => {
        const user = users.find(user => user._id === userId);
        return user ? user.username : 'Unknown';
    }

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        const answer = e.target.answer.value;

        try {
            const data = {
                question: question._id,
                answer,
                user: account._id
            }
            await addAnswer(data);
            e.target.answer.value = '';
        } catch (error) {
            console.error("Error adding answer:", error);
        }
    }

    if (!loading && question && question.answers.length > 0) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <main className="md:container md:mx-auto md:px-0 py-16 flex flex-col gap-10">
            <section className="flex flex-col gap-5">
                <h2 className="text-center font-bold text-4xl text-blue-800">{question?.question}</h2>
                <div className="p-3 bg-blue-800 text-white flex flex-col gap-2 rounded-md shadow-lg">
                    <p>{question?.description}</p>
                    <p>Asked by {getUsername(question.user)}</p>
                </div> 
            </section>

            <section className="flex flex-col gap-5">
                <h2 className="text-center font-bold text-4xl text-blue-800">Your answer</h2>
                <form className="flex flex-col gap-3" onSubmit={(e) => handleAnswerSubmit(e)}>
                    <textarea name="answer" rows="5" className="w-full p-2 rounded-md bg-blue-900 text-white focus:outline-none border-2 border-blue-900" required />
                    
                    {
                        account 
                        ? 
                            <button type="submit" className="w-full bg-blue-900 text-white p-3 rounded-md">Submit Answer</button>
                        :
                        (
                            <div className="flex flex-col gap-5">
                                <p>You need to sign in to answer question.</p>
                                <Link to={'/login'} className="w-full bg-blue-900 text-white p-3 rounded-md">Sign In</Link>
                            </div>   
                        )
                    }
                    
                </form>
            </section>

            <section className="flex flex-col gap-5">
                <h2 className="text-center font-bold text-4xl text-blue-800">All answers</h2>
                <div className="flex flex-col gap-3">
                    {
                        answers.filter(answer => answer.question === question._id)
                        .map(answer => {
                                return (
                                    <div key={answer._id} className="p-3 bg-blue-900 text-white flex flex-col gap-2 rounded-md shadow-lg">
                                        <p>{answer.answer}</p>
                                        <p>Answered by {getUsername(answer.user)}</p>
                                    </div>   
                                )
                        })
                    }  
                </div>
                
            </section>
        </main>
    );
}

export default QuestionDetail;
