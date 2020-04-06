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
      <p v-if="hint" class="text-caption" v-html="hint"></p>
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
      selectedValues: this.defaultSelectedValues(),
      selectedOther: this.defaultSelectedOther().checked,
      selectedOtherValue: this.defaultSelectedOther().label
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
    defaultSelectedValues () {
      let returnValues = []
      if (this.value && Array.isArray(this.value)) {
        // get values of already-selected values
        returnValues = this.value
      } else {
        // get default selected values as set in the form definition
        for (const option of this.getOptions()) {
          if (option.checked) returnValues.push(option.label)
        }
      }
      return returnValues
    },
    defaultSelectedOther () {
      if (this.value && Array.isArray(this.value)) {
        // if the last value in the list is not found in the options list, then it must be from the 'other' list
        const lastOption = this.value.slice(-1)[0]
        for (const option of this.getOptions()) {
          // last value is in the list, so it is not an 'other' value
          if (option.label === lastOption) return { checked: false, label: '' }
        }
        // last value is NOT in the list
        return { checked: true, label: lastOption }
      } else return { checked: false, label: '' }
    },
    getOptions () {
      return this.field_options && this.field_options.options ? this.field_options.options : {}
    },
    setInnerValue () {
      let vals = []

      vals = this.selectedValues.slice(0)
      if (this.selectedOther) {
        vals.push(this.selectedOtherValue)
      }
      this.innerValue = vals
    },
    onUpdate () {
      this.setInnerValue()
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
  },
  watch: {
    field_options: {
      handler () {
        this.selectedValues = this.defaultSelectedValues()
      },
      deep: true
    }
  },
  mounted () {
    this.setInnerValue()
  }
}
</script>
