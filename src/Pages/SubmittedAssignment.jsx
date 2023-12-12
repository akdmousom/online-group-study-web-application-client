import UseAxios from "../Hooks/UseAxios";
import Conatainer from "../Components/Layout/Conatainer";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";

const SubmittedAssignment = () => {
    const axios = UseAxios()

const [load, setLoad] = useState(true)

    const getPanddingAssignment = async () => {
        const res = await axios('/padding-assignment?pandding=Pandding')
        return res
    }

    const { data } = useQuery({
        queryKey: ['pandingAssignment',load],
        queryFn: getPanddingAssignment
    })




    const [feedback, setFeedBack] = useState('')
    const [mark, setMark] = useState('')

    const giveMark = {
        status : 'Complete',
        mark: mark,
        feedback: feedback,
    }

    const handleSubmit = async (id) => {
        
        const res = await axios.put(`/update-padding-assignment?id=${id}`,giveMark)
        
        if (res) {

            setLoad(false)
            
        }
        
    }

    if (data?.data.length === 0) {
        
        return (
            <div className="grid justify-center items-center min-h-screen">

                <h1>No Submitted Assignment Available</h1>

            </div>
        )
    }




    return (
        <Conatainer>

<div className="min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">

        {
                    data?.data.map((data)=><div key={data._id} className="card w-auto object-cover px-4 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">
                        {data?.assignmentData.title}
                            <div className="badge badge-secondary">{data.status}</div>
                        </h2>
                        <p>Examinee name: {data?.email}</p>
                        <p>Assignment mark: {data?.assignmentData.marks}</p>
                        <div className="flex">
                            <p>Difficulty level: {data?.assignmentData.difficultyLevel}</p>
                            {
                                data?.assignmentData.difficultyLevel === "Hard" ? <div className="badge badge-outline btn-error"></div> : data?.assignmentData.difficultyLevel === "Easy" ? <div className="badge badge-outline btn-primary"></div> : <div className="badge badge-outline btn-warning"></div>
                            }
                            
                        </div>
                        <div className="card-actions justify-center mt-4">
                            
                        <div className="my-5">
                                      
                                      <button className="btn btn-primary btn-xs" onClick={() => document.getElementById('my_modal_3').showModal()}>Give Mark</button>
                                      <dialog id="my_modal_3" className="modal">
                                          <div className="modal-box">
                                              <form method="dialog">
                                                  
                                                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                  <div className="grid gap-4">
                                                      <label className="font-bold" >link</label>
                                                      <Link>{data?.link}</Link>
                                                      <label className="font-bold"  >Short Note</label>
                                                      <p>{data?.sortdes}</p>
                                                      <hr />
                                                      <label className="font-bold" >Feedback</label>
                                                      <textarea placeholder="Give Feedback" onBlur={(e)=> setFeedBack(e.target.value)} name="feedback" id="" cols="10" rows="5"></textarea>
                                                      <label className="font-bold"  >Givven Mark</label>
                                                      <input required placeholder="Give Mark Here" onBlur={(e)=> setMark(e.target.value)} type="text" name="mark" id="" />
                                                      <input required onClick={()=>handleSubmit(data?._id)} className="btn btn-primary" type="submit" value="Submit" />
                                                  </div>
                                              </form>

                                          </div>
                                      </dialog>
                                  </div>
                        </div>
                    </div>
                </div>)
                }

        </div>



            {/* <div className="min-h-screen">

                <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                            <tr>
                                <th>Sn</th>
                                <th>Assignment Name</th>
                                <th>Submitted User</th>
                                <th>Marks</th>
                                <th>Difficulty Level</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Give Mark</th>

                            </tr>
                        </thead>
                        <tbody>

                            {
                                data?.data.map((data, idx) => <tr key={data._id}>
                                    <th>{idx + 1}</th>
                                    <td>{data?.assignmentData?.title}</td>
                                    <td>{data?.email}</td>
                                    <td>{data?.assignmentData?.marks}</td>
                                    <td>{data?.assignmentData?.difficultyLevel}</td>
                                    <td>{data?.assignmentData?.date.slice(0, 10)}</td>
                                    <td>{data?.status}</td>
                                    <td><div className="my-5">
                                      
                                        <button className="btn btn-primary btn-xs" onClick={() => document.getElementById('my_modal_3').showModal()}>Give Mark</button>
                                        <dialog id="my_modal_3" className="modal">
                                            <div className="modal-box">
                                                <form method="dialog">
                                                    
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                    <div className="grid gap-4">
                                                        <label className="font-bold" >link</label>
                                                        <Link>{data?.link}</Link>
                                                        <label className="font-bold"  >Short Note</label>
                                                        <p>{data?.sortdes}</p>
                                                        <hr />
                                                        <label className="font-bold" >Feedback</label>
                                                        <textarea placeholder="Give Feedback" onBlur={(e)=> setFeedBack(e.target.value)} name="feedback" id="" cols="10" rows="5"></textarea>
                                                        <label className="font-bold"  >Givven Mark</label>
                                                        <input required placeholder="Give Mark Here" onBlur={(e)=> setMark(e.target.value)} type="text" name="mark" id="" />
                                                        <input required onClick={()=>handleSubmit(data?._id)} className="btn btn-primary" type="submit" value="Submit" />
                                                    </div>
                                                </form>

                                            </div>
                                        </dialog>
                                    </div></td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>

            </div> */}
            </div>
        </Conatainer>
    );
};

export default SubmittedAssignment;