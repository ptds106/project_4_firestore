import React, { Component } from 'react';
import './styles.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
// import * as am4charts from "@amcharts/amcharts4/charts";
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
    // map.projection = new am4maps.projections.Orthographic();

    let polygonSeries = new am4maps.MapPolygonSeries();
    polygonSeries.useGeodata = true;
    map.series.push(polygonSeries);
    map.deltaLatitude = -30;
    let polygonTemplate = polygonSeries.mapPolygons.template;

    map.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#aadaff");
    map.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
   
   
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
      map.openPopup('<strong><bold>' + ev.target.dataItem.dataContext.name +
        "</bold></strong> <br/> Confirmed Count <strong>" + confirmedCount + "</strong> <br/> Dead Count <strong>" + deadCount +
        "</strong> <br/> Cured Count <strong>" + curedCount + "</strong> <br/>");

    });

    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#74B266");
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");
    polygonTemplate.propertyFields.fill = "fill";


    let dataArray = []
    polygonSeries.data = JSON.parse(JSON.stringify(dataArray));

    console.log(polygonSeries.dat)
  }

  render() {
    return (
      <>
        <br />
        <div id="chartdiv"
          onClick={this.handleChange}></div>
      </>
    );
  }
}

export default Map;