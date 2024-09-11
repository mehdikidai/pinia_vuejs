import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {

    const email = ref("default@gmail.com");

    const userName = computed(() => email.value.split("@")[0]);

    const showBtnRest = computed(() => email.value.split("@")[0] != "default" )

    const resetUser = () => {

        email.value = "default@gmail.com";

    }

    const setUser = (e) => {

        email.value = e;

    };

    return { email, resetUser, userName , setUser , showBtnRest };
});
