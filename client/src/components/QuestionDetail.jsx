import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiContext } from "../context/apiContext.jsx";

const QuestionDetail = () => {
    const { id } = useParams();
    const { questions, users } = useContext(ApiContext);
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        const q = questions.find(question => question._id === id);
        setQuestion(q);
    }, [id, questions]);

    const getUsername = (userId) => {
        const user = users.find(user => user._id === userId);
        return user ? user.username : 'Unknown';
    }

    if (!question) {
        return <p>Loading...</p>;
    }

    return (
        <main className="md:container md:mx-auto md:px-0 py-16 flex flex-col gap-5">
            <section>
                <h2 className="text-center font-bold text-4xl text-blue-800">{question.question}</h2>
                <div className="p-3 bg-blue-800 text-white flex flex-col gap-2 rounded-md shadow-lg">
                    <p>{question.description}</p>
                    <p>Asked by {getUsername(question.user)}</p>
                </div> 
            </section>
            
        </main>
    );
}

export default QuestionDetail;
