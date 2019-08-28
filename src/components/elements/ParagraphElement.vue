<template>
  <div class="row q-col-gutter-sm q-form-paragraph q-form-builder-element">
    <q-input style="width: 100%" v-model="innerValue" :label="getLabel" filled type="textarea" :debounce="debounce" :rules="getRules()" :ref="id" />
    <p v-if="hint" class="text-caption" v-html="hint"></p>
  </div>
</template>

<script>
import FormElement from './FormElement'
import { QInput } from 'quasar'
export default {
  name: 'ParagraphElement',
  extends: FormElement,
  components: { QInput }
}
</script>
