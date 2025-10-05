import React, { useState } from "react";


const PostHunterButton = () => {

    const [city, setCity] = useState('');
    const [areas, setAreas] = useState([]);
    const [postColor, setPostColor] = useState('');

    const cityAreas = {
        Colombo: ["Bambalapitiya", "Dehiwala", "Piliyandala", "Punchi Borella", ],
        Kandy: ["Peradeniya", "Katugastota", "Gampola", "Minipe", "Pujapitiya", "Ganga Ihala Korale", "Akurana"],
    };

    const colors = ["bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-purple-500", "bg-orange-500"];

    const handleAreaChange = (e) => {
        const value = e.target.value;
        if (areas.includes[value]) {
            setAreas.append(value);
        }
    }

    const handleCityChange = (e) => {
        const value = e.target.value;
        setCity(value);
    }

    const handlePostColorChange = (e) => {
        const color = e.target.value;
        setPostColor(color);
    }

    return (
        <div className="text-gray-900 overflow-hidden" >
            <h3 className="text-gray-600  text-center mb-5">Post a Looking For A Boarding notice</h3>
            <div>
                <label value='color' className='text-gray-700 text-sm  inline-block text-left px-5'>Pick Post Color </label>
      {colors.map((color) => (
        <button
          key={color}
          onClick={handlePostColorChange}
          style={{ backgroundColor: color }}
          className={` gap-2 m-1 mb-5
            h-8 w-6 rounded-full          
            border-4
            ${color}
            ${postColor === color ? "border-black" : "border-transparent"}
            focus:outline-none px-2
          `}
        />
      ))}
            </div>
            <div className="flex flex-row gap-3">
                <label value="city" className='text-gray-700 text-sm  inline-block text-left px-5'>*City</label>
                <select value='city' onChange={handleCityChange} className="border border-gray-400 px-5">
                    <option value=''>All of Sri Lanka</option>
                    {Object.keys(cityAreas).map((city) => (
                        <option value={city}>{city}</option>
                    ))}</select>

                {city && (
                    <div>
                        <label key='' className='text-gray-700 text-sm  inline-block text-left px-5 ml-20'>*Area <span className="text-xs"> (select all that apply)</span></label>
                        <div className=''>
                            <input type="checkbox" value={""} checked={areas.includes("")}
                                onChange={handleAreaChange}
                                className="appearance-none h-5 w-5 border border-gray-500 rounded-sm checked:bg-transparent checked:border-gray-500 checked:before:content-['✔'] checked:before:block checked:before:text-gray-800 checked:before:text-sm checked:before:leading-4 checked:before:text-center"
                            />All of {city}
                            {cityAreas[city].map((area) => (
                                <div className=''>
                                <label key={area} className="px-2">
                                    <input type='checkbox'
                                        className="peer appearance-none h-5 w-5 border border-gray-500 rounded-sm checked:bg-transparent checked:border-gray-500 checked:before:content-['✔'] checked:before:block checked:before:text-gray-800 checked:before:text-sm checked:before:leading-4 checked:before:text-center"
                                        onChange={handleAreaChange}
                                        value={area} />
                                    <span className="peer-checked:text-green-500">{area}</span>
                                </label>
                                </div>

                            ))}</div>
                    </div>
                )} </div>
        </div>
    )
}

export default PostHunterButton