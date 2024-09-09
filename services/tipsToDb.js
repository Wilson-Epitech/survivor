const mongoose = require('mongoose');
const fetch = require('node-fetch');

const tipsSchema = new mongoose.Schema({
  _id_tip: Number,
  _title: String,
  _tip: String
}, { collection: 'tips' });

const Tip = mongoose.model('Tip', tipsSchema);

async function tipsToDatabase() {

  try {

    if (mongoose.connection.readyState !== 1) {
      const uri = process.env.MONGODB_URI;
      if (!uri) throw new Error("MONGODB_URI is undefined");
      await mongoose.connect(uri);
    }

    let url = `https://soul-connection.fr/api/tips`;
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Group-Authorization": "***REMOVED***",
        Authorization: `Bearer ***REMOVED***`
      }
    });

    const tipData = await data.json();

    for (let tip_i = 0; tip_i <= tipData.length; tip_i++) {

      const existingTip = await Tip.findOne({ _id_tip: tipData[tip_i].id});

      if (existingTip)
        continue;

      try {
        await Tip.create({
          _id_tip: tipData[tip_i].id,
          _title: tipData[tip_i].title,
          _tip: tipData[tip_i].tip
        });
      } catch (error) {
        console.error(`Error inserting tip ${tipData[tip_i].id}:`, error);
      }
    }
  } catch (error) {
    console.error('Error fetching tips:', error);
  }
}

module.exports = tipsToDatabase;
