import $api from "./instance";

const getMyProjects = async (id) => {
    return $api.get(`/my-projects/${id}`)
}

const getMyTasks = async (id) => {
    return $api.get(`/my-tasks/${id}`)
}

const getOneProjects = async (id) => {
    return $api.get(`/project/${id}`)
}

const createNew = async (title, creator) => {
    const raw = {
        title,
        creator
    }
    return $api.post(`/create-project`, raw)
}

const createConnection = (manager_id, employee_id) => {
    const raw = {
        user_id: manager_id,
        employee_id
    }
    return $api.post(`/create-manager-employee-connection`, raw)
}

const createTask = (form, date_create, date_end, project_id) => {
    const raw = {
        title: form.title,
        text: form.descr,
        date_create,
        date_end,
        priority: form.priority,
        responsible: form.responsible,
        project_id
    }
    return $api.post(`/create-task`, raw)
}

const updateTaskStatus = (task_id, status, day_update) => {
    const raw = {
        task_id,
        status,
        day_update
    }

    return $api.post('/update-task', raw)
}



export const projectApi = { getMyProjects, getMyTasks, getOneProjects, createNew, createConnection, createTask, updateTaskStatus }