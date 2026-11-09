const fs = require("fs");
const path = require("path");

const rootConfigPath = path.resolve(__dirname, "app-config.json");
const wwwDir = path.resolve(__dirname, "www");
const wwwConfigPath = path.resolve(wwwDir, "app-config.json");

if (fs.existsSync(wwwConfigPath) && fs.existsSync(rootConfigPath)) {
  const rootConfig = JSON.parse(fs.readFileSync(rootConfigPath, "utf-8"));
  const wwwConfig = JSON.parse(fs.readFileSync(wwwConfigPath, "utf-8"));

  // Only keep files that actually exist in www/
  const filterExisting = (arr) => {
    const list = Array.from(new Set(arr || []));
    return list.filter((relPath) => fs.existsSync(path.resolve(wwwDir, relPath)));
  };

  rootConfig.listCSS = filterExisting(wwwConfig.listCSS);
  rootConfig.listSyncJS = filterExisting(wwwConfig.listSyncJS);
  rootConfig.listAsyncJS = filterExisting(wwwConfig.listAsyncJS);
  rootConfig.pages = ["pages/index/index"];

  // Sync to www/app-config.json as well
  wwwConfig.listCSS = rootConfig.listCSS;
  wwwConfig.listSyncJS = rootConfig.listSyncJS;
  wwwConfig.listAsyncJS = rootConfig.listAsyncJS;
  wwwConfig.pages = rootConfig.pages;

  fs.writeFileSync(rootConfigPath, JSON.stringify(rootConfig, null, 2) + "\n");
  fs.writeFileSync(wwwConfigPath, JSON.stringify(wwwConfig, null, 2) + "\n");

  console.log("✅ Synced build assets into app-config.json:");
  console.log("   - listCSS:", rootConfig.listCSS);
  console.log("   - listSyncJS:", rootConfig.listSyncJS);
} else {
  console.warn("⚠️ Either www/app-config.json or app-config.json not found.");
}
