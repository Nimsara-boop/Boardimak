import React, { useState } from "react";


const PostHunterButton = () => {

    const [city, setCity] = useState('');
    const [areas, setAreas] = useState([]);

    const cityAreas = {
        Colombo: ["Bambalapitiya", "Dehiwala", "Piliyandala", "Punchi Borella"],
        Kandy: ["Peradeniya", "Katugastota", "Gampola", "Minipe", "Pujapitiya", "Ganga Ihala Korale", "Akurana"],
    };


    return (
        <div className="text-gray-900" >
            <h3 className="text-gray-600  text-center mb-5">Post a Looking For A Boarding notice</h3>
            <label value="city" className='text-gray-700 text-sm  inline-block text-left px-5'>*City</label>
            <select value='city' className="border border-gray-400 px-5" onChange={(e) => { setCity(e.target.value); setAreas([]); }}>

                {Object.keys(cityAreas).map((city) => (
                    <option>{city}</option>
                ))}</select>

            {city && (
            <label value="area" className='text-gray-700 text-sm  inline-block text-left px-5 ml-20'>*Area <span className="text-xs"> (select all that apply)</span></label>
            <select value='area' onChange={(e) => { setArea([e.target.value]); }})></select>)
            }
        </div>
    )
}

export default PostHunterButton