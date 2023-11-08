import { useParams } from "react-router-dom";
import UseAxios from "../Hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";
import Conatainer from "../Components/Layout/Conatainer";
import { useState } from "react";
import useAuth from "../Hooks/UseAuth";
import { data } from "autoprefixer";

const AssignmentDetails = () => {
    const { id } = useParams();

    const [link, setLink] = useState();
    const [des, setDes] = useState();
    const {user} = useAuth();

    const axios = UseAxios();
    const getSeletAssignment = () => {
        const res = axios.get(`/single-assignment/${id}`)
        return res
    }
    const { data,} = useQuery({
        queryKey: ['selectAssignment'],
        queryFn: getSeletAssignment
    })

console.log();

    const handleSubmit = async () => {

   

        const datas = {
            link: link,
            sortdes: des,
            email: user?.email,
            status: 'Pandding',
            assignmentData: data?.data,
        }
         
        const res = await axios.post('/take-assignment',datas )
        console.log(res);

        console.log(datas);


    }
   

    return (
        <Conatainer>
            <div className="min-h-screen grid justify-center ">


                <div className="px-4">
                    <img src={data?.data.thumbnail} alt="" />
                    <h1 className=" text-2xl lg:text-4xl mt-5">{data?.data.title}</h1>
                    <hr />
                    <p className="text-2xl mt-5">{data?.data.description}</p>
                    <p className="text-2xl mt-5">{data?.data.marks}</p>
                    <p className="text-bold mt-5">{data?.data.difficultyLevel}</p>
                    <div className="my-5">
                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>Take Assignment</button>
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    <div className="grid gap-4">
                                        <label >link</label>
                                        <input onBlur={(e) => setLink(e.target.value)} className="bg-white text-black" type="text" name="link" placeholder="submit link" />
                                        <label >Short Des</label>
                                        <textarea onBlur={(e) => setDes(e.target.value)} placeholder="Short description" className="bg-white text-black" name="shortDes"></textarea>
                                        <input onClick={handleSubmit} className="btn btn-primary" type="submit" value="Submit" />
                                    </div>
                                </form>

                            </div>
                        </dialog>
                    </div>
                </div>




            </div>
        </Conatainer>
    );
};

export default AssignmentDetails;