<template>
  <div class="q-form-section-break q-form-builder-element">
    <label v-if="label">{{ label }}</label>
    <q-separator spaced color="secondary" />
    <p v-if="hint" class="text-caption" v-html="hint"></p>
  </div>
</template>

<script>
import { QSeparator } from 'quasar'
import * as utils from '../utils'

export default {
  name: 'SectionBreakElement',
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
      return this.field_options && this.field_options.description ? utils.nl2br(this.field_options.description) : ''
    }
  },
  methods: {
    validate () {
      return true
    }
  }
}
</script>
