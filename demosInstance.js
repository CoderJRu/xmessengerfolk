// demosInstance.js - Demo SDK functionality

export const connectSdk = () => {
  console.log("Demo SDK connected successfully");
  return true;
};

export const generateKeypair = async () => {
  // Generate a simple mock keypair for demo purposes
  const mockKeypair = {
    publicKey: "demo_public_key_" + Date.now(),
    privateKey: "demo_private_key_" + Date.now()
  };
  
  const mockMnemonics = [
    "abandon", "ability", "able", "about", "above", "absent",
    "absorb", "abstract", "absurd", "abuse", "access", "accident"
  ];
  
  return {
    _mnemonics: mockMnemonics,
    _status: "success",
    _kepair: mockKeypair,
    _publicKey: mockKeypair.publicKey,
    _privateKey: mockKeypair.privateKey
  };
};

export const loggingMnemonics = async (phraseList) => {
  // Mock login with mnemonics
  const mockKeypair = {
    publicKey: Buffer.from("demo_restored_key_" + Date.now())
  };
  
  return {
    keypair: mockKeypair,
    status: "success"
  };
};