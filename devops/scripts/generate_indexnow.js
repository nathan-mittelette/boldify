import fs from 'fs';
import path from 'path';

function generateKey() {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
	let key = '';
	for (let i = 0; i < 128; i++) {
		key += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return key;
}

const key = generateKey();

console.log(`🔑 Generated IndexNow key`);

const outputDir = 'build';

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
	console.log(`📁 Created directory: ${outputDir}`);
}

const filePath = path.join(outputDir, `${key}.txt`);
fs.writeFileSync(filePath, key);
console.log(`✅ IndexNow key file generated`);
