// Example 1: Insecure Authentication Pattern
// This code demonstrates a vulnerable authentication implementation

const auth = require('./auth-library');

// BAD: Using insecure authentication with WRITE permissions
function processUserAction(user, data) {
  // This should trigger our custom rule
  auth.insecureAuthenticationFunction(user, Action.WRITE);
  
  // Process the data after authentication
  database.updateUserData(user.id, data);
}

// BAD: Another vulnerable pattern
function deleteUserData(user) {
  // Insecure auth before deletion
  auth.insecureAuthenticationFunction(user, Action.WRITE);
  database.deleteUser(user.id);
}

// GOOD: Using READ action is acceptable for this demo
function getUserInfo(user) {
  // This should NOT trigger our rule
  auth.insecureAuthenticationFunction(user, Action.READ);
  return database.getUserData(user.id);
}

// BAD: Admin action with insecure auth
function grantAdminPrivileges(user, targetUser) {
  auth.insecureAuthenticationFunction(user, Action.WRITE);
  targetUser.role = 'admin';
  database.updateUser(targetUser);
}
