import { makeAutoObservable } from "mobx";

const projectsStore = () => {
    return makeAutoObservable({
        projects: [{}],
        setNewValues({ projects }) {
            this.projects = projects
        }
    })
}

export default projectsStore;