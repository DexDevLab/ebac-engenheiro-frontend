const path = require("path");
const HtmlWebpack = require("html-webpack-plugin");
const MiniCssExtract = require("mini-css-extract-plugin");
const HtmlWebpackLiveReload = require("html-webpack-live-reload-plugin");

const mode = process.env.NODE_ENV || "development";
const target = process.env.NODE_ENV === "production" ? "browserslist" : "web";

module.exports = {
  mode: mode,
  // entry: ["./src/js/index.js", "./src/js/index2.js"],
  entry: ["./src/js/index.js"],
  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(sa|c|sc)ss$/i,
        use: [MiniCssExtract.loader, "css-loader", "sass-loader"],
        generator: {
          filename: "css/[name][ext]",
        },
      },
      //   {
      //     test: /\.css$/i,
      //     use: ["style-loader", "css-loader"],
      //   },
      // {
      //   test: /\.(jpeg|jpg|png|svg|gif)$/i,
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       name: "./assets/[name].[ext]",
      //     },
      //   },
      // },
      // {
      //   test: /\.(png|jp(e*)g|svg)$/,
      //   dependency: { not: ["url"] },
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 8192,
      //       },
      //     },
      //   ],
      //   type: "javascript/auto",
      // },
      {
        test: /\.(jpeg|jpg|png|svg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "./assets/images/[name][ext]",
        },
      },
      {
        test: /\.(mp4)$/i,
        type: "asset/resource",
        generator: {
          filename: "./assets/videos/[name][ext]",
        },
      },
      {
        test: /\.(woff|woff2|ttf)$/i,
        type: "asset/resource",
        generator: {
          filename: "./assets/fonts/[name][ext]",
        },
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   type: "asset",
      //   generator: {
      //     filename: "./assets/[name].[ext]",
      //   },
      // },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpack({
      filename: "pages/index.html",
      template: "./src/pages/index.html",
    }),
    // new HtmlWebpack({
    //   filename: "index2.html",
    //   template: "./src/pages/index2.html",
    // }),
    new HtmlWebpackLiveReload({ template: "src/pages/index.html" }),
    new MiniCssExtract({
      filename: "css/main.css",
    }),
    // new CompressionPlugin({
    //   compressionOptions: {
    //     numiterations: 15,
    //   },
    //   algorithm(input, compressionOptions, callback) {
    //     return zopfli.gzip(input, compressionOptions, callback);
    //   },
    // }),
  ],
  target: target,
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist/pages"),
    },
    liveReload: true,
    watchFiles: ["src/**"],
  },
};
