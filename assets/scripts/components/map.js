import watching from '../util/watching';
import $ from 'jquery';

// const L = require('leaflet');
import 'leaflet';
import 'leaflet.markercluster';

// import

window.jQuery = $;

watching('[data-map]', {
    init() {
        L.Control.ZoomMin = L.Control.Zoom.extend({
            options: {
                position: "topleft",
                zoomInText: "+",
                zoomInTitle: "Zoom in",
                zoomOutText: "-",
                zoomOutTitle: "Zoom out",
                zoomMinText: "<i class='fa fa-eye' aria-hidden='true'></i>",
                zoomMinTitle: "<i class='fa fa-eye' aria-hidden='true'></i>"
            },

            onAdd: function (map) {
                let zoomName = "leaflet-control-zoom"
                    , container = L.DomUtil.create("div", zoomName + " leaflet-bar")
                    , options = this.options;

                this._map = map;
                this._zoomInButton = this._createButton(options.zoomInText, options.zoomInTitle, zoomName + '-in', container, this._zoomIn, this);
                this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle, zoomName + '-out', container, this._zoomOut, this);
                // this._zoomMinButton = this._createButton(options.zoomMinText, options.zoomMinTitle, zoomName + '-min', container, this._zoomMin, this);

                this._updateDisabled();
                map.on('zoomend zoomlevelschange', this._updateDisabled, this);
                return container;
            },

            _zoomMin: function () {
                if (this.options.minBounds) {
                    return this._map.fitBounds(this.options.minBounds);
                }
                this._map.setZoom(this._map.getMinZoom())
            },

            _updateDisabled: function () {
                let map = this._map
                    , className = "leaflet-disabled";

                L.DomUtil.removeClass(this._zoomInButton, className);
                L.DomUtil.removeClass(this._zoomOutButton, className);

                // L.DomUtil.removeClass(this._zoomMinButton, className);
                // if (map._zoom === map.getMinZoom()) {
                //     L.DomUtil.addClass(this._zoomMinButton, className)
                // }
            }
        });


        // var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        let tiles = L.tileLayer('/osmtype/german/{z}/{x}/{y}.png', {
            zoomControl: false,
            maxZoom: 17,
            minZoom: 10,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });


        let map = L.map(this.element, {
            zoomControl: false,
            scrollWheelZoom: false
        }).addLayer(tiles);

        L.NumberedDivIcon = L.Icon.extend({
            options: {
                // EDIT THIS TO POINT TO THE FILE AT http://www.charliecroom.com/marker_hole.png (or your own marker)
                iconUrl: '/assets/images/map-icon-normal.svg',
                iconUrlHover: '/assets/images/map-icon-hover.svg',
                number: '',
                shadowUrl: null,
                iconSize: new L.Point(34, 45),
                iconAnchor: new L.Point(17, 45),
                popupAnchor: new L.Point(0, -45),
                /*
                iconAnchor: (Point)
                popupAnchor: (Point)
                */
                className: 'marker-div-icon'
            },

            createIcon: function () {
                let div = document.createElement('div');

                let img = this._createImg(this.options['iconUrl']);
                img.setAttribute("class", "marker-icon-normal");

                let imgHover = this._createImg(this.options['iconUrlHover']);
                imgHover.setAttribute("class", "marker-icon-hover");

                let numdiv = document.createElement('div');
                numdiv.setAttribute("class", "marker-div-icon-number");
                numdiv.innerHTML = this.options['number'] || '';
                div.appendChild(img);
                div.appendChild(imgHover);
                div.appendChild(numdiv);
                this._setIconStyles(div, 'icon');
                return div;
            },

            //you could change this to add a shadow like in the normal marker if you really wanted
            createShadow: function () {
                return null;
            }
        });

        for (let i in geoJsonData.features) {
            geoJsonData.features[i].icon = new L.NumberedDivIcon({
                number: geoJsonData.features[i].number
            });
        }

        let markers = L.markerClusterGroup();
        let geoJsonLayer = L.geoJson(geoJsonData, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                    icon: feature.icon
                    // icon: iconNormal
                });
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.descriptionhtml);
            }
        });


        markers.addLayer(geoJsonLayer);
        map.addLayer(markers);
        map.fitBounds(markers.getBounds());
        map.addControl(new L.Control.ZoomMin());
    }
});
