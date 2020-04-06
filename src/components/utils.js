export function defaultFieldOptions (type) {
  switch (type) {
    case 'checkboxes':
    case 'radio':
      return { options: [], include_other_option: false, description: '' }
    case 'dropdown':
      return { options: [], description: '' }
    default:
      return { description: '' }
  }
}

export function defaultLabel (type) {
  switch (type) {
    case 'section_break':
      return ''
    default:
      return 'Untitled'
  }
}

export function nl2br (str) {
  return str.replace(/(?:\r\n|\r|\n)/g, '<br>')
}
