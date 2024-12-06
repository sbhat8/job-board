import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useNavigate, useParams } from "react-router"
import { UserContext } from "@/context/UserContext"
import { Textarea } from "@/components/ui/textarea"

export function EditJob() {
    let { id } = useParams()
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [company, setCompany] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [errorText, setErrorText] = useState("");

    useEffect(() => {
        if (user.role !== "employer") {
            navigate("/")
        }
    }, [user])

    async function getJobDetails() {
        axios.get(`http://localhost:7000/job/${id}`)
            .then(res => {
                if (res.status === 200) {
                    const job = res.data;
                    setTitle(job.title);
                    setDescription(job.description);
                    setCompany(job.company);
                    setSalary(job.salary);
                    setLocation(job.location);
                }
            }).catch(err => {
                console.error(err)
                setErrorText("Error fetching job details.")
            })
    }

    useEffect(() => {
        getJobDetails()
    }, [id])

    async function edit() {
        if (title.length === 0 || description.length === 0 || company.length === 0 || salary.length === 0 || location.length === 0) {
            setErrorText("Please check that all fields are filled")
            return
        }

        await axios.put(`http://localhost:7000/job/${id}`, { title, description, company, salary, location })
            .then(res => {
                if (res.status === 200) {
                    setErrorText("")
                    navigate(`/job/${id}`)
                }
            }).catch(err => {
                if (err.response && err.response.data.message) {
                    setErrorText(err.response.data.message)
                } else {
                    setErrorText("An unexpected error occurred.")
                }
                console.log(err)
            })

    }

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="mb-8 text-4xl font-extrabold">Edit Job Listing</h1>

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
                    <Label htmlFor="title">Job title</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" id="title" name="title" placeholder="Title" />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                    <Label htmlFor="company">Company</Label>
                    <Input value={company} onChange={(e) => setCompany(e.target.value)} type="text" id="company" name="company" placeholder="Company" />
                </div>

                <div className="grid w-full gap-1.5 mt-4">
                    <Label htmlFor="description">Description</Label>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Job description..." id="description" name="description" />
                </div>

                <div className="flex justify-between gap-2">
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                        <Label htmlFor="salary">Salary</Label>
                        <Input value={salary} onChange={(e) => setSalary(e.target.value)} type="text" id="salary" name="salary" placeholder="Salary" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                        <Label htmlFor="location">Location</Label>
                        <Input value={location} onChange={(e) => setLocation(e.target.value)} type="text" id="location" name="location" placeholder="Location" />
                    </div>
                </div>

                <Button className="w-full mt-4" onClick={edit}>Submit</Button>
            </div>
        </div>
    )
}