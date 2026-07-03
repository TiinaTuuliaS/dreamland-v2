import mongoose from "mongoose";

export const connectDB = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGO_URI);


    } catch (error) {
        console.log("Virhe yhdistettäessä MongoDB tietokantaan", error.message);
        process.exit(1);
    }
}