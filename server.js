const express = require('express');
const next = require('next');
const cron = require('node-cron');

const SaveTips = require('./services/tipsToDb');
const SaveOrders = require('./services/ordersToDb');
const SaveEvents = require('./services/eventsToDb');
const SaveEncounters = require('./services/encountersToDb');
const SaveEmployees = require('./services/employeesToDb');
const SaveCustomers = require('./services/customersToDb');
const SaveClothes = require('./services/clothesToDb');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  cron.schedule('0 */2 * * *', async () => {
    await SaveTips();
    await SaveOrders();
    await SaveEvents();
    await SaveEncounters();
    await SaveEmployees();
    await SaveCustomers();
    await SaveClothes();
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
