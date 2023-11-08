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

    console.log(data?.data);

    const [feedback, setFeedBack] = useState('')
    const [mark, setMark] = useState('')

    const giveMark = {
        status : 'Complete',
        mark: mark,
        feedback: feedback,
    }

    const handleSubmit = async (id) => {
       
        const res = axios.put(`/update-padding-assignment?id=${id}`,giveMark)

        console.log(res);
        setLoad(false)
    }




    return (
        <Conatainer>
            <div className="min-h-screen">

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
                                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                        <button className="btn btn-primary btn-xs" onClick={() => document.getElementById('my_modal_3').showModal()}>Give Mark</button>
                                        <dialog id="my_modal_3" className="modal">
                                            <div className="modal-box">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                    <div className="grid gap-4">
                                                        <label >link</label>
                                                        <Link>{data?.link}</Link>
                                                        <label >Short Note</label>
                                                        <p>{data?.sortdes}</p>
                                                        <hr />
                                                        <label >Feedback</label>
                                                        <textarea onBlur={(e)=> setFeedBack(e.target.value)} name="feedback" id="" cols="10" rows="5"></textarea>
                                                        <label >Givven Mark</label>
                                                        <input onBlur={(e)=> setMark(e.target.value)} type="text" name="mark" id="" />
                                                        <input onClick={()=>handleSubmit(data?._id)} className="btn btn-primary" type="submit" value="Submit" />
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

            </div>
        </Conatainer>
    );
};

export default SubmittedAssignment;