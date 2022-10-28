import Navbar from "./Navbar";
import Registration from "./registration";
import Login from "./login";
import AllList from "./AllLists";
import SingleList from "./SingleList";
import axios from "axios";
import React, { useState } from "react";
import "./App.css";

function App() {
	const [currentView, setCurrentView] = useState("allLists");
	const [loginView, setLoginView] = useState("registration");
	const [lists, setLists] = useState([]);
	const [selectedList, setSelectedList] = useState("");

	return (
		<div className="bodyDiv">
			<Navbar setCurrentView={setCurrentView} />
			{loginView === "registration" ? (
				<Registration loginView={loginView} setLoginView={setLoginView} />
			) : (
				<Login />
			)}
			{currentView === "allLists" ? (
				<AllList
					setLists={setLists}
					lists={lists}
					setCurrentView={setCurrentView}
					currentView={currentView}
					setSelectedList={setSelectedList}
					selectedList={selectedList}
				/>
			) : (
				<SingleList selectedList={selectedList} lists={lists} />
			)}
			<br />
		</div>
	);
}

export default App;
