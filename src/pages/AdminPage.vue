<template>
    <div>
        <header-item></header-item>
        <div class="admin">
            <admin-panel></admin-panel>
        </div>
    </div>
</template>

<script>
import AdminPanel from "@/components/UI/AdminPanel"
export default {
    components: {
        AdminPanel
    },
    data() {
        return {

        }
    },
    methods: {
        toCreate() {
            this.$router.push("/admin/create")
        },
        toRegister() {
            this.$router.push("/admin/register")
        },
    }
}
</script>

<style scoped>
.admin {
    display: flex;
    flex-direction: row;
}


</style>