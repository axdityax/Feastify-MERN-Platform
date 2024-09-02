import mongoose from "mongoose";

export const connectDB = async () => {
	await mongoose
		.connect("mongodb+srv://feastify:Additya2502@cluster0.y50wd.mongodb.net/food-del")
		.then(() => {
			console.log("DB Connected");
		})
		.catch((error) => {
			console.error("DB Connection Error:", error);
		});
};
