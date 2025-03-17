# Okta OIDC DevOps Demo Application

A demonstration application showcasing secure authentication implementation using Okta's OIDC protocol. This application is built with vanilla JavaScript and Node.js, making it ideal for DevOps security demonstrations and learning purposes.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- An Okta Developer Account
  - Sign up at: https://developer.okta.com/signup/

## Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <repo-name>
```

2. Install dependencies:
```bash
npm install
```

3. Configure Okta:
   - Log in to your Okta Developer Console
   - Create a new OIDC application
     - Application type: Single-Page Application (SPA)
     - Login redirect URI: http://localhost:8080/callback.html
     - Logout redirect URI: http://localhost:8080
   - Note down your:
     - Okta Domain
     - Client ID

4. Set up environment variables:
```bash
cp .env.template .env
```
Edit `.env` file with your Okta configuration:
```plaintext
OKTA_ISSUER=https://{YOUR_OKTA_DOMAIN}/oauth2/default
OKTA_CLIENT_ID={YOUR_CLIENT_ID}
OKTA_REDIRECT_URI=http://localhost:8080/callback.html
PORT=8080
```

## Running the Application

1. Start the server:
```bash
npm start
```

2. Open your browser and navigate to: