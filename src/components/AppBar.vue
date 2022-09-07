<template>
    <div>
        <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        Lumpia Calculator
      </div>

      <v-spacer></v-spacer>
      <v-btn color="light-blue" class="white--text mr-3" to="/">Home</v-btn>
      <v-btn color="light-blue" class="white--text mr-4" to="/piggery"
        >Piggery</v-btn
      >
      <v-btn color="light-blue" class="white--text mr-4" to="/lumpia"
        >Lumpia</v-btn
      >

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon dark v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :to="item.href"
          >
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    </div>
</template>

<script src="">
    export default{
        data: () => ({
    items: [
      { title: "Lumpia Settings", href: "/settings" },
      { title: "Logout " },
      { title: "Click Me" },
      { title: "Click Me 2" },
    ],
  }),
    }
</script>