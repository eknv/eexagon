module.exports = function warningFixer(content) {
  return content.replace(
    `(0, _warning2['default'])(!(valuePropName in originalProps), '\`getFieldDecorator\` will override \`' + valuePropName + '\`, ' + ('so please don\\'t set \`' + valuePropName + '\` directly ') + 'and use \`setFieldsValue\` to set it.');`,
    '\n\n');


};
