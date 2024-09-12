const mongoose = require('mongoose');
const fetch = require('node-fetch');

const clothesSchema = new mongoose.Schema ({
  _id_clothes: {type: Number},
  _id_client: {type: Number},
  _type: {type: String},
  _image: {type: String}
}, { collection: 'clothes' });

const clothes = mongoose.model('clothes', clothesSchema);

async function clothesToDatabase() {

    try {

        if (mongoose.connection.readyState !== 1) {
            const uri = process.env.MONGODB_URI;
            if (!uri) throw new Error("MONGODB_URI is undefined");
            await mongoose.connect(uri);
        }

        const urlNbCustomer = `https://soul-connection.fr/api/customers`;
        const data = await fetch(urlNbCustomer, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Group-Authorization": process.env.X_GROUP_KEY,
                Authorization: `Bearer ${process.env.ADMIN_BEARER_TOKEN}`
            }
        });

        const customersFromApi = await data.json();

        for (let i = 0; i <= customersFromApi.length; i++) {
            let url = `https://soul-connection.fr/api/customers/${customersFromApi[i].id}/clothes`;

            const data = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Group-Authorization": process.env.X_GROUP_KEY,
                    Authorization: `Bearer ${process.env.ADMIN_BEARER_TOKEN}`
                }
            });

            const clothesData = await data.json()

            for(let clothes_i = 0; clothes_i < clothesData.length; clothes_i++) {

                const existingClothes = await clothes.findOne({ _id_clothes: clothesData[clothes_i].id});

                if (existingClothes)
                    continue;

                let imageUrl = `https://soul-connection.fr/api/clothes/${clothesData[clothes_i].id}/image`;

                const imageResp = await fetch(imageUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Group-Authorization": process.env.X_GROUP_KEY,
                        Authorization: `Bearer ${process.env.ADMIN_BEARER_TOKEN}`
                    }
                });

                const imageBlob = await imageResp.arrayBuffer();
                const imageBase64 = Buffer.from(imageBlob).toString('base64');

                try {
                    clothes.create({
                        _id_clothes: clothesData[clothes_i].id,
                        _id_client: customersFromApi[i].id,
                        _type: clothesData[clothes_i].type,
                        _image: imageBase64
                    })
                } catch (error) {
                    console.error('Error inserting clothes', clothesData[clothes_i].id, error);
                }
            }
        }
    } catch (error) {
        console.error('Error fetching clothes:', error);
    }
}

module.exports = clothesToDatabase;
