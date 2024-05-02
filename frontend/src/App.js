import { Link } from 'react-router-dom';
import "./App.css"
import backgroundImage from "./backgroundImage.png"

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
      <div className="relative z-20 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-down" style={{ animationDelay: '0.3s' }}>Welcome to Crypto Wallet</h1>
        <p className="text-lg md:text-xl mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>Securely manage your digital assets with ease</p>
        <div className="flex justify-center space-x-4 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <Link to="/login" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out animate-bounce">
            Log In
          </Link>
          <Link to="/register" className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out animate-bounce">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default App

