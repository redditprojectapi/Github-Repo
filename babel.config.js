module.exports = function configMethod(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
