import { useQuery } from "@tanstack/react-query";
import Conatainer from "../Components/Layout/Conatainer";
import UseAxios from "../Hooks/UseAxios";
import useAuth from "../Hooks/UseAuth";
import {motion} from 'framer-motion'
import toast from "react-hot-toast";

const MyAssignments = () => {
    const axios = UseAxios();
    const { user } = useAuth();


    const getSubmitData = () => {
        const res = axios.get(`/padding-assignment?emailField=${user.email}`)
        return res
    }

    const { data, isLoading } = useQuery({
        queryKey: ['myAssignment'],
        queryFn: getSubmitData
    })

    const handleRecheck = async (id) => {
        const data = {
            status : 'Pendding'
        }
        const res = await axios.put(`/recheck-assignment?id=${id}`,data)
        
        if (res) {

            return toast('We are working on it',
            {
              icon: '👏',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            }
          );
            
        }
       
    }

    if (isLoading) {
        return (
            <div className="min-h-screen">

                <span className="loading loading-spinner text-primary"></span>

            </div>
        )
    }

    return (
        <Conatainer>
            <div className="min-h-screen">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 lg:grid-cols-3">

                {
                    data.data.map((data)=><motion.div initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }} key={data._id} className="card w-auto object-cover px-4 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">
                        {data?.assignmentData.title}
                          {
                             data.status === "Pandding" ? <div className="badge badge-warning">{data.status}</div> : data.status === "Complete" ? <div className="badge badge-primary">{data.status}</div> : ''
                          }
                        </h2>
                        <p>Feedback: {data.feedback || '---'}</p>
                        <p>Assignment mark: {data?.assignmentData.marks}</p>
                        <p>Your obtain mark: {data.mark || '00'}</p>
                        <div className="flex">
                            <p>Difficulty level: {data?.assignmentData.difficultyLevel}</p>
                            {
                                data?.assignmentData.difficultyLevel === "Hard" ? <div className="badge badge-outline btn-error"></div> : data?.assignmentData.difficultyLevel === "Easy" ? <div className="badge badge-outline btn-primary"></div> : <div className="badge badge-outline btn-warning"></div>
                            }
                            
                        </div>
                        <div className="card-actions justify-center mt-4">
                            
                            <button onClick={()=>handleRecheck(data._id)} className="badge badge-outline">Recheck</button>
                        </div>
                    </div>
                </motion.div>)
                }

            </div>

            </div>
        </Conatainer>
    );
};

export default MyAssignments;