
# Circle Wallet App Backend

This project implements a backend service using Node.js and Express to interact with the Circle APIs for managing user-controlled wallets on the Ethereum-Sepolia blockchain. It includes endpoints for user registration, login, session token generation, wallet creation, balance checking, transaction listing, and more.

## Getting Started

### Prerequisites

- Node.js (version 12.x or higher recommended)
- npm (usually comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/chiemezie1/wallet-app.git

   cd wallet-app && cd backend
   
   ```

1. **Install dependencies:**
    
    ```bash

    npm install
    
    ```
    
2. **Set up environment variables:**
    - Copy the **`.env.example`** file to a new file named **`.env`**.
    - Fill in the **`.env`** file with your actual API keys, wallet IDs, and other necessary configuration details.
    
    ```bash
    cp .env.example .env 
    ```
    

### **Configuration**

Edit the **`.env`** file in the root of your project directory:

```
API_KEY="your_api_key_here"
APP_ID="your_app_id_here"
WALLET_ID="your_wallet_id_here"
USDC_TOKEN_ID="your_usdc_token_id_here"
EURC_TOKEN_ID="your_eurc_token_id_here"
ETH_TOKEN_ID="your_eth_token_id_here"

```

These values are essential for the API requests to function properly.

### **Running the Server**

To start the server, run:

```bash
npm start
```

This will start the Express server on port 4400, or another port if configured in the **`.env`** file.

## **API Endpoints**

- **`POST /register`**: Registers a new user.
- **`POST /login`**: Authenticates a user and retrieves user details.
- **`POST /sessiontoken`**: Generates a session token for a user.
- **`POST /createwallet`**: Creates a new wallet for a user on a specified blockchain.
- **`POST /transfer`**: Handles cryptocurrency transfers between wallets.
- **`POST /restore`**: Restores user access.
- **`POST /balance`**: Retrieves the balance of a user's wallet.
- **`POST /transactions`**: Lists transactions for a user.

Each endpoint expects JSON in the request body and returns JSON responses with appropriate HTTP status codes.

## **Error Handling**

The server is configured to handle errors gracefully and will return appropriate error messages and HTTP status codes depending on the issue encountered.

## **Security**

Ensure that your API key and other sensitive details are not exposed publicly.

## **Folder Structure**

```
backend/
├── README.md
├── node_modules/
├── .env.example
├── package-lock.json
├── package.json
└── server.js
```

## **License**
This project is licensed under the MIT License. See the LICENSE file in the project root for more information.

## **Contributing**

Submite a pull requests.
## **Contact**

Contact – chiemezieagbo1@gmail.com

Project Link: https://github.com/chiemezie1/wallet-app
