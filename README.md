_[Demo and API docs](https://adelarosab.github.io/cordova-compass)_

### &lt;cordova-compass&gt;
`<cordova-compass>` provides access to the device's compass.

### Installation
In your `www` project:
```bash
bower install --save cordova-compass
```

In your `cordova` project:
```bash
cordova plugin add cordova-plugin-device-orientation
```

### Usage
```html
<cordova-compass
  accuracy="1"
  auto
  delta="5"
  heading="310"
  loop
  period="3000"
  ready
  timestamp="1471173266"
></cordova-compass>
```

`<cordova-compass>` allow to read the state of the device's compass in the 
current moment. `ready` means cordova is fully operative and `heading`  shows
 the direction of the compass.

---

###### Note
Due to restrictions `ready` attribute is not shown into attributes table.
