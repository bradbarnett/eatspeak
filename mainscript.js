 $(function() {
      

var panelVal;
 



var mapRestaurants = new L.Map("mapRestaurants", {
  center: new L.LatLng(47.6063889,-122.3308333),
  zoom: 12,
  zoomControl: true,
  opacity: .5, attributionControl: false
});

var layer1 = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  subdomains: 'abcd',
  maxZoom: 19
});

mapRestaurants.addLayer(layer1);

var mapLanguage = new L.Map("mapLanguage", {
  center: new L.LatLng(47.6063889,-122.3308333),
  zoom: 12,
  zoomControl: false,
  opacity: .5, 
  attributionControl: false
});

var layer2 = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  subdomains: 'abcd',
  maxZoom: 19
});

mapLanguage.addLayer(layer2);

// L.control.coordinates({
//     position:"bottomleft", //optional default "bootomright"
//     decimals:5, //optional default 4
//     decimalSeperator:".", //optional default "."
//     labelTemplateLat:"Latitude: {y}", //optional default "Lat: {y}"
//     labelTemplateLng:"Longitude: {x}", //optional default "Lng: {x}"
//     enableUserInput:true, //optional default true
//     useDMS:false, //optional default false
//     useLatLngOrder: true, //ordering of labels, default false-> lng-lat
//     markerType: L.marker, //optional default L.marker
//     markerProps: {} //optional default {}
// }).addTo(mapLanguage);

L.TopoJSON = L.GeoJSON.extend({  
  addData: function(jsonData) {    
    if (jsonData.type === "Topology") {
      for (var key in jsonData.objects) {
        geojson = topojson.feature(jsonData, jsonData.objects[key]);
        L.GeoJSON.prototype.addData.call(this, geojson);
      }
    }    
    else {
      L.GeoJSON.prototype.addData.call(this, jsonData);
    }
  } 
});
//Copyright (c) 2013 Ryan Clark

// var poi = $.getJSON("POI.geojson",function(data){
//     // add GeoJSON layer to the map once the file is loaded
//     L.geoJson(data).addTo(mapLanguage);
//     L.geoJson(data).addTo(mapRestaurants);
//   });



topoLayer = new L.TopoJSON();

$.getJSON('hex_filled4326_5p_c.json')
  .done(addTopoData);

function addTopoData(topoData){  
  topoLayer.addData(topoData);
  topoLayer.addTo(mapLanguage);
  topoLayer.eachLayer(handleLayer);
}

function handleLayer(layer){
  var language = layer.feature.properties.winner;
  var households = layer.feature.properties.hh_int;

    layer.setStyle({
      fillColor : filterColor(language,households),
      fillOpacity: 1,
      color:'white',
      weight:1,
      opacity: 0.8
    });
}

function filterColor(language, households) {
  if (language ==="african") {
    return households > 10  ? '#66B9F0'  :
           households > 5  ? '#66B9F0'  :
           "none";
  }
  if (language ==="chinese") {
    return households > 10  ? '#C2C2A3' :
           households > 5  ? '#C2C2A3' :
           "none";
  }
  if (language ==="indian") {
    return households > 10  ? '#D99BF4':
           households > 5  ? '#D99BF4' :
           "none";
  }
  if (language ==="korean") {
    return households > 10  ? '#FF9980' :
           households > 5  ? '#FF9980' :
           "none";
  }
  if (language ==="mexican") {
    return households > 10  ? '#66E0A3' :
           households > 5  ? '#66E0A3' :
           "none";
  }        
  if (language ==="vietnamese") {
    return households > 15  ? '#FFFF4D' :
           households > 5  ? '#FFFF4D' :
           households > 5  ? '#FFFF4D' :
           "none";
  }     
  else return "transparent";
}


