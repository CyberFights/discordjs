const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const fetch = require("node-fetch");
const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("endpoints");
});


// API endpoint to get OAuth token
app.get('/discord/oauth/token', (req, res) => {
const API_ENDPOINT = 'https://discord.com/api/v10';
const CLIENT_ID = req.query.clientId;
const CLIENT_SECRET = req.query.clientSecret;
const REDIRECT_URI = 'http://kdacbot.com/login';

async function exchangeCode(code) {
  const data = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URI
  });

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  const response = await fetch(`${API_ENDPOINT}/oauth2/token`, {
    method: 'POST',
    headers: headers,
    body: data,
    auth: `${CLIENT_ID}:${CLIENT_SECRET}`
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}
});


app.post("/api/botavatar", async (req, res) => {
  const { botToken } = req.body;
  if (!botToken) return res.status(400).send("Bot token are required");
  const filePath = "./skynet.gif"; // Path to the avatar gif

  if (!fs.existsSync(filePath)) {
    console.error(`File does not exist: ${filePath}`);
    return;
  }

  try {
    const newAvatar = fs.readFileSync(filePath);

    if (!newAvatar) {
      console.error("Failed to read the file or the file is empty.");
      return;
    }

    const base64Avatar = newAvatar.toString("base64");
    if (!base64Avatar) {
      console.error("Failed to convert the avatar to base64.");
      return;
    }

    const response = await fetch("https://discord.com/api/v9/users/@me", {
      method: "PATCH",
      headers: {
        Authorization: `Bot ${botToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: `data:image/gif;base64,${base64Avatar}`,
      }),
    });

    if (response.ok) {
      console.log("Avatar updated successfully!");
    } else {
      console.error(`Failed to update avatar: ${response.statusText}`);
      const responseBody = await response.text();
      console.error(`Response body: ${responseBody}`);
    }
  } catch (error) {
    console.error(`Error updating avatar: ${error}`);
  }
});
app.post("/api/members", async (req, res) => {
  const { botToken, serverId } = req.body;
  if (!botToken || !serverId)
    return res.status(400).send("Bot token and server ID are required");

  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bot ${botToken}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${serverId}/members?limit=1000&after=0`,
      requestOptions
    );
    const result = await response.json();
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log("error", error);
  }
});
app.post("/api/botinfo", async (req, res) => {
  const { botToken, botId } = req.body;
  if (!botToken || !botId)
    return res.status(400).send("Bot token and server ID are required");

  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bot ${botToken}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      `https://discord.com/api/v10/applications/${botId}`,
      requestOptions
    );
    const result = await response;
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/api/getmessage", async (req, res) => {
  const channelId = req.query.channelId;
  const botToken = req.query.botToken;
  const messageId = req.query.messageId;

  const url = `https://discord.com/api/v10/channels/${channelId}/messages/${messageId}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bot ${botToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      res.json(data);
    } else {
      res
        .status(response.status)
        .json({ error: "Failed to fetch channel messages" });
    }
  } catch (error) {
    console.error("Error fetching channel messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => console.log("Server is running on port 3000"));
