<template>
	<v-app>
		<div class="text-center">
 			<v-menu v-model="menu" :close-on-content-click="false" location="end" >
				<template v-slot:activator="{ props }" >
					<v-btn color="indigo" v-bind="props" >
						<v-icon size="30" color="primary" >mdi-palette</v-icon 	> <!-- DONE -->
					</v-btn>
    		</template>
        <v-card min-width="300">
          <v-list>
            <v-list-item
							prepend-avatar="./src/assets/Beard_DaBowe.svg"
              title="Da Bowe"
              subtitle="Mr Bowe if you nasty"
            >
              <template v-slot:append>
                <v-btn
                  variant="text"
                  :class="fav ? 'text-red' : ''"
                  icon="mdi-heart"
                  @click="fav = !fav"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
						<v-list-item>
              <v-switch @change="toggleDarkMode" :label="`toggle ${switchLabel} mode`" />
							<!-- <v-switch XX:value="darkMode" @change="toggleDarkMode" :label="`toggle ${switchLabel} mode`" /> -->
            </v-list-item>
					 <v-divider />
          </v-list>
  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn
              variant="text"
              @click="menu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              variant="text"
              @click="menu = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
	</div>
</v-app>
</template>

<script lang="ts" setup>
	import {ref} from 'vue' 
	import { useTheme } from 'vuetify';
	import { computed } from "vue";
	
	const fav = ref(true);
	const menu = ref(false);
	const theme = useTheme();

 	function toggleDarkMode () {
		theme.global.name.value = theme.current.value.dark ? 'light' : 'dark';
	};

	const switchLabel = computed( () => {
		return theme.current.value.dark ? 'Light' : 'Dark'
	});

</script>
