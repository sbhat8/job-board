import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useNavigate } from "react-router"

type Job = {
    id: number;
    title: string;
    description: string;
    company: string;
    location: string;
    salary: string;
    created_at: string;
}

export function Home() {
    const navigate = useNavigate()
    const [jobs, setJobs] = useState<Job[]>([])

    async function getJobs() {
        await axios.get("http://localhost:7000/job")
            .then(res => {
                if (res.status === 200) {
                    setJobs(res.data);
                }
            }).catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getJobs();
    }, [])

    return (
        <div className="container mx-auto">
            <h1 className="mb-6 text-3xl font-extrabold">Job Listings</h1>

            <div className="grid grid-cols-3 gap-3">
                {jobs.length > 0 && (
                    jobs.map((job: Job) => (
                        <Card key={job.id} className="w-full cursor-pointer" onClick={() => navigate(`/job/${job.id}`)}>
                            <CardHeader>
                                <CardTitle>{job.title}</CardTitle>
                                <CardDescription>Posted by <strong>{job.company}</strong></CardDescription>
                            </CardHeader>
                            <CardContent>
                                {job.description}
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button>Apply</Button>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}