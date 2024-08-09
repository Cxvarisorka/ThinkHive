import { useContext, useState } from "react";
import { ApiContext } from "../context/apiContext.jsx";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { account, logout, askQuestion, deleteQuestion, updateQuestion, questions } = useContext(ApiContext);

  const [isEditing, setIsEditing] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    description: ''
  });

  const myQuestions = questions.filter((question) => question.user === account._id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const questionInfo = {
      question: formData.question,
      description: formData.description,
      user: account._id,
    };

    if (isEditing && currentQuestionId) {
      await updateQuestion(currentQuestionId, questionInfo);
    } else {
      await askQuestion(questionInfo);
    }

    // Reset form and edit state
    setFormData({ question: '', description: '' });
    setIsEditing(false);
    setCurrentQuestionId(null);
  };

  const handleEditQuestion = (question) => {
    setIsEditing(true);
    setCurrentQuestionId(question._id);
    setFormData({
      question: question.question,
      description: question.description,
    });
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await deleteQuestion(questionId);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  }

  return (
    <main className="w-full">
      <div className="md:container md:mx-auto md:px-0 px-3 py-5 flex flex-col justify-center items-center text-center">

        {/* User Info */}
        <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-4xl text-blue-600">
                {account.username}
              </h1>
              <p className="text-gray-600">Email: {account.email}</p>
              <p className="text-gray-600">Member for 15 days</p>
            </div>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Question Form */}
        <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-3xl mt-8">
          <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              name="question"
              placeholder="Question"
              className="border border-gray-300 p-2 rounded"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              required
            />
            <textarea
              className="border border-gray-300 p-2 rounded"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              type="submit"
            >
              {isEditing ? 'Update Question' : 'Add Question'}
            </button>
          </form>
        </div>

        {/* User Questions */}
        <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-3xl mt-8">
          <h2 className="font-semibold text-xl text-blue-600">Your Questions:</h2>
          {myQuestions?.length > 0 ? (
            myQuestions.map((question, i) => (
              <div key={question._id} className="border-b py-4 flex flex-col gap-3">
                <h3 className="text-lg">
                  {i + 1}. {question.question}
                </h3>
                <p className="text-gray-600">{question.description}</p>
                
                <div className="flex gap-3 justify-center items-center">
                    <button 
                      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" 
                      onClick={() => handleEditQuestion(question)}
                    >
                      Edit
                    </button>
                    <button 
                      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" 
                      onClick={() => handleDeleteQuestion(question._id)}
                    >
                      Delete
                    </button>
                    
                    <Link to={`/question/${question._id}`}>
                      <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                        View Question
                      </button>
                    </Link>
    
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">You have not asked any questions</p>
          )}
        </div>

      </div>
    </main>
  );
};

export default MyProfile;
