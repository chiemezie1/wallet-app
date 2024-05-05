const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const {
    initiateUserControlledWalletsClient,
} = require("@circle-fin/user-controlled-wallets");

require("dotenv").config();

const client = initiateUserControlledWalletsClient({
    apiKey: process.env.API_KEY,
});


// Configure cors middleware with credentials and specific origin
app.use(cors({
    credentials: true,
    origin: 'https://wallet-app-frontend-alpha.vercel.app',
}));


app.post('/register', async (req, res) => {
    // Extract the username from the request body
    const { username } = req.body;
    let response;
    try {
        response = await client.createUser({
            userId: username,
        });
        console.log(response.data?.message);
        console.log(response.data?.code);
        res.status(200).json({ message: response.data?.message, code: response.data?.code });
    } catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.status === 409) {
            console.log('User already exists');
            res.status(409).json({ message: 'User already exists' });
        } else {
            console.log('Failed to create user');
            res.status(500).json({ message: 'Failed to create user' });
        }
    }
});

app.get('/login', async (req, res) => {
    // Extract the username from the query string
    const { username } = req.query;
    let response;
    try {
        response = await client.getUser({
            userId: username,
        });
        console.log(response.data);
        console.log(response.status);
        res.status(200).json({ message: response.data, code: response.data?.code });
    } catch (error) {
        console.error('Error:', error);
        if (error.response?.status === 155102) {
            console.log('Cannot find the userId in the system');
            res.status(409).json({ message: 'User Not Found' });
        } else {
            console.log('Failed to Login');
            res.status(500).json({ message: 'Failed to Login' });
        }
    }
});


app.post('/sessiontoken', async (req, res) => {
    // Extract the username from the request body
    const { username } = req.body;
    try {
        // Create user token using the provided username
        const response = await client.createUserToken({
            userId: username,
        });
        

        // Send a successful response with user token and encryption key
        res.status(200).json({
            userToken: response.data?.userToken,
            encryptionKey: response.data?.encryptionKey,
        });
    } catch (error) {
        console.error('Error:', error);
        // Handle different error scenarios
        if (error.response?.status === 155102) {
            console.log('Cannot find the userId in the system');
            res.status(409).json({ message: 'User Not Found' });
        } else {
            console.log('Failed to Generate key');
            res.status(500).json({ message: 'Failed to Generate key' });
        }
    }
});

app.post('/createwallet', async (req, res) => {
    let { username, selectedBlockchain, selectedWalletType, userToken } = req.body;

    try {
        if (typeof username !== 'string') username = String(username);
        if (typeof selectedBlockchain !== 'string') selectedBlockchain = String(selectedBlockchain);
        if (typeof selectedWalletType !== 'string') selectedWalletType = String(selectedWalletType);
        if (typeof userToken !== 'string') userToken = String(userToken);

        console.log('Request received for wallet creation:', username, selectedBlockchain, selectedWalletType, userToken);

        let response;
        if (selectedBlockchain === 'EOA') {
            response = await client.createUserPinWithWallets({
                userId: username,
                blockchains: [selectedBlockchain],
                userToken: userToken,
            });
        } else {
            response = await client.createUserPinWithWallets({
                userId: username,
                blockchains: [selectedBlockchain],
                accountType: selectedWalletType,
                userToken: userToken,
            });
        }

        console.log('Response received for wallet creation:', response.data);
        console.log('Challenge ID:', response.data?.challengeId);

        res.status(200).json({ challengeId: response.data?.challengeId });
    } catch (error) {
        console.error('Error creating wallet:', error);

        if (error.response?.data?.code === 2) res.status(409).json({ message: 'API parameter invalid' });
        else res.status(500).json({ message: 'Failed to create wallet' });
    }
});

