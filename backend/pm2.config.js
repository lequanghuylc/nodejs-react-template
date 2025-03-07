module.exports = {
    apps: [
      {
        name: "backend-api",
        script: "./node_modules/.bin/ts-node ./src/index.ts",
        env: {
          NODE_PATH: "./src",
        },
      },
    ],
  };
  