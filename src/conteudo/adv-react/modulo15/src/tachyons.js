const fs = require("fs").promises;
const path = require("path");

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

    return {
      post,
      modules,
      css: css.css,
      min: min.css,
    };
  };
  return await generateFn();
};

const tachyGenerate = async (config, dst) => {
  const src = await tachyonsGenerator(config);

  await tachyWrite(dst, src);
  console.log("Tachyons generated successfully.");
};

const tachyWrite = async (dst, src) => {
  await fs.writeFile(path.join(dst, "tachyons.css"), src.css);
  await fs.writeFile(path.join(dst, "tachyons.min.css"), src.min);
};

const config = require("../tachyons.json");
const outputPath = "./src/assets/styles/css";
tachyGenerate(config, outputPath);
