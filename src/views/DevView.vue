<template>
  <v-container class="text-center">
    <h1 class="text-primary">Dev Page Content</h1>
		<v-btn class="pa-3" to="/">Go To Home</v-btn>

		<ThemeChangerMenu></ThemeChangerMenu>
		<!-- <SandBox></SandBox> -->
		
  </v-container>
</template>

<script lang="ts">
</script>

<script lang="ts" setup>
import SandBox from '../components/SandBox.vue';
import ThemeChangerMenu from '../components/ThemeChangerMenu.vue';
</script>


<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'DevView',
  components: {
    SandBox,
		ThemeChangerMenu
  },
});

</script>