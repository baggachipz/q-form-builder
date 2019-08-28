<template>
  <div class="q-form-page-break q-form-builder-element">
    <label v-if="label"><strong>Page Break: </strong>{{ label }}</label>
    <q-separator spaced color="primary" />
    <p v-if="hint" class="text-caption" v-html="hint"></p>
  </div>
</template>

<script>
import { QSeparator } from 'quasar'

export default {
  name: 'PageBreakElement',
  components: { QSeparator },
  props: {
    label: {
      type: String,
      default: ''
    },
    field_options: {
      type: Object,
      required: false,
      default: () => ({
        description: false
      })
    },
    cid: {},
    id: {}
  },
  computed: {
    hint: function () {
      return this.field_options.description
    }
  },
  methods: {
    validate () {
      return true
    }
  }
}
</script>
