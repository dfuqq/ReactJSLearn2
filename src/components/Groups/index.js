import { useState, useEffect } from "react";
import { useQuery } from "react-query";

import { fetchPassengerByID } from "../../services/api";
import GroupCard from "./GroupCard";
import GroupForm from "./GroupForm";

import "./styles.css";

function Groups() {
	const [id, setID] = useState("");
	const [groupID, setGroupID] = useState("");

	const [groups, setGroups] = useState({});

	const [isLoaded, setIsLoaded] = useState(false);
	const [isUserExists, setIsUserExists] = useState(true);
	const [isInGroup, setIsInGroup] = useState(false);

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

	const createNewGroup = () => {
		const groupsCopy = { ...groups };

		groupsCopy["groups"][groupID] = [];
		localStorage.setItem("groups", JSON.stringify(groupsCopy["groups"]));

		setGroups(groupsCopy);
	};

	const addUser = (cardGroupID) => {
		const groupsCopy = { ...groups };
		setIsUserExists(true);
		setIsInGroup(false);

		if (data) {
			if (!groupsCopy["groups"][cardGroupID].includes(id)) {
				groupsCopy["groups"][cardGroupID].push(id);
				localStorage.setItem("groups", JSON.stringify(groupsCopy["groups"]));
			} else {
				setIsInGroup(true);
			}
		} else {
			setIsUserExists(false);
		}

		setGroups(groupsCopy);
	};

	return (
		<div className="groups-container">
			<h1>Groups</h1>

			<GroupForm
				groupID={groupID}
				setGroupID={setGroupID}
				createNewGroup={createNewGroup}
				groups={groups}
			/>

			{!data && !isUserExists && <span>User not found!</span>}
			{isInGroup && <span>User already exists!</span>}

			{isLoaded &&
				Object.keys(groups["groups"]).map((group) => (
					<GroupCard
						key={group}
						groupName={group}
						membersAmount={groups["groups"][group]?.length}
						setID={setID}
						addUser={addUser}
					/>
				))}
		</div>
	);
}

export default Groups;
