<template>
  <div class="q-form-simple-name q-form-builder-element">
    <div class="row" v-if="getLabel">
      <div class="col-12">
        <label>{{ getLabel }}</label>
      </div>
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-md-6"><q-input v-model="innerValue.first" dense placeholder="First Name" :debounce="debounce" :rules="getRules('first', required)" :ref="`${id}_first`" /></div>
      <div class="col-12 col-md-6"><q-input v-model="innerValue.last" dense placeholder="Last Name" :debounce="debounce" :rules="getRules('last', required)" :ref="`${id}_last`" /></div>
    </div>
    <div class="row" v-if="hint">
      <div class="col-12 text-caption" v-html="hint"></div>
    </div>
  </div>
</template>

<script>
import FormElement from './FormElement'
import { QInput } from 'quasar'
export default {
  name: 'SimpleNameElement',
  extends: FormElement,
  components: { QInput },
  props: {
    value: {
      type: Object,
      default: () => {
        return { first: null, last: null }
      }
    }
  }
}
</script>
