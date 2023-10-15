const path = require("path");

const isProduction = process.env.NODE_ENV === "production";
const repository = process.env.GITHUB_REPOSITORY;
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER;
const repositoryName = repository?.replace(repositoryOwner, "");
const branch = process.env.GITHUB_HEAD_REF;
const getAssetPrefix = () => {
  if (isProduction) {
    if (repositoryName === "main") {
      return repositoryName;
    } else {
      return `${repositoryName}/${branch}`;
    }
  }
  return "";
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  assetPrefix: getAssetPrefix(),
  output: "export",
};

module.exports = nextConfig;
