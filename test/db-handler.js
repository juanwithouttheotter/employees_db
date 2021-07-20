const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;


module.exports.connect = async () => {
    
    await mongoose.disconnect();

    mongoServer = await MongoMemoryServer.create();

    const uri = await mongoServer.getUri();

    const mongooseOpts = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    };

    await mongoose.connect(uri, mongooseOpts, err => {
        if (err) {
            console.log(err);
        }
    });
}

module.exports.closeDatabase = async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
}

module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
       await collections[key].deleteMany();
    }
}

