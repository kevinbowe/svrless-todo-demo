<template>
  <v-container>
    <div class="my-2 text-center">
      <hr />
      <br />

      <v-btn color="info" flat small>My Button - Info</v-btn><br /><br />

      <hr />
      <br />

      <v-btn>Theme Raw</v-btn><br /><br />
      <v-btn theme="theme2 text-red-lighten-2">Theme 1 text-red-lighten-2</v-btn
      ><br /><br />
      <v-btn theme="theme1 text-red-lighten-2">Theme 2 text-red-lighten-1</v-btn
      ><br /><br />

      <v-btn theme="theme2 text-blue-lighten-2"
        >Theme 1 text-red-lighten-2</v-btn
      ><br /><br />
      <v-btn theme="theme1 text-blue-lighten-2"
        >Theme 2 text-red-lighten-1</v-btn
      ><br /><br />

      <hr />
      <br />

      <!-- &nbsp;<v-btn theme="theme2" color="bg-btn-primary text-green-darken-2">Theme 2 </v-btn> -->
      <v-btn>Color Raw</v-btn><br /><br />

      <v-btn color="primary">light: purple __ dark: rose</v-btn><br /><br />
      <v-btn color="secondary">Light: teal __ dark: teal</v-btn><br /><br />
      <v-btn color="surface">Light: off-white __ dark: dk-grey</v-btn
      ><br /><br />

      <hr />
      <br />

      <v-btn>Class Raw</v-btn><br /><br />

      <v-btn class="text-info">text-info</v-btn>;
      <v-btn class="bg-info">bg-info</v-btn>;
      <v-btn class="primary">Hello</v-btn><br /><br />

      <v-btn class="text-error bg-info">What color am I ?</v-btn><br /><br />
      <v-btn class="bg-deep-orange accent-4">What color am I ?</v-btn
      ><br /><br />
      <v-btn class="">Empty / Reference</v-btn><br /><br />

      <hr />
      <br />

      <v-btn color="primary">Theme 1 default white</v-btn><br /><br />
      <v-btn color="primary" flat small>My Button MOD 1 - Primary</v-btn>
    </div>
  </v-container>
</template>

<script lang="ts" setup></script>

<!-- <script> export default { name: 'SandBox', data: () => ({ }), } </script> -->
