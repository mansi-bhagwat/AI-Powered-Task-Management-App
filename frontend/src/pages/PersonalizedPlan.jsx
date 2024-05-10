import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import axios from 'axios';

const PersonalizedPlan = () => {
  const [message, setMessage] = useState('');
  const [responseLog, setResponseLog] = useState([]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    const userMessage = { role: 'user', content: message };
    setResponseLog((prevLog) => [...prevLog, userMessage]);

    try {
      const result = await axios.post('http://localhost:5555/openai/chat', {
        message: message,
      });

      const chatbotResponse = { role: 'assistant', content: result.data.response };
      setResponseLog((prevLog) => [...prevLog, chatbotResponse]);
    } catch (error) {
      console.error('Error in API call:', error);
      const errorMessage = { role: 'assistant', content: 'Error fetching personalized plan.' };
      setResponseLog((prevLog) => [...prevLog, errorMessage]);
    }

    setMessage('');
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center p-6 text-gray-900">
      <BackButton />
      <h1 className="text-3xl my-8 font-semibold">Chat with GPT-3.5 Turbo</h1>
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 mb-8 transition-all ease-in-out duration-300">
        <div className="overflow-y-auto h-96 border-b pb-4 mb-4">
          {responseLog.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-lg p-3 m-2 rounded-lg shadow-md ${
                  msg.role === 'user'
                    ? 'bg-blue-500 text-white animate-slide-in-right'
                    : 'bg-gray-200 text-gray-900 animate-slide-in-left'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <textarea
            className="w-full h-24 p-2 border rounded shadow-md resize-none"
            placeholder="Enter your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-sky-300 hover:bg-sky-600 text-white px-4 py-2 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedPlan;
