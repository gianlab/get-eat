import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { Button } from "react-bootstrap";

export default function Login(props) {
	const [listName, setListName] = useState("");
	const {
		setLists,
		lists,
		setCurrentView,
		setSelectedList,
		selectedList,
	} = props;

	return (
		<div className="List">
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					let data = await axios.post("/api/create-list", {
						listName,
						items: [],
					});
					setListName("");
					lists.push(data.data);
				}}
			>
				<input
					type="text"
					className="add-list-box"
					placeholder="List Name"
					value={listName}
					onChange={(e) => {
						setListName(e.target.value);
					}}
				></input>
				<button variant="primary" type="submit">
					Add List
				</button>
			</form>
			{lists.map((listData, index) => (
				<div
					onClick={() => {
						setCurrentView("singleList");
						setSelectedList(lists[index]);
					}}
				>
					{listData.listName}
				</div>
			))}
		</div>
	);
}
