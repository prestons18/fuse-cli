import { context, build } from "esbuild";

const isWatch = process.argv.includes("--watch");
const isProd =
    process.env.NODE_ENV === "production" ||
    process.argv.includes("--prod");

const options = {
    entryPoints: ["src/main.tsx"],
    bundle: true,
    outdir: "dist",
    format: "esm",
    target: "esnext",
    sourcemap: !isProd,
    minify: isProd,
    splitting: true,
    chunkNames: "chunks/[name]-[hash]",
    platform: "browser",

    jsx: "react",
    jsxFactory: "h",
    jsxFragment: "null",
    jsxImportSource: "@prestonarnold/fuse",

    logLevel: "info"
};

if (isWatch) {
    // Development
    const ctx = await context(options);

    await ctx.watch();
    await ctx.serve({
        servedir: ".",
        port: 3000,
        fallback: "index.html"
    });

    console.log("Dev server running at http://localhost:3000");
} else {
    // Production
    await build(options);
    console.log("Build complete");
}
