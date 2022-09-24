/* Directive Modules */
const directivesModules = import.meta.globEager('./modules/*.js');

export default (app) => {
  // 注册指令
  if (Object.keys(directivesModules).length) {

    Object.keys(directivesModules).forEach(modulePath => {
      // 获取指令函数
      const directiveConfig = directivesModules[modulePath];

      // 获取指令名称
      const directiveName = modulePath
        // 移除开始的 './modules/'
        .replace(/^\.\/modules\//, "")
        // 移除文件扩展
        .replace(/\.\w+$/, "");

        app.directive(directiveName, directiveConfig.default || directiveConfig);
    })
  }
};