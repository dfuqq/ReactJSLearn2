import "./styles.css";

import { Fragment } from "react";

function GroupForm({ id, groupID, addID, addGroupID, createGroup }) {
	return (
		<Fragment>
			<form onSubmit={(e) => e.preventDefault()}>
				<input
					id="_id"
					name="_id"
					type="text"
					className="groups-input"
					placeholder="Enter ID"
					onChange={addID}
					autoComplete="off"></input>
			</form>
			{(id !== "" || groupID !== "") && (
				<form onSubmit={(e) => e.preventDefault()}>
					<input
						id="_group_id"
						name="_group_id"
						type="text"
						className="groups-input"
						placeholder="Enter group name"
						onChange={addGroupID}
						autoComplete="off"></input>
				</form>
			)}

			<button className="groups-button" onClick={createGroup}>
				Create Group
			</button>
		</Fragment>
	);
}

export default GroupForm;
