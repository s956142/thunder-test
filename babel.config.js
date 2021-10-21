module.exports = {
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathPrefix: '~', // `~` 預設
        rootPathSuffix: 'src'
      }
    ]
  ]
};
