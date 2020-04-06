<template>
  <div class="q-pa-md">
    <q-list>
      <q-item-label header>Options</q-item-label>
      <q-item v-for="(option, index) in value.options" :key="index" dense>
        <q-item-section side>
          <q-checkbox v-model="option.checked" :val="true" @input="changeSelected(option.label)" />
        </q-item-section>
        <q-item-section>
          <q-input dense v-model="option.label" />
        </q-item-section>
        <q-item-section side>
          <q-btn round flat size="xs" icon="delete" @click="deleteItem(index)"><q-tooltip>Delete this option</q-tooltip></q-btn>
        </q-item-section>
      </q-item>
      <q-item dense>
        <q-item-section side>
          <q-checkbox v-model="newItem.checked" :val="true" @input="changeSelected(newItem.label)" />
        </q-item-section>
        <q-item-section>
          <q-input dense filled v-model="newItem.label" />
        </q-item-section>
        <q-item-section side>
          <q-btn round size="xs" icon="add" @click="addNewItem"><q-tooltip>Add this option</q-tooltip></q-btn>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import {
  QList,
  QItem,
  QItemLabel,
  QItemSection,
  QCheckbox,
  QInput,
  QBtn,
  QTooltip
} from 'quasar'

const defaultNewItem = () => ({
  checked: false,
  label: ''
})

export default {
  name: 'EditableRadiosOptions',
  components: { QList, QItem, QItemLabel, QItemSection, QCheckbox, QInput, QBtn, QTooltip },
  props: ['value'],
  data: () => ({
    newItem: defaultNewItem()
  }),
  methods: {
    addNewItem: function () {
      this.value.options.push({
        label: this.newItem.label,
        checked: this.newItem.checked
      })
      this.newItem = defaultNewItem()
    },
    deleteItem: function (index) {
      this.value.options.splice(index, 1)
    },
    changeSelected: function (label) {
      this.newItem.checked = this.newItem.label === label
      for (const option of this.value.options) {
        option.checked = option.label === label
      }
    }
  }
}

</script>
