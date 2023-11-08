import ReactDatePicker from "react-datepicker";
import toast from "react-hot-toast";
import UseAxios from "../Hooks/UseAxios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const UpdateAssignment = () => {
    const [startDate, setStartDate] = useState(new Date());
    const { id } = useParams();
    const [upData, setUpData] = useState();
    const navigate = useNavigate()

    const axios = UseAxios();

    const getSingleData = async () => {

        const res = await axios.get(`/single-assignment/${id}`)
        setUpData(res?.data)
        return res
    }

    const { isLoading } = useQuery({
        queryKey: ['singleData',upData],
        queryFn: getSingleData,
    })




    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        const title = form.title.value
        const description = form.description.value
        const thumbnail = form.thumbnail.value
        const marks = form.marks.value
        const difficultyLevel = form.difficultyLevel.value



        const data = {
            title: title,
            description: description,
            thumbnail: thumbnail,
            marks: marks,
            difficultyLevel: difficultyLevel,
            userEmail: upData?.userEmail,
        }



        try {

            const res = await axios.put(`/update-single-assignment?id=${id}`, data)

            if (res.status === 200) {

                toast.success('Assignment Update Successfully')
                navigate('/assignments')

            }

            if (res.status === 401) {

                toast.error('You are not authorized person to do this task')

            }



            

        } catch (error) {

            if (error.response.status === 401) {
                toast.error('You are not authorized')
            }

        }


      


    }

    if (isLoading) {

        return (
            <div className="min-h-screen grid justify-center items-center">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        )

    }



    return (

        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input defaultValue={upData?.title} type="text" name="title" placeholder="Title" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input  defaultValue={upData?.description} type="text" name="description" placeholder="Description" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Thumbnail</span>
                            </label>
                            <input defaultValue={upData?.thumbnail} type="text" name="thumbnail" placeholder="Thumbnail" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Marks</span>
                            </label>
                            <input defaultValue={upData?.marks} type="text" name="marks" placeholder="Thumbnail" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Difficulty level</span>
                            </label>
                            <select defaultValue={upData?.difficultyLevel} required name="difficultyLevel" className="select select-bordered w-full max-w-xs">
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <ReactDatePicker dateFormat="Pp" selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Update Assignment</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateAssignment;