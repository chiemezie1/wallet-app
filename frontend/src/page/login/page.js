import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import create_wallect from '../../create_wallect.png';
import { useUser } from '../../userContext/UserContext';

function CreateUser() {
  const [username, setUsername] = useState('');
  const { updateUserDetails, resetUserDetails } = useUser();
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const box = document.querySelector('.box');
      box.classList.add('move-from-left');
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetUserDetails();
    if (username.trim() === '') {
        setResponse('Username cannot be empty');
        return;
    }
    try {
        const url = new URL("https://circle-wallet-backend.vercel.app/");
        url.searchParams.append('username', username);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        if (response.ok) {
            const user = data.message.user;
            updateUserDetails({
                id: user.id,
                status: user.status,
                createDate: user.createDate,
                pinStatus: user.pinStatus,
                blockchain: user.blockchain,
                pinDetails: user.pinDetails
            });

            // Redirect to the dashboard or profile page
            navigate('/wallet');
        } else {
            if (data.code === 155102) {
                setResponse('User not found');
            } else {
                console.error('Error:', data.message);
                setResponse(data.message);
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
        setResponse('Failed to log in');
    }
};


  return (
    <div
      className="flex justify-center items-center h-screen bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${create_wallect})`,
      }}
    >
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-md box">
        <h2 className="text-2xl mb-4 px-5">Login to your account</h2>
        {response && <p className="text-yellow-500 font-bold mb-2">{response}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="bg-gray-800 text-white border-b-2 border-gray-600 focus:outline-none focus:border-green-500 mb-4 px-8 py-2 w-full rounded-md"
          />
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">Login</button>
        </form>
        <p className="mt-4 text-center">No account? <Link to="/register" className="text-blue-500">Click to register</Link></p>
      </div>
    </div>
  );
}

export default CreateUser;
