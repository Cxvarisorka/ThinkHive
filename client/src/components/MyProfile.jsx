import { useContext } from "react"
import { ApiContext } from "../context/apiContext.jsx"

const MyProfile = () => {
    const { account, logout, askQuestion } = useContext(ApiContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { question, description } = e.target;


        const questionInfo = {
            question: question.value,
            description: description.value,
            user: account._id
        };


        await askQuestion(questionInfo);
    }

    return (
        <main className="w-full">
            <div className="md:container md:mx-auto md:px-0 px-3 flex flex-col justify-center items-center text-center">
                <div>
                    <h1 className="font-bold text-4xl">{account.username}</h1>
                    <p>Email: {account.email}</p>
                </div>

                <form className="flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" name="question" placeholder="Question" className="border" required/>
                    <textarea className="border" name="description" placeholder="Description"></textarea>
                    <button>Add Question</button>
                </form>

                <div>
                    <h2>Your Questions:</h2>
                    {/* Render questions here */}
                    {account?.questions?.map((question, i) => (
                        <div key={question._id}>
                            <h3>{i + 1}.{question.question}</h3>
                            <p>{question.description}</p>
                        </div>
                    ))}
                </div>
                
                
                <button onClick={logout}>Logout</button>
            </div>
        </main>
    )
}

export default MyProfile;
