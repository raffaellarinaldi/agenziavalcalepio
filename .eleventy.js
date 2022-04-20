const
{ EleventyServerlessBundlerPlugin } = require("@11ty/eleventy"),
htmlmin = require("html-minifier").minify;

module.exports = (eleventyConfig) => {
  // Copy files
  eleventyConfig.addPassthroughCopy({
    "./static": "./"
  });
  // Layouts
  eleventyConfig.addLayoutAlias("base", "../layouts/base.njk");
  // Minify HTML in production
  eleventyConfig.addTransform("minifyHTML", (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html') && process.env.ELEVENTY_ENV !== "development") {
      return htmlmin(content, {
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeComments: true,
        useShortDoctype: true
      });
    }
    return content;
  });
  // Shortcodes
  eleventyConfig.addNunjucksShortcode("year", () => `${new Date().getFullYear()}`);
  // Serverless
  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "onrequest",
    functionsDir: "./netlify/functions/"
  });
  // Return
  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      data: "data",
      includes: "includes",
      layouts: "layouts",
      output: "dist"
    }
  }
}
