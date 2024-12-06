import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useNavigate } from "react-router"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [errorText, setErrorText] = useState("");

    async function signUp() {
        if (username.length === 0 || password.length === 0 || role.length === 0) {
            setErrorText("None of the fields can be empty")
            return
        }

        await axios.post("http://localhost:7000/auth/signup", { username, password, role })
            .then(res => {
                if (res.status === 201) {
                    setErrorText("")
                    navigate("/login")
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
            <h1 className="mb-8 text-4xl font-extrabold">Sign Up</h1>

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

                <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                    <Label htmlFor="password">Role</Label>
                    <Select value={role} onValueChange={setRole}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="employer">Employer</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <Button className="w-full mt-4" onClick={signUp}>Sign Up</Button>
            </div>
        </div>
    )
}