import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
	const frontend_URL = "https://feastify-frontend-ip1a.onrender.com";

	try {
		const newOrder = new orderModel({
			userId: req.body.userId,
			items: req.body.items,
			amount: req.body.amount,
			address: req.body.address,
		});

		await newOrder.save();

		// Clear the user's cart
		await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

		// Prepare line items for payment processing (e.g., Stripe)
		const line_items = req.body.items.map((item) => ({
			price_data: {
				currency: "usd",
				product_data: {
					name: item.name,
				},
				unit_amount: item.price * 100,
			},
			quantity: item.quantity,
		}));

		line_items.push({
			price_data: {
				currency: "usd",
				product_data: {
					name: "Delivery Charges",
				},
				unit_amount: 2 * 100,
			},
			quantity: 1,
		});

		// Create a payment intent
		const session = await stripe.checkout.sessions.create({
			line_items: line_items,
			mode: "payment",
			success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
			cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
		});

		res.json({ success: true, session_url: session.url });
	} catch (error) {
		// Handle the error
		console.error(error);
		res.json({ success: false, message: "Failed to place order." });
	}
};

const verifyOrder = async (req, res) => {
	// Retrieve the order ID from the query parameters
	const { orderId, success } = req.body;
	try {
		if (success == "true") {
			await orderModel.findByIdAndUpdate(orderId, { payment: true });
			res.json({ success: true, message: "Paid" });
		} else {
			await orderModel.findByIdAndDelete(orderId, { payment: false });
			res.json({ success: false, message: "Failed to pay" });
		}
	} catch (error) {
		console.error({ success: false, message: "Error" });
	}
};

const userOrders = async (req, res) => {
	try {
		const orders = await orderModel.find({ userId: req.body.userId });
		res.json({ success: true, data: orders });
	} catch {
		console.log(error);
		res.json({ success: false, message: "Error" });
	}
};

// Listing Orders For Admin Panel
const listOrders = async (req, res) => {
	try {
		const orders = await orderModel.find({});
		res.json({ success: true, data: orders });
	} catch (error) {
		console.error(error);
		res.json({ success: false, message: "Error" });
	}
};

// api for updating order status
const updateStatus = async (req, res) => {
	try {
		await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
		res.json({ success: true, message: "Status Updated" });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "Error" });
	}
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
