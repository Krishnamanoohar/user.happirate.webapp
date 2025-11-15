// import React, { useState } from "react";

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { from: "bot", text: "Hi there! How can I assist you today?" },
//   ]);
//   const [input, setInput] = useState("");

//   const toggleChat = () => setIsOpen(!isOpen);

//   const handleSend = () => {
//     if (!input.trim()) return;

//     const userMsg = { from: "user", text: input };
//     const botResponse = {
//       from: "bot",
//       text: "Thanks for your query! Our agent will get back shortly.", // You can integrate backend here
//     };

//     setMessages((prev) => [...prev, userMsg, botResponse]);
//     setInput("");
//   };

//   return (
//     <div className="d-none">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed items-center justify-center bottom-6 right-6 z-50 bg-blue-600 text-white text-center rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 rounded-circle w-16 h-17 border border-white shadow-xl cursor-pointer active:bg-red-600"
//         aria-label="Open chat"
//         style={{ background: "#2980b9", cursor: "pointer" }}
//       >
//         {isOpen ? (
//           <i class="bi bi-x-lg text-white text-2xl"></i>
//         ) : (
//           <i class="bi bi-chat-left-text-fill text-white text-2xl"></i>
//         )}
//       </button>

//       {/* Chat Window */}
//       {isOpen && (
//         <div className="fixed bottom-25 right-10 w-80 bg-white shadow-2xl rounded-xl overflow-hidden z-50 flex flex-col h-[70%] w-[28%]">
//           <div
//             className="bg-[#2980b9] text-white px-4 py-3 font-semibold"
//             style={{
//               background:
//                 "linear-gradient(to right,rgb(1, 114, 152),rgb(35, 161, 207),rgb(24, 124, 190))",
//             }}
//           >
//             {/* 💬 Ask an Expert */}
//             <div className="bg-transparent text-white">
//               <h4 className="text-lg font-semibold text-white">Hi there! 👋</h4>
//               <p
//                 className="text-sm text-blue-100"
//                 style={{ marginBottom: "0" }}
//               >
//                 I'm your Loan Assistant. Ask me anything or let’s get you
//                 started!
//               </p>
//             </div>
//           </div>

//           <div className="flex flex-column justify-between h-[100%] bg-white">
//             <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-80 text-sm bg-gray-50">
//               {messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`flex ${
//                     msg.from === "user" ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`p-2 rounded-lg max-w-[70%] ${
//                       msg.from === "user"
//                         ? "bg-blue-100 text-blue-800"
//                         : "bg-gray-200 text-gray-800"
//                     }`}
//                   >
//                     {msg.text}
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="flex border-t px-3 py-2 bg-white">
//               <input
//                 type="text"
//                 className="flex-1 border rounded-lg px-3 py-1 text-sm focus:outline-none"
//                 placeholder="Type your message..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSend()}
//               />
//               <button
//                 onClick={handleSend}
//                 className="ml-2 text-blue-600 hover:text-blue-800 rotate-45"
//               >
//                 {/* <IoMdSend className="text-xl" /> */}
//                 <i class="bi bi-send text-2xl"></i>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;

// import React from "react";

// const Chatbot = () => {
//   return (
//     <div className="fixed bottom-4 right-4 flex gap-4 justify-center items-center rounded-circle">
//       <img
//         src="/assets/img/chatbot_icon.png"
//         alt=""
//         width={96}
//         className="relative bottom-2 scale-x-[-1]"
//       />
//     </div>
//   );
// };

// export default Chatbot;

// <div className="fixed bottom-4 right-4 flex gap-4 justify-center items-center bg-[rgba(70,70,70,0.5)] rounded-2xl shadow-[0_0_20px_5px_rgba(255,255,255,0.6)]">
{
  /* <p className="text-white mb-0">What we do</p> */
}
{
  /* <p className="text-[rgb(255,255,255,0.5)] mb-0">Who we are</p> */
}
{
  /* <div className="flex items-center gap-2"> */
}
{
  /* <p className="text-white mb-0">Talk to us...</p> */
}
{
  /* <i className="bi bi-chat-left-text-fill text-white text-2xl"></i> */
}
{
  /* </div> */
}
// </div>

