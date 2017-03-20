var superagent = require('superagent');
var cheerio = require('cheerio');
var url = 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference';

superagent.get(url)
  .end((err, res) => {
    var $ = cheerio.load(res.text);
    var listItems = $('#wikiArticle .index li a');
    var names = [].slice.call(listItems)
      .map((x) => x.children[0].children[0].data)
      .filter((x) => /^[a-z-]+$/.test(x))
    var camel = names.map((x) => x.split('-').map((a, i) => i === 0 ? a : a[0].toUpperCase() + a.slice(1)).join(''));
    camel.push('fontSize', 'flex', 'fr', 'overflowScrolling');
    var prefixed = camel.map((name) => {
      var upper = name[0].toUpperCase() + name.slice(1);
      var items = [name, 'Moz' + upper, 'Webkit' + upper, 'MS' + upper, 'O' + upper];
      if (name === 'transform') {
        items[3] = 'msTransform';
      }
      return items;
    }).reduce((xs, x) => xs.concat(x), []);
    console.log('// GENERATED DO NOT EDIT');
    console.log('module.exports = ' + JSON.stringify(prefixed, null, 2));
  });

