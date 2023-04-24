import { Button, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { userApi } from "../../../api/userApi";
import { useStore } from "../../../store/store";
import { projectApi } from "../../../api/projectApi";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
    const { userStore } = useStore()
    const navigate = useNavigate()
    const [employee, setEmployee] = useState('')
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        userApi.usersWithoutManager()
            .then(response => response.data)
            .then(data => setItems(data))
    }, [])

    useEffect(() => {
        if (userStore.user_id < 0) {
            navigate('/auth')
        }
    }, [userStore.user_id])

    const handleAddEmployee = () => {
        if (employee !== '') {
            projectApi.createConnection(userStore.user_id, employee)
            navigate('/projects')
        }
    }
    return (
        <>
            <div className="add-employee">
                <Typography
                    fontSize='42px'
                    sx={{
                        mb: '35px'
                    }}>
                    Добавить себе в команду сотрудника
                </Typography>
                <InputLabel>Сотрудник</InputLabel>
                <Select fullWidth
                    value={employee}
                    onChange={(e) => setEmployee(e.target.value)}>
                    {items.map(el => <MenuItem value={el.user_id}>
                        {el.name} {el.s_name} ({el.login}) {el.user_id}
                    </MenuItem>)}
                </Select>
                <Button
                    variant="outlined"
                    sx={{
                        display: 'block',
                        mr: 'auto',
                        ml: 'auto',
                        mt: '30px'
                    }}
                    onClick={handleAddEmployee}>
                    Добавить
                </Button>
            </div>
        </>
    )
}

export default AddEmployee