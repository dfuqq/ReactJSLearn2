import "./styles.css";

import { Fragment } from "react";

function GroupForm({ id, groupID, addID, addGroupID, createGroup, groups }) {
	return (
		<Fragment>
			<form>
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
				<form>
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

			<button
				className="groups-button"
				disabled={groupID === "" || groupID in groups}
				onClick={createGroup}
				type="submit">
				Create Group
			</button>
		</Fragment>
	);
}

export default GroupForm;
