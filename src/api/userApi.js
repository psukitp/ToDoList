import $api from "./instance";

const registration = async (req) => {
    var raw = {
        name: req.name,
        s_name: req.s_name,
        patronymic: req.patronymic,
        login: req.login,
        password: req.password
    };
    return $api.post('/registration', raw)
}
const login = async (req) => {
    var raw = {
        login: req.login,
        password: req.password
    };
    return $api.post('/login', raw)
}

const logout = async () => {
    localStorage.clear()
    return $api.get('/logout')
}


const checkAuth = async () => {
    return $api.post('/refresh')
}

const usersWithoutManager = async () => {
    return $api.get('/users-no-manager')
}

const getMyEmployeers = async (id) => {
    var raw = {
        manager: id
    }
    return $api.post('/get-my-employeers', raw)
}

export const userApi = { registration, login, logout, checkAuth, usersWithoutManager, getMyEmployeers }