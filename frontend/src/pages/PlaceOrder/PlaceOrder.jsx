import React, { useContext, useState, useEffect } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const PlaceOrder = () => {
	const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

	const navigate = useNavigate();

	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		street: "",
		city: "",
		state: "",
		zipcode: "",
		country: "",
		phone: "",
	});
	const onChangeHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setData((prevData) => ({ ...prevData, [name]: value }));
	};

	// useEffect(() => {
	// 	console.log("Data has changed:", data);
	// }, [data]);

	const placeOrder = async (event) => {
		event.preventDefault();
		let orderItems = [];
		food_list.map((item) => {
			if (cartItems[item._id] > 0) {
				let itemInfo = item;
				itemInfo["quantity"] = cartItems[item._id];
				orderItems.push(itemInfo);
			}
		});

		let orderData = {
			items: orderItems,
			address: data,
			amount: getTotalCartAmount() + 2,
		};

		let response = await axios.post(url + "/api/order/place", orderData, {
			headers: { token },
		});
		if (response.data.success) {
			const { session_url } = response.data;
			window.location.replace(session_url);
		} else {
			alert("Error placing order");
		}

		// console.log(orderItems);

		try {
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (!token) {
			navigate("/cart");
		} else if (getTotalCartAmount() === 0) {
			navigate("/cart");
		}
	}, [token]);

	return (
		<div>
			<form onSubmit={placeOrder} action='' className='place-order'>
				<div className='place-order-left'>
					<p className='title'>Deilvery Information</p>
					<div className='multi-field'>
						<input
							required
							type='text'
							placeholder='First name'
							name='firstName'
							value={data.firstName}
							onChange={onChangeHandler}
						/>
						<input
							required
							type='text'
							placeholder='Last name'
							name='lastName'
							value={data.lastName}
							onChange={onChangeHandler}
						/>
					</div>
					<input
						required
						type='email'
						placeholder='Email address'
						name='email'
						value={data.email}
						onChange={onChangeHandler}
					/>
					<input
						required
						type='text'
						placeholder='Street'
						name='street'
						value={data.street}
						onChange={onChangeHandler}
					/>
					<div className='multi-field'>
						<input
							required
							type='text'
							placeholder='City'
							name='city'
							value={data.city}
							onChange={onChangeHandler}
						/>
						<input
							required
							type='text'
							placeholder='State'
							name='state'
							value={data.state}
							onChange={onChangeHandler}
						/>
					</div>
					<div className='multi-field'>
						<input
							required
							type='text'
							placeholder='Zip Code'
							name='zipcode'
							value={data.zipcode}
							onChange={onChangeHandler}
						/>
						<input
							required
							type='text'
							placeholder='Country'
							name='country'
							value={data.country}
							onChange={onChangeHandler}
						/>
					</div>
					<input
						type='text'
						required
						placeholder='Phone'
						name='phone'
						value={data.phone}
						onChange={onChangeHandler}
					/>
				</div>
				<div className='place-order-right'>
					<div className='cart-total'>
						<h2>Cart Totals</h2>
						<div>
							<div className='cart-total-details'>
								<p>Subtotal</p>
								<p>${getTotalCartAmount()}</p>
							</div>
							<hr />
							<div className='cart-total-details'>
								<p>Delivery Fee</p>
								<p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
							</div>
							<hr />
							<div className='cart-total-details'>
								<b>Total</b>
								<p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
							</div>
						</div>
						<button onClick={() => navigate("/order")}>PROCEED TO CHECKOUT</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default PlaceOrder;
