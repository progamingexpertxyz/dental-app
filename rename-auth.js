const fs = require("fs");
const path = require("path");

const authPath = path.join(__dirname, "app/api/auth");

// Convert to GitHub-safe name before push
if (fs.existsSync(path.join(authPath, "[...nextauth]"))) {
    fs.renameSync(path.join(authPath, "[...nextauth]"), path.join(authPath, "nextauth"));
    console.log("✅ Renamed '[...nextauth]' ➝ 'nextauth' for GitHub push.");
}

// Convert back after pull/build
if (fs.existsSync(path.join(authPath, "nextauth"))) {
    fs.renameSync(path.join(authPath, "nextauth"), path.join(authPath, "[...nextauth]"));
    console.log("✅ Renamed 'nextauth' ➝ '[...nextauth]' for NextAuth dynamic API.");
}