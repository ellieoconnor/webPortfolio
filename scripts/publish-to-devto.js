#!/usr/bin/env node

/**
 * Publish markdown files to dev.to
 *
 * Usage:
 *   node scripts/publish-to-devto.js path/to/post.md
 *
 * Environment variables:
 *   DEVTO_API_KEY - Your dev.to API key (get it from https://dev.to/settings/extensions)
 *
 * Frontmatter format:
 *   ---
 *   title: Your Post Title
 *   description: A short description
 *   tags: angular, typescript, webdev
 *   published: true
 *   cover_image: https://example.com/image.jpg (optional)
 *   canonical_url: https://yoursite.com/blog/post (optional)
 *   devto_id: 123456 (optional, for updates - auto-added after first publish)
 *   ---
 */

const fs = require('fs');
const path = require('path');

// Simple frontmatter parser (avoids extra dependency)
function parseFrontmatter(content) {
	const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
	const match = content.match(frontmatterRegex);

	if (!match) {
		return { data: {}, content };
	}

	const frontmatterStr = match[1];
	const body = match[2];
	const data = {};

	frontmatterStr.split('\n').forEach((line) => {
		const colonIndex = line.indexOf(':');
		if (colonIndex > 0) {
			const key = line.slice(0, colonIndex).trim();
			let value = line.slice(colonIndex + 1).trim();

			// Handle booleans
			if (value === 'true') value = true;
			else if (value === 'false') value = false;
			// Handle numbers
			else if (/^\d+$/.test(value)) value = parseInt(value, 10);

			data[key] = value;
		}
	});

	return { data, content: body };
}

// Parse tags from comma-separated string
function parseTags(tagsStr) {
	if (!tagsStr) return [];
	return tagsStr
		.split(',')
		.map((tag) => tag.trim().toLowerCase())
		.filter((tag) => tag.length > 0)
		.slice(0, 4); // dev.to allows max 4 tags
}

async function publishToDevTo(filePath) {
	const apiKey = process.env.DEVTO_API_KEY;

	if (!apiKey) {
		console.error('Error: DEVTO_API_KEY environment variable is not set.');
		console.error('Get your API key from: https://dev.to/settings/extensions');
		console.error('Then run: DEVTO_API_KEY=your_key node scripts/publish-to-devto.js post.md');
		process.exit(1);
	}

	// Read the markdown file
	const absolutePath = path.resolve(filePath);
	if (!fs.existsSync(absolutePath)) {
		console.error(`Error: File not found: ${absolutePath}`);
		process.exit(1);
	}

	const fileContent = fs.readFileSync(absolutePath, 'utf-8');
	const { data: frontmatter, content: body } = parseFrontmatter(fileContent);

	// Validate required fields
	if (!frontmatter.title) {
		console.error('Error: Missing required frontmatter field: title');
		process.exit(1);
	}

	// Build the article payload
	const article = {
		article: {
			title: frontmatter.title,
			body_markdown: body.trim(),
			published: frontmatter.published === true,
			tags: parseTags(frontmatter.tags)
		}
	};

	// Add optional fields
	if (frontmatter.description) {
		article.article.description = frontmatter.description;
	}
	if (frontmatter.cover_image) {
		article.article.cover_image = frontmatter.cover_image;
	}
	if (frontmatter.canonical_url) {
		article.article.canonical_url = frontmatter.canonical_url;
	}

	// Determine if this is a create or update
	const isUpdate = !!frontmatter.devto_id;
	const url = isUpdate
		? `https://dev.to/api/articles/${frontmatter.devto_id}`
		: 'https://dev.to/api/articles';
	const method = isUpdate ? 'PUT' : 'POST';

	console.log(`${isUpdate ? 'Updating' : 'Creating'} article: "${frontmatter.title}"`);
	console.log(`Tags: ${article.article.tags.join(', ') || '(none)'}`);
	console.log(`Published: ${article.article.published}`);

	try {
		const response = await fetch(url, {
			method,
			headers: {
				'Content-Type': 'application/json',
				'api-key': apiKey
			},
			body: JSON.stringify(article)
		});

		if (!response.ok) {
			const errorBody = await response.text();
			console.error(`Error: API returned ${response.status}`);
			console.error(errorBody);
			process.exit(1);
		}

		const result = await response.json();

		console.log('\nSuccess!');
		console.log(`URL: ${result.url}`);
		console.log(`ID: ${result.id}`);

		// If this was a new article, offer to update the file with the ID
		if (!isUpdate) {
			console.log('\nTo enable updates, add this to your frontmatter:');
			console.log(`devto_id: ${result.id}`);

			// Auto-update the file with devto_id
			const updatedFrontmatter = fileContent.replace(
				/^---\n/,
				`---\ndevto_id: ${result.id}\n`
			);
			fs.writeFileSync(absolutePath, updatedFrontmatter);
			console.log('\n(File has been automatically updated with devto_id)');
		}
	} catch (error) {
		console.error('Error publishing to dev.to:', error.message);
		process.exit(1);
	}
}

// Main
const args = process.argv.slice(2);
if (args.length === 0) {
	console.log('Usage: node scripts/publish-to-devto.js <path-to-markdown-file>');
	console.log('\nExample:');
	console.log('  DEVTO_API_KEY=your_key node scripts/publish-to-devto.js posts/my-article.md');
	process.exit(1);
}

publishToDevTo(args[0]);