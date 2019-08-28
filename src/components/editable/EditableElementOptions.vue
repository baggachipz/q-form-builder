<template>
  <form v-if="value" v-on:submit.prevent>
    <div class="text-right"><q-chip square dense :icon="typeIcon" class="text-uppercase">{{ typeName }}</q-chip></div>
    <q-input dense v-model="value.label" placeholder="Label" label="Label to display" />
    <!-- <div class="text-caption q-pt-sm text-weight-light">A longer description to display</div> -->
      <!-- <q-editor dense v-model="value.field_options.description" :toolbar="[
        ['bold', 'italic', 'underline'],
        ['unordered', 'ordered', 'link', 'hr']
      ]" /> -->
    <q-input dense v-model="value.field_options.description" type="textarea" label="A longer description to display" filled />
    <q-toggle v-model="value.required" label="Required" v-if="ifNotTypes(['section_break', 'page_break'])" />
    <editable-checkboxes-options v-model="value.field_options" v-if="ifType('checkboxes')" />
    <editable-radio-options v-model="value.field_options" v-if="ifType('radio')" />
    <editable-dropdown-options v-model="value.field_options" v-if="ifType('dropdown')" />
  </form>
</template>

<script>
import {
  QInput,
  QToggle,
  QChip
} from 'quasar'

import EditableCheckboxesOptions from './EditableCheckboxesOptions'
import EditableRadioOptions from './EditableRadioOptions'
import EditableDropdownOptions from './EditableDropdownOptions'

export default {
  name: 'EditableElementOptions',
  components: { QInput, QToggle, QChip, EditableCheckboxesOptions, EditableRadioOptions, EditableDropdownOptions },
  props: ['value', 'typeInfo'],
  methods: {
    ifType (type) {
      return this.value.field_type === type
    },
    ifNotTypes (types) {
      if (!Array.isArray(types)) {
        types = [types]
      }
      return types.indexOf(this.value.field_type) < 0
    },
    getTypeInfo () {
      for (let i in this.typeInfo) {
        if (this.typeInfo[i].type === this.value.field_type) {
          return this.typeInfo[i]
        }
      }
      return false
    }
  },
  computed: {
    typeName () {
      return this.getTypeInfo().label
    },
    typeIcon () {
      return this.getTypeInfo().icon
    }
  }
}

</script>
