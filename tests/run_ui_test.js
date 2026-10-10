const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  console.log("🚀 Starting visible browser on macOS desktop...");
  
  // headless: false forces a visual browser GUI instance to launch
  const browser = await chromium.launch({ headless: false }); 
  
  // Record video of the actual browser window interactions
  const context = await browser.newContext({ 
    recordVideo: { dir: 'videos/' } 
  });
  
  const page = await context.newPage();
  
  console.log("🌐 Navigating to GitHub...");
  await page.goto('https://github.com');
  
  // Ensure the folders exist for saving artifacts
  if (!fs.existsSync('screenshots')) fs.mkdirSync('screenshots');
  
  console.log("📸 Taking screenshot of the desktop window...");
  await page.screenshot({ path: 'screenshots/desktop-view.png' });
  
  await browser.close();
  console.log("✅ Test finished successfully!");
})();
