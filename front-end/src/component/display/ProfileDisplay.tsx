import { Typography, Box, Avatar } from "@mui/material";
import { useUserContext } from "../../context/UserContext";

const Profile = () => {
    const UserContext = useUserContext();

    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h2">Profile</Typography>
                <Avatar src={UserContext.picture} alt="Profile" sx={{ width: 200, height: 200, my: 2 }} />
                <Typography>Id: {UserContext.id}</Typography>
                <Typography>Username: {UserContext.username}</Typography>
                <Typography>Name: {UserContext.name}</Typography>
                <Typography>Email: {UserContext.email}</Typography>
                <Typography>Role: {UserContext.role}</Typography>
                <Box sx={{ width: 300, height: 200, my: 2 }}>
                    <Typography sx={{ overflow: 'auto', whiteSpace: 'pre' }}>Token: {UserContext.token}</Typography>
                </Box>
            </Box>
        </div>
    );
};

export default Profile;