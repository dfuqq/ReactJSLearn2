import { useState, useEffect } from "react";
import { useQuery } from "react-query";

import { fetchPassengerByID } from "../../services/api";
import GroupForm from "../GroupForm";

import "./styles.css";

function Groups() {
	const [id, setID] = useState("");
	const [groupID, setGroupID] = useState("");

	const [groups, setGroups] = useState({});

	useEffect(() => {
		const initialGroups = {};
		const localCopy = { ...localStorage };
		for (var key in localCopy) {
			initialGroups[key] = localCopy[key].split(",");
		}
		setGroups(initialGroups);
	}, []);

	const { data } = useQuery(
		["passengerID", id],
		() => id && fetchPassengerByID(id),
		{ retry: false }
	);

	const addID = (e) => {
		setID(e.currentTarget.value);
	};

	const addGroupID = (e) => {
		setGroupID(e.currentTarget.value);
	};

	const createGroup = () => {
		const groupsCopy = { ...groups };

		if (data) {
			if (!(groupID in groupsCopy)) {
				// if group name not exists
				groupsCopy[groupID] = [data.name];
				localStorage.setItem(groupID, [data.name]);
			} else {
				if (!groupsCopy[groupID].includes(data.name)) {
					// if group name already exists and id not in group name
					groupsCopy[groupID].push(data.name);
					const prevData = localStorage.getItem(groupID);
					localStorage.setItem(groupID, [prevData, data.name]);
				}
			}
			setGroups(groupsCopy);
		}
	};

	return (
		<div className="groups-container">
			<h1>Groups</h1>

			<GroupForm
				id={id}
				groupID={groupID}
				addID={addID}
				addGroupID={addGroupID}
				createGroup={createGroup}
			/>

			{Object.keys(groups).map((key) => (
				<div className="groups-card" key={key}>
					<span>{key}</span>
					<span className="groups-card__members">
						Members: {groups[key].length}
					</span>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							createGroup();
						}}>
						<input
							id="_id"
							name="_id"
							type="text"
							className="groups-input__card"
							placeholder="Enter ID"
							autoComplete="off"
							data-key={key}
							onChange={(e) => {
								setID(e.currentTarget.value);
								setGroupID(e.currentTarget.dataset.key);
							}}
						/>
					</form>
				</div>
			))}
		</div>
	);
}

export default Groups;
