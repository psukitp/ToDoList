import { Button, Input, InputLabel, MenuItem, Select, TextField, TextareaAutosize, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { userApi } from "../../api/userApi";
import { useStore } from "../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { projectApi } from "../../api/projectApi";

const CreateTask = () => {
    const navigate = useNavigate();
    const project_id = useParams().id
    const { userStore } = useStore()
    const [myEmployeers, setMyEmployeers] = useState<any[]>([])
    const [form, setForm] = useState({
        title: '',
        descr: '',
        priority: '',
        responsible: ''
    })
    const [dateCreate, setDateCreate] = useState('')
    const [dateEnd, setDateEnd] = useState('')

    useEffect(() => {
        userApi.getMyEmployeers(userStore.user_id)
            .then(response => response.data)
            .then(data => {
                setMyEmployeers(data)
            })
    }, [])


    const handleFormChange = (e: { target: { name: string; value: string } }) => {
        if (e.target.name === 'title') {
            setForm({ ...form, title: e.target.value })
        } else if (e.target.name === 'descr') {
            setForm({ ...form, descr: e.target.value })
        } else if (e.target.name === 'priority') {
            setForm({ ...form, priority: e.target.value })
        } else if (e.target.name === 'responsible') {
            setForm({ ...form, responsible: e.target.value })
        }
    }

    const handleDateCreateChange = (e: { target: { value: any } }) => {
        setDateCreate(e.target.value)
    }
    const handleDateEndChange = (e: { target: { value: any } }) => {
        setDateEnd(e.target.value)
    }

    const handleSubmitForm = async () => {
        await projectApi.createTask(form, dateCreate, dateEnd, project_id)
        navigate(-1);
    }

    return (
        <>
            <div className="create-task">
                <Typography
                    textAlign='center'
                    fontSize='42px'
                    sx={{
                        mb: '35px'
                    }}>
                    Создать задачу
                </Typography>
                <InputLabel>Название</InputLabel>
                <Input
                    fullWidth
                    value={form.title}
                    name='title'
                    onChange={handleFormChange} />
                <InputLabel>Описание</InputLabel>
                <TextareaAutosize
                    value={form.descr}
                    name='descr'
                    onChange={handleFormChange} />
                <InputLabel>Дата начала выполнения задачи</InputLabel>
                <input
                    type='date'
                    value={dateCreate}
                    onChange={(e: any) => handleDateCreateChange(e)} />
                <InputLabel>Дата конца выполнения задачи</InputLabel>
                <input
                    type='date'
                    value={dateEnd}
                    onChange={(e: any) => handleDateEndChange(e)} />
                <InputLabel>Приоритет</InputLabel>
                <Select
                    fullWidth
                    value={form.priority}
                    name='priority'
                    onChange={handleFormChange}>
                    <MenuItem value='Высокий'>Высокий</MenuItem>
                    <MenuItem value='Средний'>Средний</MenuItem>
                    <MenuItem value='Низкий'>Низкий</MenuItem>
                </Select>
                <InputLabel>Ответственный</InputLabel>
                <Select
                    fullWidth
                    value={form.responsible}
                    name='responsible'
                    onChange={handleFormChange}>
                    {myEmployeers.map(el => (
                        <MenuItem
                            value={el.user_id}
                            key={el.user_id}>
                            {el.name} {el.s_name} ({el.login}) {el.user_id}
                        </MenuItem>)
                    )}
                </Select>
                <Button
                    variant="outlined"
                    onClick={handleSubmitForm}
                    sx={{
                        display: 'block',
                        mr: 'auto',
                        ml: 'auto',
                        mt: '30px'
                    }}>
                    Создать задачу
                </Button>
            </div>
        </>
    )
}

export default CreateTask;