<template>
  <div class="row q-col-gutter-sm q-form-date q-form-builder-element">
    <div class="col-12 col-md-6">
      <q-input v-model="innerValue" mask="date" :label="getLabel" :debounce="debounce" :rules="getRules()" :ref="id">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy>
              <q-date v-model="innerValue" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <p v-if="hint" class="text-caption" v-html="hint"></p>
    </div>
  </div>
</template>

<script>
import FormElement from './FormElement'
import { QInput, QIcon, QPopupProxy, QDate } from 'quasar'
export default {
  name: 'DateElement',
  extends: FormElement,
  components: { QInput, QIcon, QPopupProxy, QDate },
  computed: {
    rules () {
      return ['date']
    }
  }
}
</script>
