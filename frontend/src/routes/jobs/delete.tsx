import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { UserContext } from "@/context/UserContext"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DeleteJob() {
    let { id } = useParams()
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [errorText, setErrorText] = useState("");

    useEffect(() => {
        if (user.role !== "employer") {
            navigate("/")
        }
    }, [user])

    async function deleteJob() {
        await axios.delete(`http://localhost:7000/job/${id}`)
            .then(res => {
                if (res.status === 200) {
                    navigate("/")
                }
            }).catch(err => {
                console.error(err)
                setErrorText("Error fetching job details.")
            })
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="mb-4 text-4xl font-extrabold">Delete Job Listing</h1>

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

                <p className="mb-3">Are you sure you would like to delete this job listing?</p>

                <div className="flex justify-center items-center gap-3">
                    <Button className="w-full" onClick={() => navigate(`/job/${id}`)}>Cancel</Button>
                    <Button className="w-full" onClick={deleteJob} variant="destructive">Delete</Button>
                </div>
            </div>
        </div>
    )
}