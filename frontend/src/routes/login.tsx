import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useContext, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useNavigate } from "react-router"
import { UserContext } from "@/context/UserContext"

export function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");

    async function logIn() {
        if (username.length === 0 || password.length === 0) {
            setErrorText("Username or password cannot be empty")
            return
        }

        await axios.post("http://localhost:7000/auth/login", { username, password })
            .then(res => {
                if (res.status === 200) {
                    setErrorText("")
                    setUser({ ...res.data.user })
                    navigate("/")
                }
            }).catch(err => {
                if (err.response && err.response.data.message) {
                    setErrorText(err.response.data.message);
                } else {
                    setErrorText("An unexpected error occurred.");
                }
                console.log(err)
            })

    }

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="mb-8 text-4xl font-extrabold">Log In</h1>

            <div className="w-96">
                {errorText !== "" && (
                    <Alert className="mb-4" variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {errorText}
                        </AlertDescription>
                    </Alert>
                )}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="username">Username</Label>
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} type="username" id="username" placeholder="Username" />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                    <Label htmlFor="password">Password</Label>
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="Password" />
                </div>

                <Button className="w-full mt-4" onClick={logIn}>Log In</Button>
            </div>
        </div>
    )
}