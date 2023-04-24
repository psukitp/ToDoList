import { Button, Typography } from "@mui/material";
import ProjectCard from "./project-card/ProjectCard";
import './projects.scss'
import TaskCard from "./task-card/TaskCard";
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import { projectApi } from "../../api/projectApi";
import { NavLink, useNavigate } from "react-router-dom";

const Projects = observer(() => {
    const navigate = useNavigate()
    const { userStore } = useStore()
    const [projects, setProjects] = useState<any[]>([])
    const [tasks, setTasks] = useState<any[]>([])
    const user_id = userStore.user_id;

    useEffect(() => {
        projectApi.getMyProjects(user_id)
            .then(response => response.data)
            .then(data => {
                setProjects(data)
            })
        projectApi.getMyTasks(user_id)
            .then(response => response.data)
            .then(data => {
                setTasks(data)
            })
    }, [])

    useEffect(() => {
        if (userStore.user_id < 0) {
            navigate('/auth')
        }
    }, [userStore.user_id])


    return (
        <>
            <div className="projects">
                <div className="projects-btns">
                    <Button
                        variant="outlined"
                        sx={{
                            mr: '10px'
                        }}
                        onClick={() => navigate('/create-project')}>
                        Создать проект
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/add-employee')}>
                        Добавить сотрудника
                    </Button>
                </div>
                <div className="projects-inner">
                    <div className="projects-my">
                        <Typography
                            sx={{
                                mb: '10px'
                            }}>
                            Мои Проекты
                        </Typography>
                        {projects?.map(el => (
                            <NavLink to={'/project/' + String(el.project_id)} style={{textDecoration: 'none', color: 'black'}}>
                                <ProjectCard
                                    name={String(el.title)} />
                            </NavLink>
                        ))}
                    </div>
                    <div className="poject-tasks">
                        <Typography
                            sx={{
                                mb: '10px'
                            }}>
                            Мои задачи
                        </Typography>
                        {tasks.map(el => (
                            <NavLink to={'/project/' + String(el.project_id)} style={{textDecoration: 'none', color: 'black'}}>
                                <TaskCard
                                    title={el.title}
                                    name={el.name}
                                    s_name={el.s_name} />
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
})

export default Projects;