<template>
  <div class="row q-col-gutter-sm q-form-terms q-form-builder-element">
    <div class="col">
      <label>{{ getLabel }}</label>
      <q-scroll-area class="terms-scroll-area" :content-style="termsContentStyle" :content-active-style="termsContentStyle">
        <div class="text-body2" v-html="hint"></div>
      </q-scroll-area>
      <q-checkbox v-model="iAgree" :ref="id" true-value="I Agree" :false-value="false" keep-color :color="hasError ? 'red' : ''"><span :class="hasError ? 'text-negative' : ''">I Agree</span></q-checkbox>
      <p class="text-negative text-caption" v-for="(error, idx) in errors" :key="idx">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import FormElement from './FormElement'
import { QScrollArea, QCheckbox } from 'quasar'
export default {
  name: 'TermsElement',
  extends: FormElement,
  components: { QScrollArea, QCheckbox },
  data: function () {
    return {
      iAgree: false
    }
  },
  computed: {
    termsContentStyle () {
      return { background: 'rgba(0,0,0,0.02)', color: 'rgb(117, 117, 117)', padding: '10px' }
    }
  },
  methods: {
    validate () {
      this.hasError = false
      this.errors = []

      if (this.required && !this.iAgree) {
        this.hasError = true
        this.errors.push('Please click "I Agree" to accept.')
      }
    }
  },
  watch: {
    iAgree: function (val) {
      this.innerValue = val
      this.validate()
    }
  }
}
</script>

<style lang="stylus">
  .terms-scroll-area
    width 100%
    height 200px
</style>
