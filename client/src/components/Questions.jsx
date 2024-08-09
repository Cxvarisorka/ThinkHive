import { useContext } from "react";
import { ApiContext } from "../context/apiContext";
import { Link } from "react-router-dom";

const Questions = () => {
    const { questions, users } = useContext(ApiContext);

    const getUsername = (userId) => {
        const user = users.find(user => user._id === userId);
        return user ? user.username : 'Unknown';
    }

    return (
        <main className="md:container md:mx-auto md:px-0 py-16 flex flex-col gap-5">
            <h1 className="text-center font-bold text-4xl text-blue-800">All Questions</h1>
            <div className="flex flex-col gap-5">
                {
                    questions.map(question => (
                        <section key={question._id} className="p-3 bg-blue-800 text-white flex flex-col gap-2 rounded-md shadow-lg">
                            <h2 className="font-bold text-xl"><Link to={`/question/${question._id}`}>{question.question}</Link></h2>
                            <div>
                                <p>{question.description}</p>
                                <p>Asked by {getUsername(question.user)}</p>
                            </div>
                        </section>
                    ))
                }
            </div>
        </main>
    )
}

export default Questions;
