import { instantMessaging } from "@kynesyslabs/demosdk";
import { encryption } from "@kynesyslabs/demosdk";

const unifiedCrypto = encryption.ucrypto;

export async function setupMessenger() {
    // Generate identities
    /* NOTE: This part is not necessary when using a SDK instance 
    that has already generated identities */
    const masterSeed = crypto.randomBytes(128);
    console.log(masterSeed);
    await unifiedCrypto.generateAllIdentities(masterSeed);
    const mlKemAes = await unifiedCrypto.getIdentity("ml-kem-aes");

    // Create and connect peer
    const peer = new instantMessaging.MessagingPeer({
        serverUrl: "ws://your-signaling-server:3005",
        clientId: "user-" + Date.now(),
        publicKey: mlKemAes.publicKey,
    });

    await peer.connect();

    // Set up message handler
    peer.onMessage((message, fromId) => {
        console.log(`Message from ${fromId}:`, message);
    });

    // Discover available peers
    const peers = await peer.discoverPeers();
    console.log("Available peers:", peers);

    return peer;
}

// Use the messenger
const messenger = await setupMessenger();
