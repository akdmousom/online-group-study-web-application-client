import Conatainer from "../Components/Layout/Conatainer";
import UseAxios from "../Hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/UseAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link} from "react-router-dom";


const Assignments = () => {

    const axios = UseAxios();
    const { user } = useAuth()
    const [difficultyLevel, setDifficultyLevel] = useState('');
    const [assignment, setAssignment] = useState(null)
    const userEmail = user?.email

    const handleDelete = async (id) => {

        try {

            const res = await axios.delete(`/delete-assignment?id=${id}&&userEmail=${userEmail}`)
            if (res.status === 200) {

                toast.success('Successfully deleted this assignment')
                const newAssignment = assignment.filter(assign => assign._id !== id)

                setAssignment(newAssignment)

            }

        } catch (error) {
            if (error.response.status === 401) {

                toast.error("You can't delete this assignment")

            }
        }

    }

    const getAssignment = async () => {
        const res = await axios(`/get-assignments?difficultyField=${difficultyLevel}`)
        setAssignment(res?.data)
        return res
    }

    const { data, isLoading } = useQuery({
        queryKey: ['assignment', difficultyLevel, assignment],
        queryFn: getAssignment, handleDelete
    })


    if (data?.data.length === 0) {

        return (
            <div className="min-h-screen grid justify-center items-center">
                <div className="grid justify-center items-center text-center">
                   <h1 className="md:text-5xl text-3xl text-center">No Data Found</h1>
                   
                        <Link to={'/'}><button className="btn text-center btn-primary">Go Back</button></Link>
                  
                </div>
            </div>
        )

    }


    return (
        <div className=" min-h-screen">

            <Conatainer>

                {
                    isLoading ? <div className="grid justify-center items-center min-h-screen">
                        <span className="loading loading-spinner text-primary"></span>
                    </div> : <> <div className="mt-8 px-4 grid md:justify-end">
                        <label className="label justify-center md:justify-end">
                            <span className="label-text">Filter with difficulty level</span>

                        </label>
                        <select onChange={(e) => setDifficultyLevel(e.target.value)} className="select select-bordered w-full max-w-xs">
                            <option disabled selected>Set Difficulty Level</option>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">



                            {
                                assignment?.map(data => <div key={data._id} className="card w-full object-cover px-4 bg-base-100 shadow-xl">
                                    <figure><img src={data.thumbnail} alt="Shoes" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {data.title}
                                            <div className="badge badge-secondary">{data.difficultyLevel}</div>
                                        </h2>
                                        <p>{data.description}</p>
                                        <p className="text-base font-bold">Full Marks: {data.marks}</p>
                                        <p className="text-base font-bold">Due Date: {data.date.slice(0,10)}</p>
                                        {
                                            user ? <div className=" flex gap-2 my-4">
                                                <button className="btn btn-sm btn-primary">View Details</button>
                                                <Link to={`/update-assignment/${data._id}`}><button className="btn btn-sm btn-warning">Update</button></Link>
                                                <button onClick={() => handleDelete(data._id)} className="btn btn-sm btn-error">Delete</button>
                                            </div> : ''
                                        }
                                    </div>
                                </div>)
                            }

                        </div></>
                }


            </Conatainer>

        </div>
    );
};

export default Assignments;