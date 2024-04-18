import React from "react"
import useAuth from "../../context/useAuth"
import { Navigate, Outlet } from "react-router-dom"

function IsAdmin() {
	const { isLoggedIn, isLoading, user } = useAuth()

	if (isLoading) {
		return <p>Loading :)</p>
	}

	if (!isLoggedIn) {
		return <Navigate to={"/login"} />
	}

	if (user.role !== "admin") {
		return <Navigate to="/" />
	}

	return <Outlet />
}

export default IsAdmin
