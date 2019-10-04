<template>
  <q-layout container style="width: 100%; height: 100%; min-height:calc(100vh - 50px);" view="hHh Lpr fff">
    <q-drawer v-model="drawer" show-if-above bordered :side="navPosition">
      <q-tabs v-model="tab" align="justify" dense narrow-indicator>
        <q-tab name="add" label="Add Field" />
        <q-tab name="edit" label="Edit Field" :disable="!currentField" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="add">
          <draggable :list="sourceFields" :clone="createField" :options="sourceOptions" :sort="false">
            <div class="source-field" v-for="(sourceField, idx) in sourceFields" :key="idx">
              <q-btn type="button" size="12px" dense align="left" class="btn-fixed-width" @click="onAddFieldClick(sourceField.type)" :icon="sourceField.icon" :label="sourceField.label" v-if="sourceField.type !== ''" />
            </div>
          </draggable>
        </q-tab-panel>
        <q-tab-panel name="edit">
          <editable-element-options v-model="currentField" :type-info="sourceFields" />
        </q-tab-panel>
      </q-tab-panels>
    </q-drawer>

    <q-page-container>
      <q-page class="q-form-builder-page">

        <draggable v-model="fields" @change="onChange" :options="destinationOptions" :class="{ 'q-form-builder-elements-container': true, 'empty': fields.length == 0 }">
          <div class="editable-element-container" v-for="(field, idx) in fields" :key="idx">
            <editable-element v-model="fields[idx]" @click="selectForEdit" :class="{'selected': isSelectedForEdit(idx)}" :ref="fields[idx].cid" />
            <div class="editable-element-action-buttons">
              <q-btn class="editable-element-button" v-if="isSelectedForEdit(idx)" @click="deleteField(idx)" color="red" icon="delete" round size="xs"><q-tooltip>Delete this field</q-tooltip></q-btn>
              <q-btn class="editable-element-button" v-if="isSelectedForEdit(idx)" @click="duplicateField(idx)" color="secondary" icon="file_copy" round size="xs"><q-tooltip>Duplicate this field</q-tooltip></q-btn>
            </div>
          </div>
        </draggable>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import {
  QLayout,
  QPageContainer,
  QPage,
  QDrawer,
  QTab,
  QTabs,
  QTabPanel,
  QTabPanels,
  QTooltip,
  QBtn,
  uid,
  extend
} from 'quasar'

import draggable from 'vuedraggable'
import EditableElement from './editable/EditableElement'
import EditableElementOptions from './editable/EditableElementOptions'
import * as utils from './utils'

export default {
  name: 'QFormBuilder',
  components: { EditableElement, EditableElementOptions, draggable, QLayout, QPageContainer, QPage, QDrawer, QTab, QTabs, QTabPanel, QTabPanels, QTooltip, QBtn },
  data () {
    return {
      fields: this.value,
      drawer: true,
      tab: 'add',
      currentField: false,
      hovered: []
    }
  },
  props: {
    navPosition: {
      type: String,
      default: 'left'
    },
    fieldIdName: {
      default: '_id'
    },
    value: {
      required: true,
      type: Array
    },
    sourceFields: {
      required: false,
      default: () => [
        { type: 'text', icon: 'text_format', label: 'Text' },
        { type: 'paragraph', icon: 'text_fields', label: 'Paragraph' },
        { type: 'checkboxes', icon: 'check_box', label: 'Checkboxes' },
        { type: 'radio', icon: 'radio_button_checked', label: 'Mult. Choice' },
        { type: 'date', icon: 'event', label: 'Date' },
        { type: 'time', icon: 'access_time', label: 'Time' },
        { type: 'dropdown', icon: 'arrow_drop_down', label: 'Dropdown' },
        { type: 'email', icon: 'email', label: 'Email' },
        { type: 'name', icon: 'person', label: 'Name' },
        { type: 'simple_name', icon: 'person_outline', label: 'Simple Name' },
        { type: 'address', icon: 'home', label: 'Address' },
        { type: 'phone', icon: 'phone', label: 'Phone' },
        { type: 'file', icon: 'cloud_upload', label: 'File Upload' },
        { type: 'payment', icon: 'payment', label: 'Payment' },
        { type: 'terms', icon: 'ballot', label: 'Terms' },
        { type: '' },
        { type: '' },
        { type: '' },
        { type: 'section_break', icon: 'view_agenda', label: 'Section Break' },
        { type: 'page_break', icon: 'call_to_action', label: 'Page Break' }
      ]
    }
  },
  methods: {
    createField (item) {
      return {
        label: utils.defaultLabel(item.type),
        field_type: item.type,
        required: true,
        cid: uid(),
        field_options: utils.defaultFieldOptions(item.type)
      }
    },
    deleteField (idx) {
      this.currentField = false
      this.tab = 'add'
      this.$delete(this.fields, idx)
    },
    duplicateField (idx) {
      let newField = extend(true, {}, this.fields[idx])
      newField.cid = uid()
      // newField[this.fieldIdName] = null
      delete newField[this.fieldIdName]
      this.fields.push(newField)
      this.selectForEdit(newField)
    },
    onChange (evt) {
      if (evt.added) {
        this.selectForEdit(evt.added.element)
      }
    },
    onAddFieldClick (type) {
      const field = this.createField({ type })
      this.fields.push(field)
      this.selectForEdit(field)
    },
    selectForEdit (field) {
      this.currentField = field
      this.tab = 'edit'
    },
    isSelectedForEdit (idx) {
      return this.currentField.cid === this.fields[idx].cid
    },
    getFieldByCid (cid) {
      for (let field of this.fields) {
        if (field.cid === cid) return field
      }
      return false
    }
  },
  computed: {
    sourceOptions: () => {
      return {
        group: {
          name: 'q-form-builder',
          pull: 'clone',
          put: false
        }
      }
    },
    destinationOptions: () => {
      return {
        group: {
          name: 'q-form-builder',
          pull: false,
          put: true
        }
      }
    }
  },
  beforeMount () {
    // make sure fields is an array in the model
    if (!this.fields || !(this.fields instanceof Array)) {
      this.fields = []
    }
  },
  watch: {
    fields (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.fields = val
      if (this.currentField) this.selectForEdit(this.getFieldByCid(this.currentField.cid))
    }
  }
}

</script>

<style scoped lang="stylus">

  .source-field
    width 129px
    display inline-block
    margin 0px 2px 5px 2px
    .q-btn
      width 100%

  .q-page
    padding 20px

  .q-form-builder-elements-container
    width 100%
    min-height 200px

  .q-form-builder-elements-container.empty
    background-image url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='200px' width='500px'><text x='0' y='15' fill='lightgray' font-size='14' font-family='Roboto, Helvetica, sans-serif'>Drag an element here to get started.</text></svg>")
    background-repeat no-repeat
    background-position 0 40px

  .q-editable-element.selected
    background-color $blue-grey-1

  .editable-element-container
    position relative

  .editable-element-action-buttons
    position absolute
    bottom -11 px
    right 0
    z-index 2

  .editable-element-button
    float right
    margin-right 5px

</style>
