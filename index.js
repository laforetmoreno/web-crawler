const request = require('request-promise');
const cheerio = require('cheerio');
const mailer = require('./mailer.js');

const url = 'https://rj.olx.com.br/?ot=1&q=macbook'

const options = {
    url: url,
    transform: function (body) {
        return cheerio.load(body);
    }
}

function makeTemplate(data) {
    data.map(infos => infos.name)
}

request(options)
    .then($ => {
        const arr = [];
        $('.item').each((i, item) => {

            const product = {
                name: $(item).find('.OLXad-list-title').text().replace(/[^a-zA-Z.]/g, ''),
                price: parseFloat($(item).find('.OLXad-list-price').text().split(' ')[2]),
            }

            if (product.price <= 2) {
                arr.push(product);
            }
        })
        mailer.sendMail()
    })

    .catch(err => {
        console.log(err);
    })