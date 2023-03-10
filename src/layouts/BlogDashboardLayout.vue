<template>
    <v-layout>
        <v-app-bar color="grey-lighten-2">
					<h1 class="text-primary">App Bar</h1>
				</v-app-bar>


        <v-navigation-drawer color="grey-darken-2" permanent location="right">
					<h1 class="text-white">Nav Drawer</h1>
				</v-navigation-drawer>
        
				
				<v-main>
            <slot></slot>
        </v-main>
    </v-layout>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
    name: "BlogDashboardLayout",
});
</script>