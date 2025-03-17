const authClient = new OktaAuth(config);

async function checkTokens() {
    try {
        // First check if we have valid tokens
        const accessToken = await authClient.tokenManager.get('accessToken');
        const idToken = await authClient.tokenManager.get('idToken');
        
        if (!accessToken || !idToken) {
            console.log('No valid tokens found');
            window.location.replace('/');
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error checking tokens:', error);
        window.location.replace('/');
        return false;
    }
}

async function displayUserInfo() {
    try {
        const hasValidTokens = await checkTokens();
        if (!hasValidTokens) return;

        const user = await authClient.getUser();
        if (!user) {
            console.log('No user info found');
            window.location.replace('/');
            return;
        }

        // Display profile information
        const profileDetails = document.getElementById('profile-details');
        const profileFields = {
            'Name': user.name,
            'Email': user.email,
            'Username': user.preferred_username,
            'Locale': user.locale,
            'Updated At': new Date(user.updated_at).toLocaleString()
        };

        profileDetails.innerHTML = Object.entries(profileFields)
            .map(([label, value]) => `
                <div class="label">${label}:</div>
                <div>${value || 'N/A'}</div>
            `).join('');

        // Get tokens directly from token manager
        const idToken = await authClient.tokenManager.get('idToken');
        const accessToken = await authClient.tokenManager.get('accessToken');

        // Display ID Token
        if (idToken) {
            const idTokenElement = document.getElementById('id-token');
            idTokenElement.textContent = JSON.stringify(idToken, null, 2);
        }

        // Display Access Token
        if (accessToken) {
            const accessTokenElement = document.getElementById('access-token');
            accessTokenElement.textContent = JSON.stringify(accessToken, null, 2);
        }

    } catch (error) {
        console.error('Error displaying user info:', error);
        window.location.replace('/');
    }
}

// Check authentication state
authClient.authStateManager.subscribe(async (authState) => {
    if (!authState.isAuthenticated) {
        window.location.replace('/');
        return;
    }
    await displayUserInfo();
});

// Logout function
async function logout() {
    try {
       
        // Clear local tokens
        //await authClient.tokenManager.clear();
        
        // Perform complete Okta logout
        await authClient.signOut({
            postLogoutRedirectUri: window.location.origin,
            clearTokensBeforeRedirect: true
        });
    } catch (error) {
        console.error('Error logging out:', error);
        // Even if there's an error, redirect to home
        window.location.replace('/');
    }
}

// Initialize the auth state
authClient.authStateManager.updateAuthState(); 