const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

async function generateFavicons() {
  const svgPath = path.join(__dirname, '../public/logo.svg');
  const sizes = [16, 32, 192, 512];

  // Read SVG content
  const svgContent = fs.readFileSync(svgPath, 'utf8');

  // Create favicons for each size
  for (const size of sizes) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#6366f1');
    gradient.addColorStop(1, '#a855f7');

    // Draw circle
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * 0.42, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw credit card icon (simplified for favicon)
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';
    ctx.lineWidth = Math.max(1, size / 32);

    // Card body
    const cardWidth = size * 0.42;
    const cardHeight = size * 0.33;
    const cardX = (size - cardWidth) / 2;
    const cardY = (size - cardHeight) / 2;
    const radius = size * 0.04;

    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardWidth, cardHeight, radius);
    ctx.stroke();

    // Card strip
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(cardX, cardY + cardHeight * 0.3, cardWidth, cardHeight * 0.25);

    // Card details (lines)
    ctx.strokeStyle = 'white';
    ctx.lineWidth = Math.max(1, size / 48);

    const lineY = cardY + cardHeight * 0.7;
    const lineLength = cardWidth * 0.15;

    ctx.beginPath();
    ctx.moveTo(cardX + cardWidth * 0.2, lineY);
    ctx.lineTo(cardX + cardWidth * 0.2 + lineLength, lineY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cardX + cardWidth * 0.55, lineY);
    ctx.lineTo(cardX + cardWidth * 0.55 + lineLength, lineY);
    ctx.stroke();

    // Save PNG
    const buffer = canvas.toBuffer('image/png');
    const filename = size === 192 ? 'icon-192.png' : size === 512 ? 'icon-512.png' : `favicon-${size}x${size}.png`;
    fs.writeFileSync(path.join(__dirname, '../public', filename), buffer);
    console.log(`Generated ${filename}`);
  }

  // Create a basic favicon.ico from the 32x32 version
  const favicon32Path = path.join(__dirname, '../public/favicon-32x32.png');
  const faviconPath = path.join(__dirname, '../public/favicon.png');
  fs.copyFileSync(favicon32Path, faviconPath);
  console.log('Generated favicon.png');
}

// Check if canvas is available
try {
  generateFavicons().catch(console.error);
} catch (error) {
  console.log('Canvas library not installed. Installing now...');
  const { exec } = require('child_process');
  exec('npm install canvas', (err, stdout, stderr) => {
    if (err) {
      console.error('Failed to install canvas:', err);
      console.log('\nGenerating simple PNG favicons without canvas...');

      // Fallback: create simple favicons without canvas
      const simpleIcon = Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKBSURBVHgBrVfJbtswEJ0h5X2JkxZo0QW9tOih3Xpo+wP9AO9AD0X/oH/Q9Af6A+2pPRT9gfZQtKcCRZEiTZzEdhxblkiRM8RQsihKshMgAEHiLN+bN28WSn4RQvBfLJ8sFovT+Xz+er1eny8UCpfwm8L5H/h8hP0N7K/BLsGm8PlqOp1+7na7X/8b4Ha7vaJp2g1VVR/l8/mbsiwnsJwfIJdOp1/1er339A8sFotLmqZd1zTtBRE+SaVSl4jo7xkOh690Xb+NWCeTyefdbvczIiQ7MBgMZkSUBEilUqlPqVQqFQqFbBi+UCgUkskkrQlBzGaz2SyXy72bzWZfkGFRgEAgQJ0JhUIhHA6HyXGxWOzt7u7e39ra+sQYe43nH8FiuVzuSgRIJBJBnkUUCgQC/nQ6HWPIxONxNl6JRAKXSv1+/yP7F8C5QCDAmUTiAXd2draOj4+vIMLniIdEqFQq7wjQbrdX5KFAIDCn4RKTlKSjKMqjaDT6UJKk24iQhmMYxrPBYPCCkAocVCgUGDEymQznGo/HOTeFQuECuUuQHTweD0EQhJCiKE8Iql6vf+HhbW1tZRKJRBJZUK1Wr5BzKqLy+/2sT4IgCAL2y6i1t3gFJyJGGDudTr/X6/VvNKTJZPKl0Wj8JJzr9ToDS6VSRPRyuVyMRCLXMAfv+v3+TyKKdrvdH4wxhOsZznK5XBi5T6fTBElns9kyuXFJzCgmKZnT7OyQW+12+wfh1mw2v2E+PvHcGkDlp2AwyOYJqXz5fP78z8wA9gqFgidJOOOQVEfOsizLtu0V9s31gcwJTzAYZP0Sf4jYaDSaDUXxm4q1BvCgw7YNHTZhO5i3RHdra+uZaEeOA/4BFuvBcLnJu2YAAAAASUVORK5CYII=',
        'base64'
      );

      fs.writeFileSync(path.join(__dirname, '../public/favicon.png'), simpleIcon);
      fs.writeFileSync(path.join(__dirname, '../public/favicon-32x32.png'), simpleIcon);
      fs.writeFileSync(path.join(__dirname, '../public/icon-192.png'), simpleIcon);
      console.log('Created basic favicon files');
    } else {
      console.log('Canvas installed successfully. Generating favicons...');
      require('./generate-favicon.js');
    }
  });
}