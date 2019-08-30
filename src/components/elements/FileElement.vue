<template>
  <div class="q-form-file-upload q-form-builder-element">
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-md-6">
        <q-uploader class="uploader-hidden" v-if="!innerValue" accept=".jpg, .pdf, image/*" auto-upload :url="uploadPath" @uploading="onStartUpload" @uploaded="onUpload" :label="getLabel" :field-name="id" :ref="id" color="white" flat square />
        <q-btn v-if="!innerValue" icon-right="cloud_upload" :label="buttonLabel" :color="buttonColor" :disable="imgUploading" align="between" @click="pickFiles()" class="full-width" />
        <q-img contain v-if="innerValue" :src="imgRef" class="upload-display" @error="onImgLoadError">
          <div class="absolute-top text-subtitle2">
            {{ getLabel }}
            <span class="float-right">
              <q-btn flat round size="sm" icon="open_in_new" @click="viewOriginal">
                <q-tooltip>View Original</q-tooltip>
              </q-btn>
              <q-btn flat round size="sm" icon="delete" @click="unsetUpload">
                <q-tooltip>Remove</q-tooltip>
              </q-btn>
            </span>
          </div>
          <div class="absolute-bottom text-subtitle1 text-center" v-if="imgLoadFailed">
            No Preview Available
          </div>
        </q-img>
      </div>
    </div>
    <p class="col-12 col-md-6 text-negative text-caption" v-for="(error, idx) in errors" :key="idx">{{ error }}</p>
    <div v-if="hint" class="row q-col-gutter-sm">
      <p class="col-12 col-md-6 text-caption" v-html="hint"></p>
    </div>
  </div>
</template>

<script>
import FormElement from './FormElement'
import { QUploader, QImg, QBtn, QTooltip } from 'quasar'
export default {
  name: 'FileElement',
  extends: FormElement,
  components: { QUploader, QImg, QBtn, QTooltip },
  data: function () {
    return {
      imgLoadFailed: false,
      imgUploading: false
    }
  },
  props: {
    uploadPath: {
      type: String,
      default: '/api/upload'
    }
  },
  methods: {
    pickFiles: function () {
      this.$refs[this.id].pickFiles()
    },
    onStartUpload: function () {
      this.imgUploading = true
    },
    onUpload: function (response) {
      this.imgUploading = false
      this.innerValue = JSON.parse(response.xhr.response)
      this.validate()
    },
    unsetUpload: function () {
      this.innerValue = false
    },
    viewOriginal: function () {
      window.open(`/assets/${this.innerValue}`, '_blank')
    },
    onImgLoadError: function () {
      this.imgLoadFailed = true
    },
    validate: function () {
      this.errors = []
      if (this.required && !this.innerValue) {
        this.errors.push('This field is required.')
      }
      this.hasError = this.errors.length > 0
    }
  },
  computed: {
    imgRef: function () {
      return this.imgLoadFailed ? require('../../assets/paperclip.svg') : `/assets/${this.innerValue}`
    },
    buttonColor: function () {
      return this.hasError ? 'negative' : 'grey-7'
    },
    buttonLabel: function () {
      return this.imgUploading ? 'Uploading...' : this.getLabel
    }
  }
}
</script>

<style lang="stylus">
  .upload-display
    max-height 250px
  .q-uploader
    display none
</style>
