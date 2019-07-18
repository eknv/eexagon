module.exports = function (api) {
  api.cache.using(() => false) // TODO: make this profile dependent, cache just for the prod environment

  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = [
    // used by react-native
    ["module-resolver", {
      "root": ["./"],
      "alias": {
        "Common": "./common",
        "X": "./common/components",
        "S": "./common/screens",
      }
    }],
    "react-native-classname-to-style",
    [
      "react-native-platform-specific-extensions",
      {
        "extensions": ["css", "scss", "sass"]
      }
    ]
  ];

  return {
    presets,
    plugins,
  };
};
