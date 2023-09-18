import MongoMemoryServer from "mongodb-memory-server";

const mongod = new MongoMemoryServer();

module.exports = async () => {
  await mongod.stop();
};
