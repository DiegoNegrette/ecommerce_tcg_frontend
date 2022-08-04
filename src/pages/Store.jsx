import React from "react";
import Wrapper from "../components/Wrapper";
import { useEffect, useState } from "react";
import { capitalize } from "../utils/Capitalize";
import { Link } from "react-router-dom";
import { storeService } from "../constants/constants";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { flatten } from "../utils/FlattenObject";

const Store = () => {
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

	const renderContent = () => {
		if (Array.isArray(products)) {
			return (
				<ul className="cards">
					{products.map((product) => {
						return (
							<li className="card" key={product.id}>
								<Link to={`/card/${product.id}`}>
									<img
										className="card__img"
										src="https://picsum.photos/290/300"
										alt="Reference image"
									/>
									<div className="card__description">
										<p className="card__title">
											{capitalize(product.name)}
										</p>
										<p className="card__category">
											{product.maze}
										</p>
										<span className="card__price">
											$144
										</span>
										<div className="card__extra-description">
											<p className="card__description">
												{product.description}
											</p>
											<button
												className="btn"
												type="submit"
											>
												Add to Cart
											</button>
										</div>
									</div>
								</Link>
							</li>
						);
					})}
				</ul>
			);
		} else {
			return <Spinner />;
		}
	};

	return <Wrapper>{renderContent()}</Wrapper>;
};

export default Store;
