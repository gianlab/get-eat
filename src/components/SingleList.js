import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function SingleList(props) {
	const { selectedList } = props;

	const [itemName, setItemName] = useState("");
	const [quantity, setQuantity] = useState(0);

	const [itemsInList, setItemsInList] = useState([]);

	const getItems = async () => {
		const items = await axios.get(`api/items/${selectedList.id}`);
		// console.log(itemsInList);
		setItemsInList(items.data);
	};

	useEffect(() => {
		getItems();
	});

	return (
		<div className="singleList">
			<p>{selectedList.listName} LIST</p>
			{/* <p>LIST id {selectedList.id}</p> */}
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					const item = { itemName, quantity };
					await axios.post(`/api/list/${selectedList.id}/addItem`, item);
					setItemName("");
					setQuantity(0);
				}}
			>
				<input
					type="text"
					id="add-list-box"
					placeholder="Item Name"
					value={itemName}
					onChange={(e) => {
						setItemName(e.target.value);
					}}
				></input>
				<input
					type="number"
					value={quantity}
					min="1"
					// className="add-list-box"
					placeholder="Quantity"
					onChange={(e) => {
						setQuantity(e.target.value);
					}}
				></input>
				<Button type="submit" variant="outline-dark">
					Add Item
				</Button>
			</form>
			<table>
				<tr>
					<th>Item Name</th>
					<th>Quantity</th>
					<th>Done</th>
				</tr>
				{itemsInList.map((item, index) => (
					<tr>
						<td>{item.itemName}</td>
						<td>{item.quantity}</td>
						{/* {console.log(item)} */}
						<td>
							<input
								type="checkbox"
								checked={item.purchased === true ? "checked" : ""}
								onClick={async (e) => {
									const value = e.target.checked;
									const itemName = item.itemName;
									await axios.put(`/api/lists/${selectedList.id}/toggle`, {
										purchased: value,
										item: itemName,
									});
								}}
							></input>
						</td>
					</tr>
				))}
			</table>
		</div>
	);
}
