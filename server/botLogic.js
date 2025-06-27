const conversationContext = new Map();

function getBotResponse(message, userId) {
  const lowerMsg = message.toLowerCase();
  const context = conversationContext.get(userId) || {};

  // Handle follow-up questions
  if (context.waitingFor) {
    const response = handleFollowUp(context.waitingFor, lowerMsg);
    conversationContext.delete(userId);
    return response;
  }

  // Main responses
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
    return 'Hi there! What would you like to learn about today? (React/Node.js)';
  }
  
  if (lowerMsg.includes('how are you')) {
    return "I'm just a bot, but I'm functioning well! How about you?";
  }

  if (lowerMsg.includes('react')) {
    conversationContext.set(userId, { waitingFor: 'react_followup' });
    return 'React is great! Would you like to know about hooks or components?';
  }

  if (lowerMsg.includes('node')) {
    conversationContext.set(userId, { waitingFor: 'node_followup' });
    return 'Node.js is powerful! Want to learn about event loop or modules?';
  }

  if (lowerMsg.includes('help')) {
    return 'I can help with: \n- React concepts \n- Node.js basics \n- Web development';
  }

  if (lowerMsg.includes('bye')) {
    return 'Goodbye! Come back if you have more questions!';
  }

  return "I'm not sure I understand. Could you rephrase or ask about React/Node.js?";
}

function handleFollowUp(type, message) {
  if (type === 'react_followup') {
    if (message.includes('hook')) return 'Hooks let you use state in functional components. Try useState()!';
    if (message.includes('component')) return 'Components are reusable UI pieces. They can be classes or functions.';
  }
  else if (type === 'node_followup') {
    if (message.includes('event loop')) return 'The event loop handles async operations in Node.js efficiently.';
    if (message.includes('module')) return 'Modules help organize code. Use require() or import/export.';
  }
  return 'Interesting! What else would you like to know?';
}

module.exports = { getBotResponse };
