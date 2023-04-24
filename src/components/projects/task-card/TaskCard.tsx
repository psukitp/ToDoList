import { Card, Typography } from "@mui/material";
import './taskCard.scss'

const TaskCard = (props: { title: string, name: string, s_name: string }) => {
    return (
        <>
            <div className="task-card">
                <Card
                    variant="outlined"
                    sx={{
                        p: '13px 10px',
                        width: '300px',
                        cursor: 'pointer',
                        ":hover": {
                            opacity: '.9',
                            scale: '105%'
                        }
                    }}>
                    <Typography>
                        {props.title}
                    </Typography>
                    <Typography>
                        Руководитель: {props.name} {props.s_name}
                    </Typography>
                </Card>
            </div>
        </>
    )
}

export default TaskCard;