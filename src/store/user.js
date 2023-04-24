import { makeAutoObservable } from "mobx";

const userStore = () => {
    return makeAutoObservable({
        user_id: -1,
        name: '',
        s_name: '',
        patronymic: '',
        login: '',
        manager: null,
        setNewValues({ user_id, name, s_name, patronymic, login, manager }) {
            this.user_id = user_id
            this.name = name
            this.s_name = s_name
            this.patronymic = patronymic
            this.login = login
            this.manager = manager
        },
        setLoggedIn(accessToken) {
            localStorage.setItem('token', accessToken)
        }
    })
}

export default userStore;