const pug = require("pug");
const fs = require("fs");
const glob = require("fast-glob")
const { dirname } = require("path")

const ensureDir = path => {
    const baseDir = dirname(path);
    fs.mkdirSync(baseDir, {
        recursive: true
    })
}

const buildPath = (from, path) => {
    const newPath = path.replace(`${from}/`, "build/");
    ensureDir(newPath)
    return newPath
}

const pugFiles = glob.sync("src/**/*.pug");

pugFiles.forEach(path => {
    const fn = pug.compileFile(path);
    const newPath = buildPath("src", path).replace(".pug", ".html");
    fs.writeFileSync(newPath, fn())
})

const staticFiles = glob.sync("public/**/*");
staticFiles.forEach(path => {
    fs.copyFileSync(path, buildPath("public", path))
});