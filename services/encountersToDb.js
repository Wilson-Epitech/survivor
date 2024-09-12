const mongoose = require('mongoose');
const fetch = require('node-fetch');

const encounterSchema = new mongoose.Schema ({
    _id_encounter: { type: Number, unique: true },
    _customer_id: Number,
    _date: String,
    _rating: Number,
    _comment: String,
    _source: String
});

const encounter = mongoose.model('encounter', encounterSchema);

async function encountersToDatabase() {

    try {
        if (mongoose.connection.readyState !== 1) {
            const uri = process.env.MONGODB_URI;
            if (!uri) throw new Error("MONGODB_URI is undefined");
            await mongoose.connect(uri);
        }

        let urlNbEncounter = `https://soul-connection.fr/api/encounters`;
        const data = await fetch(urlNbEncounter, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "X-Group-Authorization": process.env.X_GROUP_KEY,
            Authorization: `Bearer ${process.env.ADMIN_BEARER_TOKEN}`
            }
        });

        const encountersFromApi = await data.json();

        for (let i = 0; i < encountersFromApi.length; i++) {

            const existingEncounters = await encounter.findOne({ _id_encounter: encountersFromApi[i].id});

            if (existingEncounters)
                continue;

            let urlEncounter = `https://soul-connection.fr/api/encounters/${encountersFromApi[i].id}`;

            const encounterDataFetch = await fetch(urlEncounter, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Group-Authorization": process.env.X_GROUP_KEY,
                    Authorization: `Bearer ${process.env.ADMIN_BEARER_TOKEN}`
                }
            });

            const encounterData = await encounterDataFetch.json();

            try {
                await clothes.create({
                        _id_encounter: encounterData.id,
                        _customer_id: encounterData.customer_id,
                        _date: encounterData.date,
                        _rating: encounterData.rating,
                        _comment: encounterData.comment,
                        _source: encounterData.source
                    },
                    { upsert: true }
                );
            } catch (error) {
                console.error(`Error processing encounter ${encounterData.id}:`, error);
            }
        }

    } catch (error) {
        console.error('Error during encountersToDatabase execution:', error);
    }
}

module.exports = encountersToDatabase;
