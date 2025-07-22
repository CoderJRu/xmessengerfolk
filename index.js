import express from "express";
import {
  connectSdk,
  loggingMnemonics,
  generateKeypair,
} from "./demosInstance.js";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import { generateID, generateFloatID, delay, abbrNum } from "./matheFunc.js";
import { lastNames, firstNames } from "./names.js";
import DeploymentReadinessChecker from "./deployment-checker.js";
import { setupMessenger } from "./instantMessage.js";
//import { setupMessenger } from "./instantMessage.js";
const app = express();
// Add error handling for unhandled rejections
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});
const supaKey = process.env["SUPABASE_KEY"];
const supaUrl = process.env["SUPABASE_URL"];
const supabase = createClient(supaUrl, supaKey);

const InsertDb = async (newData, pubKey) => {
  try {
    const { data, error } = await supabase.from("user").insert({
      api: pubKey,
      data: newData,
    });
  } catch (err) {}
};

const UpdateDb = async (table, data, target, targetValue) => {
  const { error } = await supabase
    .from(table)
    .update({
      data: data,
    })
    .eq(target, targetValue);
};

const FetchDb = async (table, target, targetValue) => {
  const { data: _data } = await supabase
    .from(table)
    .select()
    .eq(target, targetValue);
  return _data;
};

const corsOption = {
  origin: [
    "https://38091a36-f5e0-4f69-abf4-8e2354cc1aee-00-1mt2da426qtul.riker.replit.dev:3001/",
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
    "https://xbundle-dapp.replit.app",
    "https://xbundle.cloud",
    "http://84.247.128.61:3005",
  ],
  optionSucessStatus: 200,
};

app.use(express.static("public"), cors(corsOption), express.json());

connectSdk();
//"https://demosnode.discus.sh"

app.post("/generatePhrases", async (req, res) => {
  try {
    const { _mnemonics, _status, _kepair, _publicKey, _privateKey } =
      await generateKeypair();
    var resultsjson = { _mnemonics, _status, _kepair, _publicKey, _privateKey };
    console.log(resultsjson);
    res.status(200).json({ _res: resultsjson });
  } catch (err) {
    console.log(err);
    res.status(200).json({ _res: "error" });
  }
});

app.post("/createAccount", async (req, res) => {
  try {
    let bodyJson = req.body;
    var _keyPair = bodyJson.Keypair;
    var publicKey = _keyPair.publicKey;
    console.log(_keyPair.publicKey);
    //return;
    var selectedFirstName = firstNames[generateID(0, firstNames.length - 1)];
    var selectedLastName = lastNames[generateID(0, lastNames.length - 1)];
    var _username =
      selectedFirstName + " " + selectedLastName + "_" + generateID(1000, 9999);
    var _newData = {
      id: generateID(1010101010101, 1781109012010999),
      username: _username,
      publicKey: publicKey,
    };
    await InsertDb(_newData, publicKey);
    res.status(200).json({ _res: "success", data: _newData });
    //await InsertDbb()
    //insert acc to db
  } catch (err) {
    console.log(err);
  }
});

app.post("/loginPhrase", async (req, res) => {
  try {
    let bodyJson = req.body;
    var _phraseList = bodyJson.PhraseList;
    var status = await loggingMnemonics(_phraseList);
    const decoder = new TextDecoder();
    console.log(
      "public is ",
      Buffer.from(status.keypair.publicKey).toString("hex"),
    );
    var myData = await FetchDb(
      "user",
      "api",
      Buffer.from(status.keypair.publicKey).toString("hex"),
    );
    if (myData.length > 0) {
      var fetchedData = myData[0].data;
      var myidentity = status.identity;
      var peer = await setupMessenger(myidentity, fetchedData.id);
      console.log("peer is ", peer);
      //ceate a message recieve promise of the logged data
      res.status(200).json({ _res: "success", data: fetchedData, peer: peer });
    }
  } catch (err) {
    res.status(200).json({ _res: "error" });
    console.log(err);
  }
});

