const request = require('request-promise');

// Async Function - Sends a request to shopify site passed in
const getProducts = async uri => {
  const productArr = [];
  const itemArr = [];

  const options = {
    uri: `${uri}/products.json`,
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'max-age=0',
      gzip: false,
      Connection: 'keep-alive',
      'Upgrade-Insecure-Requests': 1,
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
    }
  };

  // Response holds one object Products with multiple product in it
  let response = JSON.parse(await request(options));
  response = response.products;

  // Getting variants for each product
  for (var i = 0; i < response.length; i++) {
    productArr.push(response[i].variants);
  }

  // Looping through variants properties then adding to itemArr
  for (var i = 0; i < productArr.length; i++) {
    for (var j = 0; j < productArr[i].length; j++) {
      const item = productArr[i][j];
      itemArr.push({
        id: item.id,
        title: item.title,
        available: item.available,
        price: item.price
      });
    }
  }

  console.log(itemArr);
};

getProducts('https://undefeated.com');
