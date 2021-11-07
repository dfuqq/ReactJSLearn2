import "./styles.css";

function GroupCard({
	key,
	groupName,
	membersAmount,
	createGroup,
	addID,
	takeGroupID,
}) {
	const newID = (e) => {
		addID(e);
		takeGroupID(e);
	};

	return (
		<div className="groups-card" key={key}>
			<span>{groupName}</span>
			<span className="groups-card__members">Members: {membersAmount}</span>
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
					data-key={groupName}
					onChange={(e) => newID(e)}
				/>
			</form>
		</div>
	);
}

export default GroupCard;
