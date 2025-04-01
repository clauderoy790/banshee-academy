const fs = require('fs');
const path = require('path');

// Path to the file
const filePath = path.join(__dirname, 'grouped-links.js');

// Read the file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  try {
    // Extract the array from the file content
    // This approach uses regex to find the array content
    const match = data.match(/export const groupedLinks = (\[[\s\S]*\]);/);
    
    if (!match) {
      console.error('Could not find groupedLinks array in file');
      return;
    }
    
    // Parse the array
    const arrayString = match[1];
    // Use eval in a controlled way to parse the JS array
    // Note: In production code, consider alternatives to eval for security
    const groupedLinks = eval(arrayString);
    
    // Add id property to each object based on href
    const updatedLinks = groupedLinks.map(link => {
      // Extract the last part of the URL
      const urlParts = link.href.split('/');
      const id = urlParts[urlParts.length - 1];
      
      // Return a new object with the id added
      return {
        id,
        ...link
      };
    });
    
    // Create the new file content
    const updatedContent = data.replace(
      arrayString,
      JSON.stringify(updatedLinks, null, 2)
    );
    
    // Write the updated content back to the file
    fs.writeFile(filePath, updatedContent, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing to file:', writeErr);
        return;
      }
      
      console.log('Successfully updated groupedLinks with id properties');
    });
  } catch (parseErr) {
    console.error('Error processing the file:', parseErr);
  }
});