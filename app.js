// import express from 'express';
// import bodyParser from 'body-parser';
// import { parseFixMessage } from 'parse-fix'; // Use import for ES Module

// const app = express();

// // Middleware to parse form data (for POST requests)
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve static files (HTML, CSS, JS, images) from the 'public' folder
// app.use(express.static('public'));

// // Route to handle FIX message parsing
// app.post('/parse', (req, res) => {
//   const fixMessage = req.body.fixMessage;

//   try {
//     // Parse the message using parse-fix package
//     const parsedMessage = parseFixMessage(fixMessage);
    
//     // Send parsed data as JSON response
//     res.json(parsedMessage);
//   } catch (error) {
//     // Send an error message in case of invalid FIX message
//     res.status(400).send('Error parsing FIX message');
//   }
// });

// // Start the server
// app.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });





// import express from 'express';
// import bodyParser from 'body-parser';
// import * as parseFix from 'parse-fix'; // Import everything

// const app = express();

// // Middleware to parse form data (for POST requests)
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve static files (HTML, CSS, JS, images) from the 'public' folder
// app.use(express.static('public'));

// // Log the whole parseFix module to inspect its exports
// console.log(parseFix);  // Log to see what it exports

// // Route to handle FIX message parsing
// app.post('/parse', (req, res) => {
//   const fixMessage = req.body.fixMessage;

//   try {
//     // Use the correct function from parseFix
//     // Since we don't know the function name yet, we will update this after inspecting the log
//     const parsedMessage = parseFix.someParsingFunction(fixMessage); 
    
//     // Send parsed data as JSON response
//     res.json(parsedMessage);
//   } catch (error) {
//     // Send an error message in case of invalid FIX message
//     res.status(400).send('Error parsing FIX message');
//   }
// });

// // Start the server
// app.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });


// import express from 'express';
// import bodyParser from 'body-parser';
// import { parseFixText } from 'parse-fix'; // Import the correct function

// const app = express();

// // Middleware to parse form data (for POST requests)
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve static files (HTML, CSS, JS, images) from the 'public' folder
// app.use(express.static('public'));

// // Route to handle FIX message parsing
// app.post('/parse', (req, res) => {
//   const fixMessage = req.body.fixMessage;

//   try {
//     // Parse the FIX message using parseFixText
//     const parsedMessage = parseFixText(fixMessage);
    
//     // Send parsed data as JSON response
//     res.json(parsedMessage);
//   } catch (error) {
//     // Send an error message in case of invalid FIX message
//     res.status(400).send('Error parsing FIX message');
//   }
// });

// // Start the server
// app.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });

import express from 'express';
import bodyParser from 'body-parser';
import { parseFixText, fixMessagesFromText, parseFixMsg } from 'parse-fix'; // Import parse-fix functions

const app = express();

// Middleware to parse form data (for POST requests)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // To handle JSON POST data

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static('public'));

// Route to handle FIX message parsing
app.post('/parse', (req, res) => {
  const fixMessage = req.body.fixMessage; // Get the FIX message from the request body

  try {
    // Parse the entire FIX text
    const parsedText = parseFixText(fixMessage);
    
    // Extract individual FIX messages from the text
    const msgsFromText = fixMessagesFromText(fixMessage);
    
    // Parse one specific message (if required)
    const oneParsedMsg = parseFixMsg(msgsFromText[0]);

    // Send parsed data as JSON response
    res.json({
      parsedText,
      msgsFromText,
      oneParsedMsg
    });
  } catch (error) {
    // Send an error message in case of invalid FIX message
    res.status(400).send('Error parsing FIX message');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
