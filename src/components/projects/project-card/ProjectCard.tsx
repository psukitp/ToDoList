import { Card, Typography } from "@mui/material";
import './projectCard.scss'

const ProjectCard = (props: { name: string }) => {
    return (
        <>
            <div className="project-card">
                <Card
                    variant="outlined"
                    sx={{
                        p: '25px 10px',
                        width: '300px',
                        cursor: 'pointer',
                        ":hover": {
                            opacity: '.9',
                            scale: '105%'
                        }
                    }}>
                    <Typography>
                        {props.name}
                    </Typography>
                </Card>
            </div>
        </>
    )
}

export default ProjectCard;