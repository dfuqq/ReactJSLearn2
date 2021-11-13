import "./styles.css";

import { Fragment } from "react";

function GroupForm({ groupID, setGroupID, createNewGroup, groups }) {
	return (
		<Fragment>
			<form
				className="groups-form"
				onSubmit={(e) => {
					e.preventDefault();
					createNewGroup();
					e.target._group_id.value = "";
				}}>
				<input
					id="_group_id"
					name="_group_id"
					type="text"
					className="groups-input"
					placeholder="Enter group name"
					onChange={(e) => setGroupID(e.currentTarget.value)}
					autoComplete="off"></input>
			</form>

			<button
				className="groups-button"
				disabled={groupID === "" || groupID in groups["groups"]}
				onClick={createNewGroup}>
				Create Group
			</button>
		</Fragment>
	);
}

export default GroupForm;
