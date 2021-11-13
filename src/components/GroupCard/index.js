import "./styles.css";

function GroupCard({ setID, groupName, membersAmount, addUser }) {
	return (
		<div className="groups-card" key={groupName}>
			<span>{groupName}</span>
			<span className="groups-card__members">Members: {membersAmount}</span>
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
