// Source: https://dev.to/diass_le/tutorial-web-scraping-with-nodejs-and-cheerio-2jbh

const
cheerio = require("cheerio"),
axios = require("axios").default;

const fethHtml = async url => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch {
    console.error(`ERROR: An error occurred while trying to fetch the URL: ${url}`);
  }
};

const extractAd = selector => {
  const title = selector
  .find(".disp-tit > a")
  .html()
  .split('<br>')[0]
  .trim()

  const url = selector
  .find(".disp-tit > a")
  .attr("href")

  const image = selector
  .find(".homere")
  .attr("src")

  const city = selector
  .find(".disp-tit > a")
  .html()
  .split('<br>')[1]
  .trim()

  const price = selector
  .find(".disp-foot")
  .text()
  .trim()

  const bed = selector
  .find(".disp-dat b:nth-of-type(1)")
  .text()
  .trim()

  const bath = selector
  .find(".disp-dat b:nth-of-type(2)")
  .text()
  .trim()

  const sqm = selector
  .find(".disp-dat b:nth-of-type(3)")
  .text()
  .trim()

  return {
    title,
    url,
    image,
    city,
    price,
    sqm,
    bed,
    bath
  }
}

const scrapAvc = async () => {
  const avcUrl =
  "https://www.agenziavalcalepio.it/";

  const html = await fethHtml(avcUrl);

  const selector = cheerio.load(html);

  const searchResults = selector("body").find(
    ".dispgrp > .dispbox"
  );

  const ads = searchResults
  .map((idx, el) => {
    const elementSelector = selector(el);
    return extractAd(elementSelector);
  })
  .get();

  console.log(ads);

  return ads;
};

module.exports = scrapAvc;
