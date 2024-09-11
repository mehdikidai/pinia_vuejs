<template>
    <div class="dataUser">
        <span>{{ email }}</span>
        <span>{{ userName }}</span>
    </div>
    <div class="container">
        <h1>login</h1>
        <form class="content__form" @submit.prevent="submit">
            <div class="content__inputs">
                <label>
                    <input
                        type="text"
                        placeholder="Email"
                        v-model="data.email"
                    />
                </label>
                <label>
                    <input
                        type="password"
                        placeholder="Password"
                        v-model="data.password"
                    />
                </label>
            </div>
            <button>Log In</button>
        </form>
    </div>
</template>

<script setup>
import { reactive, onMounted ,ref} from "vue";
import { z } from "zod";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";

import { UseAxios } from "@/api";

const storeUser = useUserStore();

const { email, userName } = storeToRefs(storeUser);

const dataApi = ref([])

onMounted(async () => {

    const res = await UseAxios.get("/users");

    if (res.status === 200) {
        //console.log(res.data);
        dataApi.value = res.data
    }

});

const userSchema = z.object({
    email: z.string().email({ message: "error email" }),
    password: z
        .string()
        .min(8, { message: "passsword 9al mn 8" })
        .max(20, { message: "passsword kter mn 20" }),
});

const data = reactive({
    email: "",
    password: "",
});

const submit = () => {
    const result = userSchema.safeParse(data);

    if (result.success) {
        storeUser.setUser(data.email);
        toast("Hello! Wow so easy!", {
            theme: "dark",
            position: toast.POSITION.TOP_RIGHT,
            type: "success",
            autoClose: 3000,
            hideProgressBar: true,
        });
    } else {
        toast.error("Error Notification !", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "dark",
            autoClose: 3000,
            hideProgressBar: true,
        });
        result.error.issues.forEach((e) => {
            console.log(e.message);
        });
    }
};
</script>

<style lang="scss" scoped>
.dataUser {
    position: absolute;
    top: 40px;
    left: 40px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    span {
        color: #fff;
        font-size: 16px;
    }
}
.container {
    width: 90vw;
    max-width: 340px;
    height: auto;
    //background: red;
    padding: 40px 20px 60px;
    position: relative;
    top: -40px;
    h1 {
        margin-bottom: 30px;
        font-size: 30px;
        text-transform: uppercase;
        color: #fff;
    }
    .content__inputs {
        //background: blue;
        display: flex;
        flex-direction: column;
        gap: 10px;
        label {
            input {
                width: 100%;
                height: 36px;
                background: transparent;
                border: 1px solid var(--border-color);
                padding-inline: 10px;
                color: var(--black);
            }
        }
    }
    button {
        background: var(--main);
        display: block;
        width: 100%;
        border: none;
        height: 34px;
        margin-top: 20px;
        color: #fff;
        font-size: 14px;
        text-transform: capitalize;
        cursor: pointer;
    }
}
</style>