app.post('/transfer', async (req, res) => {
    try {
        let { username, amount, recipient, currency, userToken } = req.body;
        let UUIDs = await fetchUUIDs();
        const walletId = process.env.WALLET_ID;
        const tokenId = process.env[currency + '_TOKEN_ID'];

        if (!UUIDs || UUIDs.length === 0) {
            console.error('Error: No UUIDs fetched');
            return res.status(500).json({ message: 'Failed to create transaction' });
        }

        if (typeof username !== 'string') username = String(username);
        if (typeof recipient !== 'string') recipient = String(recipient);
        if (typeof walletId !== 'string') walletId = String(walletId);
        if (typeof tokenId !== 'string') tokenId = String(tokenId);
        if (typeof userToken !== 'string') userToken = String(userToken);

        console.log('Request received for Transaction creation:', username, recipient, walletId, userToken, tokenId);

        let response = await client.createTransaction({
            idempotencyKey: UUIDs[0],
            amounts: [amount],
            destinationAddress: recipient,
            tokenId: tokenId,
            walletId: walletId,
            userId: username,
            fee: {
                type: "level",
                config: {
                    feeLevel: "MEDIUM",
                },
            },
            userToken: userToken, 
        });

        console.log('Response received for create Transaction:', response.data);
        console.log('Challenge ID:', response.data?.challengeId);

        res.status(200).json({ challengeId: response.data?.challengeId });
    } catch (error) {
        console.error('Error creating transaction:', error);

        if (error.response?.data?.code === 2) {
            res.status(409).json({ message: 'API parameter invalid' });
        } else {
            res.status(500).json({ message: 'Failed to create transaction' });
        }
    }
});

app.post('/restore', async (req, res) => {
    try {
        let { username, userToken } = req.body;
        let UUIDs = await fetchUUIDs();

        if (!UUIDs || UUIDs.length === 0) {
            console.error('Error: No UUIDs fetched');
            return res.status(500).json({ message: 'Failed to create restore' });
        }

        if (typeof username !== 'string') username = String(username);
        if (typeof userToken !== 'string') userToken = String(userToken);

        console.log('Request received for restore creation:', username, userToken);

        let response = await client.restoreUserPin({
            userToken: userToken,
            userId: username,
            idempotencyKey: UUIDs[0]
        });

        console.log('Response received for create restore:', response.data);
        console.log('Challenge ID:', response.data?.challengeId);

        res.status(200).json({ challengeId: response.data?.challengeId });
    } catch (error) {
        console.error('Error creating restore:', error);

        if (error.response?.data?.code === 2) {
            res.status(409).json({ message: 'API parameter invalid' });
        } else {
            res.status(500).json({ message: 'Failed to create restore' });
        }
    }
});


app.post('/balance', async (req, res) => {
    const { username, userToken } = req.body;
 
    try {
        // Get the balance of the wallet
        let response = await client.getWalletTokenBalance({
            walletId: process.env.WALLET_ID,
            userToken: userToken,
            userId: username,
          });
          console.log(response.data?.tokenBalances);
        res.status(200).json({
            tokenBalances: response.data?.tokenBalances,
        });
    } catch (error) {
        console.error('Error:', error);
        // Handle different error scenarios
        if (error.response?.status === 155102) {
            console.log('Cannot find the userId in the system');
            res.status(409).json({ message: 'User Not Found' });
        } else {
            console.log('Failed to Generate key');
            res.status(500).json({ message: 'Failed to get balance' });
        }
    }
});


app.post('/transactions', async (req, res) => {
    try {
        let { blockchain, userToken } = req.body;

        if (!blockchain || !userToken) {
            return res.status(400).json({ message: 'Blockchain and userToken are required' });
        }

        blockchain = String(blockchain);
        userToken = String(userToken);

        const response = await client.listTransactions({
            userToken: userToken,
            blockchain: blockchain,
        });

        // Extract necessary data from response
        const transactions = response.data.transactions;
        console.log('List of transactions:', transactions);

        // Send response with transactions
        res.status(200).json({ transactions: transactions });
    } catch (error) {
        console.error('Error listing transactions:', error);

        if (error.response?.data?.code === 2) {
            res.status(409).json({ message: 'API parameter invalid' });
        } else {
            res.status(500).json({ message: 'Failed to list transactions' });
        }
    }
});

async function fetchUUIDs() {
    const url = 'https://www.uuidgenerator.net/api/version4';
    const headers = {
        'User-Agent': 'Your-User-Agent',
        'Accept': 'application/json'
    };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error('Failed to fetch UUIDs');
        }
        const uuids = await response.json();
        return uuids;
    } catch (error) {
        console.error('Error fetching UUIDs:', error.message);
        return null;
    }
}



const PORT = 4400;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
