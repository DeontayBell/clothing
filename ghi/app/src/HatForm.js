import React, { useEffect, useState } from 'react';


function HatForm() {

    const [locations, setLocations] = useState([])

    const fetchData = async () => {
        const url = "http://localhost:8100/api/locations/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations)
        }
    }

    const [name, setName] = useState("");
    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value)
    }
    const [fabric, setFabric] = useState("");
    const handleFabricChange = (event) => {
        const value = event.target.value;
        setFabric(value)
    }
    const [color, setColor] = useState('');
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value)
    }
    const [picture, setPicture] = useState('')
    const handlePictureChange = (event) => {
        const value = event.target.value;
        setPicture(value)
    }
    const [location, setLocation] = useState('');
    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value)
    }


    useEffect(() => {
        fetchData();
      }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.name = name;
        data.fabric= fabric;
        data.color = color;
        data.url = picture;
        data.location = location;
        console.log(data)

        const hatUrl = 'http://localhost:8090/api/hats/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
        }
    }
    const response = await fetch(hatUrl, fetchConfig);
    if (response.ok) {
        const newHat = await response.json();
        console.log(newHat)
        setName("");
        setFabric("");
        setColor("");
        setLocation("");
        setPicture("")
    }
    }

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new hat</h1>
              <form onSubmit={handleSubmit} id="create-hat-form">
                <div className="form-floating mb-3">
                  <input value={name} onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                  <label htmlFor="name">Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input value={fabric} onChange={handleFabricChange} placeholder="fabric" required type="text" name="fabric" id="rfabric" className="form-control" />
                  <label htmlFor="fabric">Fabric</label>
                </div>

                <div className="form-floating mb-3">
                  <input value={color} onChange={handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                  <label htmlFor="color">Color</label>
                </div>

                <div className="form-floating mb-3">
                    <input onChange={handlePictureChange} required type="url" placeholder="Picture URL" value={picture} alt="" width="100" height="100" name="picture" id="picture" className="form-select"/>
                    <label htmlFor="picture">Picture</label>
                </div>

                <div className="mb-3">
                <select value={location} onChange={handleLocationChange} required name="location" id="location" className="form-select">
                <option value="">Choose a Location</option>
                {locations.map(location => {
                  return (
                    <option key={location.href} value={location.href}>
                      {location.closet_name}
                    </option>
                  );
                })}
              </select>
            </div>


                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      );
    }

    export default HatForm;
