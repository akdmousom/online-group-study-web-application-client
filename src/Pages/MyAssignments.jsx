import { useQuery } from "@tanstack/react-query";
import Conatainer from "../Components/Layout/Conatainer";
import UseAxios from "../Hooks/UseAxios";
import useAuth from "../Hooks/UseAuth";

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

                <div className="overflow-x-auto my-5">
                    <table className="table table-xs ">
                        <thead>
                            <tr className="text-black">
                                <th>Sn</th>
                                <th>Assignment Name</th>
                                <th>Assignment Marks</th>
                                <th>Difficulty Level</th>
                                <th>Status</th>
                                <th>Your obtain marks</th>
                                <th>Feedback</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data.data.map((data, idx) => <tr key={data._id}>
                                    <th>{idx + 1}</th>
                                    <td>{data?.assignmentData.title}</td>
                                    <td>{data?.assignmentData.marks}</td>
                                    <td>{data?.assignmentData.difficultyLevel}</td>
                                    <td>{data.status}</td>
                                    <td>{data.mark || '00'}</td>
                                    <td>{data.feedback || '---'}</td>
                                </tr>)
                            }

                        </tbody>

                    </table>
                </div>


            </div>
        </Conatainer>
    );
};

export default MyAssignments;