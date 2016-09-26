(function () {
    L.GPlaceAutocomplete = {};

    L.Control.GPlaceAutocomplete = L.Control.extend({
        options: {
            position: "topright",
            prepend: true
        },

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
            var autocomplete = new google.maps.places.Autocomplete(searchBox);
            var callback = this.options.callback;
            google.maps.event.addListener(autocomplete, "place_changed", function () {
                callback(autocomplete.getPlace());
            });

            this.container.appendChild(
                searchWrapper.appendChild(
                    searchBox
                )
            );
        },

        onLocationComplete: function (location) {
            // default callback
            this._map.panTo(location);
        },

        onAdd: function () {
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
            return this;
        }


    });
})();
