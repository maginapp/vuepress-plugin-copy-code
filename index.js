const path = require('path')

module.exports = (options = {}, context) => ({
  name: '@maginapp/vuepress-plugin-copy-code',

  define: {
    selector: options.selector || ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'],
    color: options.color || '#0094ff',
    backgroundColor: options.backgroundColor || '#196794',
    backgroundTransition: options.backgroundTransition !== false,
    successText: options.successText || 'Copy successfully!',
    duration: options.duration || 1000,
    iconVisible: options.iconVisible || false,
    showInMobile: options.showInMobile !== false,
    align: options.align || { bottom: '7px', right: '7px' }
  },

  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js')
})
