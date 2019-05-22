<template>
  <div class="q-editable-element">
    <div class="overlay" @click="onClick"></div>
    <component v-bind:is="element"  :label="value.label" :required="value.required" :field_options="value.field_options" :id="value.id" :cid="value.cid" />
  </div>
</template>

<script>
import TextElement from '../elements/TextElement'
import ParagraphElement from '../elements/ParagraphElement'
import CheckboxesElement from '../elements/CheckboxesElement'
import RadioElement from '../elements/RadioElement'
import DateElement from '../elements/DateElement'
import TimeElement from '../elements/TimeElement'
import DropdownElement from '../elements/DropdownElement'
import EmailElement from '../elements/EmailElement'
import NameElement from '../elements/NameElement'
import SimpleNameElement from '../elements/SimpleNameElement'
import AddressElement from '../elements/AddressElement'
import PhoneElement from '../elements/PhoneElement'
import FileElement from '../elements/FileElement'
import PaymentElement from '../elements/PaymentElement'
import SectionBreakElement from '../elements/SectionBreakElement'
import PageBreakElement from '../elements/PageBreakElement'

export default {
  name: 'EditableElement',
  components: { TextElement, ParagraphElement, CheckboxesElement, RadioElement, DateElement, TimeElement, DropdownElement, EmailElement, NameElement, SimpleNameElement, AddressElement, PhoneElement, FileElement, PaymentElement, SectionBreakElement, PageBreakElement },
  props: ['value'],
  methods: {
    onClick: function () {
      this.$emit('click', this.value)
    }
  },
  computed: {
    element: function () {
      let nameParts = this.value.field_type.split('_')
      for (let i = 0; i < nameParts.length; i++) {
        nameParts[i] = nameParts[i].charAt(0).toUpperCase() + nameParts[i].slice(1)
      }
      return nameParts.join('') + 'Element'
    }
  }
}
</script>

<style scoped>
  .q-editable-element {
    position: relative;
    padding: 5px;
  }

  .overlay {
    position: absolute;
    z-index: 2;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
</style>
