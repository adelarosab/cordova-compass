Polymer(
  {
    is: 'cordova-compass',

    /**
     * Fired when an unkown error occured.
     *
     * @event error
     * @event cordova-compass-error
     */

    hostAttributes: {
      hidden: true
    },

    properties: {
      /**
       * The deviation in degrees between the reported heading and the true
       * heading.
       */
      accuracy: {
        notify: true,
        readOnly: true,
        type: Number
      },

      /**
       * If true, automatically performs watch when device is ready.
       */
      auto: Boolean,

      /**
       * The change in degrees required to watch again the heading. When this
       * value is set, period is ignored.
       */
      delta: Number,

      /**
       * The heading in degrees from 0-359.99 at a single moment in time.
       */
      heading: {
        notify: true,
        readOnly: true,
        type: Number
      },

      /**
       * If true, will watch over again, every period is finished.
       */
      loop: {
        observer: '_observeLoop',
        type: Boolean
      },

      /**
       * Time between updates of heading data in Milliseconds.
       */
      period: {
        type: Number,
        value: 3000
      },

      /**
       * Return if cordova deviceready event has been fired.
       */
      ready: {
        computed: '_computeReady(_ready_, _paused_)',
        notify: true,
        type: Boolean,
        value: false
      },

      /**
       * Creation timestamp for heading.
       */
      timestamp: {
        notify: true,
        readOnly: true,
        type: Number
      },
    },

    observers: ['_observeReady(auto, ready)'],

    _computeReady(ready, paused) {
      return ready && !paused;
    },

    _observeLoop(loop) {
      (loop) ? this.watch() : this.clearWatch();
    },

    _observeReady(auto, ready) {
      if (auto && ready) {
        this.watch();
      }
    },

    _onError() {
      this.fire('error', ...arguments);
      this.fire('cordova-compass-error', ...arguments);
    },

    _onWatch(heading) {
      this._setHeading(heading.magneticHeading);
      this._setTimestamp(heading.timestamp);
    },

    /**
     * Stop watching the Heading
     */
    clearWatch() {
      if (this.ready && this.watchId) {
        navigtor.compass.clearWatch(this.watchId);

        this.loop = false;
        this.watchId = null;
      }
    },

    /**
     * Get the current compass heading. If loop is set, it gets heading at
     * regular interval.
     */
    watch() {
      if (this.ready) {
        const errorCb = this._onError.bind(this);
        const fn = (this.loop) ? 'watchHeading' : 'getCurrentHeading';
        const optionsFn = {
          filter: this.delta,
          frecuency: this.period
        };
        const successCb = this._onWatch.bind(this);

        this.watchId = navigator.compass[fn](successCb, errorCb, optionsFn);
      }
    }
  }
)
