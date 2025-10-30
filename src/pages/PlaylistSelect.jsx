import React, { useNavigate, useEffect } from "react-router-dom";

function PlaylistSelect() {
  // Subject to change
  const [data, setData] = useEffect([]);

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
