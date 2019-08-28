<template>
  <div class="q-form-radio q-form-builder-element">
    <div class="row">
      <label :class="hasError ? 'text-negative' : ''">{{ getLabel }}</label>
    </div>
    <div class="row">
      <q-list dense>
        <q-item>
          <q-option-group type="radio" v-model="innerValue" :options="allOptions" :ref="id" keep-color :color="hasError ? 'red' : ''" @input="validate" />
        </q-item>
        <q-item dense v-if="includeOther">
          <q-item-section avatar><q-radio v-model="innerValue" label="Other:" :val="otherOptionVal"  keep-color :color="hasError ? 'red' : ''" :ref="`radio-other-${id}`" @input="validate" /></q-item-section>
          <q-item-section left><q-input dense v-model="otherOptionVal" :disable="!otherSelected" :ref="`other-${id}`" @input="otherValueUpdated" /></q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="row">
      <p class="text-negative text-caption" v-for="(error, idx) in errors" :key="idx">{{ error }}</p>
      <p v-if="hint" class="text-caption" v-html="hint"></p>
    </div>
  </div>
</template>

<script>
import FormElement from './FormElement'
import { QRadio, QOptionGroup, QInput, QList, QItem, QItemSection } from 'quasar'

export default {
  name: 'RadioElement',
  extends: FormElement,
  components: { QRadio, QOptionGroup, QInput, QList, QItem, QItemSection },
  props: {
    value: {
      default: () => {}
    },
    field_options: {
      type: Object,
      required: false,
      default: function () {
        return {
          description: false,
          options: []
        }
      }
    }
  },
  data: () => ({
    otherOptionVal: null
  }),
  computed: {
    allOptions () {
      if (this.field_options && this.field_options.options) {
        return this.field_options.options.map(option => ({
          label: option.label,
          value: option.label
        }))
      } else {
        return []
      }
    },
    includeOther () {
      return !!this.field_options.include_other_option
    },
    otherSelected () {
      const optionValues = this.field_options.options.map(option => option.label)
      return optionValues.indexOf(this.innerValue) < 0
    }
  },
  methods: {
    otherValueUpdated (val) {
      this.innerValue = val
      this.validate()
    },
    validate () {
      this.hasError = false
      this.errors = []

      if (this.required && !this.innerValue) {
        this.hasError = true
        this.errors.push('Please select an option.')
      }
    }
  }
}
</script>

<style lang="stylus">
  .q-option-group
    .q-radio
      margin-bottom 5px
      margin-top 5px
      align-items flex-start
      .q-radio__inner
        margin -5px 0
</style>
