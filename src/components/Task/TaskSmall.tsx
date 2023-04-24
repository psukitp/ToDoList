import { Card, Typography } from "@mui/material"
import './taskSmall.scss'

const TaskSmall = (props: {
    task_title: string,
    text: string,
    date_create: Date,
    date_end: Date,
    date_update: Date,
    priority: string,
    status: string,
    responsible: number,
    responsible_info: {
        name: string,
        s_name: string,
        patronymic: string
    }
}) => {

    const getDateNow = () => {
        return new Date()
    }

    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    p: '10px 10px',
                    width: '300px',
                    cursor: 'pointer',
                    mb: '20px',
                    ":hover": {
                        opacity: '.9',
                        scale: '105%'
                    }
                }}>
                <div className="task__small-card">
                    <div className="task__small-card-top">
                        <div className="task__small-card-text">
                            {new Date(props.date_end) < getDateNow() && props.status !== 'Выполнено' ?
                                <Typography
                                    sx={{
                                        mb: '10px',
                                        color: 'red',
                                        fontWeight: 700
                                    }}>
                                    {props.task_title}
                                </Typography> :
                                <Typography
                                    sx={{
                                        mb: '10px',
                                        fontWeight: 700
                                    }}>
                                    {props.task_title}
                                </Typography>
                            }
                            <Typography>
                                {props.text.length > 25 ? props.text.substring(0, 23) + '...' : props.text}
                            </Typography>
                        </div>
                        <div className="task__small-card-info">
                            <Typography
                                sx={{
                                    mb: '10px'
                                }}>
                                {props.priority}
                            </Typography>
                            <Typography sx={{
                                mb: '10px'
                            }}>
                                {String(props.date_create).substring(8, 10) +
                                    '.' +
                                    String(props.date_create).substring(5, 7)}
                                {' ' + '-' + ' '}
                                {String(props.date_end).substring(8, 10) +
                                    '.' +
                                    String(props.date_end).substring(5, 7)}
                            </Typography>
                            <Typography sx={{
                                mb: '10px'
                            }}>
                                {props.date_update !== null ?
                                    <div>
                                        {String(props.date_update).substring(8, 10) +
                                            '.' +
                                            String(props.date_update).substring(5, 7)}
                                    </div>
                                    : null}

                            </Typography>
                        </div>
                    </div>
                    <div className="task__small-card-manager">
                        <Typography>
                            {props.responsible_info.s_name}
                            {' '}
                            {props.responsible_info.name}
                            {' '}
                            {props.responsible_info.patronymic}
                            {' '}
                            ({props.responsible})
                        </Typography>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default TaskSmall