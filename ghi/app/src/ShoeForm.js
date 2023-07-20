import React, { useEffect, useState } from 'react';


function ShoeForm() {
    const [bins, setBins] = useState([]);
    const fetchData = async () => {
        const url = 'http://localhost:8100/api/bins';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setBins(data.bins);
        }
    }

    const [manufacturer, setManufacturer] = useState('');
    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const [modelName, setModelName] = useState('');
    const handleModelNameChange = (event) => {
        const value = event.target.value;
        setModelName(value);
    }

    const [color, setColor] = useState('');
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const [pictureUrl, setPictureUrl] = useState('');
    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value);
    }

    const [bin, setBin] = useState('');
    const handleBinChange = (event) => {
        const value = event.target.value;
        setBin(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.manufacturer = manufacturer;
        data.model_name = modelName;
        data.color = color;
        data.picture_url = pictureUrl;
        data.bin = bin;

        const shoeUrl = 'http://localhost:8080/api/shoes/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
            const newShoe = await response.json();
            console.log(newShoe);
            setManufacturer('');
            setModelName('');
            setColor('');
            setPictureUrl('');
            setBin('');
        }
    }



    useEffect(() => {
        fetchData();
      }, []);
    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new Shoe</h1>
              <form onSubmit={handleSubmit} id="create-shoe-form">
                <div className="form-floating mb-3">
                <input onChange={handleManufacturerChange} placeholder="Manufacturer" required
                  type="text" name="manufacturer" id="manufacturer" value={manufacturer}
                  className="form-control" />
                  <label htmlFor="manufacturer">Manufacturer</label>
                </div>
                <div className="form-floating mb-3">
                <input onChange={handleModelNameChange} placeholder="Model Name" value={modelName}
                  required type="text" name="model_name" id="model_name"
                  className="form-control" />
                  <label htmlFor="model_name">Model Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleColorChange} placeholder="Color" required type="text" name="color" id="color" value={color} className="form-control" />
                  <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handlePictureUrlChange} placeholder="Image URL" required type="url" value={pictureUrl} name="picture_url" id="picture_url" className="form-control" />
                  <label htmlFor="picture_url">Picture Url</label>
                </div>
                <div className="mb-3">
                    <select onChange={handleBinChange} required name="bin" id="bin" value={bin} className="form-select">
                    <option value="">Choose a bin</option>
                    {bins.map(bin => {
                      return (
                          <option key={bin.href} value={bin.href}>
                              {bin.bin_number}
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



};


export default ShoeForm;
