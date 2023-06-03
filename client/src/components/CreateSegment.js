import { useState } from "react";
import { useSubmitSegment } from "../hooks/useSubmitSegment";

const CreateSegment = () => {
  //temp user, remove when switching to global profiles

  const [day, setDay] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const { createSegment, isloading, error } = useSubmitSegment();

  const handleSubmit = async (e) => {

    e.preventDefault();


    console.log(new Date())

    const start_date = new Date(`${day}T${start}:00`);

    const end_date = new Date(`${day}T${end}:00`);

    await createSegment(start_date, end_date);
  };

  return (
    <div>

      <form className="login" onSubmit={handleSubmit}>
        <h3>Submit a time segment</h3>
        <label>day:</label>
        <input
          type="date"
          onChange={(e) => setDay(e.target.value)}
          value={day}
        />
        <label>start:</label>
        <input
          type="time"
          onChange={(e) => setStart(e.target.value)}
          value={start}
        />
        <label>end:</label>
        <input
          type="time"
          onChange={(e) => setEnd(e.target.value)}
          value={end}
        />

        <button disabled={isloading}>Add time segment</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default CreateSegment;
