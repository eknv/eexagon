const path = require('path');

/**
 * Determine the array of extensions that should be used to resolve modules.
 */
module.exports = {
  alias: {
    Common: path.resolve(__dirname, 'common/'),
    X: path.resolve(__dirname, 'common/components'),
    S: path.resolve(__dirname, 'web/screens'),
  },
  extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.android.js', '.native.js', '.css', '.scss'],
};
