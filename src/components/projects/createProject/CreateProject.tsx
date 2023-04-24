import { Button, Input, Typography, InputLabel } from "@mui/material"
import { useEffect, useState } from "react"
import { useStore } from "../../../store/store"
import { useNavigate } from "react-router-dom"
import { projectApi } from "../../../api/projectApi"

const CreateProject = () => {
    const { userStore } = useStore()
    const navigate = useNavigate()
    const [projectName, setProjectName] = useState('')

    useEffect(() => {
        if (userStore.user_id < 0) {
            navigate('/auth')
        }
    }, [userStore.user_id])

    const handleCreateProject = async () => {
        if (projectName.length > 2) {
            await projectApi.createNew(projectName, userStore.user_id)
            navigate('/projects')
        }
    }
    return (
        <>
            <div className="create__project">
                <Typography
                    fontSize='42px'
                    sx={{
                        mb: '35px'
                    }}>
                    Создать проект
                </Typography>
                <InputLabel>Название</InputLabel>
                <Input sx={{
                    display: 'block'
                }}
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)} />
                <Button
                    variant="outlined"
                    sx={{
                        display: 'block',
                        mr: 'auto',
                        ml: 'auto',
                        mt: '30px'
                    }}
                    onClick={handleCreateProject}>
                    Создать
                </Button>
            </div>
        </>
    )
}
export default CreateProject