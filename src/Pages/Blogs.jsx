import { useQuery } from '@tanstack/react-query';

import React from 'react';
import UseAxios from '../Hooks/UseAxios';

const Blogs = () => {

    const axios = UseAxios();
    
    const getBlogPost = () => {
       const res = axios.get('/blogs')
       return res
    }

    const {data} = useQuery({
        queryKey: ['blogPost'],
        queryFn: getBlogPost
    })





    return (
        <div className='min-h-screen grid md:grid-cols-2 gap-4 lg:grid-cols-3'>
            

        {
            data?.data?.map(data => <div key={data._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{data.title}</h2>
              <p>{data.description}</p>
            </div>
          </div>)
        }

            

        </div>
    );
};

export default Blogs;