import { useState } from "react";
import { useSubmitSegment } from '../hooks/useSubmitSegment';
import Cal  from './Cal'
import { useAuthContext } from '../hooks/useAuthContext';


const CreateSegment = () => {
    //temp user, remove when switching to global profiles
    const { user } = useAuthContext()
    const username = user.username

    const [day, setDay] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const {createSegment,isloading, error} = useSubmitSegment();

    const handleSubmit = async (e) => {

        const start_date = new Date(`${day}T${start}:00`);

        const end_date = new Date(`${day}T${end}:00`);

        e.preventDefault();

        await createSegment(start_date, end_date);
    }

    return (
        <div>
            <Cal username={username}/>
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

                <button disabled={isloading}>Log in</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>

    )

}

export default CreateSegment