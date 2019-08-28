<template>
  <div class="row q-col-gutter-sm q-form-time q-form-builder-element">
    <div class="col-12 col-md-6">
      <q-input v-model="innerValue" mask="time" :label="getLabel" :debounce="debounce" :rules="getRules()" :ref="id">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy>
              <q-time v-model="innerValue" />
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
import { QInput, QIcon, QPopupProxy, QTime } from 'quasar'
export default {
  name: 'TimeElement',
  extends: FormElement,
  components: { QInput, QIcon, QPopupProxy, QTime },
  computed: {
    rules () {
      return ['time']
    }
  }
}
</script>
