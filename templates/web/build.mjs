import { context, build } from "esbuild";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isWatch = process.argv.includes("--watch");
const isProd =
    process.env.NODE_ENV === "production" ||
    process.argv.includes("--prod");

const options = {
    entryPoints: ["src/index.tsx"],
    bundle: true,
    outdir: "dist",
    format: "esm",
    target: "esnext",
    sourcemap: !isProd,
    minify: isProd,
    splitting: true,
    chunkNames: "chunks/[name]-[hash]",
    platform: "browser",

    jsx: "transform",
    jsxFactory: "h",
    jsxFragment: "null",
    jsxImportSource: "@prestonarnold/fuse",

    logLevel: "info",
    
    loader: {
        ".css": "css"
    }
};

if (isWatch) {
    // Development
    const ctx = await context(options);

    await ctx.watch();
    copyStylesToDist();
    
    // Watch for CSS changes
    fs.watch(path.join(__dirname, 'src', 'styles'), (eventType, filename) => {
        if (filename && filename.endsWith('.css')) {
            console.log(`CSS file ${filename} changed, copying to dist...`);
            copyStylesToDist();
        }
    });
    
    await ctx.serve({
        servedir: ".",
        port: 3000,
        fallback: "index.html"
    });

    console.log("Dev server running at http://localhost:3000");
} else {
    // Production
    await build(options);
    copyStylesToDist();
    console.log("Build complete");
}

async function copyStylesToDist() {
    const srcDir = path.join(__dirname, 'src', 'styles');
    const destDir = path.join(__dirname, 'dist', 'styles');
    
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }
    
    const files = fs.readdirSync(srcDir);
    
    for (const file of files) {
        if (file.endsWith('.css')) {
            const srcFile = path.join(srcDir, file);
            const destFile = path.join(destDir, file);
            fs.copyFileSync(srcFile, destFile);
            console.log(`Copied ${file} to ${destDir}`);
        }
    }
}