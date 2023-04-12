<template>
<!-- 	
<v-select
	label="Select"
	:items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
></v-select>

  <v-select
    v-model="select"
    :hint="`${select.state}, ${select.abbr}`"
    :items="items"
    item-title="state"
    item-value="abbr"
    label="Select"
    persistent-hint
    return-object
    single-line
  ></v-select>

  <div class="py-4">
    <v-img
      class="mx-auto mb-10"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >

      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a>
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-card
        class="mb-12"
        color="surface-variant"
        variant="tonal"
      >
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
        </v-card-text>
      </v-card>

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
      >
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>

  <v-select
    v-model="favorites"
    :items="states"
    label="Select"
    multiple
    hint="Pick your favorite states"
    persistent-hint
  ></v-select>

  <v-select
    v-model="value"
    :items="itemsX"
    chips
    label="Chips"
    multiple
  ></v-select> -->

  <!-- <v-container fluid>
    <v-select
      v-model="selectedFruits"
      :items="fruits"
      label="Favorite Fruits"
      multiple
    >
      <template v-slot:prepend-item>
        <v-list-item
          title="Select All"
          @click="toggle"
        >
          <template v-slot:prepend>
            <v-checkbox-btn
              :color="likesSomeFruit ? 'indigo-darken-4' : undefined"
              :indeterminate="likesSomeFruit && !likesAllFruit"
              :model-value="likesSomeFruit"
            ></v-checkbox-btn>
          </template>
        </v-list-item>

        <v-divider class="mt-2"></v-divider>
      </template>

      <template v-slot:append-item>
        <v-divider class="mb-2"></v-divider>

        <v-list-item
          :subtitle="subtitle"
          :title="title"
          disabled
        >
          <template v-slot:prepend>
            <v-avatar icon="mdi-food-apple" color="primary">
              mdi-food-apple
            </v-avatar>
          </template>
        </v-list-item>
      </template>
    </v-select>
  </v-container> -->


	<!-- <p>Selector Label == {{ selectorLabel }}</p> -->
	<!-- <p>Selector Model == {{ selectorModel }}</p> -->
	<!-- <p>selector Items == {{ selectorItems }} </p> -->
	<!-- <p>selector Model (selModel) == {{ selModel }} </p> -->
	
	<!-- 
		[plugin:vite:vue] v-model cannot be used on a prop, 
			because local prop bindings are not writable.
				Use a v-bind binding 
					combined with a v-on listener 
						that emits update:x event instead. 
	-->

localModel --- {{ selectModel }}<br>
<!-- props.selectorItems --- {{ props.selectorItems }}<br>
props.selectorLabel --- {{ props.selectorLabel }}<br>
switchFlagX --- {{ switchFlagX }}<br> -->
defaultItem --- {{ defaultItem }}

<v-select  v-model="selectModel" :items="props.selectorItems" :label="selectorLabel">	

																				<!-- <template #item="{ item, props: {onClick, title, value} }" >
																					<v-list-item :title="item.title"  @click="onClick"/>
																				</template> -->

		<template v-slot:item="{ item, props: {onClick, title, value} }" >
			<v-list-item :title="item.title"  @click="onClick(); clickIt()">
			</v-list-item>
		</template>
		
</v-select>

</template>


<script setup lang="ts">
import { ref, computed } from "vue";
const emit = defineEmits(['clickSelectorEvent'])
const props = defineProps({
	defaultItem: String,
	selectorLabel: String,
	selectorItems: Array<string|undefined>,
	switchFlagX: Boolean
})

// const selectModel = ref("light")
const selectModel = ref(props.defaultItem)


function clickIt(){
																				// emit('clickSelectorEvent', selectModel.value, props.switchFlagX)
	emit('clickSelectorEvent', selectModel.value, props.switchFlagX)

}

// const selModel = ref();
// selModel.value = props.selectorModel;
// let localItemsX = props.selectorItems
// const themeVals = Object.keys(theme.computedThemes.value);
// Set the default Models and Theme
// let leftModel:string = "light"
// let rightModel:string = "dark"
//theme.global.name.value = "light";


// const select = ref({ state: 'Florida', abbr: 'FL' })
// const items = [
//           { state: 'Florida', abbr: 'FL' },
//           { state: 'Georgia', abbr: 'GA' },
//           { state: 'Nebraska', abbr: 'NE' },
//           { state: 'California', abbr: 'CA' },
//           { state: 'New York', abbr: 'NY' },
//         ]
// const visible = ref(false)
// const favorites = ref([])
// const states = [
//           'Alabama', 'Alaska', 'American Samoa', 'Arizona',
//           'Arkansas', 'California', 'Colorado', 'Connecticut',
//           'Delaware', 'District of Columbia', 'Federated States of Micronesia',
//           'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
//           'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
//           'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
//           'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
//           'Missouri', 'Montana', 'Nebraska', 'Nevada',
//           'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
//           'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
//           'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
//           'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
//           'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
//           'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
//         ]
// const itemsX = ref(['foo', 'bar', 'fizz', 'buzz'])
// const value = ref(['foo', 'bar', 'fizz', 'buzz'])
// const fruits = ref([
//         'Apples',
//         'Apricots',
//         'Avocado',
//         'Bananas',
//         'Blueberries',
//         'Blackberries',
//         'Boysenberries',
//         'Bread fruit',
//       ])
// const selectedFruits = ref([])
// const likesAllFruit = computed(() => {
//         return selectedFruits.value.length === fruits.value.length})
// const likesSomeFruit = computed(() => {
//         return selectedFruits.value.length > 0
// })
// const title = computed(() => {
//          if (likesAllFruit) return 'Holy smokes, someone call the fruit police!'
//          if (likesSomeFruit) return 'Fruit Count'
//          return 'How could you not like fruit?'
// })
// const subtitle = computed(() => {
//         if (likesAllFruit) return undefined
//         if (likesSomeFruit) return selectedFruits.value.length
//         return 'Go ahead, make a selection above!'
// })
// function toggle () {
// 	if (likesAllFruit.value) {
// 		console.log(likesAllFruit.value, " <<--- IF -- likesAllFruit.value")
// 		console.log("hates fruit")
// 		selectedFruits.value = []
// 	} else {
// 	// Select all fruit
// 		console.log(likesAllFruit.value, " <<--- ELSE -- likesAllFruit.value")
// 		console.log("likes fruit")
// 		//  selectedFruits.value = fruits.value.slice()
// 		Object.assign(selectedFruits.value, fruits.value.slice())
// 	}
//	}
</script>