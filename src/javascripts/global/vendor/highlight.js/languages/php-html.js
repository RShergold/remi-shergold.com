module.exports = function(hljs) {
  return {
    subLanguage: 'xml',
    contains: [
      {
        begin: /<\?(php)?/, end: /\?>/,
        subLanguage: 'php',
        contains: [{begin: '/\\*', end: '\\*/', skip: true}]
      }
    ]
  }
};