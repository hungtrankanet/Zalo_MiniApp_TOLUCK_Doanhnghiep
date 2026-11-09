const fs = require("fs");
const path = require("path");

const rootConfigPath = path.resolve(__dirname, "app-config.json");
const wwwConfigPath = path.resolve(__dirname, "www", "app-config.json");

if (fs.existsSync(wwwConfigPath) && fs.existsSync(rootConfigPath)) {
  const rootConfig = JSON.parse(fs.readFileSync(rootConfigPath, "utf-8"));
  const wwwConfig = JSON.parse(fs.readFileSync(wwwConfigPath, "utf-8"));

  // Deduplicate array elements
  const uniqueList = (arr) => Array.from(new Set(arr || []));

  rootConfig.listCSS = uniqueList(wwwConfig.listCSS);
  rootConfig.listSyncJS = uniqueList(wwwConfig.listSyncJS);
  rootConfig.listAsyncJS = uniqueList(wwwConfig.listAsyncJS);
  rootConfig.pages = uniqueList(rootConfig.pages && rootConfig.pages.length ? rootConfig.pages : ["pages/index/index"]);

  // Also clean www/app-config.json to not contain duplicates
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
