import React from "react"
import useAuth from "../../context/useAuth"

function Avatar({ small }) {
	const { user } = useAuth()
	return (
		<div
			style={{
				height: small ? "25px" : "50px",
				width: small ? "25px" : "50px",
				borderRadius: "50%",
				border: "3px solid white",
				overflow: "hidden",
				padding: ".25rem",
			}}>
			<img src={user.avatar} alt={`${user.email} weird picture`} />
		</div>
	)
}

export default Avatar
