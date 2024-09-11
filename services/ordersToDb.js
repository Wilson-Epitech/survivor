const mongoose = require('mongoose');
const fetch = require('node-fetch');

const orderSchema = new mongoose.Schema ({
    _id_order: Number,
    _id_client: Number,
    _date: String,
    _payment_method: String,
    _amount: Number,
    _comment: String
  });

const order = mongoose.model("orders", orderSchema);

async function ordersToDatabase() {

  try {

    if (mongoose.connection.readyState !== 1) {
      const uri = process.env.MONGODB_URI;
      if (!uri) throw new Error("MONGODB_URI is undefined");
      await mongoose.connect(uri);
    }

    let urlCusto = `https://soul-connection.fr/api/customers`;
      const data = await fetch(urlCusto, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Group-Authorization": "***REMOVED***",
          Authorization: `Bearer ***REMOVED***`
          }
      });

    const customerData = await data.json()

    for (let i = 0; i <= customerData.length; i++) {

      let url = `https://soul-connection.fr/api/customers/${customerData[i].id}/payments_history`;
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Group-Authorization": "***REMOVED***",
          Authorization: `Bearer ***REMOVED***`
          }
      });

      const payementData = await data.json()

      for(let payment_i = 0; payment_i < payementData.length; payment_i++) {

        const existingOrder = await order.findOne({ _id_order: payementData[payment_i].id});

        if (existingOrder)
          continue;

        let obj = payementData[payment_i];

        try {
          await order.create({
            _id_order: obj.id,
            _id_client: customerData[i].id,
            _date: obj.date,
            _payment_method: obj.payment_method,
            _amount: obj.amount,
            _comment: obj.comment
          })
        } catch (error) {
          console.error('Error inserting orders', obj.id, error);
        }
      }
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
}

module.exports = ordersToDatabase;