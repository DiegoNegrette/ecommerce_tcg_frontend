import React from "react";
import Wrapper from "../components/Wrapper";
import { useEffect, useState } from "react";
import { capitalize } from "../utils/Capitalize";
import { paymentService } from "../constants/constants";
import Spinner from "../components/Spinner";

const order_fields = [
	"product_id",
	"price",
	"fee",
	"total",
	"quantity",
	"status",
];

const Orders = () => {
	const [orders, setOrders] = useState();

	useEffect(() => {
		const getOrders = async () => {
			try {
				const response = await paymentService.get("orders");
				setOrders(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		getOrders();
	}, []);

	const renderContent = () => {
		if (Array.isArray(orders)) {
			return (
				<table>
					<thead>
						<tr>
							{order_fields.map((field) => {
								return <th>{capitalize(field)}</th>;
							})}
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => {
							return (
								<tr>
									{order_fields.map((field) => {
										return <td>{order[field]}</td>;
									})}
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

export default Orders;
