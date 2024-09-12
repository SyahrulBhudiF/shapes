import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src/app/pages');

function getRoutes(dir: string, basePath = ''): string[] {
  const files = fs.readdirSync(dir);
  let routes: string[] = [];

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      routes = routes.concat(getRoutes(fullPath, `${basePath}/${file}`));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const route = `${basePath}/${file.replace(/\.tsx?$/, '')}`;
      routes.push(route === '/index' ? '/' : route);
    }
  });

  return routes;
}

const routes = getRoutes(pagesDir);
console.log('Available routes:', routes);
