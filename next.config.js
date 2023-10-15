const path = require("path");
const { execSync } = require('child_process');

const isProduction = process.env.NODE_ENV === "production";
const repository = process.env.GITHUB_REPOSITORY;
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER;
const repositoryName = repository?.replace(repositoryOwner, "");
const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const getAssetPrefix = () => {
  if (isProduction) {
    if (repositoryName === "main") {
      return repositoryName;
    } else {
      return `${repositoryName}/${currentBranch}`;
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
