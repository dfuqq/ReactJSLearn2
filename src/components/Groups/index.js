import { useState, useEffect } from "react";

import "./styles.css";

function Groups() {
	const [id, setID] = useState("");
	const [groupID, setGroupID] = useState("");

	const [groups, setGroups] = useState({});

	useEffect(() => {
		const groupsCopy = { ...groups };
		const localCopy = { ...localStorage };
		for (var key in localCopy) {
			groupsCopy[key] = localCopy[key].split(",");
		}
		setGroups(groupsCopy);
		console.log(groupsCopy["gag"]);
		console.log(groupsCopy["gag"].length);
	}, []);

	const buttonHandler = () => {
		const groupsCopy = { ...groups };

		if (!(groupID in groupsCopy)) {
			// Если группы новая
			groupsCopy[groupID] = [id];
			localStorage.setItem(groupID, [id]);
		} else {
			if (!groupsCopy[groupID].includes(id)) {
				groupsCopy[groupID].push(id); // Если ключ есть, просто добавляем id в группу
				const prevData = localStorage.getItem(groupID);
				localStorage.setItem(groupID, [prevData, id]);
			}
		}
		setGroups(groupsCopy);
		console.log(groups);
	};

	return (
		<div className="groups-container">
			<h1>Groups</h1>
			<form>
				<input
					id="_id"
					name="_id"
					type="text"
					className="groups-input"
					placeholder="Enter ID"
					onChange={(e) => setID(e.target.value)}
					autoComplete="off"></input>
			</form>
			{(id !== "" || groupID !== "") && (
				<form>
					<input
						id="_group_id"
						name="_group_id"
						type="text"
						className="groups-input"
						placeholder="Enter group name"
						onChange={(e) => setGroupID(e.target.value)}
						autoComplete="off"></input>
				</form>
			)}

			<button className="groups-button" onClick={buttonHandler}>
				Create Group
			</button>

			{Object.keys(groups).map((key) => (
				<div className="groups-card">
					<span>{key}</span>
					<span>Members: {groups[key].length}</span>
				</div>
			))}
		</div>
	);
}

export default Groups;
