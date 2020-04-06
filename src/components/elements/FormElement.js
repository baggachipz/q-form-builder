import * as utils from '../utils'
export default {
  props: {
    value: {},
    label: {
      type: String
    },
    required: {
      type: Boolean,
      default: true
    },
    field_options: {
      type: Object,
      required: false,
      default: () => ({
        description: false
      })
    },
    cid: {},
    id: {},
    debounce: {
      default: 500
    }
  },
  data () {
    return {
      innerValue: this.value,
      hasError: false,
      errors: []
    }
  },
  watch: {
    value: {
      handler (v) {
        this.innerValue = v
      },
      deep: true
    },
    innerValue: {
      handler (v) {
        this.$emit('input', v, this.id)
      },
      deep: true
    }
  },
  computed: {
    getLabel () {
      return this.required ? `${this.label} *` : this.label
    },
    hint () {
      return this.field_options && this.field_options.description ? utils.nl2br(this.field_options.description) : ''
    },
    rules () {
      return []
    }
  },
  methods: {
    getRules (subField, requiredCheck) {
      const requiredValidation = val => !!val || 'This field is required.'
      if (subField) {
        if (Object.prototype.hasOwnProperty.call(this.rules, subField)) {
          return requiredCheck ? this.rules[subField].concat(requiredValidation) : this.rules[subField]
        } else {
          return requiredCheck ? [requiredValidation] : []
        }
      } else {
        return this.required ? this.rules.concat(requiredValidation) : this.rules
      }
    },
    validate () {
      this.errors = []
      for (const id in this.$refs) {
        if (typeof this.$refs[id].validate === 'function') {
          this.$refs[id].validate()
          if (this.$refs[id].hasError) {
            this.errors.push({ id: this.$refs[id].innerErrorMessage })
          }
        }
      }
      this.hasError = this.errors.length > 0
    }
  }
}
