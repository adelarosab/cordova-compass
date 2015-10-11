Polymer
  is: "cordova-compass"

  properties:
    accuracy:
      notify: yes
      readOnly: yes
      type: Number
    auto:
      type: Boolean
      value: false
    heading:
      notify: yes
      readOnly: yes
      reflectToAttribute: yes
      type: Number
    loop:
      type: Boolean
      value: false
    period:
      type: Number
      value: 3

  _setHeading: (heading) ->
    @_setHeading heading.magneticHeading

  attached: ->
    @watch() if @auto

  watch: ->
    this.$.enabler.promise.then =>
      fn = if @loop then "watchHeading" else "getCurrentHeading"
      navigator.compass[fn] @_setHeading,
        (@fire.bind this, "cordova-compass-error"),
        {frequency: @period}
