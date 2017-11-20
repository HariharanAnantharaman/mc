$(function(){

/* Vector Map */
var jvm_wm = new jvm.WorldMap({container: $('#dashboard-map-seles'),
                                map: 'world_mill_en',
                                backgroundColor: '#FFFFFF',
                                regionsSelectable: true,
                                regionStyle: {selected: {fill: '#B64645'},
                                                initial: {fill: '#33414E'}},
                                markerStyle: {initial: {fill: '#1caf9a',
                                               stroke: '#1caf9a'}},
                                markers: [
                                          {latLng: [28.61, 77.20], name: 'New Delhi - 4'}]
                            });
/* END Vector Map */


$(".x-navigation-minimize").on("click",function(){
    setTimeout(function(){
        rdc_resize();
    },200);
});
});
