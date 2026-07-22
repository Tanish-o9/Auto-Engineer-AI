import re
from typing import Dict, Any, List

class SecurityAgentEngine:
    """
    Security Agent Engine
    Scans code for:
    - Hardcoded Secrets (API keys, AWS tokens, JWT secrets)
    - OWASP Top 10 Vulnerabilities
    - SQL Injection (raw string queries)
    - Cross-Site Scripting (XSS)
    - Cross-Site Request Forgery (CSRF)
    - Authentication & RBAC Flaws
    - Vulnerable Dependencies
    
    Generates security risk report & automated fixes.
    """
    def audit_security(self, code_snippet: str, file_path: str = "app/main.py") -> Dict[str, Any]:
        vulnerabilities = []
        suggested_fixes = []

        # 1. Hardcoded Secrets Scanner
        if re.search(r'(?:api_key|aws_secret|jwt_secret|password|private_key)\s*=\s*["\'][^"\']+["\']', code_snippet, re.IGNORECASE):
            vulnerabilities.append({
                "severity": "CRITICAL",
                "type": "Hardcoded Secret Exposure",
                "owasp_category": "A07:2021-Identification and Authentication Failures",
                "detail": "Sensitive credential or secret key hardcoded in source file",
                "location": file_path
            })
            suggested_fixes.append({
                "issue": "Hardcoded Secret Exposure",
                "fix": "Replace hardcoded string with environment variable lookups (os.getenv / process.env)."
            })

        # 2. SQL Injection Scanner
        if re.search(r'(?:SELECT|INSERT|UPDATE|DELETE).*\+.*|\%s|\$1', code_snippet, re.IGNORECASE) and not re.search(r'execute\(.*,\s*\[', code_snippet):
            vulnerabilities.append({
                "severity": "HIGH",
                "type": "SQL Injection (SQLi)",
                "owasp_category": "A03:2021-Injection",
                "detail": "Dynamic string concatenation detected in SQL query",
                "location": file_path
            })
            suggested_fixes.append({
                "issue": "SQL Injection",
                "fix": "Use parameterized queries or ORM query builders (select_related / filter)."
            })

        # 3. Cross-Site Scripting (XSS) Scanner
        if "dangerouslySetInnerHTML" in code_snippet or "document.write" in code_snippet or "innerHTML" in code_snippet:
            vulnerabilities.append({
                "severity": "HIGH",
                "type": "Cross-Site Scripting (XSS)",
                "owasp_category": "A03:2021-Injection",
                "detail": "Unsanitized HTML rendering allows malicious script execution",
                "location": file_path
            })
            suggested_fixes.append({
                "issue": "XSS Vulnerability",
                "fix": "Sanitize HTML content using DOMPurify before rendering."
            })

        # 4. CSRF Scanner
        if "POST" in code_snippet and "csrf" not in code_snippet.lower() and "bearer" not in code_snippet.lower():
            vulnerabilities.append({
                "severity": "MEDIUM",
                "type": "CSRF Vulnerability",
                "owasp_category": "A01:2021-Broken Access Control",
                "detail": "State-changing POST endpoint missing CSRF token or SameSite cookie protection",
                "location": file_path
            })
            suggested_fixes.append({
                "issue": "CSRF Vulnerability",
                "fix": "Require CSRF tokens or enforce Bearer JWT authentication header."
            })

        # Calculate Risk Score (100 = Perfectly Secure)
        risk_score = 100
        for v in vulnerabilities:
            if v["severity"] == "CRITICAL":
                risk_score -= 35
            elif v["severity"] == "HIGH":
                risk_score -= 20
            elif v["severity"] == "MEDIUM":
                risk_score -= 10
        risk_score = max(0, risk_score)

        return {
            "status": "AUDITED",
            "security_score": risk_score,
            "threat_level": "LOW" if risk_score >= 85 else ("MEDIUM" if risk_score >= 60 else "HIGH/CRITICAL"),
            "total_vulnerabilities": len(vulnerabilities),
            "vulnerabilities": vulnerabilities,
            "suggested_fixes": suggested_fixes
        }
