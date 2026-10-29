/**
 * Security & Reliability Test Suite
 * Tests the riskiest server-side endpoints with unit and integration-style checks.
 * Run with: node tests/security.test.js
 */

let passed = 0;
let failed = 0;

function assert(condition, label, detail = "") {
  if (condition) {
    console.log(`  ✅ PASS  ${label}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL  ${label}${detail ? " — " + detail : ""}`);
    failed++;
  }
}

// ─── 1. RegExp injection guard ─────────────────────────────────────────────
console.log("\n[1] RegExp Injection in category filter (routes/project.js:50)");

function buildCategoryFilter(category) {
  if (category && category !== "All") {
    return { cat: new RegExp(`^${category}$`, "i") };
  }
  return {};
}

function buildCategoryFilterSafe(category) {
  if (!category || category === "All") return {};
  // Escape special regex chars
  const escaped = category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return { cat: new RegExp(`^${escaped}$`, "i") };
}

const reDoSPayload = "a".repeat(100000) + "!";
try {
  const startUnsafe = Date.now();
  buildCategoryFilter(reDoSPayload); // may hang on catastrophic backtracking
  const elapsed = Date.now() - startUnsafe;
  assert(elapsed < 500, "ReDoS-safe: basic payload under 500 ms (unsafe fn)", `took ${elapsed}ms`);
} catch {
  assert(false, "ReDoS: unexpected error in unsafe fn");
}

const specialPayload = "(.*)+";
const filterUnsafe = buildCategoryFilter(specialPayload);
const filterSafe   = buildCategoryFilterSafe(specialPayload);

assert(
  filterSafe.cat.source === "^\\(\\\\.\\*\\)\\+$",
  "Safe filter escapes regex special chars in category"
);
assert(
  filterUnsafe.cat.source !== filterSafe.cat.source,
  "Unsafe filter does NOT escape — confirms the vulnerability exists"
);

// ─── 2. Input validation — form route ────────────────────────────────────
console.log("\n[2] Enquiry form server-side validation");

function validateEnquiryPayload(body) {
  const { firstname, email, mobileno, selectedservice, message } = body;
  if (!firstname || !email || !mobileno || !selectedservice || !message) {
    return { ok: false, error: "Missing required fields" };
  }
  return { ok: true };
}

assert(validateEnquiryPayload({}).ok === false, "Empty body is rejected");
assert(
  validateEnquiryPayload({ firstname: "A", email: "a@b.com", mobileno: "123", selectedservice: "Civil", message: "Hi" }).ok === true,
  "Valid payload passes"
);
assert(
  validateEnquiryPayload({ firstname: "", email: "a@b.com", mobileno: "123", selectedservice: "Civil", message: "Hi" }).ok === false,
  "Empty firstname is rejected"
);

// ─── 3. Email header injection guard ─────────────────────────────────────
console.log("\n[3] Email header injection (form.js — subject/html built from user input)");

function containsHeaderInjection(value) {
  return /[\r\n]/.test(String(value));
}

assert(
  containsHeaderInjection("Normal Name") === false,
  "Normal firstname passes injection check"
);
assert(
  containsHeaderInjection("Evil\r\nBcc: attacker@evil.com") === true,
  "CRLF injection in firstname is detected"
);
assert(
  containsHeaderInjection("Injected\nSubject: spam") === true,
  "LF injection in name is detected"
);

// ─── 4. Admin auth — hardcoded credentials detection ─────────────────────
console.log("\n[4] Hardcoded admin credentials in Authentication.jsx");

const fs = require("fs");
const path = require("path");

const authFile = path.join(__dirname, "../../client/src/components/Admin/Authentication.jsx");
const authSource = fs.readFileSync(authFile, "utf8");

assert(
  authSource.includes("integrationaspservices@gmail.com"),
  "Hardcoded email exists in Authentication.jsx (CRITICAL — must be removed)"
);
assert(
  authSource.includes("Integration@2003"),
  "Hardcoded password exists in Authentication.jsx (CRITICAL — must be removed)"
);

// ─── 5. Dashboard has no server-side auth guard ───────────────────────────
console.log("\n[5] Dashboard auth guard (client-side only)");

const dashFile = path.join(__dirname, "../../client/src/components/Admin/Dashboard.jsx");
const dashSource = fs.readFileSync(dashFile, "utf8");

assert(
  !dashSource.includes("useEffect") || !dashSource.includes("sessionStorage.getItem"),
  "Dashboard.jsx has NO sessionStorage auth guard — /dashboard is fully open (CRITICAL)"
);

// ─── 6. CORS wildcard check ───────────────────────────────────────────────
console.log("\n[6] CORS configuration in server/index.js");

const serverIndex = path.join(__dirname, "../index.js");
const serverSource = fs.readFileSync(serverIndex, "utf8");

assert(
  serverSource.includes("cors()") && !serverSource.includes("origin:"),
  "CORS is configured with wildcard (no origin restriction) — HIGH risk"
);

// ─── 7. Missing security headers check ───────────────────────────────────
console.log("\n[7] Helmet / security headers");

assert(
  !serverSource.includes("helmet"),
  "Helmet is NOT installed/used — missing X-Frame-Options, CSP, etc. — HIGH risk"
);

// ─── 8. Missing rate limiting ─────────────────────────────────────────────
console.log("\n[8] Rate limiting");

assert(
  !serverSource.includes("rateLimit") && !serverSource.includes("rate-limit"),
  "No rate limiter found — enquiry and project endpoints are open to flooding — HIGH risk"
);

// ─── 9. File upload — no size or MIME validation ─────────────────────────
console.log("\n[9] File upload limits in routes/project.js");

const projectRoute = path.join(__dirname, "../routes/project.js");
const projectSource = fs.readFileSync(projectRoute, "utf8");

assert(
  !projectSource.includes("limits:") && !projectSource.includes("fileSize"),
  "Multer has NO fileSize limit — large file DoS possible — HIGH risk"
);
assert(
  projectSource.includes("format: async (req, file) => 'png'"),
  "Upload forces .png extension regardless of original MIME type — Medium risk"
);

// ─── 10. DB connection — no error handling on broken connection ───────────
console.log("\n[10] DB connection error propagation (db.js)");

const dbFile = path.join(__dirname, "../db.js");
const dbSource = fs.readFileSync(dbFile, "utf8");

assert(
  dbSource.includes("try") && dbSource.includes("catch"),
  "DB connection has try/catch"
);
assert(
  !dbSource.includes("process.exit"),
  "DB failure does NOT exit process — server silently continues with no DB — MEDIUM risk"
);

// ─── 11. Env leaks ────────────────────────────────────────────────────────
console.log("\n[11] .env file exposure");

const rootEnv = path.join(__dirname, "../../.env");
const serverEnv = path.join(__dirname, "../.env");

[rootEnv, serverEnv].forEach((envPath) => {
  const envContent = fs.readFileSync(envPath, "utf8");
  const hasRealCloudinaryKey = /AK=\d{10,}/.test(envContent);
  const hasRealCloudinarySecret = /AS=[A-Za-z0-9_-]{20,}/.test(envContent);
  if (hasRealCloudinaryKey || hasRealCloudinarySecret) {
    assert(false, `Real Cloudinary credentials found in ${path.basename(envPath)} — CRITICAL`);
  } else {
    assert(true, `No real secrets detected in ${path.basename(envPath)}`);
  }
});

// ─── Summary ──────────────────────────────────────────────────────────────
console.log(`\n${"─".repeat(55)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("─".repeat(55));
if (failed > 0) process.exit(1);
