// Example 3: Sensitive Data Exposure
// This code demonstrates patterns that expose sensitive information

const express = require('express');
const app = express();

// BAD: Exposing password in response
app.get('/user/:id', (req, res) => {
  const user = database.getUser(req.params.id);
  
  // This should trigger our data exposure rule
  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,  // Sensitive!
    created: user.createdAt
  };
  
  res.send(userData);
});

// BAD: Exposing multiple sensitive fields
app.get('/profile/:id', (req, res) => {
  const profile = database.getProfile(req.params.id);
  
  // Multiple sensitive fields exposed
  const profileData = {
    name: profile.name,
    ssn: profile.socialSecurity,     // Sensitive!
    creditCard: profile.payment.cardNumber,  // Sensitive!
    password: profile.account.password,      // Sensitive!
    address: profile.address
  };
  
  res.json(profileData);
});

// BAD: Logging sensitive data
function logUserActivity(user) {
  // Logging passwords is dangerous
  console.log({
    action: 'login',
    username: user.username,
    password: user.password,  // Never log passwords!
    timestamp: Date.now()
  });
}

// BAD: Storing sensitive data in localStorage
function saveUserSession(user) {
  const sessionData = {
    token: user.sessionToken,
    password: user.password,  // Sensitive in client storage!
    refreshToken: user.refreshToken
  };
  
  localStorage.setItem('session', JSON.stringify(sessionData));
}
