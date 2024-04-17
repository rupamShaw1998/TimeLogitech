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
  const pattern = /<li class="latest-stories__item">[\s\S]*?<a href="([^"]+)">[\s\S]*?<h3 class="latest-stories__item-headline">([\s\S]*?)<\/h3>/g;
  let match;

  while ((match = pattern.exec(html)) !== null) {
    const title = match[2].trim();
    const link = 'https://time.com' + match[1].trim(); 
    latestStories.push({ title, link });
  }

  return latestStories;
}

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
