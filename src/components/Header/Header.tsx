import { AppBar, Button, Typography } from "@mui/material";
import { useStore } from "../../store/store";
import { useEffect, useState } from "react";
import { userApi } from "../../api/userApi";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
    const { userStore } = useStore();
    const [isLogged, setIsLogged] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (userStore.user_id > 0) {
            setIsLogged(true);
        }
    }, [userStore.user_id])

    const handleLogout = () => {
        userApi.logout()
        window.location.reload()
    }

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    bgcolor: '#D9D9D9',
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 3,
                    minWidth: 300,
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                }}>
                <NavLink to='/projects' style={{ textDecoration: 'none', color: 'black' }}>
                    <Typography
                        fontSize='24px'
                        letterSpacing='-0.2px'
                        lineHeight='20px'
                        color='black'>
                        TO<br />DO
                    </Typography>
                </NavLink>
                {isLogged ?
                    <Button variant="outlined" onClick={handleLogout}>
                        Выйти
                    </Button> : null}
            </AppBar>
        </>
    )
}

export default Header;