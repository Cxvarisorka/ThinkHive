import { useContext, useState } from "react";
import { ApiContext } from "../context/apiContext.jsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import getTimeDifference from "../utils/getTimeDifference.js";

// Modal Component
const Modal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <button
            className="text-3xl"
            onClick={onClose}
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="New Username"
            className="border border-gray-300 p-2 rounded"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="text"
            name="bio"
            placeholder="New Bio"
            className="border border-gray-300 p-2 rounded"
            value={formData.bio}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="New Email"
            className="border border-gray-300 p-2 rounded"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="New Password"
            className="border border-gray-300 p-2 rounded"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="file"
            name="image"
            className="border border-gray-300 p-2 rounded"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

const MyProfile = () => {
  const { account, logout, askQuestion, deleteQuestion, updateQuestion, questions, updatePerson } = useContext(ApiContext);

  const [isEditing, setIsEditing] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    description: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSaveSettings = async (data) => {
    try {
        await updatePerson(data);
    } catch (error) {
        console.error("Error saving settings:", error);
    } finally{
        setIsModalOpen(false); 
    }
  };

  return (
    <main className="w-full">
      <div className="md:container md:mx-auto md:px-0 px-3 py-5 flex flex-col justify-center items-center text-center">

        {/* User Info */}
        <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-3xl relative">
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-4xl text-blue-600">
                {account.username}
              </h1>
              <p className="text-gray-600">Email: {account.email}</p>
              <p className="text-gray-600">Bio: {account.bio || "No bio added"}</p>
              <p className="text-gray-600">{getTimeDifference(account.createdAt)}</p>
            </div>

            <div className="flex flex-col gap-1">
                <button
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={logout}
                >
                    Logout
                </button>
                <button
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={() => setIsModalOpen(true)}
                >
                    Settings
                </button> 
                <button
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Delete Account
                </button>  
            </div>
            

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

      {/* Modal for Settings */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveSettings} />
    </main>
  );
};

export default MyProfile;
