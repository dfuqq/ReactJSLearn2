import "./styles.css";

function GroupCard({ setID, groupName, membersAmount, addUser, removeGroup }) {
	const showUsers = () => {
		console.log("showed");
	};

	return (
		<div className="groups-card" key={groupName}>
			<div className="groups-header">
				<span>{groupName}</span>
				<button
					className="groups-delete-btn"
					onClick={() => removeGroup(groupName)}>
					Delete
				</button>
			</div>
			<div className="groups-card__members">
				<span className="groups-card__members-count">
					Members: {membersAmount}
				</span>
				<button className="groups-card__members-show-btn" onClick={showUsers}>
					Show
				</button>
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addUser(e.target._id.dataset.key);
					e.target._id.value = "";
				}}>
				<input
					id="_id"
					name="_id"
					type="text"
					className="groups-input__card"
					placeholder="Enter ID"
					autoComplete="off"
					data-key={groupName}
					onChange={(e) => setID(e.currentTarget.value)}
				/>
			</form>
		</div>
	);
}

export default GroupCard;
