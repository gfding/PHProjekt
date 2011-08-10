/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojox.grid.enhanced.plugins.GridSource"]||(dojo._hasResource["dojox.grid.enhanced.plugins.GridSource"]=!0,dojo.provide("dojox.grid.enhanced.plugins.GridSource"),dojo.require("dojo.dnd.Source"),dojo.require("dojox.grid.enhanced.plugins.DnD"),function(){var h=function(b){for(var a=b[0],c=1;c<b.length;++c)a=a.concat(b[c]);return a};dojo.declare("dojox.grid.enhanced.plugins.GridSource",dojo.dnd.Source,{accept:["grid/cells","grid/rows","grid/cols","text"],insertNodesForGrid:!1,markupFactory:function(b,
a){return new dojox.grid.enhanced.plugins.GridSource(a,b)},checkAcceptance:function(b,a){if(b instanceof dojox.grid.enhanced.plugins.GridDnDSource){if(a[0]){var c=b.getItem(a[0].id);if(c&&(dojo.indexOf(c.type,"grid/rows")>=0||dojo.indexOf(c.type,"grid/cells")>=0)&&!b.dndPlugin._allDnDItemsLoaded())return!1}this.sourcePlugin=b.dndPlugin}return this.inherited(arguments)},onDraggingOver:function(){if(this.sourcePlugin)this.sourcePlugin._isSource=!0},onDraggingOut:function(){if(this.sourcePlugin)this.sourcePlugin._isSource=
!1},onDropExternal:function(b,a,c){if(b instanceof dojox.grid.enhanced.plugins.GridDnDSource){var d=dojo.map(a,function(a){return b.getItem(a.id).data}),g=b.getItem(a[0].id),e=g.dndPlugin.grid,i=g.type[0],f;try{switch(i){case "grid/cells":a[0].innerHTML=this.getCellContent(e,d[0].min,d[0].max)||"";this.onDropGridCells(e,d[0].min,d[0].max);break;case "grid/rows":f=h(d);a[0].innerHTML=this.getRowContent(e,f)||"";this.onDropGridRows(e,f);break;case "grid/cols":f=h(d),a[0].innerHTML=this.getColumnContent(e,
f)||"",this.onDropGridColumns(e,f)}this.insertNodesForGrid&&(this.selectNone(),this.insertNodes(!0,[a[0]],this.before,this.current));g.dndPlugin.onDragOut(!c)}catch(j){console.warn("GridSource.onDropExternal() error:",j)}}else this.inherited(arguments)},getCellContent:function(){},getRowContent:function(){},getColumnContent:function(){},onDropGridCells:function(){},onDropGridRows:function(){},onDropGridColumns:function(){}})}());