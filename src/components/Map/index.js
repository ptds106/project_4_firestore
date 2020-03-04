import React, { Component } from 'react';
import './styles.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class Map extends Component {
  componentDidMount() {
    
    let map = am4core.create("chartdiv", am4maps.MapChart);
    map.geodata = am4geodata_worldHigh;
    let polygonSeries = new am4maps.MapPolygonSeries();
    polygonSeries.useGeodata = true;
    map.series.push(polygonSeries);

    let polygonTemplate = polygonSeries.mapPolygons.template;
    
    polygonTemplate.tooltipText = "{name}: {value}";
    polygonTemplate.fill = am4core.color("#74B266");

    // Create hover state and set alternative fill color
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");
    polygonSeries.data = [{
      "id": "US",
      "name": "United States",
      "value": 100,
      "fill": am4core.color("#F05C5C")
    }, {
      "id": "FR",
      "name": "France",
      "value": 50,
      "fill": am4core.color("#5C5CFF")
    }];
    
    polygonTemplate.propertyFields.fill = "fill";
  }
  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
  componentDidUpdate(oldProps) {

  }
  render() {
    return (
      <>
      <br/>
      <div id="chartdiv" ></div>
      </>
    );
  }
}

export default Map;