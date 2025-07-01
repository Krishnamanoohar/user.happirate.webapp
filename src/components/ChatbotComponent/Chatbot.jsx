// import React from "react";

// const Chatbot = () => {
//   const [showChat, setShowChat] = useState(true);
//   return (
//     <div
//       className="fixed d-flex justify-center items-center right-4 bottom-4 p-4 rounded-circle bg-[#2980b9] h-18 w-18 shadow-xl cursor-pointer"
//       style={{ background: "#2980b9" }}
//     >
//       <i class="bi bi-chat-left-text-fill text-white text-2xl"></i>
//       {showChat && (
//         <div>
//           <div className="bg-[#2980b9]"></div>
//           <i class="bi bi-person-fill"></i>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;

import React, { useState } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    const botResponse = {
      from: "bot",
      text: "Thanks for your query! Our agent will get back shortly.", // You can integrate backend here
    };

    setMessages((prev) => [...prev, userMsg, botResponse]);
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed items-center justify-center bottom-6 right-6 z-50 bg-blue-600 text-white text-center rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 rounded-circle w-16 h-17 border border-white shadow-xl cursor-pointer active:bg-red-600"
        aria-label="Open chat"
        style={{ background: "#2980b9", cursor: "pointer" }}
      >
        {isOpen ? (
          <i class="bi bi-x-lg text-white text-2xl"></i>
        ) : (
          <i class="bi bi-chat-left-text-fill text-white text-2xl"></i>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-25 right-10 w-80 bg-white shadow-2xl rounded-xl overflow-hidden z-50 flex flex-col h-[70%] w-[28%]">
          <div
            className="bg-[#2980b9] text-white px-4 py-3 font-semibold"
            style={{
              background:
                "linear-gradient(to right,rgb(1, 114, 152),rgb(35, 161, 207),rgb(24, 124, 190))",
            }}
          >
            {/* 💬 Ask an Expert */}
            <div className="bg-transparent text-white">
              <h4 className="text-lg font-semibold text-white">Hi there! 👋</h4>
              <p
                className="text-sm text-blue-100"
                style={{ marginBottom: "0" }}
              >
                I'm your Loan Assistant. Ask me anything or let’s get you
                started!
              </p>
            </div>
          </div>

          <div className="flex flex-column justify-between h-[100%] bg-white">
            <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-80 text-sm bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg max-w-[70%] ${
                      msg.from === "user"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex border-t px-3 py-2 bg-white">
              <input
                type="text"
                className="flex-1 border rounded-lg px-3 py-1 text-sm focus:outline-none"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="ml-2 text-blue-600 hover:text-blue-800 rotate-45"
              >
                {/* <IoMdSend className="text-xl" /> */}
                <i class="bi bi-send text-2xl"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;

// <>
//   {/* Chat Icon Button */}
//   <button
//     onClick={() => setIsOpen(!isOpen)}
//     className="fixed items-center justify-center bottom-6 right-6 z-50 bg-blue-600 text-white text-center rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 rounded-circle w-18 h-19 border border-white shadow-xl"
//     aria-label="Open chat"
//     style={{ background: "#2980b9" }}
//   >
//     {isOpen ? (
//       <i class="bi bi-x-lg text-white text-3xl"></i>
//     ) : (
//       <i class="bi bi-chat-left-text-fill text-white text-2xl"></i>
//     )}
//   </button>

//   {/* Chat Popup */}
//   {isOpen && (
//     <div
//       className="fixed bottom-28 right-10 z-40 w-80 bg-white rounded-xl shadow-2xl overflow-hidden animate-fade-in-up border border-gray-200"
//       style={{ background: "none" }}
//     >
//       <div className="bg-blue-600 text-white p-4">
//         <h4 className="text-lg font-semiboldt text-white">Hi there! 👋</h4>
//         <p className="text-sm text-blue-100">
//           I'm your Loan Assistant. Ask me anything or let’s get you started!
//         </p>
//       </div>
//       <div className="p-4 space-y-3" style={{ background: "none" }}>
//         <div className="text-sm text-gray-700">
//           🔐 <strong>Your privacy is our priority.</strong> No spam, no
//           calls—just secure help.
//         </div>

//         <div className="flex gap-2 mt-4">
//           <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
//             Start Chat
//           </button>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="text-sm text-gray-500 hover:underline"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   )}
// </>