//   if (language ==="african") {
//     return households > 15  ?  '#008AE6' :
//            households > 10  ? '#66B9F0'  :
//            households > 0  ? '#66B9F0'  :
//            false;
//   }
//   if (language ==="chinese") {
//     return households > 15  ? '#999966' :
//            households > 10  ? '#C2C2A3' :
//            households > 0  ? '#C2C2A3' :
//            false;
//   }
//   if (language ==="indian") {
//     return households > 15  ? '#d254f9' :
//            households > 10  ? '#D99BF4':
//            households > 0  ? '#D99BF4' :
//            false;
//   }
//   if (language ==="korean") {
//     return households > 15  ? '#FF4719' :
//            households > 10  ? '#FF9980' :
//            households > 0  ? '#FF9980' :
//            false;
//   }
//   if (language ==="mexican") {
//     return households > 15  ? '#00CC66' :
//            households > 10  ? '#66E0A3' :
//            households > 0  ? '#66E0A3' :
//            false;
//   }        
//   if (language ==="vietnamese") {
//     return households > 15  ? '#FFFF4D' :
//            households > 5  ? '#FFFF4D' :
//            households > 0  ? '#FFFF99' :
//            false;
//   }     
//   else return "transparent";
// }


// Initially filter the markers
  


// mapLanguage.touchZoom.disable();
mapLanguage.doubleClickZoom.disable();
mapLanguage.scrollWheelZoom.disable();
// mapRestaurants.touchZoom.disable();
mapRestaurants.doubleClickZoom.disable();
mapRestaurants.scrollWheelZoom.disable();


  function heatMap(type) {
    
    if (type === undefined) {
    type = "Vietnamese";
    }
    else {
      type == type;
    } 
          
    if (type == "Vietnamese") {   
      heatLayers.clearLayers();
      heatViet.addTo(mapRestaurantsheatLayers);
      } 
      else if (type == "Mexican") {
      heatLayers.clearLayers();
      heatMex.addTo(mapRestaurantsheatLayers);
      }
      else if (type == "African") {
      heatLayers.clearLayers();
      heatAfr.addTo(mapRestaurantsheatLayers);
      }
      else if (type == "Russian") {
      heatLayers.clearLayers();
      heatRus.addTo(mapRestaurantsheatLayers);
      }
      else if (type == "Indian")  {
      heatLayers.clearLayers();
      heatInd.addTo(mapRestaurantsheatLayers);
      }
      else if (type == "Korean")  {
      heatLayers.clearLayers();
      heatKor.addTo(mapRestaurantsheatLayers);
      }
      else if (type == "Chinese") {
      heatLayers.clearLayers();
      heatChi.addTo(mapRestaurantsheatLayers);
      }
      else if (type == "Japanese")  {
      heatLayers.clearLayers();
      heatJap.addTo(mapRestaurantsheatLayers);
      }
      
      else {}
    }   




//Let the D3 begin!    

mapRestaurants.sync(mapLanguage);
mapLanguage.sync(mapRestaurants);

//Start the svg     
  mapRestaurants._initPathRoot();

var svgChinese = d3.select("#mapRestaurants").select("svg");
var gYelpChinese = svgChinese.append("g").attr("class", "gYelpChinese");

