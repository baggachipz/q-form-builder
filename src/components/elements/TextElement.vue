<template>
  <div class="row q-col-gutter-sm q-form-text q-form-builder-element">
    <div class="col">
      <q-input v-model="innerValue" :label="getLabel" :debounce="debounce" :rules="getRules()" :ref="id" />
      <p v-if="hint" class="text-caption" v-html="hint"></p>
    </div>
  </div>
</template>

<script>
import FormElement from './FormElement'
import { QInput } from 'quasar'
export default {
  name: 'TextElement',
  extends: FormElement,
  components: { QInput }
}
</script>
