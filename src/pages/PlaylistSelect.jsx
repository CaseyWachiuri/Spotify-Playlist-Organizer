import React, { useNavigate, useEffect } from "react-router-dom";

const [data, setData] = useEffect([]);


function PlaylistSelect() {
  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
  }

  return (
    <Form onSubmit={handleOnSubmit}>
      <select name="playlist">
        {data.map((data) => (
          <option value="data.name">data.name</option>
        ))}
      </select>
    </Form>
  )
}

export default PlaylistSelect;
