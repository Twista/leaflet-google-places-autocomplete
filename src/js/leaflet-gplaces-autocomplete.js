(function () {
    L.GPlaceAutocomplete = {};

    L.Control.GPlaceAutocomplete = L.Control.extend({
        options: {
            position: "topright",
            prepend: true,
            autocomplete_options: {}
        },

        autocomplete: null,

        initialize: function (options) {
            if (options) {
                L.Util.setOptions(this, options);
            }
            if (!this.options.callback) {
                this.options.callback = this.onLocationComplete;
            }
            this._buildContainer();
        },

        _buildContainer: function () {
            // build structure
            this.container = L.DomUtil.create("div", "leaflet-gac-container");
            var searchWrapper = L.DomUtil.create("div", "leaflet-gac-wrapper");

            var searchBox = L.DomUtil.create("input", "leaflet-gac-control");

            // create and bind autocomplete
            this.autocomplete = new google.maps.places.Autocomplete(searchBox, this.options.autocomplete_options);

            this.container.appendChild(
                searchWrapper.appendChild(
                    searchBox
                )
            );
        },

        onLocationComplete: function (place, map) {
            // default callback
            if(!place.geometry){
                alert("Location not found");
                return;
            }
            map.panTo([
                place.geometry.location.lat(),
                place.geometry.location.lng()
            ]);

        },

        onAdd: function () {
            // stop propagation of click events
            L.DomEvent.addListener(this.container, 'click', L.DomEvent.stop);
            L.DomEvent.disableClickPropagation(this.container);
            return this.container;
        },

        addTo: function (map) {
            this._map = map;

            var container = this._container = this.onAdd(map),
                pos = this.options.position,
                corner = map._controlCorners[pos];

            L.DomUtil.addClass(container, 'leaflet-control');
            if(this.options.prepend){
                corner.insertBefore(container, corner.firstChild);
            } else {
                corner.appendChild(container)
            }

            var callback = this.options.callback;
            var _this = this;
            google.maps.event.addListener(this.autocomplete, "place_changed", function () {
                callback(_this.autocomplete.getPlace(), map);
            });

            return this;
        }


    });
})();
