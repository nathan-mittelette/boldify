import fs from 'fs';
import path from 'path';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY;
if (!INDEXNOW_KEY) {
	console.warn('⚠️  INDEXNOW_KEY env var not set — skipping key file generation');
	process.exit(0);
}

const outputDir = 'build';

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

const keyFilePath = path.join(outputDir, `${INDEXNOW_KEY}.txt`);
fs.writeFileSync(keyFilePath, INDEXNOW_KEY);
console.log(`✅ IndexNow key file written: ${INDEXNOW_KEY}.txt`);
