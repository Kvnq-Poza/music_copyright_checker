import MongoDBAdapter from "./adapter/mongodb";

async function connectDB() {
    if (!process.env.DB_URI) {
        console.log(process.env.DB_URI)
        throw new Error('DB Uri not set');
    }
    try {
        const mongoAdapter = new MongoDBAdapter(process.env.DB_URI);
        await mongoAdapter.connect();
    } catch (err) {
        throw new Error('database connection failed');
    };
}

export default connectDB;
