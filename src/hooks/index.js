const modulesFiles = import.meta.globEager('./modules/*.js');

const modules = {};
Object.keys(modulesFiles).forEach(modulePath => {
  const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, "$1");
  modules[moduleName] = modulesFiles[modulePath].default;
})

export default modules;
