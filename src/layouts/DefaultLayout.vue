<template>
    <v-layout>
        <v-main>
            <slot></slot>
        </v-main>
    </v-layout>
</template>


<script lang="ts">
// Path: src\layouts\TheDefaultLayout.vue

import { defineComponent } from "vue";

export default defineComponent({
    name: "DefaultLayout",
});
</script>
