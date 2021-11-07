import { useState, useEffect } from "react";
import { useQuery } from "react-query";

import { fetchPassengerByID } from "../../services/api";
import GroupCard from "../GroupCard";
import GroupForm from "../GroupForm";

import "./styles.css";

function Groups() {
	const [id, setID] = useState("");
	const [groupID, setGroupID] = useState("");

	const [groups, setGroups] = useState({});

	useEffect(() => {
		const initialGroups = {};
		const localCopy = { ...localStorage };
		for (var group in localCopy) {
			initialGroups[group] = localCopy[group].split(",");
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

	const takeGroupID = (e) => {
		setGroupID(e.currentTarget.dataset.key);
	};

	const createGroup = () => {
		const groupsCopy = { ...groups };

		if (data) {
			if (!(groupID in groupsCopy)) {
				// if group name not exists
				groupsCopy[groupID] = [id];
				localStorage.setItem(groupID, [id]);
			} else {
				if (!groupsCopy[groupID].includes(id)) {
					// if group name already exists and id not in group name
					groupsCopy[groupID].push(id);
					const prevData = localStorage.getItem(groupID);
					localStorage.setItem(groupID, [prevData, id]);
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
				groups={groups}
			/>

			{Object.keys(groups).map((group) => (
				<GroupCard
					key={group}
					groupName={group}
					membersAmount={groups[group]?.length}
					createGroup={createGroup}
					addID={addID}
					takeGroupID={takeGroupID}
				/>
			))}
		</div>
	);
}

export default Groups;
