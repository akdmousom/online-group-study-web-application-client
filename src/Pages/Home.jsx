import { useEffect, useState } from "react";
import Conatainer from "../Components/Layout/Conatainer";
import study from '../assets/images/study.jpg'
import axios from "axios";
import Feature from "../Components/Home/Feature";
import { motion } from 'framer-motion'

const Home = () => {

    const [features, setFeatures] = useState();

    useEffect(() => {
        axios.get('https://online-group-study-server-14kb78srt-arijit-kumar-das-projects.vercel.app/api/v1/features')
            .then(response => {

                setFeatures(response?.data)
            })
    }, [])

    return (

        <div >
            <Conatainer>
                <motion.div initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }} className="hero min-h-screen" style={{ backgroundImage: `url(${study})` }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Enhance Your Study</h1>
                            <p className="mb-5">Using this application you can share your exprience with all over the world.think bigger and expend your knowladge</p>
                            <button className="btn btn-primary text-white">Explore</button>
                        </div>
                    </div>
                </motion.div>


                <h1 className="text-center py-8 text-4xl font-bold ">Our Feature</h1>
                <motion.div
                    

                    className="w-full grid gap-4 grid-cols-1 md:grid-cols-3">

                    {
                        features?.map(feature => <div key={feature?._id} className="card w-full h-full object-cover px-5 bg-base-300 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{feature?.title}</h2>
                                <p>{feature?.description}</p>
                            </div>
                            <figure><img className="h-full" src={feature?.img} alt="Shoes" /></figure>
                        </div>)
                    }




                </motion.div>

                <Feature />
            </Conatainer>

        </div>

    );
};

export default Home;