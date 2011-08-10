/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojox.widget.SortList"]||(dojo._hasResource["dojox.widget.SortList"]=!0,dojo.provide("dojox.widget.SortList"),dojo.experimental("dojox.widget.SortList"),dojo.require("dijit.layout._LayoutWidget"),dojo.require("dijit._Templated"),dojo.declare("dojox.widget.SortList",[dijit.layout._LayoutWidget,dijit._Templated],{title:"",heading:"",descending:!0,selected:null,sortable:!0,store:"",key:"name",baseClass:"dojoxSortList",templateString:dojo.cache("dojox.widget","SortList/SortList.html",
'<div class="sortList" id="${id}">\n\t\t<div class="sortListTitle" dojoAttachPoint="titleNode">\n\t\t<div class="dijitInline sortListIcon">&thinsp;</div>\n\t\t<span dojoAttachPoint="focusNode">${title}</span>\n\t\t</div>\n\t\t<div class="sortListBodyWrapper" dojoAttachEvent="onmouseover: _set, onmouseout: _unset, onclick:_handleClick" dojoAttachPoint="bodyWrapper">\n\t\t<ul dojoAttachPoint="containerNode" class="sortListBody"></ul>\n\t</div>\n</div>\n'),_addItem:function(a){dojo.create("li",{innerHTML:this.store.getValue(a,
this.key).replace(/</g,"&lt;")},this.containerNode)},postCreate:function(){if(this.store)this.store=dojo.getObject(this.store),this.store.fetch({onItem:dojo.hitch(this,"_addItem"),onComplete:dojo.hitch(this,"onSort")});else this.onSort();this.inherited(arguments)},startup:function(){this.inherited(arguments);if(this.heading)this.setTitle(this.heading),this.title=this.heading;setTimeout(dojo.hitch(this,"resize"),5);this.sortable&&this.connect(this.titleNode,"onclick","onSort")},resize:function(){this.inherited(arguments);
var a=this._contentBox.h-dojo.style(this.titleNode,"height")-10;this.bodyWrapper.style.height=Math.abs(a)+"px"},onSort:function(){var a=dojo.query("li",this.domNode);if(this.sortable)this.descending=!this.descending,dojo.addClass(this.titleNode,this.descending?"sortListDesc":"sortListAsc"),dojo.removeClass(this.titleNode,this.descending?"sortListAsc":"sortListDesc"),a.sort(this._sorter),this.descending&&a.reverse();var b=0;dojo.forEach(a,function(a){dojo[b++%2===0?"addClass":"removeClass"](a,"sortListItemOdd");
this.containerNode.appendChild(a)},this)},_set:function(a){a.target!==this.bodyWrapper&&dojo.addClass(a.target,"sortListItemHover")},_unset:function(a){dojo.removeClass(a.target,"sortListItemHover")},_handleClick:function(a){dojo.toggleClass(a.target,"sortListItemSelected");a.target.focus();this._updateValues(a.target.innerHTML)},_updateValues:function(){this._selected=dojo.query("li.sortListItemSelected",this.containerNode);this.selected=[];dojo.forEach(this._selected,function(a){this.selected.push(a.innerHTML)},
this);this.onChanged(arguments)},_sorter:function(a,b){var c=a.innerHTML,d=b.innerHTML;return c>d?1:c<d?-1:0},setTitle:function(a){this.focusNode.innerHTML=this.title=a},onChanged:function(){}}));