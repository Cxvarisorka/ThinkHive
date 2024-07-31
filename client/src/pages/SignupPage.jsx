import Register from "../components/Register.jsx";
import horizonBlackLogo from "../assets/Black Logo/horizon-black-logo.png"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion, faGraduationCap, faTrophy } from "@fortawesome/free-solid-svg-icons";



const SignupPage = () => {

    const leftItems = [
        {
            text: "Get unstuck - ask a question!",
            icon: <FontAwesomeIcon icon={faCircleQuestion} />
        },
        {
            text: "Learn how to solve complex problems",
            icon: <FontAwesomeIcon icon={faGraduationCap} />
        },
        {
            text: "Answer questions and earn reputation",
            icon: <FontAwesomeIcon icon={faTrophy} />
        }
    ]

    return (
        <main className="bg-blue-50 flex lg:py-48 md:py-36 py-0 justify-center items-center gap-5">
            <div className="flex md:flex-row flex-col xl:gap-16 gap-10 2xl:w-1/2 xl:w-2/3 lg:w-3/4 w-full lg:p-0 p-10 justify-center items-center">
                <div className="md:w-1/2 w-full flex flex-col gap-7">
                    <img src={horizonBlackLogo} alt='ThinkHive Logo' className='w-40 md:w-48' />
                    {leftItems.map((item, index) => {
                        return (
                            <div key={index} className="flex items-center gap-2 w-full">
                                <p className="md:text-3xl text-xl text-blue-900">{item.icon}</p>
                                <p className="md:text-xl text-lg">{item.text}</p>
                            </div>
                        )
                    })}
                    <p>Join ThinkHive today! Connect, learn, and grow with our community. Ask questions, solve problems, and earn reputation. Sign up now!</p>
                </div>
                <Register /> 
            </div>
            
        </main>
    )
}

export default SignupPage;