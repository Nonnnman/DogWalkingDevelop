import EditProfileForm from "../components/EditProfileForm";
import { useParams } from "react-router-dom";
import "../styles/editProfile.css";


const EditWalkerProfile = () => {
    const { username } = useParams();
    

    return (
        <div>
            <EditProfileForm username={username} />
        </div>
    )
}

export default EditWalkerProfile