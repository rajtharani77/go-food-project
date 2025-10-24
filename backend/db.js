import 'dotenv/config';
import mongoose from 'mongoose';
const mongoURI = process.env.MONGO_URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB successfully!');
    
    const fetchedData= await mongoose.connection.db.collection("food_items");
    const data = await fetchedData.find({}).toArray();

    const food_category=await mongoose.connection.db.collection("food_category");
    const catData=await food_category.find({}).toArray();
    global.food_items = data;
    global.food_category=catData;
    console.log("Data fetched and stored successfully!");

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
export default connectToDB;