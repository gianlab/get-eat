import React, { useState } from "react";
import axios from "axios";

export default function SingleList(props) {
	const { selectedList } = props;

	const [itemName, setItemName] = useState("");
	const [quantity, setQuantity] = useState(0);

	return (
		<div>
			<p>Hello this is from Single List compo</p>
			<p>This is the {selectedList.listName} list</p>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					const item = { itemName, quantity };
					let data = await axios.post("/api/add-item", item);
					setItemName("");
					setQuantity(0);
					selectedList.items.push(data.data);
				}}
			>
				<input
					type="text"
					// className="add-list-box"
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
				<button type="submit">Add Item</button>
			</form>
			{/* {selectedList.items.length === 0 ? <p>You have no item yet</p>} */}
			<table>
				<tr>
					<th>Item Name</th>
					<th>Quantity</th>
					<th>Done</th>
				</tr>
				{selectedList.items.map((itemData, index) => (
					<tr>
						<td>{itemData.itemName}</td>
						<td>{itemData.quantity}</td>
						<td>
							<input type="checkbox"></input>
						</td>
						{console.log(itemData)}
					</tr>
				))}
			</table>
		</div>
	);
}
