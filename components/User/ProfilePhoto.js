import { useContext } from "react";
import { url } from "../Globals";
import { UserContext } from "../../context/UserContext";

const ProfilePhoto = (props) => {
    const {user} = useContext(UserContext);

    // Remove class property from props
    const props_copy = {...props};
    delete props_copy['className'];

    return (
        <img src={url(`/media/${user.profile_image}`)} alt={`${user.first_name} ${user.last_name}'s profile picture`} className={`rounded-full w-8 h-8 ${props.className}`} {...props_copy}/>
    )
}

export default ProfilePhoto