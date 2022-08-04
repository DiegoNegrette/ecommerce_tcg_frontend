import React from "react";
import Wrapper from "../components/Wrapper";
import { useState } from "react";
import { inventoryService } from "../constants/constants";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [quantity, setQuantity] = useState("");
	let navigate = useNavigate();

	const submit = async (e) => {
		e.preventDefault();
		try {
			await inventoryService.post("products", {
				"name": name,
				"price": price,
				"quantity": quantity,
			});
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Wrapper>
			<div className="form-container">
				<form action="" className="form" onSubmit={submit}>
					<div className="form-item">
						<label htmlFor="name" className="form-label">
							Name
						</label>
						<input
							type="text"
							className="form-control"
							id="name"
							placeholder=""
							required
							onChange={(e) => setName(e.target.value)}
						/>
						<div className="invalid-feedback">
							Valid name is required.
						</div>
					</div>
					<div className="form-item">
						<label htmlFor="price" className="form-label">
							Price
						</label>
						<input
							type="number"
							className="form-control"
							id="price"
							step="0.01"
							required
							onChange={(e) => setPrice(e.target.value)}
						/>
						<div className="invalid-feedback">
							Valid price is required.
						</div>
					</div>
					<div className="form-item">
						<label htmlFor="quantity" className="form-label">
							Quantity
						</label>
						<input
							type="number"
							className="form-control"
							id="quantity"
							step="1"
							required
							onChange={(e) => setQuantity(e.target.value)}
						/>
						<div className="invalid-feedback">
							Valid quantity is required.
						</div>
					</div>
					<button className="btn btn--submit">Create Product</button>
				</form>
			</div>
		</Wrapper>
	);
};

export default CreateProduct;
