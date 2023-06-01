<template>
	<v-app>
		<MasterLayout>
			<v-container class="text-center">
				<h1 class="text-primary">Profile Page Content.</h1>
				<v-row>
					<v-spacer></v-spacer>
					<v-col cols="6">
						<v-divider :thickness="20" class="ma-2"></v-divider>

						<h1>Passed Properties</h1>
						<v-row>
							<v-col cols="6" style="text-align:end;">
								<h2>nicknameModel</h2>
								<h2>emailModel</h2>
								<h2>phone_numberModel</h2>
							</v-col>

							<v-divider vertical :thickness="6" class="my-2" />
							
							<v-col cols="4" style="text-align:start;">
								<h2>{{ nicknameModel }}</h2>
								<h2>{{ emailModel }}</h2>
								<h2>{{ phone_numberModel }}</h2>

							</v-col>
						</v-row>

						<v-divider :thickness="20" class="ma-2"></v-divider>

						<h1>Hello {{ nicknameModel }} !</h1>

					</v-col>
					<v-spacer></v-spacer>
				</v-row>
			</v-container>
		</MasterLayout>
	</v-app>
</template>

<script lang="ts" setup>
start("Enter ProfileView.vue <script setup>")
import MasterLayout from "../layouts/MasterLayout.vue";
/*  */
import {
	info, infor, infog, infob, infoy, infoo, infop, infom,
	info1, info2, info3, info4, info5, info6, info7,
	log, warn, err, progress, joy, enter, exit,
	success, bar, whitebar, fini, start, pass, fail
}
	from "../my-util-code/MyConsoleUtil"
	import { toRefs, ref, Ref, computed } from 'vue'

const props = defineProps({
	p1: { type: String },
	p2: { type: String },
	p3: { type: String }
})

const nicknameModel = ref(props.p1)
const emailModel = ref(props.p2)
const phone_numberModel = ref(props.p3)

//				Fetch the user attributes if one or more of the 
//					Parmas/Props/Models are not hydrated.
let match:any = Object.values(props).find(e => e.length === 0)
if (match === undefined) {
	//				If we get here, fetch the users attributes from Cognito

}


// //				Report the Params/Properties
// info(`props.p1 (nickname) == [ ${props.p1} ]`)
// info2(`props.p2 (email) == [ ${props.p2} ]`)
// info1(`props.p3 (phone_number) == [ ${props.p3} ]`)
// //				Report the Models
// info3(`nicknameModel.value == [ ${nicknameModel.value} ]`/* , nicknameModel */)
// info5(`emailModel.value == [ ${emailModel.value} ]`/* , emailModel */)
// info4(`phone_numberModel.value == [ ${phone_numberModel.value} ]`/* , phone_numberModel */)

// //				Check the Params/Props
// if (props.p1) info("p1 (nicknameModel exist)")
// 	else info("p1 (nicknameModel does NOT exist)")
// if (props.p2) info("p2 (emailModel exist)")
// 	else info("p2 (emailModel does NOT exist)")
// if (props.p3) info("p3 (phone_numberModel exist)")
// 	else info("p3 (phone_numberModel does NOT exist)")

fini("Exit ProfileView.vue <script setup>")
</script>