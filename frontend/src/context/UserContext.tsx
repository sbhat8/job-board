import { createContext, PropsWithChildren, useEffect, useState } from "react"
import axios from "axios"

type User = {
    id?: number;
    username?: string;
    role?: string;
}

interface UserContextInterface {
    user: User;
    setUser: (user: User) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextInterface>({
    user: {},
    setUser: () => { },
    logout: () => { },
});

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
    const [user, setUser] = useState<User>(() => {
        if (typeof window !== 'undefined') {
            const storedData = localStorage.getItem("user");
            if (storedData) {
                return JSON.parse(storedData);
            }
        }

        return {} as User;
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user])

    async function logout() {
        await axios.post("http://localhost:7000/auth/logout", {}, { withCredentials: true })
            .then(() => setUser({}))
    }

    async function verifySession() {
        await axios.get("http://localhost:7000/auth/session", { withCredentials: true })
            .then(async res => {
                if (res.status === 200) {
                    if (res.data.loggedIn === true) {
                        setUser({ ...res.data.user })
                    } else {
                        await logout()
                    }
                }
            })
    }

    useEffect(() => {

    }, [])

    return (
        <UserContext.Provider key={user.username} value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}