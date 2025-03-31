const fs = require('fs');
const path = require('path');
const https = require('https');
const { groupedLinks } = require('./grouped-links.js');

// Directory where files will be saved
const HTML_DIR = './html';

// Ensure the HTML directory exists
if (!fs.existsSync(HTML_DIR)) {
  fs.mkdirSync(HTML_DIR, { recursive: true });
  console.log(`Created directory: ${HTML_DIR}`);
}

// Function to download HTML content
function downloadHTML(url, filename) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        // Handle redirects
        if (
          response.statusCode >= 300 &&
          response.statusCode < 400 &&
          response.headers.location
        ) {
          downloadHTML(response.headers.location, filename)
            .then(resolve)
            .catch(reject);
          return;
        }

        // Check if status code is OK
        if (response.statusCode !== 200) {
          reject(
            new Error(
              `Failed to download ${url}, status code: ${response.statusCode}`
            )
          );
          return;
        }

        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          fs.writeFile(filename, data, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

// Function to process the links and download them with a delay
async function processLinks() {
  console.log(`Total links to process: ${groupedLinks.length}`);

  let downloadCount = 0;
  let skipCount = 0;

  for (const linkData of groupedLinks) {
    const { id, href } = linkData;
    const filename = path.join(HTML_DIR, `${id}.html`);

    // Skip if the file already exists
    if (fs.existsSync(filename)) {
      console.log(`Skipping ${id} - File already exists`);
      skipCount++;
      continue;
    }

    try {
      console.log(`Downloading ${id} from ${href}`);
      await downloadHTML(href, filename);
      console.log(`Successfully downloaded ${id}`);
      downloadCount++;

      // Wait for 3 seconds before the next download to avoid overloading the server
      if (groupedLinks.indexOf(linkData) < groupedLinks.length - 1) {
        const delay = 15;
        console.log(`Waiting for ${delay} seconds before next download...`);
        await new Promise((resolve) => setTimeout(resolve, delay * 1000));
      }
    } catch (error) {
      console.error(`Error downloading ${id}: ${error.message}`);
    }
  }

  console.log('\nDownload Summary:');
  console.log(`Total links: ${groupedLinks.length}`);
  console.log(`Downloaded: ${downloadCount}`);
  console.log(`Skipped (already existed): ${skipCount}`);
  console.log(`Failed: ${groupedLinks.length - downloadCount - skipCount}`);
}

// Run the script
console.log('Starting HTML downloader...');
processLinks()
  .then(() => console.log('Download process completed!'))
  .catch((err) => console.error('An error occurred:', err));
