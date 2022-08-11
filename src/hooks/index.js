const modulesFiles = require.context("./modules", true, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  modules[moduleName] = modulesFiles(modulePath).default;
  return modules;
}, {});

export default modules;
