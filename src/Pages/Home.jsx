import Conatainer from "../Components/Layout/Conatainer";
import study from '../assets/images/study.jpg'
import study2 from '../assets/images/study2.jpg'


const Home = () => {

    return (

        <div >
<Conatainer>
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${study})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Enhance Your Study</h1>
                        <p className="mb-5">Using this application you can share your exprience with all over the world.think bigger and expend your knowladge</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>

            
            <h1 className="text-center py-8 text-4xl font-bold ">Our Feature</h1>
                <div className="w-full grid grid-cols-1 md:grid-cols-3">

                    

                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">You Can Create Assignment</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                        </div>
                        <figure><img src={study2} alt="Shoes" /></figure>
                    </div>

                </div>
            </Conatainer>

        </div>

    );
};

export default Home;