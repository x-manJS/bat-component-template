const designWidth = 320; // 统一的视觉稿尺寸
const rootValue = (designWidth * 20) / 320; // root FontSize

module.exports = {
  parser: 'postcss-comment', // 可解析行内注释 postcss-strip-inline-comments以来的postcss版本和当前版本不兼容
  plugins: {
    // cssnano: {
    //   preset: "default"
    // },
    "postcss-pxtorem": {
      rootValue: rootValue,
      propList: ["*"],
      // 注意：如果有使用第三方UI如VUX，则需要配置下忽略选择器不转换。
      // 规则是class中包含的字符串，如vux中所有的class前缀都是weui-。也可以是正则。
      selectorBlackList: ["weui-"]
    }
  }
};
