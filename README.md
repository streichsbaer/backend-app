# A repository with ALL the JavaScript vulnerabilities

This repository contains intentional security vulnerabilities for testing and educational purposes. **Do not use this code in production environments.**

## Vulnerability Summary

### 1. SQL Injection Vulnerabilities
- **sql.php**: Multiple SQL injection examples using unsanitized `$_GET` parameters
- **src/login.js**: Commented SQL injection in login query using string concatenation

### 2. Code Injection
- **src/GR0008.js**: Direct `eval()` execution on user input (`req.body.evil`)

### 3. Command Injection
- **src/GR0009.js**: Unsafe use of `child_process.exec()` for system command execution

### 4. Cross-Site Scripting (XSS)
- **src/GR0003.js**: Mustache template escape configuration issues
- **src/GR0004.js**: Handlebars.SafeString bypassing HTML escaping

### 5. Regular Expression Denial of Service (ReDoS)
- **src/GR0001.js**: Catastrophic backtracking regex `/(x+x+)+y/`
- **src/GR0002.js**: Same unsafe regex using `new RegExp()`

### 6. Hardcoded Secrets
- **secrets.js**: Multiple API keys (Postman, Netlify, Infura)
- **src/GR0008.js**: AWS access credentials in source code

### 7. Deprecated/Unsafe Functions
- **src/GR0005.js**: Deprecated Buffer method with noAssert parameter
- **src/GR0006.js**: Deprecated `new Buffer()` constructor usage

## Dependencies

- `hoek` version 5.0.0: [NSWG-367](https://github.com/nodejs/security-wg/blob/a3425e433e4b8e7c99c0d3244491b215b2554f55/vuln/npm/367.json)
- `ws` version 2.0.0: Known vulnerabilities in older versions
- `ecstatic` version 1.3.1: Potential security issues in legacy version

## File Reference

| Vulnerability Type | Files |
|-------------------|-------|
| SQL Injection | `sql.php`, `src/login.js` |
| Code Injection | `src/GR0008.js` |
| Command Injection | `src/GR0009.js` |
| XSS | `src/GR0003.js`, `src/GR0004.js` |
| ReDoS | `src/GR0001.js`, `src/GR0002.js` |
| Hardcoded Secrets | `secrets.js`, `src/GR0008.js` |
| Unsafe Functions | `src/GR0005.js`, `src/GR0006.js` |
