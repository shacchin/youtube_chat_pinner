import { ConfigurationFactory } from "webpack";
import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";

const config: ConfigurationFactory = () => {
  return {
    entry: {
      contentscript: path.join(__dirname, "src", "ts", "contentscript.ts"),
      background: path.join(__dirname, "src", "ts", "background.ts"),
    },
    output: {
      // distディレクトリにcontentscript.jsを吐く
      path: path.join(__dirname, "dist"),
      filename: "[name].js",
    },
    module: {
      rules: [
        {
          test: /.ts$/,
          use: "ts-loader",
          exclude: "/node_modules/",
        },
      ],
    },
    resolve: {
      extensions: ["ts", "js"],
    },
    plugins: [
      // publicディレクトリにあるファイルをdistディレクトリにコピーする
      new CopyWebpackPlugin([{ from: "public", to: "." }]),
    ],
  };
};

export default config;
