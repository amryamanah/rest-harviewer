Ext.require('Ext.chart.*');
Ext.require(['Ext.Window', 'Ext.fx.target.Sprite', 'Ext.layout.container.Fit', 'Ext.window.MessageBox']);

var JSONDATA,
  storeData=[];

Ext.Ajax.request({
  method : "get",
  async  : true,
  url    : "http://ndoetz.rest-harviewer.jit.su/find/?label=yahoo",
  callback: function(options, success, response) {
    JSONDATA = JSON.parse(response.responseText).results;


  for (i=0;i<JSONDATA.length;i++){
    storeData.push({
     date: JSONDATA[i].date,
     fullLoadTime: JSONDATA[i].fullLoadTime,
     timeOnLoad: JSONDATA[i].timeOnLoad,
     timeOnContentLoad: JSONDATA[i].timeOnContentLoad,
     timeToFirstByte: JSONDATA[i].timeToFirstByte,
     dnsTime: JSONDATA[i].dnsTime,
     transferTime: JSONDATA[i].transferTime

    });

  }

    window.store1 = Ext.create('Ext.data.JsonStore', {
      fields: ['date','fullLoadTime', 'timeOnLoad','timeOnContentLoad','timeToFirstByte','dnsTime','transferTime'],
      data: storeData
    });

    store1.loadData(storeData);

    var chart = Ext.create('Ext.chart.Chart', {
      xtype: 'chart',
      style: 'background:#fff',
      animate: true,
      store: store1,
      shadow: true,
      theme: 'Category1',
      legend: {
        position: 'right'
      },
      axes: [{
        type: 'Numeric',
        minimum: 0,
        position: 'left',
        fields: ['fullLoadTime', 'timeOnLoad','timeOnContentLoad','timeToFirstByte','dnsTime','transferTime'],
        title: 'Number of Hits',
        minorTickSteps: 1,
        grid: {
          odd: {
            opacity: 1,
            fill: '#ddd',
            stroke: '#bbb',
            'stroke-width': 0.5
          }
        }
      }, {
        type: 'Category',
        position: 'bottom',
        fields: ['date'],
        title: 'Date'
      }],
      series: [{
        type: 'line',
        highlight: {
          size: 7,
          radius: 7
        },
        axis: 'left',
        xField: 'date',
        yField: 'fullLoadTime',
        markerConfig: {
          type: 'cross',
          size: 4,
          radius: 4,
          'stroke-width': 0
        }
      }, {
        type: 'line',
        highlight: {
          size: 7,
          radius: 7
        },
        axis: 'left',
        smooth: true,
        xField: 'date',
        yField: 'timeOnLoad',
        markerConfig: {
          type: 'circle',
          size: 4,
          radius: 4,
          'stroke-width': 0
        }
      }, {
        type: 'line',
        highlight: {
          size: 7,
          radius: 7
        },
        axis: 'left',
        smooth: true,
        fill: true,
        xField: 'date',
        yField: 'timeOnContentLoad',
        markerConfig: {
          type: 'circle',
          size: 4,
          radius: 4,
          'stroke-width': 0
        }
      },


        {
          type: 'line',
          highlight: {
            size: 7,
            radius: 7
          },
          axis: 'left',
          smooth: true,
          fill: true,
          xField: 'date',
          yField: 'timeToFirstByte',
          markerConfig: {
            type: 'circle',
            size: 4,
            radius: 4,
            'stroke-width': 0
          }
        },{
          type: 'line',
          highlight: {
            size: 7,
            radius: 7
          },
          axis: 'left',
          smooth: true,
          fill: true,
          xField: 'date',
          yField: 'dnsTime',
          markerConfig: {
            type: 'circle',
            size: 4,
            radius: 4,
            'stroke-width': 0
          }
        },{
          type: 'line',
          highlight: {
            size: 7,
            radius: 7
          },
          axis: 'left',
          smooth: true,
          fill: true,
          xField: 'date',
          yField: 'transferTime',
          markerConfig: {
            type: 'circle',
            size: 4,
            radius: 4,
            'stroke-width': 0
          }
        }











      ]
    });


    var win = Ext.create('Ext.Window', {
      width: 800,
      height: 600,
      minHeight: 400,
      minWidth: 550,
      hidden: false,
      maximizable: true,
      title: 'Line Chart',
      renderTo: Ext.getBody(),
      layout: 'fit',
      tbar: [{
        text: 'Save Chart',
        handler: function() {
          Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
            if(choice == 'yes'){
              chart.save({
                type: 'image/png'
              });
            }
          });
        }
      }, {
        text: 'Reload Data',
        handler: function() {

          store1.loadData(storeData);
        }
      }],
      items: chart
    });

  }
});