d3.csv("seattlerestaurants.csv", function(datacsv) {
  datacsv.forEach(function(d) {
    d.LatLng = new L.LatLng(d.Lat,d.Lon)})  
    datacsv.sort(function(a,b) {return b.Reviews-a.Reviews;});
    var circleYelpChinese = gYelpChinese.selectAll("circle")
      .data(datacsv)
      .enter()
      .append("circle");
      
  function update() {
    var max = d3.max(datacsv, function(d) { return +d.Reviews;});
    var min = d3.min(datacsv, function(d) { return +d.Reviews;});      
    var oScale = d3.scale.linear()
      .domain([min, max])
      .range([0.8,0.2]);
    circleYelpChinese.attr("cx",function(d) { return mapRestaurants.latLngToLayerPoint(d.LatLng).x});
    circleYelpChinese.attr("cy",function(d) { return mapRestaurants.latLngToLayerPoint(d.LatLng).y});
    circleYelpChinese.attr("r", function(d) { 
      if (d.Reviews > 10) { return Math.sqrt(parseInt(d.Reviews) * 0.15); }
      else if (d.Reviews > 50) { return Math.sqrt(parseInt(d.Reviews) * .05);}
      else { return 10; }
    });
    circleYelpChinese.attr("callit", function(d) {return d.Name});
    circleYelpChinese.style("fill", function(d) {
      if (d.Category == "indian") { return "rgba(210, 84, 249," + (Math.sqrt(oScale(d.Reviews) * 0.25)) + ")";} 
      else if (d.Category == "vietnamese") { return "rgba(252,255,0," + (Math.sqrt(oScale(d.Reviews) * 0.25)) + ")";}
      else if (d.Category == "korean") { return "rgba(255, 71, 25," + (Math.sqrt(oScale(d.Reviews) * 0.25)) + ")";}
      else if (d.Category == "african") { return "rgba(0, 138, 230," + (Math.sqrt(oScale(d.Reviews) * 0.25)) + ")";}      
      else if (d.Category == "mexican") { return "rgba(0, 204, 102," + (Math.sqrt(oScale(d.Reviews) * 0.25)) + ")";}     
      else if (d.Category == "chinese") { return "rgba(153, 153, 102," + (Math.sqrt(oScale(d.Reviews) * 0.25)) + ")";}
      else {return "rgba(0,0,0,0)";}
    })
    circleYelpChinese.style("stroke", "rgba(255,255,255,.5)");
  }

  mapRestaurants.on("viewreset", update);
  update();   

var lineStyle = {
  color: "transparent",
  opacity:1,
  weight: 2,
  dashArray: "3,5"
  };

function addDataToMap(data, mapLanguage, mapRestaurants) {
    dataLayer = L.geoJson(data, 
      {style: lineStyle});
    dataLayer1 = L.geoJson(data, {style: lineStyle});
    dataLayer.addTo(mapRestaurants);
    dataLayer1.addTo(mapLanguage);
    dataLayer.bringToFront();
    dataLayer1.bringToFront();
}
$.getJSON("poi.geojson", function(data) { addDataToMap(data, mapLanguage, mapRestaurants); });

//var uw =  L.marker([47.64041,-122.132263]).bindLabel('University of Washington').addTo(mapLanguage);
//var uw1 =  L.marker([47.64041, -122.132263]).bindLabel('University of Washington').addTo(mapLanguage);
// function addPoiData(poiData){  
//   dataLayer.addData(topoData);
//   topoLayer.addTo(mapLanguage);
//   topoLayer.eachLayer(handleLayer);
// }


  
 var universityBounds = [[47.592,-122.408],[47.713,-122.194]];
 var techBounds = [[47.587,-122.237],[47.707,-122.022]];
 var chinatownBounds = [[47.54734,-122.41707],[47.664,-122.205]];
 var rainierBounds = [[47.480,-122.384],[47.600,-122.170]];
 var startBounds = [[47.554,-122.439],[47.674,-122.223]];

 $('#university').click(function() {
    mapLanguage.fitBounds(universityBounds, {reset:true});
    mapRestaurants.fitBounds(universityBounds, {reset:true});

    var focusValue = parseInt($(this).val());
    var focusName = $(this).attr('id');
    console.log(focusName);
        $(".info-pane").hide();
    $(".current-nav").removeClass("current-nav");
    $(this).addClass("current-nav");
    $("#"+focusName+".info-pane").show();
        dataLayer.eachLayer(function(layer) {
      var id = layer.feature.properties.id;
      if (id == focusValue) {
        layer.setStyle({color: "rgba(65, 87, 95,.7)", opacity: 1});
      }
      else {
        layer.setStyle({color: "gray", opacity: 0});
      }
    });

    dataLayer1.eachLayer(function(layer) {
      var id = layer.feature.properties.id;
      if (id == focusValue) {
        layer.setStyle({color: "rgba(65, 87, 95,.7)", opacity: 1});
      }
      else {
        layer.setStyle({color: "gray", opacity: 0});
      }
    });    

  $(".map-label").remove();
    
  var labelL = new L.Label({className: "map-label"});
          labelL.setContent("University of Washington");
          labelL.setLatLng([47.65,-122.2975]);
          mapLanguage.showLabel(labelL);

  var labelR = new L.Label({className: "map-label"});
          labelR.setContent("University of Washington");
          labelR.setLatLng([47.65,-122.2975]);
          mapRestaurants.showLabel(labelR);

  });

 $('#microsoftCampus').click(function() {
   mapLanguage.fitBounds(techBounds, {reset:true});
   mapRestaurants.fitBounds(techBounds, {reset:true});

   var focusValue = parseInt($(this).val());
   var focusName = $(this).attr('id');
   console.log(focusName);
    $(".info-pane").hide();
    $(".current-nav").removeClass("current-nav");
    $(this).addClass("current-nav");
    $(".current-nav").removeClass("current-nav");
    $(this).addClass("current-nav");
    $("#"+focusName+".info-pane").show();
             dataLayer.eachLayer(function(layer) {
      var id = layer.feature.properties.id;
      if (id == focusValue) {
        layer.setStyle({color: "rgba(65, 87, 95,.7)", opacity: 1});
      }
      else {
        layer.setStyle({color: "gray", opacity: 0});      
      }
    });

    dataLayer1.eachLayer(function(layer) {
      var id = layer.feature.properties.id;
      if (id == focusValue) {
        layer.setStyle({color: "rgba(65, 87, 95,.7)", opacity: 1});
      }
      else {
        layer.setStyle({color: "gray", opacity: 0});
      }
    });    

  $(".map-label").remove();

  var labelL = new L.Label({className: "map-label"});
          labelL.setContent("Microsoft Campus");
          labelL.setLatLng([47.652,-122.140]);
          mapLanguage.showLabel(labelL);

  var labelR = new L.Label({className: "map-label"});
          labelR.setContent("Microsoft Campus");
          labelR.setLatLng([47.652,-122.140]);
          mapRestaurants.showLabel(labelR); 

   });

 $('#internationalDistrict').click(function() {
    mapLanguage.fitBounds(chinatownBounds, {reset:true});
    mapRestaurants.fitBounds(chinatownBounds, {reset:true});

    var focusValue = parseInt($(this).val());
    var focusName = $(this).attr('id');
    console.log(focusName);
        $(".info-pane").hide();
    $(".current-nav").removeClass("current-nav");
    $(this).addClass("current-nav");
    $("#"+focusName+".info-pane").show();
    var focusName = $(this).attr('id');
    console.log(focusName);
        $(".info-pane").hide();
    $(".current-nav").removeClass("current-nav");
    $(this).addClass("current-nav");
    $("#"+focusName+".info-pane").show();
    dataLayer.eachLayer(function(layer) {
      var id = layer.feature.properties.id;
      if (id == focusValue) {
        layer.setStyle({color: "rgba(65, 87, 95,.7)", opacity: 1});
      }
      else {
        layer.setStyle({color: "gray", opacity: 0});
      }
    });

    dataLayer1.eachLayer(function(layer) {
      var id = layer.feature.properties.id;
      if (id == focusValue) {
        layer.setStyle({color: "rgba(65, 87, 95,.7)", opacity: 1});
      }
      else {
        layer.setStyle({color: "gray", opacity: 0});
      }
    });    

  $(".map-label").remove();
    
  var labelL = new L.Label({className: "map-label"});
          labelL.setContent("Chinatown / Little Saigon");
          labelL.setLatLng([47.591,-122.35]);
          mapLanguage.showLabel(labelL);

  var labelR = new L.Label({className: "map-label"});
          labelR.setContent("Chinatown / Little Saigon");
          labelR.setLatLng([47.591,-122.35]);
          mapRestaurants.showLabel(labelR);

  });

  $('#rainierValley').click(function() {
    mapLanguage.fitBounds(rainierBounds, {reset:true});
    mapRestaurants.fitBounds(rainierBounds, {reset:true});

    var focusValue = parseInt($(this).val());
    var focusName = $(this).attr('id');
    console.log(focusName);
    $(".info-pane").hide();
    $(".current-nav").removeClass("current-nav");
    $(this).addClass("current-nav");
    $("#"+focusName+".info-pane").show();
            dataLayer.eachLayer(function(layer) {
      var id = layer.feature.properties.id;
      if (id == focusValue) {
        layer.setStyle({color: "rgba(65, 87, 95,.7)", opacity: 1});
      }
      else {
        layer.setStyle({color: "gray", opacity: 0});
      }
    });

    dataLayer1.eachLayer(function(layer) {
      var id = layer.feature.properties.id;
      if (id == focusValue) {
        layer.setStyle({color: "rgba(65, 87, 95,.7)", opacity: 1});
      }
      else {
        layer.setStyle({color: "gray", opacity: 0});
      }
    });    

  $(".map-label").remove();
    
  var labelL = new L.Label({className: "map-label"});
          labelL.setContent("Rainier Avenue");
          labelL.setLatLng([47.566,-122.3]);
          mapLanguage.showLabel(labelL);

  var labelR = new L.Label({className: "map-label"});
          labelR.setContent("Rainier Avenue");
          labelR.setLatLng([47.566,-122.3]);
          mapRestaurants.showLabel(labelR);

  });

  $('#startHere').click(function() {
    mapLanguage.fitBounds(startBounds, {reset:true});
    mapRestaurants.fitBounds(startBounds, {reset:true});

    var focusValue = parseInt($(this).val());
    var focusName = $(this).attr('id');
    console.log(focusName);
        $(".info-pane").hide();
    $(".current-nav").removeClass("current-nav");
    $(this).addClass("current-nav");
    $("#"+focusName+".info-pane").show();
            dataLayer.eachLayer(function(layer) {
      var id = layer.feature.properties.id;
      if (id == focusValue) {
        layer.setStyle({color: "rgba(65, 87, 95,.7)", opacity: 1});
      }
      else {
        layer.setStyle({color: "gray", opacity: 0});
      }
    });

    dataLayer1.eachLayer(function(layer) {
      var id = layer.feature.properties.id;
      if (id == focusValue) {
        layer.setStyle({color: "rgba(65, 87, 95,.7)", opacity: 1});
      }
      else {
        layer.setStyle({color: "gray", opacity: 0});
      }
    });    

  $(".map-label").remove();
    
  // var labelL = new L.Label({className: "map-label"});
  //         labelL.setContent("Rainier Avenue");
  //         labelL.setLatLng([47.566,-122.3]);
  //         mapLanguage.showLabel(labelL);

  // var labelR = new L.Label({className: "map-label"});
  //         labelR.setContent("Rainier Avenue");
  //         labelR.setLatLng([47.566,-122.3]);
  //         mapRestaurants.showLabel(labelR);

  });

$(".filter").click(function(){


  var processEachLayer = function() {

    topoLayer.eachLayer(function (layer) {
        console.log("topo");
        var language = layer.feature.properties.winner;
       
        // check each marker's symbol to see if its value is in the list
        // of symbols that should be on, stored in the 'on' array
        if (turnedOn.indexOf(language) !== -1) {
          //console.log("yes");
          layer.setStyle({
            fillOpacity: 1, 
            opacity: 1
          });


        }
        else {
            layer.setStyle({
            fillOpacity: 0,
            opacity: 0 
        });
        }
    });



    var yelpCategory = d3.selectAll("circle");
    yelpCategory.each(function(d) {

        cat = d.Category;
         if (turnedOn.indexOf(cat) !== -1) {
            d3.select(this).style("display","initial");
              }
        else {
            d3.select(this).style("display","none");

        }
    });

  }

  if (this.value == "toggle") {

    var checkboxes = document.getElementsByClassName('checkbox');
    console.log(checkboxes.length);
    var turnedOn = [];

    $(".checkbox").prop('checked', $('.toggle').prop("checked"));
    console.log("toggle!");

    for (var i = 0; i < checkboxes.length; i++) {
        console.log(checkboxes[i].value);
      if (checkboxes[i].checked) turnedOn.push(checkboxes[i].value);
      console.log(turnedOn);

    
  }
  processEachLayer();
}

  else {

  var checkboxes = document.getElementsByClassName('checkbox');
  var turnedOn = [];

    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) turnedOn.push(checkboxes[i].value);
      console.log(turnedOn);
    }

    processEachLayer();
  }





   

   


});


});










});

