<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          QFormBuilder Example
        </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <q-form-builder v-model="fields" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>

import QFormBuilder from '@/components/QFormBuilder'

export default {
  name: 'SampleApp',
  components: {
    QFormBuilder
  },
  data: function () {
    return {
      fields: []
    }
  },
  watch: {
      fields: {
        handler(val) {
          console.debug(val);
        },
        deep: true
      }
    }
}
</script>
