await Bun.write('./dist/.nojekyll', '')
console.log('✓ Created .nojekyll')

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Davide Palchetti - Full Stack Engineer specializing in AI, GraphQL, and AWS serverless technologies">
  <meta name="author" content="Davide Palchetti">
  <title>Davide Palchetti | Full Stack Engineer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./index.css">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="./index.js"></script>
</body>
</html>`

await Bun.write('./dist/index.html', html)
console.log('✓ Built dist/index.html')
