import React, { useEffect, useState } from 'react';


function HatList() {

    const [hats, setHats] = useState([]);
    const fetchData = async () => {
        const response = await fetch("http://localhost:8090/api/hats/")
        if (response.ok) {
            const data = await response.json();
            setHats(data.hats)
            console.log(data)
        }
    }

    const deleteHat = async (id) => {
        const url = `http://localhost:8090/api/hats/${id}/`;
        const fetchConfig = {
            method: "DELETE",
            headers: {"Content-Type": "applications/json"},
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            const data = await response.json()
            setHats(data.hats)
            window.location.reload();

        }
    }



    useEffect(() => {
        fetchData();
      }, []);

    return (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Fabric</th>
              <th>Color</th>
              <th>Picture</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {hats.map(hat => {
              return (
                <tr key={hat.id}>
                  <td>{ hat.name }</td>
                  <td>{ hat.fabric }</td>
                  <td>{ hat.color }</td>
                  <td><img alt="" src={ hat.url } /></td>
                  <td>{ hat.location.closet_name }</td>
                  <td>
                    <button type="button" onClick={() => deleteHat(hat.id)}>Delete Hat</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
        }

    export default HatList;
