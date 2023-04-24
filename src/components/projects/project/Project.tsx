import { Button, Input, Typography } from "@mui/material";
import TaskSmall from "../../Task/TaskSmall";
import './project.scss'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { projectApi } from "../../../api/projectApi";
import { useStore } from "../../../store/store";
import TaskModal from "../../Task/TaskModal/TaskModal";
import SearchIcon from '@mui/icons-material/Search';

const Project = () => {
    const [modalActive, setModalActive] = useState(false);
    const [taskInfo, setTaskInfo] = useState({});
    const [applyChanges, setApplyChanges] = useState(false)
    const { userStore } = useStore()
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<any[]>([{}])
    const [showFind, setShowFind] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const project_id = useParams().id
    const [stableTasks, setStableTasks] = useState<any[]>([{}]);
    const [filterByDate, setFilterByDate] = useState(false);

    useEffect(() => {
        projectApi.getOneProjects(project_id)
            .then(response => response.data)
            .then(data => {
                setTasks(data)
                setStableTasks(data)
            })
    }, [])

    useEffect(() => {
        if (userStore.user_id < 0) {
            navigate('/auth')
        }
    }, [userStore.user_id])

    useEffect(() => {
        if (applyChanges) {
            projectApi.getOneProjects(project_id)
                .then(response => response.data)
                .then(data => {
                    setTasks(data)
                    setStableTasks(data)
                })
            setApplyChanges(false)
        }
    }, [applyChanges])

    const filterByEmployee = () => {
        const newArray = stableTasks.filter(el => (el.name + ' ' + el.s_name + ' ' + el.patronymic).includes(searchValue));
        if (newArray.length > 0) {
            setTasks(newArray);
        }
    }

    return (
        <>
            <div className="project">
                <div className="project__create-task">
                    {tasks[0]?.creator === userStore.user_id ?
                        <Button
                            sx={{
                                mb: '10px',
                                mr: '20px'
                            }}
                            variant="outlined"
                            onClick={() => navigate(`/create-task/${tasks[0].project_id}`)
                            }>
                            Создать задачу
                        </Button>
                        : null}
                    <Button
                        sx={{
                            mb: '10px',
                            mr: '20px'
                        }}
                        variant="outlined"
                        onClick={() => setFilterByDate(!filterByDate)}>
                        Фильтр по дате
                    </Button>
                    {tasks[0]?.creator === userStore.user_id ?
                        <Button
                            sx={{
                                mb: '10px',
                                mr: '20px'
                            }}
                            variant="outlined"
                            onClick={() => setShowFind(!showFind)}>
                            Фильтр по ответственному
                        </Button> : null}
                    {showFind ?
                        <div className="search__area">
                            <Input
                                sx={{ mr: '10px' }}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <div onClick={filterByEmployee}>
                                <SearchIcon sx={{
                                    cursor: "pointer",
                                    ":hover": {
                                        opacity: '.8'
                                    }
                                }}
                                />
                            </div>
                        </div> : null}
                </div>
                <div className="tasks">
                    <div className="tasks__need">
                        <Typography>
                            К выполнению
                        </Typography>
                        {filterByDate ?
                            (tasks.sort(
                                (a: { date_end: any }, b: { date_end: any }) => new Date(a.date_end).getTime() - new Date(b.date_end).getTime()))
                                .map(el => el.status === "К выполнению" ?
                                    <div onClick={() => {
                                        setModalActive(true)
                                        setTaskInfo(el);
                                    }}>
                                        <TaskSmall
                                            task_title={el.task_title}
                                            text={el.text}
                                            date_create={el.date_create}
                                            date_end={el.date_end}
                                            date_update={el.date_update}
                                            priority={el.priority}
                                            status={el.status}
                                            responsible={el.responsible}
                                            responsible_info={{ name: el.name, s_name: el.s_name, patronymic: el.patronymic }}
                                        />
                                    </div> :
                                    null) :
                            tasks.map(el => el.status === "К выполнению" ?
                                <div onClick={() => {
                                    setModalActive(true)
                                    setTaskInfo(el);
                                }}>
                                    <TaskSmall
                                        task_title={el.task_title}
                                        text={el.text}
                                        date_create={el.date_create}
                                        date_end={el.date_end}
                                        date_update={el.date_update}
                                        priority={el.priority}
                                        status={el.status}
                                        responsible={el.responsible}
                                        responsible_info={{ name: el.name, s_name: el.s_name, patronymic: el.patronymic }}
                                    />
                                </div> : null)}
                    </div>
                    <div className="tasks__inprogress">
                        <Typography>
                            Выполняется
                        </Typography>
                        {filterByDate ?
                            (tasks.sort(
                                (a: { date_end: any }, b: { date_end: any }) => new Date(a.date_end).getTime() - new Date(b.date_end).getTime()))
                                .map(el => el.status === "Выполняется" ?
                                    <div onClick={() => {
                                        setModalActive(true)
                                        setTaskInfo(el);
                                    }}>
                                        <TaskSmall
                                            task_title={el.task_title}
                                            text={el.text}
                                            date_create={el.date_create}
                                            date_end={el.date_end}
                                            date_update={el.date_update}
                                            priority={el.priority}
                                            status={el.status}
                                            responsible={el.responsible}
                                            responsible_info={{ name: el.name, s_name: el.s_name, patronymic: el.patronymic }}
                                        />
                                    </div> :
                                    null) :
                            tasks.map(el => el.status === "Выполняется" ?
                                <div onClick={() => {
                                    setModalActive(true)
                                    setTaskInfo(el);
                                }}>
                                    <TaskSmall
                                        task_title={el.task_title}
                                        text={el.text}
                                        date_create={el.date_create}
                                        date_end={el.date_end}
                                        date_update={el.date_update}
                                        priority={el.priority}
                                        status={el.status}
                                        responsible={el.responsible}
                                        responsible_info={{ name: el.name, s_name: el.s_name, patronymic: el.patronymic }}
                                    />
                                </div> : null)}
                    </div>
                    <div className="tasks__done">
                        <Typography>
                            Выполнено
                        </Typography>
                        {filterByDate ?
                            (tasks.sort(
                                (a: { date_end: any }, b: { date_end: any }) => new Date(a.date_end).getTime() - new Date(b.date_end).getTime()))
                                .map(el => el.status === "Выполнено" ?
                                    <div onClick={() => {
                                        setModalActive(true)
                                        setTaskInfo(el);
                                    }}>
                                        <TaskSmall
                                            task_title={el.task_title}
                                            text={el.text}
                                            date_create={el.date_create}
                                            date_end={el.date_end}
                                            date_update={el.date_update}
                                            priority={el.priority}
                                            status={el.status}
                                            responsible={el.responsible}
                                            responsible_info={{ name: el.name, s_name: el.s_name, patronymic: el.patronymic }}
                                        />
                                    </div> :
                                    null) :
                            tasks.map(el => el.status === "Выполнено" ?
                                <div onClick={() => {
                                    setModalActive(true)
                                    setTaskInfo(el);
                                }}>
                                    <TaskSmall
                                        task_title={el.task_title}
                                        text={el.text}
                                        date_create={el.date_create}
                                        date_end={el.date_end}
                                        date_update={el.date_update}
                                        priority={el.priority}
                                        status={el.status}
                                        responsible={el.responsible}
                                        responsible_info={{ name: el.name, s_name: el.s_name, patronymic: el.patronymic }}
                                    />
                                </div> : null)}
                    </div>
                    <div className="tasks__cancelled">
                        <Typography>
                            Отменено
                        </Typography>
                        {filterByDate ?
                            (tasks.sort(
                                (a: { date_end: any }, b: { date_end: any }) => new Date(a.date_end).getTime() - new Date(b.date_end).getTime()))
                                .map(el => el.status === "Отменено" ?
                                    <div onClick={() => {
                                        setModalActive(true)
                                        setTaskInfo(el);
                                    }}>
                                        <TaskSmall
                                            task_title={el.task_title}
                                            text={el.text}
                                            date_create={el.date_create}
                                            date_end={el.date_end}
                                            date_update={el.date_update}
                                            priority={el.priority}
                                            status={el.status}
                                            responsible={el.responsible}
                                            responsible_info={{ name: el.name, s_name: el.s_name, patronymic: el.patronymic }}
                                        />
                                    </div> :
                                    null) :
                            tasks.map(el => el.status === "Отменено" ?
                                <div onClick={() => {
                                    setModalActive(true)
                                    setTaskInfo(el);
                                }}>
                                    <TaskSmall
                                        task_title={el.task_title}
                                        text={el.text}
                                        date_create={el.date_create}
                                        date_end={el.date_end}
                                        date_update={el.date_update}
                                        priority={el.priority}
                                        status={el.status}
                                        responsible={el.responsible}
                                        responsible_info={{ name: el.name, s_name: el.s_name, patronymic: el.patronymic }}
                                    />
                                </div> : null)}
                    </div>
                </div>
            </div >
            {
                modalActive ?
                    <TaskModal
                        active={modalActive}
                        setActive={setModalActive}
                        taskInfo={taskInfo}
                        myId={userStore.user_id
                        }
                        setApplyChanges={setApplyChanges} />
                    : null}
        </>
    )
}

export default Project;