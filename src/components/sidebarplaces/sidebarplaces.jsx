import React, { useState } from 'react'

const Sidebar = ({ setPlaces }) => {
  const [city, setCity] = useState('');
  const [areas, setAreas] = useState('');
  const [boardingtype, setBoardingType] = useState('');
  const [gender, setGender] = useState('');
  const [maxRent, setMaxRent] = useState('');
  const [employment, setEmployment] = useState('');

  const cityAreas = {
    Colombo: ["Bambalapitiya", "Dehiwala", "Piliyandala"],
    Kandy: ["Peradeniya", "Katugastota", "Gampola", "Minipe", "Pujapitiya", "Ganga Ihala Korale", "Akurana"],
  };

  const facilities = {
    cooking: ["Gas Stove", "Electric Cooker", "Meals Provided", "Any"],
    parking: ["Car Parking", "Bike Parking", "Any"],
    other: ["A/C", "Hot Water", "Attached Bathroom"]
  };


  const handleAreaChange = (e) => {
    const value = e.target.value;
    if (areas.includes(value)) {
      setAreas(areas.filter((a) => a !== value));
    } else {
      setAreas([...areas, value]);
    }
  };

  const handleBoardingTypeChange = (e) => {
    const value = e.target.value;
    if (boardingtype.includes(value)) {
      setBoardingType(type.filter((a) => a !== value));
    } else {
      setBoardingType([...type, value]);
    }
  };

  const handleFilter = async () => {
    const params = new URLSearchParams();
    if (city) params.append('city', city);
    if (boardingtype.length > 0) {
      boardingtype.forEach(t => params.append('type', t));
    }
    if (gender) params.append('tenant_gender', gender);
    if (rentMax) params.append('rent_max', rentMax);
    if (areas.length > 0) {
      areas.forEach(a => params.append('area', a));
    }

    const res = await fetch(`http://localhost:5000/places?${params.toString()}`);
    const data = await res.json();
    setPlaces(data);
  };

  return (
    <div className="mt-10 h-screen bg-gray-100 text-black p-4 border-b border-black md:border-b-0 md:border-r md:border-gray-300">
      <h2 className="text-xl font-bold text-gray-500 lg:align-left">Filters</h2>

      <div className="p-5 text-gray-600 gap-5 text-sm">
        <label className='text-left block p-2'>Location</label>

        <select value={city} onChange={(e) => { setCity(e.target.value); setAreas([]); }}
          className="py-1 mb-4 border rounded w-full"
        >

          <option value="">All Sri Lanka</option>
          {Object.keys(cityAreas).map((cityName) =>{
            <option value={cityName} key={cityName}>
              {cityName}
            </option>
          })}
        </select>

        {city && (
          <div className="mt-2 mb-2 ">
            <p className="">Select Area/s</p>
            {cityAreas[city].map((area) => (
              <label key={area} className="block text-left py-1">
                <input type="checkbox" value={area} checked={areas.includes(area)}
                  onChange={handleAreaChange}
                  className="appearance-none h-5 w-5 border border-gray-500 rounded-sm checked:bg-transparent checked:border-gray-500 checked:before:content-['✔'] checked:before:block checked:before:text-gray-800 checked:before:text-sm checked:before:leading-4 checked:before:text-center"
                />
                {area}
              </label>
            ))}
          </div>
        )}
        <label className='text-left block py-2'>Boarding Type</label>
        <select value={boardingtype} onChange={(e) => { setBoardingType(e.target.value); setBoardingType([]); }}
          className='border p-1 rounded w-full mb-4'>
          <option value="">All</option>
          <option value="Room">Room</option>
          <option value="House">House</option>
          <option value="Annex">Annex</option>
          <option value="Portion">Portion</option>
          <option value="HomeStays">Home stays</option>
          <option value='Apartment'>Apartment</option>
        </select>

        <div className="flex flex-row gap-2 justify between">
          <div className="">
            <label>Gender</label>
            <select value={gender} onChange={(e) => { setGender(e.target.value); setGender(''); }}
              className='border p-1 rounded w-full mb-4'>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Couple">Couple</option>
            </select>
          </div>
          <div className="">
            <label>Employment</label>
            <select value={employment} onChange={(e) => { setEmployment(e.target.value); setEmployment(''); }}
              className='border p-1 rounded w-full mb-4'>
              <option value="Student">Student</option>
              <option value="Part-time">Part-time</option>
              <option value="Employed">Employed</option>
            </select>
          </div>
        </div>
        <label>Persons Per Room</label>
        <select value={employment} onChange={(e) => { setEmployment(e.target.value); setEmployment(''); }}
          className='border p-1 rounded w-full mb-4'>
          <option value="Single Room">Single Room</option>
          <option value="2 shared">2 shared</option>
          <option value="3 shared">3 shared</option>
          <option value="4 shared">4 shared</option>
          <option value="4+ shared">4+ shared</option>
          <option value="Any">Any</option>
        </select>
        <label>Max Rent <p className='text-xs'>*Max payable rent amount</p></label>
        <input type='text' value="max_rent" placeholder='Enter amount' className='border rounded p-1 mb-4'></input>

        <label className='p-3 '>Facilities</label>
        <div className='grid grid-cols-3 gap-2'>
        <div>
          <label>Cooking</label>
            {facilities[cook].map((cook) => (
              <label key={cook} className="block text-left py-1">
                <input type="checkbox" value={cook} checked={cooking.includes(cook)}
                  onChange={handleAreaChange}
                  className="appearance-none h-5 w-5 border border-gray-500 rounded-sm checked:bg-transparent checked:border-gray-500 checked:before:content-['✔'] checked:before:block checked:before:text-gray-800 checked:before:text-sm checked:before:leading-4 checked:before:text-center"
                />
                {cook}
              </label>
            ))}
          </div>
        <div>Parking</div>
        <div>Other</div></div>
      </div>
      <div>
        <button className='mt-20 bg-red-500 text-white px-4 py-2 rounded'>
          Set Filters
        </button>
      </div>
    </div>

  )
}

export default Sidebar