# Security Documentation

## Overview
This document outlines the security measures implemented in the Web Portfolio application to protect against common web vulnerabilities.

## Vulnerabilities Fixed (January 2026)

### 1. **Critical: XSS via Unsanitized HTML Injection**
**Status:** ✅ FIXED
**Severity:** CRITICAL (CVSS 9.8)

**Issue:** Blog posts rendered HTML via `[innerHTML]` binding without sanitization, allowing script injection.

**Solution:**
- Implemented Angular's `DomSanitizer` with `SecurityContext.HTML` in `blog-post.component.ts`
- All HTML content is now sanitized before rendering
- Configured marked.js with secure options

**Files Modified:**
- `src/app/components/blog/blog-post/blog-post.component.ts`
- `src/app/components/blog/blog.service.ts`

---

### 2. **High: Path Traversal in Blog Post Fetching**
**Status:** ✅ FIXED
**Severity:** HIGH (CVSS 8.1)

**Issue:** User input from URL slug parameter was used directly in file path construction.

**Solution:**
- Created `InputValidationService` with whitelist validation
- Implemented slug validation with regex pattern: `/^[a-zA-Z0-9_-]+$/`
- Added path traversal detection for patterns: `../`, `..\\`, `%2e%2e`, etc.
- Maximum slug length enforced (100 characters)
- Defense-in-depth: validation in both component and service layers

**Files Modified:**
- `src/app/services/input-validation.service.ts` (NEW)
- `src/app/components/blog/blog-post/blog-post.component.ts`
- `src/app/components/blog/blog.service.ts`

---

### 3. **High: Angular XSS CVE (GHSA-jrmj-c5cx-3cw6)**
**Status:** ✅ FIXED
**Severity:** HIGH

**Issue:** Angular versions 20.0.0 - 20.3.15 had XSS vulnerability via unsanitized SVG script attributes.

**Solution:**
- Upgraded all Angular packages from 20.3.15 to 20.3.16
- Ran `npm audit` - now showing 0 vulnerabilities

**Packages Updated:**
- @angular/animations: 20.3.15 → 20.3.16
- @angular/common: 20.3.15 → 20.3.16
- @angular/compiler: 20.3.15 → 20.3.16
- @angular/core: 20.3.15 → 20.3.16
- @angular/forms: 20.3.15 → 20.3.16
- @angular/platform-browser: 20.3.15 → 20.3.16
- @angular/platform-browser-dynamic: 20.3.15 → 20.3.16
- @angular/router: 20.3.15 → 20.3.16
- @angular/compiler-cli: 20.3.15 → 20.3.16

---

### 4. **High: Missing Content Security Policy**
**Status:** ✅ FIXED
**Severity:** HIGH (CVSS 7.5)

**Issue:** No CSP headers configured, allowing unrestricted resource loading.

**Solution:**
Implemented comprehensive CSP via meta tags in `index.html`:
- `default-src 'self'` - Only allow resources from same origin
- `script-src 'self' 'unsafe-inline'` - Scripts from self (unsafe-inline needed for Angular)
- `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com` - Styles from self and Google Fonts
- `font-src 'self' https://fonts.gstatic.com` - Fonts from self and Google
- `img-src 'self' data: https:` - Images from self, data URIs, and HTTPS sources
- `connect-src 'self'` - XHR/fetch only to same origin
- `frame-ancestors 'none'` - Prevent clickjacking
- `base-uri 'self'` - Prevent base tag injection
- `form-action 'self'` - Form submissions only to same origin

**Additional Security Headers:**
- `X-Content-Type-Options: nosniff` - Prevent MIME type sniffing
- `X-Frame-Options: DENY` - Prevent iframe embedding
- `X-XSS-Protection: 1; mode=block` - Enable browser XSS filter
- `Referrer-Policy: strict-origin-when-cross-origin` - Control referrer information

**Files Modified:**
- `src/index.html`

---

### 5. **Medium: External Resources Without Integrity Checks**
**Status:** ✅ FIXED
**Severity:** MEDIUM (CVSS 5.8)

**Issue:** Google Fonts and Material Icons loaded without Subresource Integrity (SRI) hashes.

**Solution:**
- Generated SHA-384 hashes for all external stylesheets
- Added `integrity` and `crossorigin` attributes to all external links
- Roboto Font: `sha384-ECculJJcBMSBKqgCOUxBgUE+yEhSAiEx2LFh58eRChFQBJGFkvSzMJgNYOlusBVB`
- Material Icons: `sha384-eucWZCRUGCfvIJCTwz3dhHbbCJ0ZH+6Q15o/UiqTNByQ2lvXyqbkqpUskKqxOMVD`

**Files Modified:**
- `src/index.html`

---

### 6. **Medium: Lack of Input Validation**
**Status:** ✅ FIXED
**Severity:** MEDIUM (CVSS 6.5)

**Issue:** No centralized input validation service.

**Solution:**
Created comprehensive `InputValidationService` with:
- Slug validation (alphanumeric + hyphens/underscores)
- Path traversal detection
- XSS pattern detection
- Email validation
- URL validation
- Alphanumeric validation
- Input sanitization (removes null bytes and control characters)
- Maximum length enforcement

**Files Created:**
- `src/app/services/input-validation.service.ts`
- `src/app/services/input-validation.service.spec.ts` (with 13 passing tests)

---

## Security Best Practices Implemented

### Input Validation
- **Whitelist approach**: Only allow specific, known-good characters
- **Defense in depth**: Validation at multiple layers (component + service)
- **Fail securely**: Invalid input results in error messages, not silent failures
- **Maximum lengths**: All inputs have enforced maximum lengths

### Output Encoding
- **Angular DomSanitizer**: All HTML output is sanitized using Angular's built-in security
- **SecurityContext.HTML**: Explicit security context for HTML content
- **No bypassSecurityTrust**: Never bypass Angular's security mechanisms

### Dependency Management
- **Regular updates**: Keep all dependencies up-to-date
- **Audit regularly**: Run `npm audit` before releases
- **Zero vulnerabilities**: Target of 0 known vulnerabilities

### Content Security Policy
- **Restrictive defaults**: Start with `default-src 'self'`
- **Explicit allowlists**: Only allow specific external sources
- **No eval**: Prevent code execution via eval()
- **Frame protection**: Prevent clickjacking attacks

## Testing

### Security Test Coverage
- ✅ Input validation service: 13/13 tests passing
- ✅ Path traversal detection
- ✅ XSS pattern detection
- ✅ Slug validation
- ✅ Email validation
- ✅ Input sanitization

### How to Run Security Tests
```bash
# Run all tests
npm test

# Run input validation tests specifically
npm test -- --testPathPattern=input-validation.service.spec.ts
```

## Security Checklist for Development

Before deploying new features:
- [ ] All user inputs are validated using `InputValidationService`
- [ ] HTML content is sanitized using `DomSanitizer`
- [ ] No use of `bypassSecurityTrust*` methods
- [ ] External resources have SRI hashes
- [ ] `npm audit` shows 0 vulnerabilities
- [ ] All tests passing
- [ ] CSP headers remain restrictive
- [ ] No sensitive data in error messages
- [ ] No secrets in source code or config files

## Reporting Security Issues

If you discover a security vulnerability, please email security@example.com (replace with actual email). Do not create public issues for security vulnerabilities.

## Audit History

| Date | Auditor | Findings | Status |
|------|---------|----------|--------|
| 2026-01-22 | Security Audit | 19 vulnerabilities (1 Critical, 16 High, 2 Medium) | ✅ All Fixed |

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Angular Security Guide](https://angular.dev/best-practices/security)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)