import React, { useState } from "react";
import {
  ChevronRight,
  House,
  MessageCircleQuestionMark,
  MessageSquareText,
} from "lucide-react";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    const botResponse = {
      from: "bot",
      text: "Thanks for your query! Our agent will get back shortly.",
    };
    setMessages((prev) => [...prev, userMsg, botResponse]);
    setInput("");
  };

  return (
    <>
      {/* Floating Trigger */}

      <div className="fixed bottom-2 right-2 flex items-center gap-2 z-50">
        {/* Animated Text Bubble */}
        <div
          onClick={toggleChat}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`text-white px-4 py-2 cursor-pointer text-sm font-medium rounded-l-full shadow-md 
              backdrop-blur-md bg-[rgba(255,255,255,0.05)] border border-gray-600
              transition-all duration-500 ease-in-out text-nowrap ${
                isHovered ? "w-[140px] opacity-100" : "w-0 opacity-0"
              }
            `}
        >
          Just ask Kuku!
        </div>

        {/* Pulsing Icon */}
        <img
          src="/assets/img/ChatBotIcon.png"
          //src="/assets/img/chatbot_icon.png"
          alt="Chatbot"
          width={50}
          className={`
              scale-x-[-1] cursor-pointer rounded-full transition-transform`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={toggleChat}
        />
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-23 right-2 text-white rounded-xl overflow-hidden z-50 backdrop-blur-md bg-[rgba(50,50,50,0.99)] flex flex-col shadow-[0_0_20px_5px_rgba(255,255,255,0.6)]"
          style={{ maxWidth: "686px" }}
        >
          {/* Header */}
          <div className="p-4 shrink-0">
            <h3 className="text-white text-lg">
              Welcome to our smart tool. <br />
              Ask us all your questions and we will do our best to answer them!
            </h3>
          </div>

          {/* Body with scrollable and sticky footer */}
          <div className="flex flex-col flex-1 justify-between overflow-hidden">
            {/* Scrollable messages and questions */}
            <div className="flex flex-col flex-1 p-2 space-y-3 text-sm">
              <div className="flex flex-col gap-2">
                <div
                  className="flex justify-between items-center p-3 shadow-lg px-4 bg-black rounded-md cursor-pointer hover:shadow-2xl shadow-white"
                  onClick={() => navigate("/signIn")}
                >
                  <p className="mb-0">Login</p>
                  <ChevronRight />
                </div>
                <div
                  className="flex justify-between items-center p-3 shadow-lg px-4 bg-black rounded-md cursor-pointer hover:shadow-2xl shadow-white"
                  onClick={() => navigate("/compare-loans")}
                >
                  <p className="mb-0">Compare Loans</p>
                  <ChevronRight />
                </div>
                <div
                  className="flex justify-between items-center p-3  shadow-lg px-4 bg-black rounded-md cursor-pointer hover:shadow-2xl shadow-white"
                  onClick={() => navigate("/credit-analysis")}
                >
                  <p className="mb-0">Credit Analysis</p>
                  <ChevronRight />
                </div>
              </div>
            </div>

            {/* Footer section with icons and input */}
            <div className="p-4 space-y-3 shrink-0">
              <Divider color="white" className="mb-2" sx={{ height: "2px" }} />
              <div className="flex justify-around text-sm text-center">
                <div className="flex flex-col items-center p-1">
                  <House size={24} />
                  <p className="text-xl mb-0">Home</p>
                </div>
                <div className="flex flex-col items-center p-1">
                  <MessageSquareText size={24} />
                  <p className="text-xl mb-0">Message</p>
                </div>
                <div className="flex flex-col items-center p-1">
                  <MessageCircleQuestionMark size={24} />
                  <p className="text-xl mb-0">Help</p>
                </div>
              </div>
              <div className="flex rounded-md bg-[rgba(20,20,20,0.8)]">
                <input
                  type="text"
                  className="flex-1 bg-transparent border-none rounded-lg px-3 py-3 text-sm text-white focus:outline-none placeholder-gray-400 focus:ring-0"
                  placeholder="Talk to us..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
