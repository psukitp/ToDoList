import { createContext, useContext } from "react";
import userStore from "./user";
import projectsStore from "./projects";

const store = {
    userStore: userStore()
};

export const StoreContext = createContext(store);

export const useStore = () => {
    return useContext(StoreContext);
};

export default store;