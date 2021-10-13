import { createStore } from "vuex";
import { auth } from "./authModule";
import { arrivage } from "./arrivageModule";
import { users } from "./usersModule";

const store = createStore({
  modules: {
    auth,
    arrivage,
    users,
  },
});

export default store;