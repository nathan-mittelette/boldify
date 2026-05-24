import fs from 'fs';
import path from 'path';

const outputDir = 'build';

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
	console.log(`📁 Created directory: ${outputDir}`);
}

const generateRobotsTxt = () => {
	const robots = `
User-agent: *
Allow: /
Disallow: /_app/

Content-Signal: ai-train=no, search=yes, ai-input=no

Sitemap: https://boldify.net/sitemap.xml
    `;

	const filePath = path.join(outputDir, 'robots.txt');
	fs.writeFileSync(filePath, robots.trim());
	console.log('✅ robots.txt generated!');
};

generateRobotsTxt();
