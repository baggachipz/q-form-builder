<template>
  <div class="row q-col-gutter-sm q-form-email q-form-builder-element">
    <div class="col-12 col-md-6">
      <q-input v-model="innerValue" type="email" :label="getLabel" :debounce="debounce" :rules="getRules()" :ref="id">
        <template v-slot:append>
          <q-icon name="email" />
        </template>
      </q-input>
      <p v-if="hint" class="text-caption" v-html="hint"></p>
    </div>
  </div>
</template>

<script>
import FormElement from './FormElement'
import { QInput, QIcon } from 'quasar'
export default {
  name: 'EmailElement',
  extends: FormElement,
  components: { QInput, QIcon },
  computed: {
    rules () {
      return ['email']
    }
  }
}
</script>
