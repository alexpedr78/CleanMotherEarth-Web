import React from "react"
import useAuth from "../../context/useAuth"
import { Navigate, Outlet } from "react-router-dom"

function IsLoggedOut() {
	const { isLoggedIn, isLoading } = useAuth()

	if (isLoading) {
		return <p>Loading :)</p>
	}

	if (isLoggedIn) {
		return <Navigate to={"/"} />
	}

	return <Outlet />
}

export default IsLoggedOut
