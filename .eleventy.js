const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const htmlmin = require('html-minifier')

module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats('11ty.js,md')
  eleventyConfig.addPassthroughCopy('static')
  // add syntax highlighting plugin
  eleventyConfig.addPlugin(syntaxHighlight)
  // minify html using html-minifier
  eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
    if (outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }

    return content
  })

  return {
    passtroughFileCopy: true,
    dir: {
      input: '.',
      includes: '_includes',
      data: '_data',
      output: '_site',
    },
  }
}