app.post("/sendMessage", async (req, res) => {
  try {
    let bodyJson = req.body;
    var profileID = bodyJson.profileID;
    var message = bodyJson.message;
    var reciever_pub_key = bodyJson.currentChatBuddyPublicId;
    var _phraseList = bodyJson.PhraseList;
    var status = await loggingMnemonics(_phraseList);
    var myidentity = status.identity;
    var peer = await setupMessenger(myidentity, profileID);
    //get reciver id
    var myData = await FetchDb("user", "api", reciever_pub_key);
    let reciever_id = 0;
    if (myData.length > 0) {
      var fetchedData = myData[0].data;
      reciever_id = fetchedData.id;
      //create a peer;

      await peer.sendMessage(`xm_user-${reciever_id}`, message);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("recieveMessageUpdates", async (req, res) => {
  //late Update at most every 2secs
  try {
    let bodyJson = req.body;
    var profileID = bodyJson.profileID;
    var _phraseList = bodyJson.PhraseList;
    var status = await loggingMnemonics(_phraseList);
    var myidentity = status.identity;
    var peer = await setupMessenger(myidentity, profileID);
    //missing step fetch list of chatt buddies id and pput them list
    peer.onMessage((message, fromId) => {
      console.log(`Message from ${fromId}:`, message);
    });
  } catch (err) {
    console.log(err);
  }
});
//when a new public key is seacrhed and interatcted with automatically that individual becomes your chat buddy.
app.post("setChatBuddy", async (req, res) => {});

// Search users by public key
app.post("/api/search-users", async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query || query.length < 3) {
      return res.json([]);
    }
    
    let searchResults;
    
    // If query is a complete 64-character hex string, search for exact match
    if (query.length === 64 && /^[a-fA-F0-9]+$/.test(query)) {
      const { data, error } = await supabase
        .from('user')
        .select('api, last_seen')
        .eq('api', query);
        
      if (error) throw error;
      searchResults = data;
    } else {
      // Search for partial matches using ILIKE
      const { data, error } = await supabase
        .from('user')
        .select('api, last_seen')
        .ilike('api', `%${query}%`)
        .limit(10);
        
      if (error) throw error;
      searchResults = data;
    }
    
    // Format results for frontend
    const formattedResults = searchResults.map(user => ({
      public_key: user.api,
      last_seen: user.last_seen || 'Never online',
      status: 'Available for chat'
    }));
    
    res.json(formattedResults);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Update chat buddy and current chat
app.post("/api/update-chat-buddy", async (req, res) => {
  try {
    const { currentUser, targetUser } = req.body;
    
    if (!currentUser || !targetUser) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Get current user data
    const { data: userData, error: fetchError } = await supabase
      .from('user')
      .select('chat_buddies')
      .eq('api', currentUser)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Parse current chat buddies or initialize empty array
    let chatBuddies = [];
    if (userData.chat_buddies) {
      try {
        chatBuddies = JSON.parse(userData.chat_buddies);
      } catch (e) {
        chatBuddies = [];
      }
    }
    
    // Check if target user is already in chat buddies
    if (!chatBuddies.includes(targetUser)) {
      chatBuddies.push(targetUser);
    }
    
    // Update database with new chat buddy and current chat
    const { error: updateError } = await supabase
      .from('user')
      .update({
        current_chat_buddy: targetUser,
        chat_buddies: JSON.stringify(chatBuddies)
      })
      .eq('api', currentUser);
    
    if (updateError) throw updateError;
    
    res.json({ 
      success: true, 
      current_chat_buddy: targetUser,
      chat_buddies: chatBuddies 
    });
  } catch (error) {
    console.error('Update chat buddy error:', error);
    res.status(500).json({ error: 'Failed to update chat buddy' });
  }
});

// Intelligent deployment readiness checker endpoint
app.get("/deployment-status", async (req, res) => {
  try {
    const checker = new DeploymentReadinessChecker();
    const result = await checker.runAllChecks();

    res.status(200).json({
      ready: result.ready,
      score: result.percentage,
      details: {
        total_checks: result.checks,
        errors: result.errors,
        warnings: result.warnings,
        timestamp: new Date().toISOString(),
      },
      message: result.ready
        ? "Application is ready for deployment!"
        : "Issues found - check logs for details",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Deployment check failed", details: err.message });
  }
});

// Quick health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

const PORT = process.env.PORT || 5000;
app
  .listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`🚀 Deployment checker available at: /deployment-status`);
  })
  .on("error", (err) => {
    console.error("Server failed to start:", err);
    process.exit(1);
  });
