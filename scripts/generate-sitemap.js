const fs = require('fs');
const xmlBuilder = require('xmlbuilder');

// Define your site URLs
const baseUrl = 'https://yourportfolio.com';
const pages = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: new Date().toISOString()
  },
  {
    url: '/about',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: new Date().toISOString()
  },
  {
    url: '/projects',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: new Date().toISOString()
  },
  {
    url: '/contact',
    changefreq: 'yearly',
    priority: '0.7',
    lastmod: new Date().toISOString()
  }
  // Add more pages as needed
];

// Create sitemap XML structure
const sitemap = xmlBuilder.create('urlset', { version: '1.0', encoding: 'UTF-8' })
  .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

// Add URLs to sitemap
pages.forEach(page => {
  const url = sitemap.ele('url');
  url.ele('loc', baseUrl + page.url);
  url.ele('lastmod', page.lastmod);
  url.ele('changefreq', page.changefreq);
  url.ele('priority', page.priority);
});

// Convert to XML string
const xml = sitemap.end({ pretty: true });

// Ensure directory exists
const dir = './public';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Write sitemap to file
fs.writeFileSync('./public/sitemap.xml', xml);

console.log('Sitemap generated successfully!');

// You might also want to generate a robots.txt file if it doesn't exist
if (!fs.existsSync('./public/robots.txt')) {
  const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml`;
  
  fs.writeFileSync('./public/robots.txt', robotsTxt);
  console.log('robots.txt generated successfully!');
}