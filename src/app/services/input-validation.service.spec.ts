import { TestBed } from '@angular/core/testing';
import { InputValidationService } from './input-validation.service';

describe('InputValidationService', () => {
	let service: InputValidationService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(InputValidationService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('validateSlug', () => {
		it('should accept valid slugs', () => {
			expect(service.validateSlug('valid-slug')).toBe(true);
			expect(service.validateSlug('another_slug_123')).toBe(true);
			expect(service.validateSlug('slug123')).toBe(true);
		});

		it('should reject path traversal attempts', () => {
			expect(service.validateSlug('../etc/passwd')).toBe(false);
			expect(service.validateSlug('..%2Fpasswd')).toBe(false);
			expect(service.validateSlug('test/../admin')).toBe(false);
		});

		it('should reject slugs with forbidden characters', () => {
			expect(service.validateSlug('slug with spaces')).toBe(false);
			expect(service.validateSlug('slug/with/slashes')).toBe(false);
			expect(service.validateSlug('slug\\backslash')).toBe(false);
		});

		it('should reject slugs that are too long', () => {
			const longSlug = 'a'.repeat(101);
			expect(service.validateSlug(longSlug)).toBe(false);
		});
	});

	describe('containsPathTraversal', () => {
		it('should detect path traversal attempts', () => {
			expect(service.containsPathTraversal('../')).toBe(true);
			expect(service.containsPathTraversal('..\\')).toBe(true);
			expect(service.containsPathTraversal('%2e%2e')).toBe(true);
		});

		it('should not flag valid inputs', () => {
			expect(service.containsPathTraversal('valid-slug')).toBe(false);
			expect(service.containsPathTraversal('file.txt')).toBe(false);
		});
	});

	describe('containsXSS', () => {
		it('should detect XSS patterns', () => {
			expect(service.containsXSS('<script>alert("xss")</script>')).toBe(true);
			expect(service.containsXSS('<img src=x onerror="alert(1)" alt="">')).toBe(true);
			expect(service.containsXSS('javascript:alert(1)')).toBe(true);
		});

		it('should not flag safe content', () => {
			expect(service.containsXSS('This is safe text')).toBe(false);
			expect(service.containsXSS('Email: user@example.com')).toBe(false);
		});
	});

	describe('validateEmail', () => {
		it('should accept valid emails', () => {
			expect(service.validateEmail('user@example.com')).toBe(true);
			expect(service.validateEmail('test.user+tag@example.co.uk')).toBe(true);
		});

		it('should reject invalid emails', () => {
			expect(service.validateEmail('notanemail')).toBe(false);
			expect(service.validateEmail('@example.com')).toBe(false);
			expect(service.validateEmail('user@')).toBe(false);
		});
	});

	describe('sanitizeInput', () => {
		it('should remove null bytes and control characters', () => {
			expect(service.sanitizeInput('test\0null')).toBe('testnull');
			expect(service.sanitizeInput('test\x00\x01\x02')).toBe('test');
		});

		it('should trim whitespace', () => {
			expect(service.sanitizeInput('  test  ')).toBe('test');
		});
	});
});
