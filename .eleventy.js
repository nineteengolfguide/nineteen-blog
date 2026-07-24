module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addCollection("posts", function (collectionApi) {
                                          return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date);
                                        });
  eleventyConfig.addFilter("readableDate", function (dateObj) {
                                             return new Date(dateObj).toLocaleDateString("de-CH", {
                                                                                                      day: "2-digit",
                                                                                                      month: "2-digit",
                                                                                                      year: "numeric",
                                                                                                    });
                                           });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
  };
};
