import EditProfileForm from "../components/EditProfileForm";
import { useParams } from "react-router-dom";


const EditWalkerProfile = () => {
    const { username } = useParams();
    

    return (
        <div>
            <h1>Edit your profile</h1>
            <EditProfileForm username={username} />
        </div>
    )
}

export default EditWalkerProfile