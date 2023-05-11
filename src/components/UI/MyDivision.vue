<template>
    <ul>
        <li v-for="division in divisions">
            {{ division.name }}
            <ul v-if="division?.nodes">

            </ul>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'my-division',
    data() {
        return {
            arr: [
                '1', '2', '3'
            ],
            divisions: [
                {
                    id: 0,
                    name: "Ректор",
                    selected: false,
                    nodes: [
                        {
                            id: 2,
                            name: "Первый проектор",
                            selected: false
                        }
                    ],
                },
                {
                    id: 1,
                    name: "Второй ректор",
                    selected: false
                }
            ]
        }
    }
}
</script>
<style scoped></style>