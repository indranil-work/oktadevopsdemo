const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Create a route to serve the config
app.get('/config.js', (req, res) => {
    const config = {
        issuer: process.env.OKTA_ISSUER,
        clientId: process.env.OKTA_CLIENT_ID,
        redirectUri: process.env.OKTA_REDIRECT_URI,
        scopes: ['openid', 'profile', 'email'],
        pkce: true
    };
    
    res.set('Content-Type', 'application/javascript');
    res.send(`const config = ${JSON.stringify(config, null, 2)};`);
});

// Handle all other routes
app.get('*', (req, res) => {
    if (req.path === '/callback') {
        res.sendFile(path.join(__dirname, 'callback.html'));
    } else if (req.path === '/profile.html') {
        res.sendFile(path.join(__dirname, 'profile.html'));
    } else {
        res.sendFile(path.join(__dirname, 'index.html'));
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});