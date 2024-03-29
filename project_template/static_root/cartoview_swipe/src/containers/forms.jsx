import t from 'tcomb-form'
export const listConfigFormSchema = () => {
    const selectTagItem = t.struct({
        value: t.String,
        label: t.String
    })
    const formSchema = t.struct({
        layer: t.String,
        titleAttribute: t.String,
        subtitleAttribute: t.maybe(t.String),
        filters: t.maybe(t.String),
        pagination: t.String,
        zoomOnSelect: t.Boolean,
        enableImageListView: t.Boolean,

    })
    return formSchema
}
export const detailsConfigFormSchema = () => {
    const selectTagItem = t.struct({
        value: t.String,
        label: t.String
    })
    const formSchema = t.struct({
        attachmentTags: t.maybe(t.list(selectTagItem)),
        attributesToDisplay: t.maybe(t.list(selectTagItem))

    })
    return formSchema
}
const limitedTitle = t.refinement( t.String, ( titleValue ) => {
    let valid = true
    if ( titleValue.length > 200 ) {
      valid = false
    }
    return valid
  } )

  limitedTitle.getValidationErrorMessage = ( titleValue ) => {
    if ( !titleValue ) {
      return 'Required'
    } else if ( titleValue.length > 200 ) {
      return 'The title can not exceed the limit of 200 characters!'
    }
  }
export const generalFormSchema = () => {
    const selectKeywordItem = t.struct({
        value: t.String,
        label: t.String
    })
    const formSchema = t.struct({
        title: limitedTitle,
        abstract: t.maybe(t.String),
        keywords: t.list(selectKeywordItem)
    })
    return formSchema
}
export const accessFormSchema = () => {
    const selectUserItem = t.struct({
        value: t.String,
        label: t.String
    })
    const formSchema = t.struct({
        whoCanView: t.maybe(t.list(selectUserItem)),
        whoCanChangeMetadata: t.maybe(t.list(selectUserItem)),
        whoCanDelete: t.maybe(t.list(selectUserItem)),
        whoCanChangeConfiguration: t.maybe(t.list(selectUserItem))
    })
    return formSchema
}
export const toolFormSchema = () => {
    const formSchema = t.struct({
        showZoombar: t.Boolean,
        showLayerSwitcher: t.Boolean,
        showBaseMapSwitcher: t.Boolean,
        showLegend: t.Boolean
    })
    return formSchema
}