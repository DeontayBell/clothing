import React, { useEffect, useState } from 'react';



function ShoeList() {
    const [shoes, setShoes] = useState([]);
    const fetchData = async () => {
        const url = 'http://localhost:8080/api/shoes'

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setShoes(data.shoes)
        }
    }
    const deleteShoe = async (id) => {
        fetch(`http://localhost:8080/api/shoes/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }).then(() => {
            window.location.reload();
        });
        };



    useEffect(() => {
        fetchData();
      }, []);

    return (

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Manufacturer</th>
              <th>Model Name</th>
              <th>Color</th>
              <th>Picture</th>
              <th>Bin</th>
            </tr>
          </thead>
          <tbody>
            {shoes.map(shoe => {
              return (
                <tr key={shoe.href}>
                  <td>{ shoe.manufacturer }</td>
                  <td>{ shoe.model_name }</td>
                  <td>{ shoe.color }</td>
                  <td>
                    <img src={ shoe.picture_url } className/>
                  </td>
                  <td>{ shoe.bin.bin_number }</td>
                  <td>
                    <button onClick={() => deleteShoe(shoe.id)}>Delete Shoe</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
    );
}

export default ShoeList;
