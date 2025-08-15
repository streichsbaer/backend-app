// Example 2: Supply Chain Vulnerability
// This code uses a vulnerable version of Handlebars

const Handlebars = require('handlebars'); // version 4.0.11 or below

// BAD: Using vulnerable Handlebars.SafeString
function renderUserTemplate(userData) {
  // This should trigger our supply chain rule
  const safeContent = new Handlebars.SafeString(userData.bio);
  
  const template = Handlebars.compile(`
    <div class="user-profile">
      <h1>{{name}}</h1>
      <div class="bio">{{{bio}}}</div>
    </div>
  `);
  
  return template({
    name: userData.name,
    bio: safeContent
  });
}

// BAD: Another use of vulnerable SafeString
function createNotification(message) {
  // Vulnerable pattern
  const safeMessage = Handlebars.SafeString(message);
  return renderNotification(safeMessage);
}

// BAD: Direct use in template rendering
function renderComment(comment) {
  const safe = new Handlebars.SafeString(comment.text);
  return `<div class="comment">${safe}</div>`;
}
