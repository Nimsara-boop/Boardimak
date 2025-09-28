import React, { useState } from 'react'

const Sidebar = ({ setPlaces }) => {
  const [city, setCity] = useState('');
  const [areas, setAreas] = useState([]);
  const [boardingtype, setBoardingType] = useState('');
  const [tenant_gender, setGender] = useState('');
  const [maxRent, setMaxRent] = useState('');
  const [personsPerRoom, setPersonsPerRoom] = useState('');
  const [tenant_employment, setEmployment] = useState('');
  const [cooking, setCooking] = useState('');
  const [parking, setParking] = useState('');

  const cityAreas = {
    Colombo: ["Bambalapitiya", "Dehiwala", "Piliyandala", "Punchi Borella"],
    Kandy: ["Peradeniya", "Katugastota", "Gampola", "Minipe", "Pujapitiya", "Ganga Ihala Korale", "Akurana"],
  };

  const facilities = {
    Cooking: ["Gas", "Electric", "Meals Provided", "Any"],
    Parking: ["Car", "Bike ", "Any"],
  };


  const handleAreaChange = (e) => {
    const value = e.target.value;
    if (areas.includes(value)) {
      setAreas(areas.filter((a) => a !== value));
    } else {
      setAreas([...areas, value]);
    }
  };


  const handleFilter = async () => {
    const params = new URLSearchParams();
    if (city) params.append('city', city);
    if (areas.length > 0) {
      areas.forEach(a => params.append('area', a));
    }
    if (boardingtype) params.append('boardingtype', boardingtype);
    if (tenant_gender) params.append('tenant_gender', tenant_gender);
    if (tenant_employment) params.append('tenant_employment', tenant_employment);
    if (personsPerRoom) params.append('occupancy_per_room', personsPerRoom);
    if (maxRent) params.append('rent_min', maxRent);
    if (cooking) params.append('cooking_allowed', cooking);
    if (parking) params.append('parking_allowed', parking);

    console.log("Fetching URL:", `http://localhost:5000/places?${params.toString()}`);
    const res = await fetch(`http://localhost:5000/places?${params.toString()}`);
    const data = await res.json();
    setPlaces(data);
  };

  return (
    <div className="mt-10 h-screen bg-gray-100 text-black p-2 border-b border-black md:border-b-0 md:border-r md:border-gray-300">
      <h2 className="text-xl font-bold text-gray-500 lg:align-left">Filters</h2>

      <div className="p-5 text-gray-600 gap-5 text-sm">
        <label className='text-left block p-2'>Location</label>

        <select value={city} onChange={(e) => { setCity(e.target.value); setAreas([]); }}
          className="py-1 mb-4 border rounded w-full"
        >

          <option value="">All of Sri Lanka</option>

          {Object.keys(cityAreas).map((cityName) => (
            <option value={cityName} key={cityName}>
              {cityName}
            </option>
          ))}
        </select>

        {city && (
          <div className="mt-2 mb-2 ">
            <p className="">Select Area/s</p>
            <label key={""} className="block text-left py-1">
              <input type="checkbox" value={""} checked={areas.includes("")}
                onChange={handleAreaChange}
                className="appearance-none h-5 w-5 border border-gray-500 rounded-sm checked:bg-transparent checked:border-gray-500 checked:before:content-['✔'] checked:before:block checked:before:text-gray-800 checked:before:text-sm checked:before:leading-4 checked:before:text-center"
              />All of {city}
            </label>
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
        <select value={boardingtype} onChange={(e) => setBoardingType(e.target.value)}
          className='border p-1 rounded w-full mb-4'>
          <option value="">Any</option>
          <option value="room">Room</option>
          <option value="house">House</option>
          <option value="annex">Annex</option>
          <option value="portion">Portion</option>
          <option value="homestays">Home stays</option>
          <option value='apartment'>Apartment</option>
        </select>

        <div className="flex flex-row gap-2 justify between">
          <div className="">
            <label>Gender</label>
            <select value={tenant_gender} onChange={(e) => { setGender(e.target.value); }}
              className='border p-1 rounded w-full mb-4'>
              <option value="">Any</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="couple">Couple</option>
            </select>
          </div>
          <div className="">
            <label>Employment</label>
            <select value={tenant_employment} onChange={(e) => { setEmployment(e.target.value); }}
              className='border p-1 rounded w-full mb-4'>
              <option value="">Any</option>
              <option value="student">Student</option>
              <option value="part time">Part-time</option>
              <option value="working">Employed</option>
            </select>
          </div>
        </div>
        <label>Persons Per Room</label>
        <select value={personsPerRoom} onChange={(e) => { setPersonsPerRoom(e.target.value); }}
          className='border p-1 rounded w-full mb-4'>
          <option value="">Any</option>
          <option value="1">Single Room</option>
          <option value="1,2">Single or 2 shared</option>
          <option value="1,2,3">Single, 2 or 3 shared</option>
          <option value="1,2,3,4">Single, 2, 3 or 4 shared</option>
          <option value="5,6,7,8,9,10">4+ shared</option>

        </select>
        <label>Max Rent <p className='text-xs'>*Max payable rent amount</p></label>
        <input type='number' value={maxRent} placeholder='Enter amount'
          onChange={(e) => setMaxRent(e.target.value)}
          className='border rounded p-1 mb-4'></input>

        <label className=' '>Facilities</label><br />
        <label className=''>Cooking Allowed</label>
        <select value={cooking} onChange={(e) => setCooking(e.target.value)}
          className="border p-1 rounded w-full mb-4">
          <option value="gas stove">Gas</option>
          <option value="electric">Electric</option>
          <option value="provided">Meals Provided</option>
          <option value="">Any</option>
          <option value="none">None</option>
        </select>

        <label>Parking Allowed</label>
        <select value={parking} onChange={(e) => setParking(e.target.value)}
          className="border p-1 rounded w-full mb-4">
          <option value="">Any</option>
          <option value="car">Car</option>
          <option value="bike">Bike</option>
          <option value="none">None</option>
        </select>
      </div>
      <div>
        <button
          onClick={handleFilter}
          className='mt-20 bg-red-500 text-white px-4 py-2 rounded'>
          Set Filters
        </button>
      </div>
    </div>

  )
}

export default Sidebar