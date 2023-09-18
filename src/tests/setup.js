import MongoMemoryServer from "mongodb-memory-server";

const mongod = new MongoMemoryServer();

module.exports = async () => {
  const uri = await mongod.getUri();

  // Configura la variable de entorno MONGODB_URI para que apunte a la instancia en memoria
  process.env.MONGODB_URI = uri;
};
