const express = require('express');
var request = require('request');
var cheerio = require('cheerio');
const path = require('path');
const { resolve } = require('path');
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.get('/I/want/title/',async (req, res) => { 
      let addresses=req.query.address;
      let promises= addresses.map( address=>new Promise(resolve=>{
        request(address, {
          json: true
        }, (err, res) => {
          if (err) {
            return reject(err);
          }   
          resolve(cheerio.load(res.body)('title').text());
        });
      }))
        let titles;
       Promise.all(promises).then(results=>{
         titles=results;
         res.render('index', {
          addresses:addresses,
          titles:titles
      })
       })
     
})
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App listening on port ${port}`))