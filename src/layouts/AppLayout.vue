<template>
	<component :is="layout">
			<router-view />
	</component>
</template>

<script lang="ts" >
// path: src/layouts/TheAppLayout.vue

import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'AppLayout',
    setup() {
        const route = useRoute();
        /**
         *  This is a computed property that will return the name
         *  of the current route
         */
        const layout = computed(() => {
					
				// This returns rout.meta.layout value only
            const layout = route?.meta?.layout;

				// Only 1x layout name is generated based on the current route
            if (layout) {
							return `${layout}Layout`;
            }
            return 'div';
        });
        return {
            layout,
        };
    },
});
</script>

