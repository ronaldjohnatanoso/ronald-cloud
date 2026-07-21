const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, '..', 'node_modules/@copilotkit/react-core/dist/v2/index.css');

if (fs.existsSync(cssFile)) {
  let css = fs.readFileSync(cssFile, 'utf8');
  css = css.replace(/@layer base \{[\s\S]*?\n\}/g, '/* @layer base removed for Turbopack compat */');
  fs.writeFileSync(cssFile, css);
  console.log('[postinstall] Patched CopilotKit CSS for Turbopack compatibility');
} else {
  console.log('[postinstall] CopilotKit CSS not found, skipping patch');
}
