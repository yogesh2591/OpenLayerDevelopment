import Map from 'ol/map';
import control from 'ol/control';
import Tile from 'ol/layer/tile';
import OSM from 'ol/source/OSM';
import Attribution from 'ol/attribution';
import View from 'ol/view';
import proj from 'ol/proj';
import ScaleLine from 'ol/control/scaleline';
import group from 'ol/layer/group';

export class openMap {

    constructor() {

    };
    olmap: any;
    

    hybrid_map_layer = new Tile({
        source: new OSM({
            url: 'http://mt{0-3}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
            attributions: [
                new Attribution({ html: '� Google' }),
                new Attribution({ html: '<a href="https://developers.google.com/maps/terms">Terms of Use.</a>' })
            ]
        })
    });
    standard_map_layer = new Tile({
        source: new OSM({
            url: 'http://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
            attributions: [
                new Attribution({ html: '� Google' }),
                new Attribution({ html: '<a href="https://developers.google.com/maps/terms">Terms of Use.</a>' })
            ]
        })
    });
    open_layer = new Tile({
        source: new OSM()
    })

    layers = [this.open_layer, this.hybrid_map_layer, this.standard_map_layer];

    public start() {

        this.olmap = new Map({
            controls: control.defaults({
                attributionOptions: /** @type {olx.contrAttributionOptions} */ ({
                    collapsible: false
                })
            }).extend([
                new ScaleLine()
            ]),
            target: 'map',
            layers: this.layers,
            view: new View({
                center: proj.transform(
                    [72.821807, 18.974611], 'EPSG:4326', 'EPSG:3857'),
                zoom: 5,
                minZoom: 4,
                maxZoom: 25
            })
        });
    };
    public zoomIn() {
        let zoomLevel = this.olmap.getView().getZoom() + 1;
        let view = this.olmap.getView();
        view.animate({
            zoom: zoomLevel,
            duration: 1000
        });

    };
    public zoomOut() {
        let zoomLevel = this.olmap.getView().getZoom() - 1;
        let view = this.olmap.getView();
        view.animate({
            zoom: zoomLevel,
            duration: 1000
        });
    };

    public getCurrentZoom() {
        console.log(this.olmap.getView().getZoom());
        return this.olmap.getView().getZoom();
    };
    public getMapExtent (){
                    return proj.transform((this.olmap.getView().calculateExtent(this.olmap.getSize())), 'EPSG:3857', 'EPSG:4326');
                };

    public resetNorth() {
        this.olmap.getView().setRotation(0);
    };

    public zoomtoGPS(lat, lang) {
        let zoomLevel = 20;
        let center = proj.transform([lang, lat], 'EPSG:4326', 'EPSG:3857');
        let view = this.olmap.getView();
        view.animate({
            center: center,
            zoom: zoomLevel,
            duration: 3000

        });
    };
   
    public setBaseMap(base_layer_code) {
            this.olmap.getLayers().forEach(function (layer, i) {
            if (layer instanceof group) {
                layer.setVisible(true);
            }
            else if (i == base_layer_code) {
                layer.setVisible(true);
            } else {
                layer.setVisible(false);
            }

        });
   
    };
}