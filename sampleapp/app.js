const authClient = new OktaAuth(config);

// Check if we're authenticated
authClient.authStateManager.subscribe(authState => {
    // Only handle home page redirects
    if (window.location.pathname === '/') {
        if (authState.isAuthenticated) {
            window.location.replace('/profile.html');
        } else {
            document.getElementById('authenticated').style.display = 'none';
            document.getElementById('unauthenticated').style.display = 'block';
        }
    }
});

// Start the authentication flow
function login() {
    authClient.signInWithRedirect();
}

// Logout function
async function logout() {
    try {
        // Get the ID token before clearing
        const idToken = await authClient.tokenManager.get('idToken');

        console.log(idToken);
        
        // Clear local tokens
        await authClient.tokenManager.clear();
        
        // Perform complete Okta logout
        await authClient.signOut({
            postLogoutRedirectUri: window.location.origin,
            idToken: idToken?.value,
            clearTokensBeforeRedirect: true,
            revokeTokens: true,
            revokeAccessToken: true,
            revokeRefreshToken: true
        });
    } catch (error) {
        console.error('Error logging out:', error);
        // Even if there's an error, redirect to home
        window.location.replace('/');
    }
}

// Initialize the auth state
authClient.authStateManager.updateAuthState(); 