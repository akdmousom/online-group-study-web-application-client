import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const CreateAssignments = () => {
    const [startDate, setStartDate] = useState(new Date());
        const [formdata,setFormData] = useState({
        title: '',
        description: '',
        thumbnail: '',
        difficultyLevel: '',
        date: startDate,
    })

    const handleChenge = (e) =>{

        const {name, value} = e.target
        setFormData({
            ...formdata,
            [name]:value,
        })

    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formdata);
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
                            <input onChange={handleChenge} type="text" name="title" value={formdata.value} placeholder="Title" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input onChange={handleChenge} type="text" name="description" value={formdata.value} placeholder="Description" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Thumbnail</span>
                            </label>
                            <input onChange={handleChenge} type="text" name="thumbnail" value={formdata.value} placeholder="Thumbnail" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                        <label className="label">
                                <span className="label-text">Difficulty level</span>
                            </label>
                            <select onChange={handleChenge} name="difficultyLevel" value={formdata.value} className="select select-bordered w-full max-w-xs">
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Create Assignment</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateAssignments;