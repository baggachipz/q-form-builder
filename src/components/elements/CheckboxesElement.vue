<template>
  <div class="q-form-checkbox q-form-builder-element">
    <div class="row">
      <label :class="hasError ? 'text-negative' : ''">{{ getLabel }}</label>
    </div>
    <div class="row">
      <q-list dense>
        <q-item>
          <q-option-group type="checkbox" v-model="selectedValues" :options="allOptions" @input="onUpdate" :ref="id" keep-color :color="hasError ? 'red' : ''" />
        </q-item>
        <q-item dense v-if="includeOther">
          <q-item-section avatar><q-checkbox v-model="selectedOther" label="Other:" keep-color :color="hasError ? 'red' : ''" @input="onUpdate" :ref="`checkbox-other-${id}`" /></q-item-section>
          <q-item-section left><q-input v-model="selectedOtherValue" dense @input="onUpdate" :disable="!selectedOther" :ref="`other-${id}`" /></q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="row">
      <p class="text-negative text-caption" v-for="(error, idx) in errors" :key="idx">{{ error }}</p>
      <p v-if="hint" class="text-caption">{{ hint }}</p>
    </div>
  </div>
</template>

<script>
import FormElement from './FormElement'
import { QCheckbox, QOptionGroup, QInput, QList, QItem, QItemSection } from 'quasar'

export default {
  name: 'CheckboxesElement',
  extends: FormElement,
  components: { QCheckbox, QOptionGroup, QInput, QList, QItem, QItemSection },
  props: {
    value: {
      default: () => []
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
  data () {
    return {
      hasError: false,
      errors: [],
      selectedValues: this.value.filter(val => this.field_options.options.indexOf(val) >= 0),
      selectedOther: this.value.filter(val => this.field_options.options.indexOf(val) < 0).length > 0,
      selectedOtherValue: this.value.filter(val => this.field_options.options.indexOf(val) < 0).join('')
    }
  },
  computed: {
    allOptions: function () {
      return this.field_options.options.map(option => ({
        label: option.label,
        value: option.label
      }))
    },
    includeOther: function () {
      return !!this.field_options.include_other_option
    }
  },
  methods: {
    onUpdate () {
      let vals = []

      vals = this.selectedValues.slice(0)
      if (this.selectedOther) {
        vals.push(this.selectedOtherValue)
      }
      this.innerValue = vals

      this.validate()
    },
    validate () {
      this.hasError = false
      this.errors = []

      if (this.required) {
        if (!this.innerValue.length && this.allOptions.length) {
          this.hasError = true
          if (this.allOptions.length > 1) {
            this.errors.push('Please select at least one option.')
          } else {
            this.errors.push('Please select this required option.')
          }
        }
      }
    }
  }
}
</script>
