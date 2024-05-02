

// #Step 1 - Create a new user
async function createNewUser(userId) {
  let response = await client.createUser({
    userId: userId,
  });
  return response
}

// #Step 2 - Create a new user
async function getAUser(userId) {
  let response = await client.getUser({
    userId: userId,
  });
}

// #Step 3 - Create session token
async function createSessionToken(userId) {
  let response = await client.createUserToken({
    userId: userId,
  });

  console.log(response.data);
}

// #Step 3 - Create Challenge for Wallet Creation
async function createChallengeForWalletCreation(userId, blockchains, userToken) {
  let response = await client.createUserPinWithWallets({
    userId: userId,
    blockchains: blockchains,
    userToken: userToken,
  });

  console.log(response.data?.challengeId);
}

// #Step 4 - Create Challenge for SCA Wallet Creation
async function createChallengeForSCAWalletCreation(userId, blockchains, accountType, userToken) {
  let response = await client.createUserPinWithWallets({
    userId: userId,
    blockchains: blockchains,
    accountType: accountType,
    userToken: userToken,
  });

  console.log(response.data?.challengeId);
}

// #Step 5 - Fetch Wallet Balance
async function fetchWallet(walletId, userToken, userId) {
  let response = await client.getWalletTokenBalance({
    walletId: walletId,
    userToken: userToken,
    userId: userId,
  });

  console.log(response.data?.tokenBalances);
}

// #Step 6 - Create Challenge for Outbound Transfer
async function createChallengeForOutboundTransfer(idempotencyKey, amounts, destinationAddress, tokenId, walletId, userId, feeType, feeLevel, userToken) {
  let response = await client.createTransaction({
    idempotencyKey: idempotencyKey,
    amounts: amounts,
    destinationAddress: destinationAddress,
    tokenId: tokenId,
    walletId: walletId,
    userId: userId,
    fee: {
      type: feeType,
      config: {
        feeLevel: feeLevel,
      },
    },
    userToken: userToken,
  });
  console.log(response.data?.challengeId);
}

module.exports = {
  createNewUser,
  getAUser,
  createSessionToken,
  createChallengeForWalletCreation,
  createChallengeForSCAWalletCreation,
  fetchWallet,
  createChallengeForOutboundTransfer,
};
