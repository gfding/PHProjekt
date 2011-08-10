/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojox.charting.plot2d.Grid"]||(dojo._hasResource["dojox.charting.plot2d.Grid"]=!0,dojo.provide("dojox.charting.plot2d.Grid"),dojo.require("dojox.charting.Element"),dojo.require("dojox.charting.plot2d.common"),dojo.require("dojox.lang.functional"),dojo.require("dojox.lang.utils"),function(){var i=dojox.lang.utils,j=dojox.charting.plot2d.common;dojo.declare("dojox.charting.plot2d.Grid",dojox.charting.Element,{defaultParams:{hAxis:"x",vAxis:"y",hMajorLines:!0,hMinorLines:!1,vMajorLines:!0,
vMinorLines:!1,hStripes:"none",vStripes:"none",animate:null},optionalParams:{},constructor:function(c,a){this.opt=dojo.clone(this.defaultParams);i.updateWithObject(this.opt,a);this.hAxis=this.opt.hAxis;this.vAxis=this.opt.vAxis;this.dirty=!0;this.animate=this.opt.animate;this.zoom=null;this.zoomQueue=[];this.lastWindow={vscale:1,hscale:1,xoffset:0,yoffset:0}},clear:function(){this._vAxis=this._hAxis=null;this.dirty=!0;return this},setAxis:function(c){c&&(this[c.vertical?"_vAxis":"_hAxis"]=c);return this},
addSeries:function(){return this},getSeriesStats:function(){return dojo.delegate(j.defaultStats)},initializeScalers:function(){return this},isDirty:function(){return this.dirty||this._hAxis&&this._hAxis.dirty||this._vAxis&&this._vAxis.dirty},performZoom:function(c,a){var e=this._vAxis.scale||1,f=this._hAxis.scale||1,h=c.height-a.b,g=this._hAxis.getScaler().bounds,g=(g.from-g.lower)*g.scale,d=this._vAxis.getScaler().bounds,d=(d.from-d.lower)*d.scale;rVScale=e/this.lastWindow.vscale;rHScale=f/this.lastWindow.hscale;
rXOffset=(this.lastWindow.xoffset-g)/(this.lastWindow.hscale==1?f:this.lastWindow.hscale);rYOffset=(d-this.lastWindow.yoffset)/(this.lastWindow.vscale==1?e:this.lastWindow.vscale);shape=this.group;anim=dojox.gfx.fx.animateTransform(dojo.delegate({shape:shape,duration:1200,transform:[{name:"translate",start:[0,0],end:[a.l*(1-rHScale),h*(1-rVScale)]},{name:"scale",start:[1,1],end:[rHScale,rVScale]},{name:"original"},{name:"translate",start:[0,0],end:[rXOffset,rYOffset]}]},this.zoom));dojo.mixin(this.lastWindow,
{vscale:e,hscale:f,xoffset:g,yoffset:d});this.zoomQueue.push(anim);dojo.connect(anim,"onEnd",this,function(){this.zoom=null;this.zoomQueue.shift();this.zoomQueue.length>0&&this.zoomQueue[0].play()});this.zoomQueue.length==1&&this.zoomQueue[0].play();return this},getRequiredColors:function(){return 0},render:function(c,a){if(this.zoom)return this.performZoom(c,a);this.dirty=this.isDirty();if(!this.dirty)return this;this.cleanGroup();var e=this.group,f=this.chart.theme.axis;try{var h=this._vAxis.getScaler(),
g=h.scaler.getTransformerFromModel(h),d=this._vAxis.getTicks();this.opt.hMinorLines&&dojo.forEach(d.minor,function(b){b=c.height-a.b-g(b.value);b=e.createLine({x1:a.l,y1:b,x2:c.width-a.r,y2:b}).setStroke(f.minorTick);this.animate&&this._animateGrid(b,"h",a.l,a.r+a.l-c.width)},this);this.opt.hMajorLines&&dojo.forEach(d.major,function(b){b=c.height-a.b-g(b.value);b=e.createLine({x1:a.l,y1:b,x2:c.width-a.r,y2:b}).setStroke(f.majorTick);this.animate&&this._animateGrid(b,"h",a.l,a.r+a.l-c.width)},this)}catch(i){}try{var k=
this._hAxis.getScaler(),l=k.scaler.getTransformerFromModel(k);(d=this._hAxis.getTicks())&&this.opt.vMinorLines&&dojo.forEach(d.minor,function(b){b=a.l+l(b.value);b=e.createLine({x1:b,y1:a.t,x2:b,y2:c.height-a.b}).setStroke(f.minorTick);this.animate&&this._animateGrid(b,"v",c.height-a.b,c.height-a.b-a.t)},this);d&&this.opt.vMajorLines&&dojo.forEach(d.major,function(b){b=a.l+l(b.value);b=e.createLine({x1:b,y1:a.t,x2:b,y2:c.height-a.b}).setStroke(f.majorTick);this.animate&&this._animateGrid(b,"v",c.height-
a.b,c.height-a.b-a.t)},this)}catch(j){}this.dirty=!1;return this},_animateGrid:function(c,a,e,f){dojox.gfx.fx.animateTransform(dojo.delegate({shape:c,duration:1200,transform:[{name:"translate",start:a=="h"?[e,0]:[0,e],end:[0,0]},{name:"scale",start:a=="h"?[1/f,1]:[1,1/f],end:[1,1]},{name:"original"}]},this.animate)).play()}})}());