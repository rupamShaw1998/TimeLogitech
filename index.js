const http = require('http');
const https = require('https');

const PORT = process.env.PORT || 5000;

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Define the options for making the request to time.com
  if(req.url === "/getTimeStories") {
    const options = {
      hostname: 'time.com',
      path: '/',
      method: 'GET',
      headers: {
        'User-Agent': 'Node.js HTTP Client'
      }
    };
  
    // Make the request to time.com using HTTPS
    const request = https.request(options, (response) => {
      let html = '';
  
      // Accumulate the response data
      response.on('data', (chunk) => {
        html += chunk;
      });
  
      // Once the response is complete, parse the HTML and extract the latest news
      response.on('end', () => {
        const latestNews = extractLatestNews(html);
  
        // Send the latest news as the API response
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(latestNews));
      });
    });
  
    // Handle errors
    request.on('error', (error) => {
      console.error('Error making request to time.com:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    });
  
    // End the request
    request.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
  
});

// Extract latest news from HTML
function extractLatestNews(html) {
  const latestStories = [];
  const startMarker = '<li class="latest-stories__item">';
  const endMarker = '</li>';
  
  let startIndex = html.indexOf(startMarker);
  
  while (startIndex !== -1) {
    const endIndex = html.indexOf(endMarker, startIndex);
    const listItem = html.slice(startIndex, endIndex + endMarker.length);
    const titleStartIndex = listItem.indexOf('<h3 class="latest-stories__item-headline">');
    const titleEndIndex = listItem.indexOf('</h3>', titleStartIndex);
    const linkStartIndex = listItem.indexOf('<a href="') + '<a href="'.length;
    const linkEndIndex = listItem.indexOf('"', linkStartIndex);
    
    const title = listItem.slice(titleStartIndex, titleEndIndex).replace('<h3 class="latest-stories__item-headline">', '').trim();
    const link = 'https://time.com' + listItem.slice(linkStartIndex, linkEndIndex);
    
    latestStories.push({ title, link });
    
    startIndex = html.indexOf(startMarker, endIndex);
  }
  
  return latestStories;
}

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
