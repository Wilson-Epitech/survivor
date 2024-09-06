import mongoose, { mongo } from 'mongoose';
import {order} from "../../mongoose_schemas/order_schema"

const uri = "***REMOVED***";

mongoose.connect(uri);

export default async function Page() {
  try {
    for (let i = 0; i <= 100; i++) {
      let cust_id = i.toString();
      let url = `https://soul-connection.fr/api/customers/${cust_id}/payments_history`;
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
        let obj = payementData[payment_i];

        console.log(`
          id_order: ${obj.id}
          id_client: ${i}
          date: ${obj.date}
          payment_method: ${obj.payment_method}
          amount: ${obj.amount}
          comment: ${obj.comment}
        `);

        try {
          order.create({
            _id: obj.id,
            _id_client: i,
            _date: obj.date,
            _payment_method: obj.payment_method,
            _amount: obj.amount,
            _comment: obj.comment
          })
        } catch (error) {
          console.error('Error inserting employees ${id_empl}:', error);
        }  
      }
    }
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
}