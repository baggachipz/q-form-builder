<template>
  <div class="q-form-address q-form-builder-element">
    <div class="row" v-if="getLabel">
      <div class="col-12">
        <label>{{ getLabel }}</label>
      </div>
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-12"><q-input v-model="innerValue.address" label="Street" :debounce="debounce" :rules="getRules('street', required)" :ref="`${id}_street`" /></div>
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-md-6"><q-input v-model="innerValue.city" label="City" :debounce="debounce" :rules="getRules('city', required)" :ref="`${id}_city`" /></div>
      <div class="col-12 col-md-6"><q-input v-model="innerValue.state" label="State/Province/Region" :debounce="debounce" :rules="getRules('state', required)" :ref="`${id}_state`"/></div>
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-md-6"><q-input v-model="innerValue.zip" label="Zip/Postal Code" :rules="getRules('zip', required)" :ref="`${id}_zip`" /></div>
      <div class="col-12 col-md-6"><q-select v-model="innerValue.country" :options="countries" label="Country" :debounce="debounce" :rules="getRules('country', required)" :ref="`${id}_country`" /></div>
    </div>
    <div class="row" v-if="hint">
      <div class="col-12 text-caption" v-html="hint"></div>
    </div>
  </div>
</template>

<script>
import FormElement from './FormElement'
import { QInput, QSelect } from 'quasar'
import countryList from '../data/countries.json'

export default {
  name: 'AddressElement',
  extends: FormElement,
  components: { QInput, QSelect },
  props: {
    value: {
      type: Object,
      default: () => {
        return { address: null, city: null, state: null, zip: null, country: null }
      }
    }
  },
  computed: {
    countries () {
      return countryList
    }
  }
}
</script>
