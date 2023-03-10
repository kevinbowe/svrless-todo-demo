<template>
    <v-layout>
        <v-main>
            <slot></slot>
        </v-main>
    </v-layout>
</template>


<script lang="ts">
	import { defineComponent } from "vue";
	export default defineComponent({ name: "DefaultLayout", });
</script>


<script lang="ts" setup> </script>