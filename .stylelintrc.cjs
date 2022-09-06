module.exports = {
  extends: [
    // standard规则集合
    'stylelint-config-standard',
    // standard规则集合scss版本
    'stylelint-config-standard-scss',
    // 样式属性顺序规则
    'stylelint-config-recess-order',
    // vue配置
    'stylelint-config-recommended-vue'
  ],
  rules: {
    indentation: 2,
    'no-empty-source': null
  }
}