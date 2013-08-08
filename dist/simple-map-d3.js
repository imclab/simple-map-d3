/*! simple-map-d3 - v0.1.1 - 2013-08-08
 * http://code.minnpost.com/simple-map-d3/
 * Copyright (c) 2013 Alan Palazzolo; Licensed MIT
 */

function SimpleMapD3(a){var b={},c={"stroke-width":1,stroke:"#898989",fill:"#FFFFFF",colorOn:!1,colorSet:["#F7FCF5","#E5F5E0","#C7E9C0","#A1D99B","#74C476","#41AB5D","#238B45","#005A32"],tooltipOn:!0,tooltipContent:function(a){var b="";for(var c in a.properties)a.properties.hasOwnProperty(c)&&(b+=c+": "+a.properties[c]+"<br />");return b}};return b.constructor=function(a){var d=c;for(var e in a)a.hasOwnProperty(e)&&(d[e]=a[e]);b.options=d,b.options.data===Object(b.options.data)?(b.data=b.options.data,b.dataLoaded(b.data)):"[object String]"==toString.call(b.options.datasource)&&b.getData()},b.getData=function(){d3.json(b.options.datasource,function(a){b.data=a,b.loadData()})},b.loadData=function(a){void 0===b.data&&(b.data=a),b.canvas(),b.project(),b.render()},b.canvas=function(){b.container=d3.select(b.options.container),b.width=parseFloat(b.container.style("width")),b.height=parseFloat(b.container.style("height")),b.canvas=b.container.append("svg").attr("width",b.width).attr("height",b.height),b.options.tooltipOn===!0&&(b.container.classed("simple-map-d3-tooltip-container",!0),b.container.append("div").classed("simple-map-d3-tooltip",!0))},b.project=function(){b.proj=d3.geo.mercator().scale(1).translate([0,0]),b.projOptions=b.projOptions||{};var a,c,d,e=.02*b.width,f=d3.geo.bounds(b.data),g=f.map(b.proj),h=(b.width-2*e)/Math.abs(g[1][0]-g[0][0]),i=(b.height-2*e)/Math.abs(g[1][1]-g[0][1]),j=Math.min(h,i);b.proj.scale(j),b.proj.translate(b.proj([-f[0][0],-f[1][1]])),b.projOptions.path=d3.geo.path().projection(b.proj),h>i?(a=h*Math.abs(g[1][0]-g[0][0])-i*Math.abs(g[1][0]-g[0][0]),b.canvas.attr("transform","translate("+a/2+", 0)")):(a=i*Math.abs(g[1][1]-g[0][1])-h*Math.abs(g[1][1]-g[0][1]),b.canvas.attr("transform","translate(0, "+a/5+")")),c=b.proj(f[0])[1],d=b.proj(f[1])[0],h>i?(b.projOptions.offsetxd=b.width/2-c/2,b.projOptions.offsetyd=e):(b.projOptions.offsetxd=e,b.projOptions.offsetyd=b.height/2-d/2)},b.makeColorRange=function(){var a=d3.min(b.data.features,function(a){return a.properties[b.options.colorProperty]}),c=d3.max(b.data.features,function(a){return a.properties[b.options.colorProperty]});b.options.colorStep=b.options.colorStep||(c-a)/b.options.colorSet.length/2,b.colorRange=d3.scale.linear().domain(d3.range(a,c,b.options.colorStep)).range(b.options.colorSet).clamp(!0)},b.attributeFill=function(a){return b.options.colorOn===!1?b.options.fill:(b.ColorRange||b.makeColorRange(),b.colorRange(a.properties[b.options.colorProperty]))},b.render=function(){b.canvas.selectAll("path").data(b.data.features).enter().append("path").attr("d",b.projOptions.path).attr("stroke",b.options.stroke).attr("stroke-width",b.options["stroke-width"]).attr("fill",function(a){return b.attributeFill(a)}).attr("transform","translate("+b.projOptions.offsetxd+", "+b.projOptions.offsetyd+")").on("mouseover",function(a){b.options.tooltipOn===!0&&b.container.select(".simple-map-d3-tooltip").style("display","block").html(b.options.tooltipContent(a))}).on("mouseout",function(){b.options.tooltipOn===!0&&b.container.select(".simple-map-d3-tooltip").style("display","none")})},b.constructor(a),b}