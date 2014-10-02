AmCharts.AmSerialChart=AmCharts.Class({inherits:AmCharts.AmRectangularChart,construct:function(e){this.type="serial",AmCharts.AmSerialChart.base.construct.call(this,e),this.cname="AmSerialChart",this.theme=e,this.createEvents("changed"),this.columnSpacing=5,this.columnSpacing3D=0,this.columnWidth=.8,this.updateScrollbar=!0;var t=new AmCharts.CategoryAxis(e);t.chart=this,this.categoryAxis=t,this.zoomOutOnDataUpdate=!0,this.mouseWheelZoomEnabled=this.mouseWheelScrollEnabled=this.rotate=this.skipZoom=!1,this.minSelectedTime=0,AmCharts.applyTheme(this,e,this.cname)},initChart:function(){AmCharts.AmSerialChart.base.initChart.call(this),this.updateCategoryAxis(this.categoryAxis,this.rotate,"categoryAxis"),this.dataChanged&&(this.updateData(),this.dataChanged=!1,this.dispatchDataUpdated=!0);var e=this.chartCursor;e&&(e.updateData(),e.fullWidth&&(e.fullRectSet=this.cursorLineSet));var e=this.countColumns(),t=this.graphs,n;for(n=0;n<t.length;n++)t[n].columnCount=e;this.updateScrollbar=!0,this.drawChart(),this.autoMargins&&!this.marginsUpdated&&(this.marginsUpdated=!0,this.measureMargins()),(this.mouseWheelScrollEnabled||this.mouseWheelZoomEnabled)&&this.addMouseWheel()},handleWheelReal:function(e,t){if(!this.wheelBusy){var n=this.categoryAxis,r=n.parseDates,n=n.minDuration(),i=1;this.mouseWheelZoomEnabled?t||(i=-1):t&&(i=-1),0>e?r?(r=this.startTime+i*n,n=this.endTime+1*n,this.zoomToDates(new Date(r),new Date(n))):(r=this.start+i,n=this.end+1,this.zoomToIndexes(r,n)):r?(r=this.startTime-i*n,n=this.endTime-1*n,this.zoomToDates(new Date(r),new Date(n))):(r=this.start-i,n=this.end-1,this.zoomToIndexes(r,n))}},validateData:function(e){this.marginsUpdated=!1,this.zoomOutOnDataUpdate&&!e&&(this.endTime=this.end=this.startTime=this.start=NaN),AmCharts.AmSerialChart.base.validateData.call(this)},drawChart:function(){AmCharts.AmSerialChart.base.drawChart.call(this);var e=this.chartData;if(AmCharts.ifArray(e)){var t=this.chartScrollbar;t&&t.draw();if(0<this.realWidth&&0<this.realHeight){var e=e.length-1,n,t=this.categoryAxis;if(t.parseDates&&!t.equalSpacing){if(t=this.startTime,n=this.endTime,isNaN(t)||isNaN(n))t=this.firstTime,n=this.lastTime}else if(t=this.start,n=this.end,isNaN(t)||isNaN(n))t=0,n=e;this.endTime=this.startTime=this.end=this.start=void 0,this.zoom(t,n)}}else this.cleanChart();this.dispDUpd(),this.chartCreated=!0},cleanChart:function(){AmCharts.callMethod("destroy",[this.valueAxes,this.graphs,this.categoryAxis,this.chartScrollbar,this.chartCursor])},updateCategoryAxis:function(e,t,n){e.chart=this,e.id=n,e.rotate=t,e.axisRenderer=AmCharts.RecAxis,e.guideFillRenderer=AmCharts.RecFill,e.axisItemRenderer=AmCharts.RecItem,e.setOrientation(!this.rotate),e.x=this.marginLeftReal,e.y=this.marginTopReal,e.dx=this.dx,e.dy=this.dy,e.width=this.plotAreaWidth-1,e.height=this.plotAreaHeight-1,e.viW=this.plotAreaWidth-1,e.viH=this.plotAreaHeight-1,e.viX=this.marginLeftReal,e.viY=this.marginTopReal,e.marginsChanged=!0},updateValueAxes:function(){AmCharts.AmSerialChart.base.updateValueAxes.call(this);var e=this.valueAxes,t;for(t=0;t<e.length;t++){var n=e[t],r=this.rotate;n.rotate=r,n.setOrientation(r),r=this.categoryAxis;if(!r.startOnAxis||r.parseDates)n.expandMinMax=!0}},updateData:function(){this.parseData();var e=this.graphs,t,n=this.chartData;for(t=0;t<e.length;t++)e[t].data=n;0<n.length&&(this.firstTime=this.getStartTime(n[0].time),this.lastTime=this.getEndTime(n[n.length-1].time))},getStartTime:function(e){var t=this.categoryAxis;return AmCharts.resetDateToMin(new Date(e),t.minPeriod,1,t.firstDayOfWeek).getTime()},getEndTime:function(e){var t=AmCharts.extractPeriod(this.categoryAxis.minPeriod);return AmCharts.changeDate(new Date(e),t.period,t.count,!0).getTime()-1},updateMargins:function(){AmCharts.AmSerialChart.base.updateMargins.call(this);var e=this.chartScrollbar;e&&(this.getScrollbarPosition(e,this.rotate,this.categoryAxis.position),this.adjustMargins(e,this.rotate))},updateScrollbars:function(){AmCharts.AmSerialChart.base.updateScrollbars.call(this),this.updateChartScrollbar(this.chartScrollbar,this.rotate)},zoom:function(e,t){var n=this.categoryAxis;n.parseDates&&!n.equalSpacing?this.timeZoom(e,t):this.indexZoom(e,t),this.updateLegendValues()},timeZoom:function(e,t){var n=this.maxSelectedTime;isNaN(n)||(t!=this.endTime&&t-e>n&&(e=t-n,this.updateScrollbar=!0),e!=this.startTime&&t-e>n&&(t=e+n,this.updateScrollbar=!0));var r=this.minSelectedTime;if(0<r&&t-e<r){var i=Math.round(e+(t-e)/2),r=Math.round(r/2);e=i-r,t=i+r}var s=this.chartData,i=this.categoryAxis;if(AmCharts.ifArray(s)&&(e!=this.startTime||t!=this.endTime)){var o=i.minDuration(),r=this.firstTime,u=this.lastTime;e||(e=r,isNaN(n)||(e=u-n)),t||(t=u),e>u&&(e=u),t<r&&(t=r),e<r&&(e=r),t>u&&(t=u),t<e&&(t=e+o),t-e<o/5&&(t<u?t=e+o/5:e=t-o/5),this.startTime=e,this.endTime=t,n=s.length-1,o=this.getClosestIndex(s,"time",e,!0,0,n),s=this.getClosestIndex(s,"time",t,!1,o,n),i.timeZoom(e,t),i.zoom(o,s),this.start=AmCharts.fitToBounds(o,0,n),this.end=AmCharts.fitToBounds(s,0,n),this.zoomAxesAndGraphs(),this.zoomScrollbar(),e!=r||t!=u?this.showZB(!0):this.showZB(!1),this.updateColumnsDepth(),this.dispatchTimeZoomEvent()}},indexZoom:function(e,t){var n=this.maxSelectedSeries;isNaN(n)||(t!=this.end&&t-e>n&&(e=t-n,this.updateScrollbar=!0),e!=this.start&&t-e>n&&(t=e+n,this.updateScrollbar=!0));if(e!=this.start||t!=this.end){var r=this.chartData.length-1;isNaN(e)&&(e=0,isNaN(n)||(e=r-n)),isNaN(t)&&(t=r),t<e&&(t=e),t>r&&(t=r),e>r&&(e=r-1),0>e&&(e=0),this.start=e,this.end=t,this.categoryAxis.zoom(e,t),this.zoomAxesAndGraphs(),this.zoomScrollbar(),0!==e||t!=this.chartData.length-1?this.showZB(!0):this.showZB(!1),this.updateColumnsDepth(),this.dispatchIndexZoomEvent()}},updateGraphs:function(){AmCharts.AmSerialChart.base.updateGraphs.call(this);var e=this.graphs,t;for(t=0;t<e.length;t++){var n=e[t];n.columnWidthReal=this.columnWidth,n.categoryAxis=this.categoryAxis,AmCharts.isString(n.fillToGraph)&&(n.fillToGraph=this.getGraphById(n.fillToGraph))}},updateColumnsDepth:function(){var e,t=this.graphs,n;AmCharts.remove(this.columnsSet),this.columnsArray=[];for(e=0;e<t.length;e++){n=t[e];var r=n.columnsArray;if(r){var i;for(i=0;i<r.length;i++)this.columnsArray.push(r[i])}}this.columnsArray.sort(this.compareDepth);if(0<this.columnsArray.length){t=this.container.set(),this.columnSet.push(t);for(e=0;e<this.columnsArray.length;e++)t.push(this.columnsArray[e].column.set);n&&t.translate(n.x,n.y),this.columnsSet=t}},compareDepth:function(e,t){return e.depth>t.depth?1:-1},zoomScrollbar:function(){var e=this.chartScrollbar,t=this.categoryAxis;e&&this.updateScrollbar&&(t.parseDates&&!t.equalSpacing?e.timeZoom(this.startTime,this.endTime):e.zoom(this.start,this.end),this.updateScrollbar=!0)},updateTrendLines:function(){var e=this.trendLines,t;for(t=0;t<e.length;t++){var n=e[t],n=AmCharts.processObject(n,AmCharts.TrendLine,this.theme);e[t]=n,n.chart=this,AmCharts.isString(n.valueAxis)&&(n.valueAxis=this.getValueAxisById(n.valueAxis)),n.valueAxis||(n.valueAxis=this.valueAxes[0]),n.categoryAxis=this.categoryAxis}},zoomAxesAndGraphs:function(){if(!this.scrollbarOnly){var e=this.valueAxes,t;for(t=0;t<e.length;t++)e[t].zoom(this.start,this.end);e=this.graphs;for(t=0;t<e.length;t++)e[t].zoom(this.start,this.end);this.zoomTrendLines(),(t=this.chartCursor)&&t.zoom(this.start,this.end,this.startTime,this.endTime)}},countColumns:function(){var e=0,t=this.valueAxes.length,n=this.graphs.length,r,i,s=!1,o,u;for(u=0;u<t;u++){i=this.valueAxes[u];var a=i.stackType;if("100%"==a||"regular"==a)for(s=!1,o=0;o<n;o++)r=this.graphs[o],r.tcc=1,r.valueAxis==i&&"column"==r.type&&(!s&&r.stackable&&(e++,s=!0),(!r.stackable&&r.clustered||r.newStack)&&e++,r.columnIndex=e-1,r.clustered||(r.columnIndex=0));if("none"==a||"3d"==a)for(o=0;o<n;o++)r=this.graphs[o],r.valueAxis==i&&"column"==r.type&&r.clustered&&(r.tcc=1,r.newStack&&(e=0),r.hidden||(r.columnIndex=e,e++));if("3d"==a){i=1;for(u=0;u<n;u++)r=this.graphs[u],r.newStack&&i++,r.depthCount=i,r.tcc=e;e=i}}return e},parseData:function(){AmCharts.AmSerialChart.base.parseData.call(this),this.parseSerialData()},getCategoryIndexByValue:function(e){var t=this.chartData,n,r;for(r=0;r<t.length;r++)t[r].category==e&&(n=r);return n},handleCursorChange:function(e){this.updateLegendValues(e.index)},handleCursorZoom:function(e){this.updateScrollbar=!0,this.zoom(e.start,e.end)},handleScrollbarZoom:function(e){this.updateScrollbar=!1,this.zoom(e.start,e.end)},dispatchTimeZoomEvent:function(){if(this.prevStartTime!=this.startTime||this.prevEndTime!=this.endTime){var e={type:"zoomed"};e.startDate=new Date(this.startTime),e.endDate=new Date(this.endTime),e.startIndex=this.start,e.endIndex=this.end,this.startIndex=this.start,this.endIndex=this.end,this.startDate=e.startDate,this.endDate=e.endDate,this.prevStartTime=this.startTime,this.prevEndTime=this.endTime;var t=this.categoryAxis,n=AmCharts.extractPeriod(t.minPeriod).period,t=t.dateFormatsObject[n];e.startValue=AmCharts.formatDate(e.startDate,t),e.endValue=AmCharts.formatDate(e.endDate,t),e.chart=this,e.target=this,this.fire(e.type,e)}},dispatchIndexZoomEvent:function(){if(this.prevStartIndex!=this.start||this.prevEndIndex!=this.end){this.startIndex=this.start,this.endIndex=this.end;var e=this.chartData;if(AmCharts.ifArray(e)&&!isNaN(this.start)&&!isNaN(this.end)){var t={chart:this,target:this,type:"zoomed"};t.startIndex=this.start,t.endIndex=this.end,t.startValue=e[this.start].category,t.endValue=e[this.end].category,this.categoryAxis.parseDates&&(this.startTime=e[this.start].time,this.endTime=e[this.end].time,t.startDate=new Date(this.startTime),t.endDate=new Date(this.endTime)),this.prevStartIndex=this.start,this.prevEndIndex=this.end,this.fire(t.type,t)}}},updateLegendValues:function(e){var t=this.graphs,n;for(n=0;n<t.length;n++){var r=t[n];isNaN(e)?r.currentDataItem=void 0:r.currentDataItem=this.chartData[e].axes[r.valueAxis.id].graphs[r.id]}this.legend&&this.legend.updateValues()},getClosestIndex:function(e,t,n,r,i,s){0>i&&(i=0),s>e.length-1&&(s=e.length-1);var o=i+Math.round((s-i)/2),u=e[o][t];return 1>=s-i?r?i:(r=e[s][t],Math.abs(e[i][t]-n)<Math.abs(r-n)?i:s):n==u?o:n<u?this.getClosestIndex(e,t,n,r,i,o):this.getClosestIndex(e,t,n,r,o,s)},zoomToIndexes:function(e,t){this.updateScrollbar=!0;var n=this.chartData;if(n){var r=n.length;0<r&&(0>e&&(e=0),t>r-1&&(t=r-1),r=this.categoryAxis,r.parseDates&&!r.equalSpacing?this.zoom(n[e].time,this.getEndTime(n[t].time)):this.zoom(e,t))}},zoomToDates:function(e,t){this.updateScrollbar=!0;var n=this.chartData;if(this.categoryAxis.equalSpacing){var r=this.getClosestIndex(n,"time",e.getTime(),!0,0,n.length);t=AmCharts.resetDateToMin(t,this.categoryAxis.minPeriod,1),n=this.getClosestIndex(n,"time",t.getTime(),!1,0,n.length),this.zoom(r,n)}else this.zoom(e.getTime(),t.getTime())},zoomToCategoryValues:function(e,t){this.updateScrollbar=!0,this.zoom(this.getCategoryIndexByValue(e),this.getCategoryIndexByValue(t))},formatPeriodString:function(e,t){if(t){var n=["value","open","low","high","close"],r="value open low high close average sum count".split(" "),i=t.valueAxis,s=this.chartData,o=t.numberFormatter;o||(o=this.nf);for(var u=0;u<n.length;u++){for(var a=n[u],f=0,l=0,c,h,p,d,v,m=0,g=0,y,b,w,E,S,x=this.start;x<=this.end;x++){var T=s[x];if(T&&(T=T.axes[i.id].graphs[t.id])){if(T.values){var N=T.values[a];if(!isNaN(N)){isNaN(c)&&(c=N),h=N;if(isNaN(p)||p>N)p=N;if(isNaN(d)||d<N)d=N;v=AmCharts.getDecimals(f);var C=AmCharts.getDecimals(N),f=f+N,f=AmCharts.roundTo(f,Math.max(v,C));l++,v=f/l}}if(T.percents&&(T=T.percents[a],!isNaN(T))){isNaN(y)&&(y=T),b=T;if(isNaN(w)||w>T)w=T;if(isNaN(E)||E<T)E=T;S=AmCharts.getDecimals(m),N=AmCharts.getDecimals(T),m+=T,m=AmCharts.roundTo(m,Math.max(S,N)),g++,S=m/g}}}m={open:y,close:b,high:E,low:w,average:S,sum:m,count:g},e=AmCharts.formatValue(e,{open:c,close:h,high:d,low:p,average:v,sum:f,count:l},r,o,a+"\\.",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers),e=AmCharts.formatValue(e,m,r,this.pf,"percents\\."+a+"\\.")}}return e},formatString:function(e,t,n){var r=t.graph;if(-1!=e.indexOf("[[category]]")){var i=t.serialDataItem.category;if(this.categoryAxis.parseDates){var s=this.balloonDateFormat,o=this.chartCursor;o&&(s=o.categoryBalloonDateFormat),-1!=e.indexOf("[[category]]")&&(s=AmCharts.formatDate(i,s),-1!=s.indexOf("fff")&&(s=AmCharts.formatMilliseconds(s,i)),i=s)}e=e.replace(/\[\[category\]\]/g,String(i))}return r=r.numberFormatter,r||(r=this.nf),i=t.graph.valueAxis,(s=i.duration)&&!isNaN(t.values.value)&&(i=AmCharts.formatDuration(t.values.value,s,"",i.durationUnits,i.maxInterval,r),e=e.replace(RegExp("\\[\\[value\\]\\]","g"),i)),i="value open low high close total".split(" "),s=this.pf,e=AmCharts.formatValue(e,t.percents,i,s,"percents\\."),e=AmCharts.formatValue(e,t.values,i,r,"",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers),e=AmCharts.formatValue(e,t.values,["percents"],s),-1!=e.indexOf("[[")&&(e=AmCharts.formatDataContextValue(e,t.dataContext)),e=AmCharts.AmSerialChart.base.formatString.call(this,e,t,n)},addChartScrollbar:function(e){AmCharts.callMethod("destroy",[this.chartScrollbar]),e&&(e.chart=this,this.listenTo(e,"zoomed",this.handleScrollbarZoom)),this.rotate?void 0===e.width&&(e.width=e.scrollbarHeight):void 0===e.height&&(e.height=e.scrollbarHeight),this.chartScrollbar=e},removeChartScrollbar:function(){AmCharts.callMethod("destroy",[this.chartScrollbar]),this.chartScrollbar=null},handleReleaseOutside:function(e){AmCharts.AmSerialChart.base.handleReleaseOutside.call(this,e),AmCharts.callMethod("handleReleaseOutside",[this.chartScrollbar])}}),AmCharts.Cuboid=AmCharts.Class({construct:function(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d){this.set=e.set(),this.container=e,this.h=Math.round(n),this.w=Math.round(t),this.dx=r,this.dy=i,this.colors=s,this.alpha=o,this.bwidth=u,this.bcolor=a,this.balpha=f,this.colors=s,this.dashLength=p,this.pattern=d,h?0>t&&0===l&&(l=180):0>n&&270==l&&(l=90),this.gradientRotation=l,0===r&&0===i&&(this.cornerRadius=c),this.draw()},draw:function(){var e=this.set;e.clear();var t=this.container,n=this.w,r=this.h,i=this.dx,s=this.dy,o=this.colors,u=this.alpha,a=this.bwidth,f=this.bcolor,l=this.balpha,c=this.gradientRotation,h=this.cornerRadius,p=this.dashLength,d=this.pattern,v=o,m=o;"object"==typeof o&&(v=o[0],m=o[o.length-1]);var g,y,b,w,E,S,x,T,N,C=u;d&&(u=0);if(0<i||0<s)x=m,m=AmCharts.adjustLuminosity(v,-0.2),m=AmCharts.adjustLuminosity(v,-0.2),g=AmCharts.polygon(t,[0,i,n+i,n,0],[0,s,s,0,0],m,u,1,f,0,c),0<l&&(N=AmCharts.line(t,[0,i,n+i],[0,s,s],f,l,a,p)),y=AmCharts.polygon(t,[0,0,n,n,0],[0,r,r,0,0],m,u,1,f,0,c),y.translate(i,s),0<l&&(b=AmCharts.line(t,[i,i],[s,s+r],f,l,a,p)),w=AmCharts.polygon(t,[0,0,i,i,0],[0,r,r+s,s,0],m,u,1,f,0,c),E=AmCharts.polygon(t,[n,n,n+i,n+i,n],[0,r,r+s,s,0],m,u,1,f,0,c),0<l&&(S=AmCharts.line(t,[n,n+i,n+i,n],[0,s,r+s,r],f,l,a,p)),m=AmCharts.adjustLuminosity(x,.2),x=AmCharts.polygon(t,[0,i,n+i,n,0],[r,r+s,r+s,r,r],m,u,1,f,0,c),0<l&&(T=AmCharts.line(t,[0,i,n+i],[r,r+s,r+s],f,l,a,p));u=C,1>Math.abs(r)&&(r=0),1>Math.abs(n)&&(n=0),t=0===r?AmCharts.line(t,[0,n],[0,0],f,l,a,p):0===n?AmCharts.line(t,[0,0],[0,r],f,l,a,p):0<h?AmCharts.rect(t,n,r,o,u,a,f,l,h,c,p):AmCharts.polygon(t,[0,0,n,n,0],[0,r,r,0,0],o,u,a,f,l,c,!1,p),r=0>r?[g,N,y,b,w,E,S,x,T,t]:[x,T,y,b,w,E,g,N,S,t];for(g=0;g<r.length;g++)(y=r[g])&&e.push(y);d&&t.pattern(d)},width:function(e){this.w=e,this.draw()},height:function(e){this.h=e,this.draw()},animateHeight:function(e,t){var n=this;n.easing=t,n.totalFrames=Math.round(1e3*e/AmCharts.updateRate),n.rh=n.h,n.frame=0,n.height(1),setTimeout(function(){n.updateHeight.call(n)},AmCharts.updateRate)},updateHeight:function(){var e=this;e.frame++;var t=e.totalFrames;e.frame<=t&&(t=e.easing(0,e.frame,1,e.rh-1,t),e.height(t),setTimeout(function(){e.updateHeight.call(e)},AmCharts.updateRate))},animateWidth:function(e,t){var n=this;n.easing=t,n.totalFrames=Math.round(1e3*e/AmCharts.updateRate),n.rw=n.w,n.frame=0,n.width(1),setTimeout(function(){n.updateWidth.call(n)},AmCharts.updateRate)},updateWidth:function(){var e=this;e.frame++;var t=e.totalFrames;e.frame<=t&&(t=e.easing(0,e.frame,1,e.rw-1,t),e.width(t),setTimeout(function(){e.updateWidth.call(e)},AmCharts.updateRate))}}),AmCharts.CategoryAxis=AmCharts.Class({inherits:AmCharts.AxisBase,construct:function(e){this.cname="CategoryAxis",AmCharts.CategoryAxis.base.construct.call(this,e),this.minPeriod="DD",this.equalSpacing=this.parseDates=!1,this.position="bottom",this.startOnAxis=!1,this.firstDayOfWeek=1,this.gridPosition="middle",this.markPeriodChange=this.boldPeriodBeginning=!0,this.safeDistance=30,this.centerLabelOnFullPeriod=!0,this.periods=[{period:"ss",count:1},{period:"ss",count:5},{period:"ss",count:10},{period:"ss",count:30},{period:"mm",count:1},{period:"mm",count:5},{period:"mm",count:10},{period:"mm",count:30},{period:"hh",count:1},{period:"hh",count:3},{period:"hh",count:6},{period:"hh",count:12},{period:"DD",count:1},{period:"DD",count:2},{period:"DD",count:3},{period:"DD",count:4},{period:"DD",count:5},{period:"WW",count:1},{period:"MM",count:1},{period:"MM",count:2},{period:"MM",count:3},{period:"MM",count:6},{period:"YYYY",count:1},{period:"YYYY",count:2},{period:"YYYY",count:5},{period:"YYYY",count:10},{period:"YYYY",count:50},{period:"YYYY",count:100}],this.dateFormats=[{period:"fff",format:"JJ:NN:SS"},{period:"ss",format:"JJ:NN:SS"},{period:"mm",format:"JJ:NN"},{period:"hh",format:"JJ:NN"},{period:"DD",format:"MMM DD"},{period:"WW",format:"MMM DD"},{period:"MM",format:"MMM"},{period:"YYYY",format:"YYYY"}],this.nextPeriod={},this.nextPeriod.fff="ss",this.nextPeriod.ss="mm",this.nextPeriod.mm="hh",this.nextPeriod.hh="DD",this.nextPeriod.DD="MM",this.nextPeriod.MM="YYYY",AmCharts.applyTheme(this,e,this.cname)},draw:function(){AmCharts.CategoryAxis.base.draw.call(this),this.generateDFObject();var e=this.chart.chartData;this.data=e;if(AmCharts.ifArray(e)){var t,n=this.chart,r=this.start,i=this.labelFrequency,s=0;t=this.end-r+1;var o=this.gridCountR,u=this.showFirstLabel,a=this.showLastLabel,f,l="",c=AmCharts.extractPeriod(this.minPeriod);f=AmCharts.getPeriodDuration(c.period,c.count);var h,p,d,v,m,g;h=this.rotate;var y=this.firstDayOfWeek,b=this.boldPeriodBeginning,e=AmCharts.resetDateToMin(new Date(e[e.length-1].time+1.05*f),this.minPeriod,1,y).getTime(),w;this.endTime>e&&(this.endTime=e),g=this.minorGridEnabled;var E,e=this.gridAlpha,S;if(this.parseDates&&!this.equalSpacing){this.timeDifference=this.endTime-this.startTime,r=this.choosePeriod(0),i=r.period,h=r.count,p=AmCharts.getPeriodDuration(i,h),p<f&&(i=c.period,h=c.count,p=f),d=i,"WW"==d&&(d="DD"),this.stepWidth=this.getStepWidth(this.timeDifference);var o=Math.ceil(this.timeDifference/p)+5,x=l=AmCharts.resetDateToMin(new Date(this.startTime-p),i,h,y).getTime();d==i&&1==h&&this.centerLabelOnFullPeriod&&(m=p*this.stepWidth),this.cellWidth=f*this.stepWidth,t=Math.round(l/p),r=-1,t/2==Math.round(t/2)&&(r=-2,l-=p);var T=n.firstTime,N=0;g&&1<h&&(E=this.chooseMinorFrequency(h),S=AmCharts.getPeriodDuration(i,E));if(0<this.gridCountR)for(t=r;t<=o;t++){c=T+p*(t+Math.floor((x-T)/p))-N,"DD"==i&&(c+=36e5),c=AmCharts.resetDateToMin(new Date(c),i,h,y).getTime(),"MM"==i&&(g=(c-l)/p,1.5<=(c-l)/p&&(c=c-(g-1)*p+AmCharts.getPeriodDuration("DD",3),c=AmCharts.resetDateToMin(new Date(c),i,1).getTime(),N+=p)),f=(c-this.startTime)*this.stepWidth,g=!1,this.nextPeriod[d]&&(g=this.checkPeriodChange(this.nextPeriod[d],1,c,l,d)),w=!1,g&&this.markPeriodChange?(g=this.dateFormatsObject[this.nextPeriod[d]],this.twoLineMode&&(g=this.dateFormatsObject[d]+"\n"+g,g=AmCharts.fixBrakes(g)),w=!0):g=this.dateFormatsObject[d],b||(w=!1),l=AmCharts.formatDate(new Date(c),g);if(t==r&&!u||t==o&&!a)l=" ";this.labelFunction&&(l=this.labelFunction(l,new Date(c),this,i,h,v).toString()),this.boldLabels&&(w=!0),v=new this.axisItemRenderer(this,f,l,!1,m,0,!1,w),this.pushAxisItem(v),v=l=c;if(!isNaN(E))for(f=1;f<h;f+=E)this.gridAlpha=this.minorGridAlpha,g=c+S*f,g=AmCharts.resetDateToMin(new Date(g),i,E,y).getTime(),g=new this.axisItemRenderer(this,(g-this.startTime)*this.stepWidth),this.pushAxisItem(g);this.gridAlpha=e}}else if(!this.parseDates){if(this.cellWidth=this.getStepWidth(t),t<o&&(o=t),s+=this.start,this.stepWidth=this.getStepWidth(t),0<o)for(b=Math.floor(t/o),E=this.chooseMinorFrequency(b),f=s,f/2==Math.round(f/2)&&f--,0>f&&(f=0),o=0,this.end-f+1>=this.autoRotateCount&&(this.labelRotation=this.autoRotateAngle),t=f;t<=this.end+2;t++){v=!1,0<=t&&t<this.data.length?(d=this.data[t],l=d.category,v=d.forceShow):l="";if(g&&!isNaN(E)){if(t/E!=Math.round(t/E)&&!v)continue;t/b==Math.round(t/b)||v||(this.gridAlpha=this.minorGridAlpha,l=void 0)}else if(t/b!=Math.round(t/b)&&!v)continue;f=this.getCoordinate(t-s),v=0,"start"==this.gridPosition&&(f-=this.cellWidth/2,v=this.cellWidth/2),y=!0,tickShift=v,"start"==this.tickPosition&&(tickShift=0,y=!1,v=0);if(t==r&&!u||t==this.end&&!a)l=void 0;Math.round(o/i)!=o/i&&(l=void 0),o++,x=this.cellWidth,h&&(x=NaN),this.labelFunction&&d&&(l=this.labelFunction(l,d,this)),l=AmCharts.fixBrakes(l),w=!1,this.boldLabels&&(w=!0),t>this.end&&"start"==this.tickPosition&&(l=" "),v=new this.axisItemRenderer(this,f,l,y,x,v,void 0,w,tickShift,!1,d.labelColor),v.serialDataItem=d,this.pushAxisItem(v),this.gridAlpha=e}}else if(this.parseDates&&this.equalSpacing){s=this.start,this.startTime=this.data[this.start].time,this.endTime=this.data[this.end].time,this.timeDifference=this.endTime-this.startTime,r=this.choosePeriod(0),i=r.period,h=r.count,p=AmCharts.getPeriodDuration(i,h),p<f&&(i=c.period,h=c.count,p=f),d=i,"WW"==d&&(d="DD"),this.stepWidth=this.getStepWidth(t),o=Math.ceil(this.timeDifference/p)+1,l=AmCharts.resetDateToMin(new Date(this.startTime-p),i,h,y).getTime(),this.cellWidth=this.getStepWidth(t),t=Math.round(l/p),r=-1,t/2==Math.round(t/2)&&(r=-2,l-=p),f=this.start,f/2==Math.round(f/2)&&f--,0>f&&(f=0),m=this.end+2,m>=this.data.length&&(m=this.data.length),S=!1,S=!u,this.previousPos=-1e3,20<this.labelRotation&&(this.safeDistance=5),p=f;if(this.data[f].time!=AmCharts.resetDateToMin(new Date(this.data[f].time),i,h,y).getTime())for(y=0,w=l,t=f;t<m;t++)c=this.data[t].time,this.checkPeriodChange(i,h,c,w)&&(y++,2<=y&&(p=t,t=m),w=c);g&&1<h&&(E=this.chooseMinorFrequency(h),AmCharts.getPeriodDuration(i,E));if(0<this.gridCountR)for(t=f;t<m;t++)if(c=this.data[t].time,this.checkPeriodChange(i,h,c,l)&&t>=p){f=this.getCoordinate(t-this.start),g=!1,this.nextPeriod[d]&&(g=this.checkPeriodChange(this.nextPeriod[d],1,c,l,d)),w=!1,g&&this.markPeriodChange?(g=this.dateFormatsObject[this.nextPeriod[d]],w=!0):g=this.dateFormatsObject[d],l=AmCharts.formatDate(new Date(c),g);if(t==r&&!u||t==o&&!a)l=" ";S?S=!1:(b||(w=!1),f-this.previousPos>this.safeDistance*Math.cos(this.labelRotation*Math.PI/180)&&(this.labelFunction&&(l=this.labelFunction(l,new Date(c),this,i,h,v)),this.boldLabels&&(w=!0),v=new this.axisItemRenderer(this,f,l,void 0,void 0,void 0,void 0,w),y=v.graphics(),this.pushAxisItem(v),v=y.getBBox().width,AmCharts.isModern||(v-=f),this.previousPos=f+v)),v=l=c}else isNaN(E)||(this.checkPeriodChange(i,E,c,x)&&(this.gridAlpha=this.minorGridAlpha,f=this.getCoordinate(t-this.start),g=new this.axisItemRenderer(this,f),this.pushAxisItem(g),x=c),this.gridAlpha=e)}for(t=0;t<this.data.length;t++)if(u=this.data[t])a=this.parseDates&&!this.equalSpacing?Math.round((u.time-this.startTime)*this.stepWidth+this.cellWidth/2):this.getCoordinate(t-s),u.x[this.id]=a;u=this.guides.length;for(t=0;t<u;t++)a=this.guides[t],b=b=b=e=r=NaN,E=a.above,a.toCategory&&(b=n.getCategoryIndexByValue(a.toCategory),isNaN(b)||(r=this.getCoordinate(b-s),a.expand&&(r+=this.cellWidth/2),v=new this.axisItemRenderer(this,r,"",!0,NaN,NaN,a),this.pushAxisItem(v,E))),a.category&&(b=n.getCategoryIndexByValue(a.category),isNaN(b)||(e=this.getCoordinate(b-s),a.expand&&(e-=this.cellWidth/2),b=(r-e)/2,v=new this.axisItemRenderer(this,e,a.label,!0,NaN,b,a),this.pushAxisItem(v,E))),a.toDate&&(a.toDate instanceof Date||(a.toDate=AmCharts.stringToDate(a.toDate,n.dataDateFormat)),this.equalSpacing?(b=n.getClosestIndex(this.data,"time",a.toDate.getTime(),!1,0,this.data.length-1),isNaN(b)||(r=this.getCoordinate(b-s))):r=(a.toDate.getTime()-this.startTime)*this.stepWidth,v=new this.axisItemRenderer(this,r,"",!0,NaN,NaN,a),this.pushAxisItem(v,E)),a.date&&(a.date instanceof Date||(a.date=AmCharts.stringToDate(a.date,n.dataDateFormat)),this.equalSpacing?(b=n.getClosestIndex(this.data,"time",a.date.getTime(),!1,0,this.data.length-1),isNaN(b)||(e=this.getCoordinate(b-s))):e=(a.date.getTime()-this.startTime)*this.stepWidth,b=(r-e)/2,v="H"==this.orientation?new this.axisItemRenderer(this,e,a.label,!1,2*b,NaN,a):new this.axisItemRenderer(this,e,a.label,!1,NaN,b,a),this.pushAxisItem(v,E)),(0<r||0<e)&&(r<this.width||e<this.width)&&(r=new this.guideFillRenderer(this,e,r,a),e=r.graphics(),this.pushAxisItem(r,E),a.graphics=e,e.index=t,a.balloonText&&this.addEventListeners(e,a))}this.axisCreated=!0,n=this.x,s=this.y,this.set.translate(n,s),this.labelsSet.translate(n,s),this.positionTitle(),(n=this.axisLine.set)&&n.toFront(),n=this.getBBox().height,2<n-this.previousHeight&&this.autoWrap&&!this.parseDates&&(this.axisCreated=this.chart.marginsUpdated=!1),this.previousHeight=n},chooseMinorFrequency:function(e){for(var t=10;0<t;t--)if(e/t==Math.round(e/t))return e/t},choosePeriod:function(e){var t=AmCharts.getPeriodDuration(this.periods[e].period,this.periods[e].count),n=Math.ceil(this.timeDifference/t),r=this.periods;return this.timeDifference<t&&0<e?r[e-1]:n<=this.gridCountR?r[e]:e+1<r.length?this.choosePeriod(e+1):r[e]},getStepWidth:function(e){var t;return this.startOnAxis?(t=this.axisWidth/(e-1),1==e&&(t=this.axisWidth)):t=this.axisWidth/e,t},getCoordinate:function(e){return e*=this.stepWidth,this.startOnAxis||(e+=this.stepWidth/2),Math.round(e)},timeZoom:function(e,t){this.startTime=e,this.endTime=t},minDuration:function(){var e=AmCharts.extractPeriod(this.minPeriod);return AmCharts.getPeriodDuration(e.period,e.count)},checkPeriodChange:function(e,t,n,r,i){n=new Date(n);var s=new Date(r),o=this.firstDayOfWeek;return r=t,"DD"==e&&(t=1),n=AmCharts.resetDateToMin(n,e,t,o).getTime(),t=AmCharts.resetDateToMin(s,e,t,o).getTime(),"DD"==e&&"hh"!=i&&n-t<=AmCharts.getPeriodDuration(e,r)?!1:n!=t?!0:!1},generateDFObject:function(){this.dateFormatsObject={};var e;for(e=0;e<this.dateFormats.length;e++){var t=this.dateFormats[e];this.dateFormatsObject[t.period]=t.format}},xToIndex:function(e){var t=this.data,n=this.chart,r=n.rotate,i=this.stepWidth;this.parseDates&&!this.equalSpacing?(e=this.startTime+Math.round(e/i)-this.minDuration()/2,n=n.getClosestIndex(t,"time",e,!1,this.start,this.end+1)):(this.startOnAxis||(e-=i/2),n=this.start+Math.round(e/i));var n=AmCharts.fitToBounds(n,0,t.length-1),s;return t[n]&&(s=t[n].x[this.id]),r?s>this.height+1&&n--:s>this.width+1&&n--,0>s&&n++,n=AmCharts.fitToBounds(n,0,t.length-1)},dateToCoordinate:function(e){return this.parseDates&&!this.equalSpacing?(e.getTime()-this.startTime)*this.stepWidth:this.parseDates&&this.equalSpacing?(e=this.chart.getClosestIndex(this.data,"time",e.getTime(),!1,0,this.data.length-1),this.getCoordinate(e-this.start)):NaN},categoryToCoordinate:function(e){return this.chart?(e=this.chart.getCategoryIndexByValue(e),this.getCoordinate(e-this.start)):NaN},coordinateToDate:function(e){return this.equalSpacing?(e=this.xToIndex(e),new Date(this.data[e].time)):new Date(this.startTime+e/this.stepWidth)}});