import { useContext } from "react"
import { AuthContext } from "./AuthContextWrapper"
const useAuth = () => useContext(AuthContext)

export default useAuth
