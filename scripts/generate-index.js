const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Define constants
const POSTS_DIR = path.join(__dirname, '../src/assets/posts');
const OUTPUT_FILE = path.join(POSTS_DIR, 'index.json');

//Helper function to fetch metadata from Markdown files
function generateIndex() {
	try {
		// Log the resolved POSTS_DIR path
		console.log(`Looking for Markdown files in: ${POSTS_DIR}`);

		// Get all Markdown files from the directory
		const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith('.md'));

		// Log which files are found
		console.log(`Found Markdown files:`, files);

		// Parse each file for frontmatter
		const metadataList = files.map((file) => {
			const filePath = path.join(POSTS_DIR, file);
			const content = fs.readFileSync(filePath, 'utf8');
			const { data } = matter(content);

			return {
				...data,
				slug: file.replace('.md', '')
			};
		});

		// Write metadata to index.json
		fs.writeFileSync(OUTPUT_FILE, JSON.stringify(metadataList, null, 2));

		console.log(`✅ Successfully created ${OUTPUT_FILE}`);
	} catch (error) {
		console.error('❌ Error generating index.json:', error);
	}
}

generateIndex();
