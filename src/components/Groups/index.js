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

	const [isLoaded, setIsLoaded] = useState(false);

	const { data } = useQuery(
		["passengerID", id],
		() => id && fetchPassengerByID(id),
		{ retry: false }
	);

	useEffect(() => {
		const initialGroups = { groups: {} };
		const localCopy = { ...localStorage };
		if (JSON.stringify(localCopy).length > 2) {
			initialGroups["groups"] = localCopy["groups"];
			initialGroups["groups"] = JSON.parse(initialGroups["groups"]);
			console.log("Loaded with data");
		}
		setGroups(initialGroups);
		setIsLoaded(true);
	}, []);

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
			if (!(groupID in groupsCopy["groups"])) {
				groupsCopy["groups"][groupID] = [id];
				localStorage.setItem("groups", JSON.stringify(groupsCopy["groups"]));
			} else {
				if (!groupsCopy["groups"][groupID].includes(id)) {
					groupsCopy["groups"][groupID].push(id);
					localStorage.setItem("groups", JSON.stringify(groupsCopy["groups"]));
				} else {
					console.log("ID already in group");
				}
			}
			setGroups(groupsCopy);
		} else {
			console.log("User not found");
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

			{isLoaded &&
				Object.keys(groups["groups"]).map((group) => (
					<GroupCard
						key={group}
						groupName={group}
						membersAmount={groups["groups"][group]?.length}
						createGroup={createGroup}
						addID={addID}
						takeGroupID={takeGroupID}
					/>
				))}
		</div>
	);
}

export default Groups;
