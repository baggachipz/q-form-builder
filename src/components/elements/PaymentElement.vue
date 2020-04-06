<template>
  <div class="q-form-payment q-form-builder-element">
    <div class="row" v-if="getLabel">
      <div class="col-12">
        <label>{{ getLabel }}</label>
      </div>
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-md-6"><q-input v-model="innerValue.ccname" label="Name on card" :debounce="debounce" :rules="getRules('ccname', required)" :ref="`${id}_ccname`" /></div>
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-md-6"><q-input v-model="innerValue.ccnum" label="Card number" fill-mask="#" :debounce="debounce" :rules="getRules('ccnum', required)" :ref="`${id}_ccnum`" /></div>
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-sm-6 col-md-3"><q-select v-model="innerValue.expmonth" :options="expmonths" label="Exp. Month" :debounce="debounce" :rules="getRules('expmonth', required)" :ref="`${id}_expmonth`" /></div>
      <div class="col-12 col-sm-6 col-md-3"><q-select v-model="innerValue.expyear" :options="expyears" label="Exp. Year" :debounce="debounce" :rules="getRules('expyear', required)" :ref="`${id}_expyear`" /></div>
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-sm-6 col-md-3"><q-input v-model="innerValue.cvv" label="CVV" fill-mask="#" hint="3 or 4 digit code on back of card" maxlength="4" :debounce="debounce" :rules="getRules('cvv', required)" :ref="`${id}_cvv`" /></div>
    </div>
    <div class="row" v-if="hint">
      <div class="col-12 text-caption" v-html="hint"></div>
    </div>
  </div>
</template>

<script>
import FormElement from './FormElement'
import { QInput, QSelect } from 'quasar'
import * as luhn from 'luhn'

export default {
  name: 'PaymentElement',
  extends: FormElement,
  components: { QInput, QSelect },
  props: {
    value: {
      type: Object,
      default: () => {
        return { ccname: null, ccnum: null, expmonth: null, expyear: null, cvv: null }
      }
    }
  },
  methods: {
    range (start, end) {
      return [...Array(end - start + 1)].map((_, i) => start + i)
    }
  },
  computed: {
    expmonths () {
      return this.range(1, 12)
    },
    expyears () {
      const year = new Date().getFullYear()
      return this.range(year, year + 10)
    },
    rules () {
      return {
        ccnum: [(val) => {
          // if value wasn't passed in (i.e., first time filling this out) or was changed
          if (!this.value.ccnum || val !== this.value.ccnum) {
            return luhn.validate(val) || 'Please enter a valid credit card.'
          // value was passed in
          } else {
            return true
          }
        }]
      }
    }
  }
}
</script>
