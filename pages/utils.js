export default santizeInput = (input) => {
    if (typeof input !== 'string') {
        return null; 
      }
    
      // Sanitize username input: Prevent NoSQL injection
      return input.replace(/[^\w\s]/gi, ''); // Remove non-alphanumeric characters
}