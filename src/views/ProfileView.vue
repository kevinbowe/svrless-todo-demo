<template>
	<v-app>
		<MasterLayout>
			<v-container class="text-center">
				<h1 class="text-primary">Profile Page Content.</h1>
				<v-row>
					<v-spacer></v-spacer>
					<v-col cols="4">
						<v-divider :thickness="20" class="ma-2"></v-divider>

						<v-row>
							<v-col cols="4" style="text-align:end;">
								<div>attribute.email</div>
								<div>attribute.nickname</div>
							</v-col>

							<v-col cols="6" style="text-align:start;">
								<div>{{ `{ user.attributes.email }` }}</div>
								<div>{{ `{ user.attributes.nickname }` }}</div>
							</v-col>
						</v-row>

						<v-divider :thickness="20" class="ma-2"></v-divider>

						<v-row>
							<v-col cols="4" style="text-align:end;">
								<div>emailModel</div>
								<div>nicknameModel</div>
							</v-col>

							<v-col cols="6" style="text-align:start;">
								<div>{{ `{ emailModel }` }}</div>
								<div>{{ `{ nicknameModel }` }}</div>
							</v-col>
						</v-row>

						<v-divider :thickness="20" class="ma-2"></v-divider>

						<h1>Hello {{ `{ nicknameModel }` }} !</h1>

					</v-col>
					<v-spacer></v-spacer>
				</v-row>
			</v-container>
		</MasterLayout>
	</v-app>
</template>

<script lang="ts" setup>
import MasterLayout from "../layouts/MasterLayout.vue";
</script>