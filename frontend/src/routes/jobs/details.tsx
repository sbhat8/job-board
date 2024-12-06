import { Button } from "@/components/ui/button";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone"; 
import { UserContext } from "@/context/UserContext";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(tz);

type Job = {
    id: number;
    title: string;
    description: string;
    company: string;
    location: string;
    salary: string;
    created_at: string;
    created_by: number;
}

export function JobDetails() {
    let { id } = useParams()
    const navigate = useNavigate();
    const {user} = useContext(UserContext)
    const [job, setJob] = useState<Job | null>(null)
    const [error, setError] = useState(false)

    async function getJobDetails() {
        axios.get(`http://localhost:7000/job/${id}`)
            .then(res => {
                if (res.status === 200) {
                    setJob(res.data)
                }
            }).catch(err => {
                console.error(err)
                setError(true)
            })
    }

    useEffect(() => {
        getJobDetails()
    }, [id])

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center">
                <h1 className="mb-6 text-3xl font-extrabold">404</h1>
            </div>
        )
    }

    return (
        <div className="container mx-auto">
            {job && (
                <div>
                    <h1 className="text-3xl font-extrabold">{job.title}</h1>
                    <p className="mb-4">Posted {dayjs.utc(job.created_at).tz(dayjs.tz.guess()).fromNow()}</p>
                    <div className="flex gap-16">
                        <div className="flex flex-col items-start justify-start">
                            <h2 className="text-xl font-semibold">Location</h2>
                            <p>{job.location}</p>
                        </div>
                        <div className="flex flex-col items-start justify-start">
                            <h2 className="text-xl font-semibold">Salary</h2>
                            <p>{job.salary}</p>
                        </div>
                        <div className="flex flex-col items-start justify-start">
                            <h2 className="text-xl font-semibold">Company</h2>
                            <p>{job.company}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-start justify-start mt-4">
                        <h2 className="text-xl font-semibold">Description</h2>
                        <p>{job.description}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button className="mt-6">Apply</Button>
                        {user.id === job.created_by && (
                            <>
                                <Button variant="secondary" onClick={() => navigate(`/job/${job.id}/edit`)} className="mt-6">Edit</Button>
                                <Button variant="destructive" onClick={() => navigate(`/job/${job.id}/delete`)} className="mt-6">Delete</Button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}