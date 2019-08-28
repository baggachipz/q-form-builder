<template>
  <div class="row q-col-gutter-sm q-form-dropdown q-form-builder-element">
    <div class="col-12 col-md-6 col-lg-3">
      <q-select v-model="innerValue" :options="allOptions" :label="getLabel" :rules="getRules()" :ref="id" />
      <p v-if="hint" class="text-caption" v-html="hint"></p>
    </div>
  </div>
</template>

<script>
import FormElement from './FormElement'
import { QSelect } from 'quasar'
export default {
  name: 'DropdownElement',
  extends: FormElement,
  components: { QSelect },
  computed: {
    allOptions: function () {
      return this.field_options.options.map(option => ({
        label: option.label,
        value: option.label
      }))
    }
  }
}
</script>
