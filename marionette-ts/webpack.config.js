module.exports = {
  entry: "./src/renderer/index.ts",
  output: {
    path: "dist",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".ts", ".js"]
  },
  module: {
    loaders: [
      {test: /\.ts$/, loader: "ts-loader"}
    ]
  }
};