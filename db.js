const mongoose = require("mongoose");
const mongoURI = 'mongodb+srv://khana:khana@cluster0.myayysx.mongodb.net/khana?retryWrites=true&w=majority';

const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, result) => {
        if (err) console.log("--FAIL CONNECTION--")
        else {
            console.log('connection succes');
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("food_category");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.food_category = catData;
                    }
                })
                if (err) console.log(err);
                else {
                    global.food_items = data;

                }
            })
        }
    });
}


module.exports = mongoDB;



