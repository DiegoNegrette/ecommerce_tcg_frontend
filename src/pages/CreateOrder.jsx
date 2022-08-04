import React from "react";
import Wrapper from "../components/Wrapper";
import { useState, useEffect } from "react";
import { inventoryService, paymentService } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const CreateOrder = () => {
	const [selectedProduct, setSelectedProduct] = useState("");
	const [quantity, setQuantity] = useState("");
	let navigate = useNavigate();
	const [products, setProducts] = useState(null);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const response = await inventoryService.get("products");
				setProducts(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		getProducts();
	}, []);

	const submit = async (e) => {
		e.preventDefault();
		try {
			await paymentService.post("orders", {
				"id": selectedProduct,
				"quantity": quantity,
			});
			navigate("/orders");
		} catch (error) {
			console.log(error);
		}
	};

	const renderContent = () => {
		if (Array.isArray(products)) {
			return (
				<div className="form-container">
					<form action="" className="form" onSubmit={submit}>
						<div className="form-item">
							<label htmlFor="product" className="form-label">
								Product
							</label>
							<select
								className="form-control"
								id="product"
								required
								onChange={(e) =>
									setSelectedProduct(e.target.value)
								}
								value={selectedProduct}
							>
								<option disabled selected value="">
									{" "}
									-- Select an option --{" "}
								</option>
								{products.map((product) => {
									return (
										<option
											key={product.id}
											value={product.id}
										>
											{product.name}
										</option>
									);
								})}
							</select>
							<div className="invalid-feedback">
								Valid name is required.
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
						<button className="btn btn--submit">
							Create Order
						</button>
					</form>
				</div>
			);
		} else {
			return <Spinner />;
		}
	};

	return <Wrapper>{renderContent()}</Wrapper>;
};

export default CreateOrder;
