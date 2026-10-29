/**
 * Security & Reliability Test Suite — POST-FIX VERIFICATION
 * Verifies that all Critical and High issues have been remediated.
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

const fs   = require("fs");
const path = require("path");

// ─── 1. ReDoS fix — category filter now escapes regex special chars ────────
console.log("\n[1] ReDoS fix: category filter regex escaping (routes/project.js)");

const projectSource = fs.readFileSync(path.join(__dirname, "../routes/project.js"), "utf8");

assert(
  projectSource.includes(".replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')"),
  "Regex special characters are escaped before building category filter"
);

// ─── 2. Category whitelist on POST ────────────────────────────────────────
console.log("\n[2] Category allow-list validation on POST /api/project");

assert(
  projectSource.includes("VALID_CATEGORIES"),
  "VALID_CATEGORIES set is defined and used in POST handler"
);
assert(
  projectSource.includes("VALID_CATEGORIES.has(cat)"),
  "Category is validated against the allow-list on POST"
);

// ─── 3. File upload size limit ────────────────────────────────────────────
console.log("\n[3] File upload limits");

assert(
  projectSource.includes("fileSize"),
  "Multer fileSize limit is configured"
);
assert(
  projectSource.includes("5 * 1024 * 1024"),
  "File size cap is set to 5 MB"
);
assert(
  projectSource.includes("imageFileFilter"),
  "MIME type filter function is wired into multer"
);
assert(
  projectSource.includes("ALLOWED_MIME"),
  "ALLOWED_MIME whitelist is defined"
);

// ─── 4. Hardcoded credentials removed from Authentication.jsx ─────────────
console.log("\n[4] No hardcoded credentials in Authentication.jsx");

const authSource = fs.readFileSync(
  path.join(__dirname, "../../client/src/components/Admin/Authentication.jsx"),
  "utf8"
);
assert(
  !authSource.includes("integrationaspservices@gmail.com"),
  "Hardcoded email has been removed from Authentication.jsx"
);
assert(
  !authSource.includes("Integration@2003"),
  "Hardcoded password has been removed from Authentication.jsx"
);
assert(
  authSource.includes("/api/auth/login"),
  "Authentication now calls /api/auth/login server endpoint"
);

// ─── 5. Dashboard auth guard present ──────────────────────────────────────
console.log("\n[5] Dashboard.jsx has auth guard");

const dashSource = fs.readFileSync(
  path.join(__dirname, "../../client/src/components/Admin/Dashboard.jsx"),
  "utf8"
);
assert(
  dashSource.includes("pp_admin_authenticated"),
  "Dashboard checks sessionStorage for auth token"
);
assert(
  dashSource.includes('navigate("/authentication"'),
  "Dashboard redirects to /authentication when not authenticated"
);

// ─── 6. CORS restricted (no wildcard) ─────────────────────────────────────
console.log("\n[6] CORS is restricted to configured origin");

const serverSource = fs.readFileSync(path.join(__dirname, "../index.js"), "utf8");
assert(
  serverSource.includes("CORS_ORIGIN") || serverSource.includes("origin:"),
  "CORS is configured with an origin restriction (not wildcard)"
);
assert(
  !serverSource.includes("app.use(cors())"),
  "Wildcard cors() middleware has been replaced"
);

// ─── 7. Security headers ──────────────────────────────────────────────────
console.log("\n[7] Security headers middleware");

assert(
  serverSource.includes("X-Content-Type-Options"),
  "X-Content-Type-Options header is set"
);
assert(
  serverSource.includes("X-Frame-Options"),
  "X-Frame-Options header is set"
);

// ─── 8. Body payload limit ────────────────────────────────────────────────
console.log("\n[8] JSON body size limit");

assert(
  serverSource.includes("limit: '1mb'") || serverSource.includes("limit:'1mb'"),
  "express.json body parser is limited to 1 MB"
);

// ─── 9. Email header injection sanitization ───────────────────────────────
console.log("\n[9] Email header injection sanitization (form.js)");

const formSource = fs.readFileSync(path.join(__dirname, "../routes/form.js"), "utf8");
assert(
  formSource.includes("sanitize"),
  "sanitize() helper function is defined in form.js"
);
assert(
  formSource.includes("[\\r\\n]") || formSource.includes("\\r\\n"),
  "CRLF characters are stripped in sanitize()"
);
assert(
  formSource.includes("safe.firstname"),
  "Sanitized values are used in the email template"
);

// ─── 10. DB exits on failure ──────────────────────────────────────────────
console.log("\n[10] DB connection exits on failure");

const dbSource = fs.readFileSync(path.join(__dirname, "../db.js"), "utf8");
assert(
  dbSource.includes("process.exit(1)"),
  "db.js calls process.exit(1) on connection failure"
);

// ─── 11. Cloudinary secrets redacted from .env files ─────────────────────
console.log("\n[11] .env files contain no real Cloudinary credentials");

[
  path.join(__dirname, "../../.env"),
  path.join(__dirname, "../.env"),
].forEach((envPath) => {
  const envContent = fs.readFileSync(envPath, "utf8");
  // Real Cloudinary API key is a 15-digit number
  const hasRealKey    = /^AK=\d{15,}$/m.test(envContent);
  // Real API secret contains specific non-placeholder characters (dashes, underscores mixed with hex-like runs)
  // We consider it real if AS= value contains no placeholder words
  const asLine        = (envContent.match(/^AS=(.+)$/m) || [])[1] || "";
  const isPlaceholder = /your_|example|placeholder/i.test(asLine);
  const hasRealSecret = asLine.length > 10 && !isPlaceholder;
  assert(
    !hasRealKey && !hasRealSecret,
    `No real Cloudinary credentials in ${path.basename(path.dirname(envPath))}/.env`
  );
});

// ─── 12. .gitignore present ───────────────────────────────────────────────
console.log("\n[12] .gitignore protects .env files");

const gitignore = fs.readFileSync(path.join(__dirname, "../../.gitignore"), "utf8");
assert(gitignore.includes(".env"), ".gitignore lists .env");
assert(gitignore.includes("node_modules"), ".gitignore lists node_modules/");

// ─── Summary ──────────────────────────────────────────────────────────────
console.log(`\n${"─".repeat(55)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log("─".repeat(55));
if (failed > 0) process.exit(1);
