# Leaflet Google Places Autocomplete

Simple extension to add google places autocomplete into map


## Installation

### Bower

    bower install --save leaflet-google-places-autocomplete`

## Examples

make sure you have google google places library on page

```html
    <script src="https://maps.googleapis.com/maps/api/js?key=<key>&libraries=places"></script>
```

```javascript

new L.Control.GPlaceAutocomplete().addTo(map);

```

```javascript

new L.Control.GPlaceAutocomplete({
	position: "topleft",
	callback: function(location){
		// object of google place is given
		map.panTo(location);

	}
})
.addTo(map);

```

## API

#### <a name="autocompleteOptions"></a> Options

This options can be set up when creating the control with `autocompleteOptions`.

Option                | Default       | Description
----------------------|---------------|---------------------------------------------------------
`position`            | `topright`    | any valid LeafLet position
`prepend`             | `true`:bool   | If true, controll will prepended to other existing controls, if false, control will be appended
`callback`            | -             | any valid function as callback. By default internal callback is set and just pan the map to found position
`autocomplete_options`| {}            | default options for google autocomplete
