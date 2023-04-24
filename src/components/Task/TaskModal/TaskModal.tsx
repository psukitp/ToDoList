import { Button, InputLabel, MenuItem, MenuList, Modal, Select, StepLabel, Typography } from '@mui/material';
import './taskModal.scss'
import { useState } from 'react';
import { projectApi } from '../../../api/projectApi';

const TaskModal = (props:
    {
        active: boolean,
        setActive: (value: boolean) => void,
        taskInfo: any,
        myId: number,
        setApplyChanges: (value: boolean) => void
    }) => {
    const [status, setStatus] = useState('');
    const el = props.taskInfo;

    const getDateNow = () => {
        return new Date()
    }

    const handleSaveChanges = () => {
        if (status !== '') {
            const today = getDateNow()
            projectApi.updateTaskStatus(el.task_id, status, today)
            props.setApplyChanges(true);
            props.setActive(false)
        }
    }
    return (
        <>
            <div className={props.active ? "task__modal active" : "task__modal"} onClick={() => props.setActive(false)}>
                <div className="task__modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="task__modal-content--inner">
                        <div className="task__modal-content--text">
                            <StepLabel>Название</StepLabel>
                            <Typography fontSize='24px'
                                sx={{
                                    mb: '20px'
                                }}>
                                {el.task_title}
                            </Typography>
                            <StepLabel>Описание</StepLabel>
                            <Typography>
                                {el.text}
                            </Typography>
                        </div>
                        <div className="task__modal-content--info">
                            <StepLabel>Приоритет</StepLabel>
                            <Typography
                                sx={{
                                    mb: '20px'
                                }}>
                                {el.priority}
                            </Typography>
                            <StepLabel>Даты</StepLabel>
                            <Typography
                                sx={{
                                    mb: '20px'
                                }}>
                                {String(el.date_create).substring(8, 10) +
                                    '.' +
                                    String(el.date_create).substring(5, 7)}

                                {' ' + '-' + ' '}

                                {String(el.date_end).substring(8, 10) +
                                    '.' +
                                    String(el.date_end).substring(5, 7)}
                            </Typography>
                            {props.myId === el.creator || props.myId === Number(el.responsible) ?
                                <div>
                                    <StepLabel>Изменить статус</StepLabel>
                                    <Select
                                        sx={{
                                            width: '161px',
                                            mb: '20px'
                                        }}
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}>
                                        <MenuItem value='К выполнению'>
                                            К выполнению
                                        </MenuItem>
                                        <MenuItem value='Выполняется'>
                                            Выполняется
                                        </MenuItem>
                                        <MenuItem value='Выполнено'>
                                            Выполнено
                                        </MenuItem>
                                        <MenuItem value='Отменено'>
                                            Отменено
                                        </MenuItem>
                                    </Select>
                                </div> : null}
                            <StepLabel>Ответственный</StepLabel>
                            <Typography sx={{
                                mb: '20px'
                            }}>
                                {el.s_name} {el.name} {el.patronymic} ({el.responsible})
                            </Typography>
                        </div>
                    </div>
                    {props.myId === el.creator || props.myId === Number(el.responsible) ?
                        <div className="task__modal-btn">
                            <Button variant='outlined' onClick={handleSaveChanges}>Сохранить</Button>
                        </div> : null}
                </div>
            </div>
        </>
    )
}

export default TaskModal;