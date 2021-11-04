import { useState, useEffect } from "react";

import "./styles.css";

function Groups() {
	const [id, setID] = useState("");
	const [groupID, setGroupID] = useState("");

	const [groups, setGroups] = useState({});

	useEffect(() => {
		setID("");
		setGroups({});
	}, []);

	const buttonHandler = () => {
		if (!(groupID in groups)) {
			groups[groupID] = [id];
		} else {
			groups[groupID].push(id);
		}
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
			{id !== "" && (
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
