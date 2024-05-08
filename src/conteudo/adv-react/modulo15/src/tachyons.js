const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");

const tachyonsGenerator = async (config) => {
  const libpath = "../node_modules/tachyons-generator";

  const buildCss = require("tachyons-build-css");
  const DEFAULT_CONFIG = require(path.join(libpath, "./config"));
  const generate = require(path.join(libpath, "/lib/generate"));
  const assembleCss = require(path.join(libpath, "/lib/assemble-css"));

  const _config = Object.assign({}, DEFAULT_CONFIG, config);
  const mediaQueries = _config.customMedia;

  const generateFn = async () => {
    const modules = await generate(_config, mediaQueries);
    const post = await assembleCss(modules, _config);
    const min = await buildCss(post, { minify: true });
    const css = await buildCss(post);
    console.log("Tachyons generated successfully.");

    return {
      post,
      modules,
      css: css.css,
      min: min.css,
    };
  };
  return await generateFn();
};

const tachyGenerate = async (config) => {
  const out = await tachyonsGenerator(config);

  const outputPath = "./src/ds/globals";
  const publicPath = "./public";
  tachyWrite(outputPath, publicPath, out);
};

const tachyWrite = (dst, publicDst, src) => {
  fs.writeFileSync(path.join(dst, "tachyons.css"), src.css);
  fs.writeFileSync(path.join(dst, "tachyons.min.css"), src.min);
  fs.writeFileSync(path.join(publicDst, "tachyons.min.css"), src.min);
};

const watcher = () => {
  const configFilePath = path.join(__dirname, "..", "tachyons.json");
  const watcher = chokidar.watch(configFilePath, {
    persistent: true,
  });

  const node = () =>{
    try {
      require("child_process").execSync("npm run tachyons", {
        stdio: "inherit",
      });
    } catch (error) {
      console.log("Error during tachyons script. Running again...");
      node();
    }
  }
  
  watcher.on("change", async (path, stats) => {
    if (stats) {
      watcher.close();
      console.log("tachyons.json was changed. Updating tachyons...");
      node();
    }
  });
};

const config = require("../tachyons.json");
tachyGenerate(config);

watcher();
