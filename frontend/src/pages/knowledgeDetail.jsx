
import { useParams } from 'react-router-dom';
import axios from '../helper/axios';
import React, { useEffect, useState } from 'react';


function knowledgeDetail() {
 let {id} = useParams();
    let [data, setData] = useState(null);

    useEffect(() => {
        let fetchDetail = async () => {
            let res = await axios.get(`/api/publicknowledge/${id}`);
            if(res.status === 200){
                setData(res.data);
            }
        }
        fetchDetail();
    }, [id]);

    if (!data) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
<div className="max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-xl mt-10 sm:mt-20 md:mt-40 break-words">
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center sm:text-left">
    {data.title}
  </h1>

  <p className="text-gray-600 mb-2">
    <span className="font-semibold">Description:</span> {data.description}
  </p>

  <p className="text-gray-600 mb-2">
    <span className="font-semibold">About:</span> <span className="break-words">{data.about}</span>
  </p>

  <p className="text-gray-600 mb-2">
    <span className="font-semibold">Writer:</span> {data.writer}
  </p>

  <p className="text-gray-400 text-sm sm:text-base mt-4">
    Created: {new Date(data.createdAt).toLocaleString()} | Updated: {new Date(data.updatedAt).toLocaleString()}
  </p>
</div>
    );
}

export default knowledgeDetail