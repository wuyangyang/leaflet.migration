!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.VueGis3DBridge=e():t.VueGis3DBridge=e()}(window,function(){return r={},i.m=n=[function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.FACTOR=1.5,e.MIN_ZOOM=3,e.STYLE={pulseRadius:10,arcWidth:1,label:!0,marker:"arrow"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getDistance=function(t,e){function n(t){return t*t}return Math.sqrt(n(t)+n(e))},e.getLineCenter=function(t,e){var n=(t+e)/2;return(t-e)*r.FACTOR+n},e.extend=function(t,n){var r=void 0,i=void 0;return t.forEach(function(t){var e=n(t);void 0===r?r=i=e:(e<r&&(r=e),i<e&&(i=e))}),[r,i]},e.getType=function(t){return Object.prototype.toString.call(t).slice(8,-1)};var r=n(0)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t};function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var y=n(0),b=n(1);var o=(r(g,[{key:"draw",value:function(){}}]),g);function g(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,g);var e=t.startX,n=t.startY,r=t.endX,i=t.endY,o=t.width,a=t.color,s=void 0===a?"#fff":a,l=(0,b.getDistance)(e-r,n-i),u=(e+r)/2,c=(n+i)/2,h=(n-i)*y.FACTOR+u,f=(r-e)*y.FACTOR+c,d=(0,b.getDistance)(l/2,l*y.FACTOR),p=Math.atan2(n-f,e-h),v=Math.atan2(i-f,r-h);Object.assign(this,{startX:e,startY:n,endX:r,endY:i,centerX:h,centerY:f,startAngle:p,endAngle:v,radius:d,color:s,lineWidth:o||1})}e.default=o},function(t,e,n){"use strict";var r,a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},s=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var n=[],r=!0,i=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){i=!0,o=t}finally{try{!r&&s.return&&s.return()}finally{if(i)throw o}}return n}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},i=n(4),o=(r=i)&&r.__esModule?r:{default:r},l=n(0);L.MigrationLayer=L.Layer.extend({initialize:function(t,e){var n=0<arguments.length&&void 0!==t?t:[],r=e;Object.assign(this,{_data:n,options:r}),this._show=!0,this.mapHandles=[]},onAdd:function(t){return this._map=t,this._init(),this._bindMapEvents(),this._draw(),this},onRemove:function(r){return this.mapHandles.forEach(function(t){var e=t.type,n=t.handle;return r.off(e,n)}),this.mapHandles=[],L.DomUtil.remove(this.container),this.migration.clear(),this},setData:function(t){return this._data=t,this._draw(),this},setStyle:function(t){return this.migration.setStyle(t),this},hide:function(){return this.container.style.display="none",this},show:function(){return this.container.style.display="",this._show=!0,this},play:function(){return this.migration.play(),this},pause:function(){return this.migration.pause(),this},_init:function(){var t=L.DomUtil.create("div","leaflet-ODLayer-container");this.container=t;var e=this._map.getSize(),n=e.x,r=e.y;Object.assign(t.style,{position:"absolute",width:n+"px",height:r+"px"});var i=document.createElement("canvas");this.canvas=i,t.appendChild(i),this._map.getPanes().overlayPane.appendChild(t),this.migration=new o.default({canvas:i,container:t,map:this._map,data:this._convertData(),options:this.options})},_bindMapEvents:function(){var e=this;function t(t){t.target.getZoom()<l.MIN_ZOOM?e.hide():(e._show||e.show(),e.migration.play(),e._draw())}function n(){e.container.style.display="none"}function r(){e._show&&(e.container.style.display="",e._draw())}e._map.on("moveend",t),e.mapHandles.push({type:"moveend",handle:t}),e._map.on("zoomstart ",n),e.mapHandles.push({type:"zoomstart",handle:n}),e._map.on("zoomend",r),e.mapHandles.push({type:"zoomend",handle:r})},_draw:function(){this._map.getBounds()&&this.migration.playAnimation&&(this._resize(),this.migration.setData(this._convertData()))},_convertData:function(){var o=this._map,t=this._data,e=o.getBounds();if(t&&Array.isArray(t)&&0<t.length&&e){var i=function(t){var e=s(t,2),n=e[0],r=e[1],i=o.latLngToContainerPoint(new L.LatLng(r,n));return[i.x,i.y]};return t.map(function(t){var e=t.from,n=t.to,r=function(t,e){var n={};for(var r in t)0<=e.indexOf(r)||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}(t,["from","to"]);return a({from:i(e),to:i(n)},r)})}return[]},_resize:function(){var t=this._map.getBounds().getNorthWest(),e=this._map.latLngToContainerPoint(t).y;this.container.style.top=0<e?-e+"px":"0px";var n=window.getComputedStyle(this._map.getContainer());this.canvas.setAttribute("width",parseInt(n.width,10)),this.canvas.setAttribute("height",parseInt(n.height,10));var r=this._map.latLngToLayerPoint(t);L.DomUtil.setPosition(this.container,r)}}),L.migrationLayer=function(t,e){return new L.MigrationLayer(t,e)}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t};function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},g=s(n(5)),m=s(n(6)),w=s(n(7)),o=n(1),a=n(0),c=s(n(9));function s(t){return t&&t.__esModule?t:{default:t}}function h(t,e){var n={};for(var r in t)0<=e.indexOf(r)||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}function f(t){return t?u({},a.STYLE,t):a.STYLE}var l=(r(d,[{key:"setStyle",value:function(t){this.style=f(t),this.refresh()}},{key:"setData",value:function(t){this.data=t,this.refresh()}},{key:"refresh",value:function(){var c=this,t=this.data,h=this.direction;if(t&&0!==t.length){this.clear();var f=(0,o.extend)(t,function(t){return t.value}),d=this.popover,p=this.container,e=this.style,v=e.arcWidth,y=e.pulseRadius,b=e.label;t.forEach(function(t,e){var n=t.from,r=t.to,i=t.labels,o=t.color,a=new g.default({startX:n[0],startY:n[1],endX:r[0],endY:r[1],labels:i,label:b,width:v,color:o}),s={x:r[0],y:r[1],dataRange:f,radius:y,zoom:c.map.getZoom(),container:p,index:e,data:t,popover:d};"in"===h&&(s=Object.assign(s,{x:n[0],y:n[1]}));var l=new m.default(s),u=new w.default({startX:n[0],startY:n[1],endX:r[0],endY:r[1],width:15,color:o,direction:h});c.store.arcs.push(a),c.store.pulses.push(l),c.store.sparks.push(u)}),this.start()}}},{key:"clear",value:function(){this.store.pulses.forEach(function(t){return t.clear()}),this.store={arcs:[],pulses:[],sparks:[]},this.playAnimation=!0,this.started=!1,window.cancelAnimationFrame(this.requestAnimationId)}},{key:"start",value:function(){var e=this,t=this.started,i=this.store,o=this.context,n=this.canvas,r=n.width,a=n.height;t||(!function t(){e.requestAnimationId=window.requestAnimationFrame(t),e.playAnimation&&(o.clearRect(0,0,r,a),Object.keys(i).forEach(function(t){var e=i[t];e.forEach(function(t){return t.draw(o)});for(var n=0,r=e.length;n<r;n++)e[n].draw(o)}))}(),this.started=!0)}},{key:"play",value:function(){this.playAnimation=!0}},{key:"pause",value:function(){this.playAnimation=!1}}]),d);function d(t){var e=t.options,n=t.container,r=h(t,["options","container"]);!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,d);var i=e.replacePopover,o=e.onShowPopover,a=e.onHidePopover,s=e.direction,l=h(e,["replacePopover","onShowPopover","onHidePopover","direction"]);Object.assign(this,u({},r,{direction:s,container:n,style:f(l),playAnimation:!0,started:!1,store:{arcs:[],pulses:[],sparks:[]}})),this.popover=new c.default({replacePopover:i,onShowPopover:o,onHidePopover:a,container:n}),this.context=this.canvas.getContext("2d")}e.default=l},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var n=[],r=!0,i=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){i=!0,o=t}finally{try{!r&&s.return&&s.return()}finally{if(i)throw o}}return n}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},r=function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t};function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var o,a=n(2);var s=(function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(u,((o=a)&&o.__esModule?o:{default:o}).default),r(u,[{key:"draw",value:function(t){if(t.save(),Object.assign(t,{lineWidth:this.lineWidth,strokeStyle:this.color,fillStyle:this.strokeStyle}),t.beginPath(),t.arc(this.centerX,this.centerY,this.radius,this.startAngle,this.endAngle,!1),t.stroke(),t.restore(),t.save(),this.label){var e=l(this.labels,2),n=e[0],r=e[1];if(Object.assign(t,{font:this.font}),n){var i=this.startX-15,o=this.startY+5;t.fillText(n,i,o)}if(r){var a=this.endX-15,s=this.endY-5;t.fillText(r,a,s)}}t.restore()}}]),u);function u(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u);var e=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(u.__proto__||Object.getPrototypeOf(u)).call(this,t)),n=t.labels,r=t.font,i=t.label;return Object.assign(e,{font:r,label:i,labels:n}),e}e.default=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var v=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var n=[],r=!0,i=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){i=!0,o=t}finally{try{!r&&s.return&&s.return()}finally{if(i)throw o}}return n}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")};function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var s=[],i=(function(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}(y,[{key:"clear",value:function(){s.push(this.pulse),this.pulse.removeEventListener("mouseover",this.showPopover),this.pulse.removeEventListener("mouseout",this.hidePopover),this.container.removeChild(this.pulse)}},{key:"initDom",value:function(){if(0<s.length){this.pulse=s.pop();var t=v(this.pulse.children,1);this.ring=t[0]}else this.pulse=document.createElement("div"),this.ring=document.createElement("div"),this.pulse.appendChild(this.ring);var e=this.x,n=this.y,r=this.r,i=this.color,o=this.pulse,a=this.ring;Object.assign(o.style,{position:"absolute",zIndex:"1",borderRadius:"50%",width:2*r+"px",height:2*r+"px",left:"-"+r+"px",top:"-"+r+"px",background:i,transform:"translate("+e+"px, "+n+"px)"}),Object.assign(a.style,{position:"absolute",borderRadius:"50%",width:2*r+"px",height:2*r+"px",left:"-1px",top:"-1px",border:"1px solid "+i}),this.container.appendChild(o),this.pulse.addEventListener("mouseover",this.showPopover),this.pulse.addEventListener("mouseout",this.hidePopover)}},{key:"draw",value:function(){var t=this.scale;Object.assign(this.ring.style,{transform:"scale("+t+")"}),this.scale+=.02,2<t&&(this.scale=1)}}]),y);function y(t){var e=t.x,n=t.y,r=t.container,i=t.dataRange,o=t.zoom,a=t.data,s=t.index,l=t.popover,u=t.radius;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,y);var c=a.color,h=a.value,f=a.labels,d=(u/2+h*u/v(i,2)[1])*o/6,p=3<d?d:3;Object.assign(this,{x:e,y:n,color:c,container:r,value:h,labels:f,r:p,scale:1}),this.showPopover=function(t){var e=t.clientX,n=t.clientY;l.show(e,n,a,s)},this.hidePopover=function(){return l.hide(s)},this.initDom()}e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t};function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var o=s(n(2)),a=s(n(8));function s(t){return t&&t.__esModule?t:{default:t}}var l=(function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(u,o.default),r(u,[{key:"drawArc",value:function(t,e,n,r,i){t.save(),Object.assign(t,{lineWidth:n,strokeStyle:e,shadowColor:e,lineCap:"round"}),t.beginPath(),t.arc(this.centerX,this.centerY,this.radius,r,i,!1),t.stroke(),t.restore()}},{key:"draw",value:function(t){var e=this.endAngle,n=this.trailAngle,r=this.factor,i=this.color,o=this.deltaAngle,a=n+r,s=i;this.animateBlur&&(this.arcAngle=a),this.trailAngle=a,this.drawArc(t,s,this.lineWidth,this.startAngle,this.arcAngle);for(var l=this.tailPointsCount,u=0;u<l;u++){var c=i;n-o*u>this.startAngle&&this.drawArc(t,c,5-5/l*u,n-o*u,n)}t.save(),t.translate(this.centerX,this.centerY),this.marker.x=Math.cos(this.trailAngle)*this.radius,this.marker.y=Math.sin(this.trailAngle)*this.radius,this.marker.rotation=this.trailAngle+Math.PI/2,this.marker.draw(t),t.restore(),180*(e-this.trailAngle)/Math.PI<.5&&(this.trailAngle=this.startAngle,this.animateBlur=!1)}}]),u);function u(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u);var e=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(u.__proto__||Object.getPrototypeOf(u)).call(this,t));return e.tailPointsCount=50,e.factor=1/e.radius,e.deltaAngle=80/Math.min(e.radius,400)/e.tailPointsCount,e.trailAngle=e.startAngle,e.arcAngle=e.startAngle,e.startAngle*e.endAngle<0&&(e.startAngle<0&&(e.startAngle+=2*Math.PI),e.endAngle+=2*Math.PI),e.marker=new a.default({x:50,y:80,rotation:50*Math.PI/180,style:"circle",color:"rgb(255, 255, 255)",size:3,borderWidth:0,borderColor:e.color}),e}e.default=l},function(t,e,n){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}Object.defineProperty(e,"__esModule",{value:!0});var i=(function(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}(o,[{key:"draw",value:function(t){t.save(),t.translate(this.x,this.y),t.rotate(this.rotation),Object.assign(t,{lineWidth:this.borderWidth||0,strokeStyle:this.borderColor||"#000",fillStyle:this.color||"#000"}),t.beginPath(),"circle"===this.style?t.arc(0,0,this.size,0,2*Math.PI,!1):"arrow"===this.style&&(t.moveTo(-this.size,-this.size),t.lineTo(this.size,0),t.lineTo(-this.size,this.size),t.lineTo(-this.size/4,0),t.lineTo(-this.size,-this.size)),t.closePath(),t.stroke(),t.fill(),t.restore()}}]),o);function o(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),this.x=t.x,this.y=t.y,this.rotation=t.rotation,this.style=t.style,this.color=t.color,this.size=t.size,this.borderWidth=t.borderWidth,this.borderColor=t.borderColor}e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t};function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var c=n(1);var o=(r(a,[{key:"show",value:function(t,e,n,r){var i=n.value,o=n.labels,a=this.el,s=this.replace,l=this.onShow;if(s){var u=s(t,e,n,r);a.replaceChild(u,a.children[0])}else this.context.innerText=o[0]+" -> "+o[1]+": "+i;"Function"===(0,c.getType)(l)&&l(n,r),Object.assign(a.style,{display:"",transform:"translate("+t+"px, "+e+"px)"})}},{key:"hide",value:function(t){var e=this.el,n=this.onHide;"Function"===(0,c.getType)(n)&&n(data,t),e.style.display="none"}}]),a);function a(t){var e=t.onShowPopover,n=t.onHidePopover,r=t.container,i=t.replacePopover;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),this.el=L.DomUtil.create("div","",r),Object.assign(this.el.style,{position:"absolute",left:"0",top:"0",display:"none",zIndex:"11"}),this.context=L.DomUtil.create("div","",this.el),"Function"===(0,c.getType)(i)?this.replace=i:Object.assign(this.context.style,{border:"1px solid grey",background:"rgba(255,255,255,.3)",borderRadius:"5px",padding:"8px 16px"}),Object.assign(this,{onShow:e,onHide:n})}e.default=o}],i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/",i(i.s=3);function i(t){if(r[t])return r[t].exports;var e=r[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,i),e.l=!0,e.exports}var n,r});