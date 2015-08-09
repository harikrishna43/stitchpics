var saveAs=saveAs||function(t){"use strict";if("undefined"==typeof navigator||!/MSIE [1-9]\./.test(navigator.userAgent)){var e=t.document,i=function(){return t.URL||t.webkitURL||t},n=e.createElementNS("http://www.w3.org/1999/xhtml","a"),a="download"in n,o=function(t){var e=new MouseEvent("click");t.dispatchEvent(e)},r=t.webkitRequestFileSystem,s=t.requestFileSystem||r||t.mozRequestFileSystem,u=function(e){(t.setImmediate||t.setTimeout)(function(){throw e},0)},l="application/octet-stream",c=0,h=500,d=function(e){var n=function(){"string"==typeof e?i().revokeObjectURL(e):e.remove()};t.chrome?n():setTimeout(n,h)},p=function(t,e,i){e=[].concat(e);for(var n=e.length;n--;){var a=t["on"+e[n]];if("function"==typeof a)try{a.call(t,i||t)}catch(o){u(o)}}},f=function(t){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob(["\ufeff",t],{type:t.type}):t},m=function(e,u,h){h||(e=f(e));var m,g,v,w=this,y=e.type,b=!1,x=function(){p(w,"writestart progress write writeend".split(" "))},D=function(){if((b||!m)&&(m=i().createObjectURL(e)),g)g.location.href=m;else{var n=t.open(m,"_blank");void 0==n&&"undefined"!=typeof safari&&(t.location.href=m)}w.readyState=w.DONE,x(),d(m)},O=function(t){return function(){return w.readyState!==w.DONE?t.apply(this,arguments):void 0}},P={create:!0,exclusive:!1};return w.readyState=w.INIT,u||(u="download"),a?(m=i().createObjectURL(e),n.href=m,n.download=u,void setTimeout(function(){o(n),x(),d(m),w.readyState=w.DONE})):(t.chrome&&y&&y!==l&&(v=e.slice||e.webkitSlice,e=v.call(e,0,e.size,l),b=!0),r&&"download"!==u&&(u+=".download"),(y===l||r)&&(g=t),s?(c+=e.size,void s(t.TEMPORARY,c,O(function(t){t.root.getDirectory("saved",P,O(function(t){var i=function(){t.getFile(u,P,O(function(t){t.createWriter(O(function(i){i.onwriteend=function(e){g.location.href=t.toURL(),w.readyState=w.DONE,p(w,"writeend",e),d(t)},i.onerror=function(){var t=i.error;t.code!==t.ABORT_ERR&&D()},"writestart progress write abort".split(" ").forEach(function(t){i["on"+t]=w["on"+t]}),i.write(e),w.abort=function(){i.abort(),w.readyState=w.DONE},w.readyState=w.WRITING}),D)}),D)};t.getFile(u,{create:!1},O(function(t){t.remove(),i()}),O(function(t){t.code===t.NOT_FOUND_ERR?i():D()}))}),D)}),D)):void D())},g=m.prototype,v=function(t,e,i){return new m(t,e,i)};return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(t,e,i){return i||(t=f(t)),navigator.msSaveOrOpenBlob(t,e||"download")}:(g.abort=function(){var t=this;t.readyState=t.DONE,p(t,"abort")},g.readyState=g.INIT=0,g.WRITING=1,g.DONE=2,g.error=g.onwritestart=g.onprogress=g.onwrite=g.onabort=g.onerror=g.onwriteend=null,v)}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);"undefined"!=typeof module&&module.exports?module.exports.saveAs=saveAs:"undefined"!=typeof define&&null!==define&&null!=define.amd&&define([],function(){return saveAs}),function(t){"use strict";var e,i=t.Uint8Array,n=t.HTMLCanvasElement,a=n&&n.prototype,o=/\s*;\s*base64\s*(?:;|$)/i,r="toDataURL",s=function(t){for(var n,a,o,r=t.length,s=new i(r/4*3|0),u=0,l=0,c=[0,0],h=0,d=0;r--;)a=t.charCodeAt(u++),n=e[a-43],255!==n&&n!==o&&(c[1]=c[0],c[0]=a,d=d<<6|n,h++,4===h&&(s[l++]=d>>>16,61!==c[1]&&(s[l++]=d>>>8),61!==c[0]&&(s[l++]=d),h=0));return s};i&&(e=new i([62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,0,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51])),n&&!a.toBlob&&(a.toBlob=function(t,e){if(e||(e="image/png"),this.mozGetAsFile)return void t(this.mozGetAsFile("canvas",e));if(this.msToBlob&&/^\s*image\/png\s*(?:$|;)/i.test(e))return void t(this.msToBlob());var n,a=Array.prototype.slice.call(arguments,1),u=this[r].apply(this,a),l=u.indexOf(","),c=u.substring(l+1),h=o.test(u.substring(0,l));Blob.fake?(n=new Blob,h?n.encoding="base64":n.encoding="URI",n.data=c,n.size=c.length):i&&(n=h?new Blob([s(c)],{type:e}):new Blob([decodeURIComponent(c)],{type:e})),t(n)},a.toDataURLHD?a.toBlobHD=function(){r="toDataURLHD";var t=this.toBlob();return r="toDataURL",t}:a.toBlobHD=a.toBlob)}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content||this),function(){"use strict";Polymer({is:"cross-stitch",behaviors:[window.sizingBehavior,window.quantizeBehavior,window.pixelateBehavior,window.workerBehavior,window.miscBehavior,window.dmcColorBehavior],properties:{numcolors:{type:Number,observer:"propertyChanged"},gridwidth:{type:Number,observer:"propertyChanged"},imagedata:{type:Object,observer:"propertyChanged"},usedmccolors:{type:Boolean,observer:"propertyChanged"},superPixelData:{type:Object},palette:{type:Array,notify:!0}},ready:function(){this.$.finalOutput.imageSmoothingEnabled=this.$.finalOutput.msImageSmoothingEnabled=this.$.finalOutput.mozImageSmoothingEnabled=this.$.finalOutput.webkitImageSmoothingEnabled=!1;var t=navigator.hardwareConcurrency||4;this.createWorkers("libs.js",t),window.addEventListener("resize",_.debounce(this.propertyChanged.bind(this),250))},propertyChanged:function(){void 0!==this.imagedata&&this.newFile()},newFile:function(){this.startTime=performance.now(),this._scaleImage.bind(this)().then(this._dispatchBuildPalette.bind(this)).then(this._processImage.bind(this))["catch"](this._catchErrors)},saveAsImage:function(){this.$.finalOutput.getContext("2d");this.$.finalOutput.toBlob(function(t){saveAs(t,"CrossStitch.png")})},getImageAsURI:function(){return this.$.finalOutput.toDataURL("image/png")},_scaleImage:function(){return this.scale({imageData:this.imagedata,newWidth:Polymer.dom(this).node.offsetWidth})},_dispatchBuildPalette:function(t){return this.dispatchWorker("buildPalette",{imageData:t,numColors:this.numcolors,useDmcColors:this.usedmccolors},[t.data.buffer]).then(function(t){var e=t.imageData,i=t.palette;return Promise.resolve({imageData:e,palette:i})})},_processImage:function(t){var e=this,i=t.imageData,n=t.palette;this._setupSuperPixelData.call(this,i,n),this._resizeOutputCanvas.call(this,i);var a=this.$.finalOutput.getContext("2d"),o={imageData:i,numberOfParts:this.workers.length,pixelHeight:this.superPixelData.pixelHeight},r=!0,s=!1,u=void 0;try{for(var l,c=function(){var t=l.value,i=t.chunk,n=t.chunkStartY;e._dispatchQuantize.bind(e)(i).then(e._dispatchPixelate.bind(e)).then(function(t){var i=t.imageData;a.putImageData(e._convertToRealImageData(i),0,n),console.log("Wrote chunk at "+(performance.now()-e.startTime)+" milliseconds!")})["catch"](e._catchErrors)},h=this.splitGenerator.bind(this)(o)[Symbol.iterator]();!(r=(l=h.next()).done);r=!0)c()}catch(d){s=!0,u=d}finally{try{!r&&h["return"]&&h["return"]()}finally{if(s)throw u}}},_setupSuperPixelData:function(t,e){this.palette=e,this.superPixelData={xPixels:this.gridwidth,yPixels:Math.floor(t.height*(this.gridwidth/t.width))},this.superPixelData.pixelWidth=Math.ceil(t.width/this.superPixelData.xPixels),this.superPixelData.pixelHeight=Math.ceil(t.height/this.superPixelData.yPixels)},_resizeOutputCanvas:function(t){this.$.finalOutput.width=t.width,this.$.finalOutput.height=t.height},_dispatchQuantize:function(t){return this.dispatchWorker("quantize",{imageData:t,palette:this.palette,useDmcColors:this.usedmccolors},[t.data.buffer])},_dispatchPixelate:function(t){var e=t.imageData;return this.dispatchWorker("pixelate",{imageData:e,pixelWidth:this.superPixelData.pixelWidth,pixelHeight:this.superPixelData.pixelHeight,xPixels:this.superPixelData.xPixels,yPixels:this.superPixelData.yPixels},[e.data.buffer])}})}();