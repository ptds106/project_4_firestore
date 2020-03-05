import React, { Component } from 'react';
import './styles.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Data from '../../Data/region'
am4core.useTheme(am4themes_animated);

class Map extends Component {
  state = {
    names: [],
  }

  componentDidMount() {
   
    let map = am4core.create("chartdiv", am4maps.MapChart);
    map.geodata = am4geodata_worldHigh;
    map.projection = new am4maps.projections.Orthographic();
    let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    // let polygonSeries = new am4maps.MapPolygonSeries();
    polygonSeries.useGeodata = true;
    map.series.push(polygonSeries);

    let chart = am4core.create("chartdivs", am4charts.PieChart);
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    chart.legend = new am4charts.Legend()

    let polygonTemplate = polygonSeries.mapPolygons.template;

    map.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#aadaff");
    map.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
    let grid = map.series.push(new am4maps.GraticuleSeries());
    grid.toBack();
    grid.mapLines.template.line.stroke = am4core.color("#e33");
    grid.mapLines.template.line.strokeOpacity = 0.2;
    grid.longitudeStep = 20;
    grid.latitudeStep = 20;
    grid.fitExtent = false;
    map.panBehavior = "rotateLongLat";

    
    polygonTemplate.events.on("hit", function (ev) {
      let curedCount = 0;
      let confirmedCount = 0;
      let deadCount = 0;
      let a = [];
      let getUndefined = [];

      if (ev.target.dataItem.dataContext.name === "South Korea") {
        ev.target.dataItem.dataContext.name = "Korea"
      }

      if (ev.target.dataItem.dataContext.name === "United States") {
        ev.target.dataItem.dataContext.name = "United States of America"
      }

      for (let i = 0; i < Data.length; i++) {
        if (Data[i]["countryEnglishName"] === ev.target.dataItem.dataContext.name) {
          a.push(Data[i])
        }
      }

      getUndefined = a.filter(ele => ele['countryEnglishName'] === ev.target.dataItem.dataContext.name)

      if (getUndefined.length === 0) {
        curedCount = 0;
        confirmedCount = 0;
        deadCount = 0;
      }

      else if (ev.target.dataItem.dataContext.name === 'China') {
        for (let i = 0; i < a.length; i++) {
          if (a[i]['curedCount'] !== null || a[i]['curedCount'] !== undefined) {
            curedCount += a[i]['curedCount']
            confirmedCount += a[i]['confirmedCount']
            deadCount += a[i]['deadCount']
          }
        }
      }

      else if (ev.target.dataItem.dataContext.name !== 'China') {
        curedCount += a[0]['curedCount']
        confirmedCount += a[0]['confirmedCount']
        deadCount += a[0]['deadCount']

      }

      map.closeAllPopups();
      let popup = map.openPopup(' <div id="chartdivs"></div> <strong><bold>' + ev.target.dataItem.dataContext.name +
        "</bold></strong> <br/> Confirmed Count <strong>" + confirmedCount + "</strong> <br/> Dead Count <strong>" + deadCount +
        "</strong> <br/> Cured Count <strong>" + curedCount + "</strong> <br/>");
        popup.left = ev.svgPoint.x + 300;
        popup.top = ev.svgPoint.y + 15;
        chart.data = [{
          "status": "Cured Count",
          "Number of People": curedCount,
          "color": am4core.color("#235789")
        }, {
          "status": "confirmed Count",
          "Number of People": confirmedCount,
          "color": am4core.color("#F1D302")
        }, {
          "status": "Dead Count",
          "Number of People": deadCount,
          "color": am4core.color("#ED1C24")
        }];
        
      pieSeries.dataFields.value = "Number of People";
      pieSeries.dataFields.category = "status";
      pieSeries.slices.template.propertyFields.fill = "color";

    });

    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#74B266");
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("black");
    polygonTemplate.propertyFields.fill = "fill";
    this.chart = chart;
    this.map = map;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
    if (this.map) {
      this.map.dispose();
    }
  }
  render() {
    return (
      <>
        <br />
        <div id="chartdiv"></div><br/>
        <div id="chartdivs"></div>
      </>
    );
  }
}

export default Map;