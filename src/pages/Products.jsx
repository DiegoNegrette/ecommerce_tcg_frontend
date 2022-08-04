import React from "react";
import Wrapper from "../components/Wrapper";
import { useEffect, useState } from "react";
import { capitalize } from "../utils/Capitalize";
import { storeService } from "../constants/constants";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { flatten } from "../utils/FlattenObject";

const product_fields = [
	"id",
	"owner username",
	"name",
	"description",
	"maze",
	"sealed",
	"created",
];

const Products = () => {
	let navigate = useNavigate();
	const [products, setProducts] = useState(null);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const response = await storeService.get("cards/");
				const result = response.data.map((product) => {
					return flatten(product);
				});
				setProducts(result);
			} catch (error) {
				console.log(error);
			}
		};
		getProducts();
	}, []);

	const deleteProduct = async (product_id) => {
		try {
			await storeService.delete(`cards/${product_id}`);
			navigate(0);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (event, product_id) => {
		event.preventDefault();
		await deleteProduct(product_id);
	};

	const renderContent = () => {
		if (Array.isArray(products)) {
			return (
				<table>
					<thead>
						<tr>
							{product_fields.map((field) => {
								return <th key={field}>{capitalize(field)}</th>;
							})}
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => {
							return (
								<tr key={product.id}>
									{product_fields.map((field) => {
										return (
											<td key={field}>
												{product[field]}
											</td>
										);
									})}
									<td>
										<div className="icon">
											<button
												className="btn btn--delete"
												onClick={(event) =>
													handleDelete(
														event,
														product.id
													)
												}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 320 512"
												>
													<path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
												</svg>
											</button>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			);
		} else {
			return <Spinner />;
		}
	};

	return <Wrapper>{renderContent()}</Wrapper>;
};

export default Products;
