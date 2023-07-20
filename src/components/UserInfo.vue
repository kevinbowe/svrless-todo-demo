<template>
	<!-- User Info -->
	<v-row justify="center" v-if="isSession">
		<v-col :lg="4" :md="6" :sm="8" :xs="12" class="ma-auto" >
			<v-divider :thickness="10" class="ma-2"></v-divider>
			<v-row no-gutters>
				<v-col style="background-color: rgb(var(--v-theme-surface)); color: rgb(var(--v-theme-border_alt));">
					<p>Nick Name:</p></v-col>
				<v-col>
					<p>{{ nickname }}</p></v-col>
			</v-row>
			<v-divider :thickness="3" />
			<v-row no-gutters style="background-color:rgb(var(--v-theme-surface)); color: rgb(var(--v-theme-border_alt));">
				<p class="ma-auto">Email:</p></v-row>
			<v-row no-gutters><p class="ma-auto">{{ email }}</p></v-row>
			<v-divider :thickness="3" />
			<v-row no-gutters style="background-color: rgb(var(--v-theme-surface)); color: rgb(var(--v-theme-border_alt));">
				<p class="ma-auto">Phone Number:</p></v-row>
			<v-row no-gutters ><p class="ma-auto">{{ phone_number }}</p></v-row>
			<v-divider :thickness="3" />
			<v-row no-gutters style="background-color: rgb(var(--v-theme-surface)); color: rgb(var(--v-theme-border_alt));">
				<p class="ma-auto">User Name:</p></v-row>
				<v-row no-gutters ><p class="ma-auto">{{ username }}</p></v-row>
			<v-divider :thickness="10"></v-divider>
		</v-col>
	</v-row>
</template>


<script setup lang="ts">
/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
defineProps({
	isSession: Boolean,
	nickname: String,
	email: String,
	phone_number:String,
	username: String
})

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
</script>

