module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    "plugins": [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            },"element-ui"
        ],

        [
            "import",
          {
            "libraryName": "at",
            "libraryDirectory": "src/components"
           },
            "at-ui"
        ],
      ['import', {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: true
      }, 'ant-design-vue']
    ],
}
