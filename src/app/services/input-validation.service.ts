import { Injectable } from '@angular/core';

/**
 * Service for validating user inputs to prevent security vulnerabilities
 * such as path traversal, XSS, and injection attacks.
 */
@Injectable({
	providedIn: 'root'
})
export class InputValidationService {
	// Whitelist patterns for common input types
	private readonly patterns = {
		// Alphanumeric with hyphens and underscores (for slugs, IDs, etc.)
		slug: /^[a-zA-Z0-9_-]+$/,
		// Alphanumeric only
		alphanumeric: /^[a-zA-Z0-9]+$/,
		// Email pattern
		email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
		// URL pattern (basic)
		url: /^https?:\/\/[^\s/$.?#].[^\s]*$/i
	};

	// Maximum lengths for different input types
	private readonly maxLengths = {
		slug: 100,
		general: 255,
		text: 1000,
		url: 2048
	};

	/**
	 * Validates a slug (e.g., for blog posts, routes)
	 * @param slug The slug to validate
	 * @returns true if valid, false otherwise
	 */
	validateSlug(slug: string): boolean {
		if (!slug) {
			return false;
		}

		// Check length
		if (slug.length > this.maxLengths.slug) {
			console.error(`Slug exceeds maximum length of ${this.maxLengths.slug}`);
			return false;
		}

		// Check for path traversal attempts
		if (this.containsPathTraversal(slug)) {
			console.error('Invalid slug: path traversal attempt detected');
			return false;
		}

		// Check against whitelist pattern
		if (!this.patterns.slug.test(slug)) {
			console.error('Invalid slug: contains forbidden characters');
			return false;
		}

		return true;
	}

	/**
	 * Checks if a string contains path traversal sequences
	 * @param input The string to check
	 * @returns true if path traversal detected, false otherwise
	 */
	containsPathTraversal(input: string): boolean {
		const dangerousPatterns = ['..', '../', '..\\', '%2e%2e', '%2e%2e%2f', '%2e%2e%5c', '..%2f', '..%5c'];

		const lowerInput = input.toLowerCase();
		return dangerousPatterns.some((pattern) => lowerInput.includes(pattern));
	}

	/**
	 * Sanitizes a string by removing or encoding dangerous characters
	 * @param input The string to sanitize
	 * @returns Sanitized string
	 */
	sanitizeInput(input: string): string {
		if (!input) {
			return '';
		}

		// Remove null bytes
		let sanitized = input.replace(/\0/g, '');

		// Remove control characters
		sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, '');

		return sanitized.trim();
	}

	/**
	 * Validates an email address
	 * @param email The email to validate
	 * @returns true if valid, false otherwise
	 */
	validateEmail(email: string): boolean {
		if (!email) {
			return false;
		}

		return this.patterns.email.test(email) && email.length <= this.maxLengths.general;
	}

	/**
	 * Validates a URL
	 * @param url The URL to validate
	 * @returns true if valid, false otherwise
	 */
	validateUrl(url: string): boolean {
		if (!url) {
			return false;
		}

		if (url.length > this.maxLengths.url) {
			return false;
		}

		return this.patterns.url.test(url);
	}

	/**
	 * Validates alphanumeric input
	 * @param input The input to validate
	 * @param maxLength Optional maximum length (defaults to general max)
	 * @returns true if valid, false otherwise
	 */
	validateAlphanumeric(input: string, maxLength: number = this.maxLengths.general): boolean {
		if (!input) {
			return false;
		}

		if (input.length > maxLength) {
			return false;
		}

		return this.patterns.alphanumeric.test(input);
	}

	/**
	 * Checks if input contains potential XSS patterns
	 * @param input The input to check
	 * @returns true if XSS detected, false otherwise
	 */
	containsXSS(input: string): boolean {
		const xssPatterns = [
			/<script/i,
			/javascript:/i,
			/on\w+\s*=/i, // Event handlers like onclick=
			/<iframe/i,
			/<object/i,
			/<embed/i,
			/eval\(/i,
			/expression\(/i
		];

		return xssPatterns.some((pattern) => pattern.test(input));
	}
}
