import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import create_wallect from '../../create_wallect.png'

function CreateUser() {
  const [username, setUsername] = useState('');
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() === '') {
      setResponse('Username cannot be empty');
      return;
    }
    try {
      const response = await fetch("https://wallet-app-server.vercel.app/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('User created successfully:', data);
        // Redirect to login page
        setResponse(data.message);
        navigate('/login');
      } else {
        console.error('Error:', data.message);
        setResponse(data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setResponse('Failed to create user');
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url(${create_wallect})`,
        backgroundSize: 'cover',
      }}
    >
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4">Create User</h2>
        {response && <p className="text-yellow-500 font-bold mb-2">{response}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="bg-gray-800 text-white border-b-2 border-gray-600 focus:outline-none focus:border-green-500 mb-4 px-8 py-2 w-full rounded-md"
          />
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">Create User</button>
        </form>
        <p className="mt-4 text-center">Already have an account? <Link to="/login" className="text-blue-500">Click here to login</Link></p>
      </div>
    </div>
  );
}

export default CreateUser;
