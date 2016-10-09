# Leaflet Google Places Autocomplete

Simple extension to add Google Places autocomplete into map.


## Installation

### Bower

    bower install --save leaflet-google-places-autocomplete

## Examples

### City autocomplete
![City autocomplete](example/screen-city.png)

### Places autocomplete
![Places autocomplete](example/screen-poi.png)

## Usage

Make sure you have Google Places library **with valid API key** loaded on page.

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

These options can be set up when creating the control with `autocompleteOptions`.

Option                | Default       | Description
----------------------|---------------|---------------------------------------------------------
`position`            | `topright`    | any valid LeafLet [position](http://leafletjs.com/reference.html#control-positions)
`prepend`             | `true`:bool   | If true, control will prepended to other existing controls, if false, control will be appended
`callback`            | -             | any valid function as callback. By default internal callback is set and just pan the map to found position
`autocomplete_options`| {}            | default options for google autocomplete
