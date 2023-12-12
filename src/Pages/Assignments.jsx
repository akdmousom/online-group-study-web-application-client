import Conatainer from "../Components/Layout/Conatainer";
import UseAxios from "../Hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/UseAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'


const Assignments = () => {

    const axios = UseAxios();
    const { user } = useAuth()
    const [difficultyLevel, setDifficultyLevel] = useState('');
    const [assignment, setAssignment] = useState(null)
    const [page, setPage] = useState(1);
    const limit = 10;
   
    

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
        const res = await axios(`/get-assignments?difficultyField=${difficultyLevel}&page=${page}&limit=${limit}`)
        setAssignment(res?.data)
        return res
    }

    const { data, isLoading } = useQuery({
        queryKey: ['assignment', difficultyLevel, assignment, page],
        queryFn: getAssignment, handleDelete
    })

    console.log('mydata',data?.data.total);

    
    const total = data?.data.total

    const totalPage = Math.ceil(total / limit);


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



    const handleNext = () => {               
            
        if (page === 1) {

            setPage(page + 1)
            
        }
          
          }

    const handlePrevious = () => {
        if (page > 1) {
            setPage(page - 1)
           
        }
    }


    console.log("Current page", page);
    console.log("Need Page",totalPage);
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
                        <motion.div initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">



                            {
                                assignment?.result?.map(data => <div key={data._id} className="card w-full object-cover px-5 gap-2 bg-base-100 shadow-xl">
                                    <figure><img src={data.thumbnail} alt="Shoes" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {data.title}
                                            <div className="badge badge-secondary">{data.difficultyLevel}</div>
                                        </h2>

                                        <p className="text-base font-bold">Full Marks: {data.marks}</p>
                                        <p className="text-base font-bold">Due Date: {data.date.slice(0, 10)}</p>
                                        <div className=" flex-wrap flex md:flex-nowrap gap-2">
                                            <Link className="btn btn-sm  btn-primary" to={`/assignment-details/${data._id}`}>View Details</Link>
                                            {
                                                user ? <>
                                                    <Link to={`/update-assignment/${data._id}`}><button className="btn btn-sm btn-warning">Update</button></Link>
                                                    <button onClick={() => handleDelete(data._id)} className="btn btn-sm btn-error">Delete</button></>

                                                    : ''
                                            }
                                        </div>
                                    </div>
                                </div>)
                            }



                        </motion.div></>
                }

                <div className="join flex my-4 justify-center items-center text-center">
                    <button onClick={handlePrevious} className="join-item btn">◄ </button>

                   {
                    isLoading ? 'Load' : Array(totalPage).fill(0).map((item, index)=>{
                        const pageNumber = index +1
                        return (<button key={index} onClick={()=> setPage(pageNumber)} className={pageNumber === page ? "join-item btn btn-active" : "join-item btn" }>{pageNumber}</button>)
                       })
                   }
                    
                   
                    <button onClick={handleNext} className="join-item btn">► </button>
                </div>


            </Conatainer>

        </div>
    );
};

export default Assignments;