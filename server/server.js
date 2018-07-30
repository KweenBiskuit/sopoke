// SERVER CONFIGURATION
const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json')); // DATABASE
const middlewares = jsonServer.defaults();
const port = 3333;
server.use(middlewares);
server.use(jsonServer.bodyParser);

// ITEMS ORDERED TRANFORMATION FOR DATABASE REQUEST
let items = null;
server.use((req, res, next) => {
  if (req.method === 'POST') {
    items = checkItemsQuantities(req.body.order.items);
    req.method = 'GET';
  }
  next();
});

router.render = (req, res) => {
  console.log('---- POKEBALLS FOUND ON DATABASES ----');
  console.log(res.locals.data);
  console.log('--------------------------------------');
  console.log('-------- ORDERED ITEMS BY ID --------');
  console.log(items);
  console.log('-------------------------------------');

  let validRequest = true;
  res.locals.data.forEach(element => {
    if (element.stock < items[element.id]) {
      validRequest = false;
    }
  });

  if (validRequest) {
    res.status(200).jsonp('Order is OK ! ');
  } else {
    res.status(400).jsonp({
      error: 'We are out of stock !'
    });
  }
};

// LAUNCH SERVER
server.use(router);
server.listen(port, () => {
  console.log('JSON Server is running on port', port);
});

// VALIDATION FUNCTION
function checkItemsQuantities(items) {
  return items.reduce((acc, curr) => {
    acc[curr.id] = acc[curr.id] ? acc[curr.id] + 1 : 1;
    return acc;
  }, {});
}
