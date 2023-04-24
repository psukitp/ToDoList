import { AppBar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Footer = () => {
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
            </AppBar>
        </>
    )
}

export default Footer;