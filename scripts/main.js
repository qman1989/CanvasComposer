"use strict";function roundToGrid(e){return Math.round(e/grid)*grid}function fixBoundaries(e){if(e.target){var t=e.target,a=!1,i={left:t.left,right:t.left+t.width*t.scaleX,top:t.top,bottom:t.top+t.height*t.scaleY},o={left:0,top:0,right:canvas.getWidth(),bottom:canvas.getHeight()},n={};return i.left<o.left&&(a=!0,n.left=o.left),i.top<o.top&&(a=!0,n.top=o.top),i.right>o.right&&(a=!0,n.left=i.left-(i.right-o.right)),i.bottom>o.bottom&&(a=!0,n.top=i.top-(i.bottom-o.bottom)),a&&(t.set(n),canvas.renderAll()),e}}function snapMoveToGrid(e){var t=e.target,a=t.width*t.scaleX,i=t.height*t.scaleY,o={top:roundToGrid(t.top),left:roundToGrid(t.left),bottom:roundToGrid(t.top+i),right:roundToGrid(t.left+a)},n={top:Math.abs(o.top-t.top),left:Math.abs(o.left-t.left),bottom:Math.abs(o.bottom-t.top-i),right:Math.abs(o.right-t.left-a)};n.bottom<n.top?n.bottom>threshold?o.top=t.top:o.top=o.bottom-i:n.top>threshold&&(o.top=t.top),n.right<n.left?n.right>threshold?o.left=t.left:o.left=o.right-a:n.left>threshold&&(o.left=t.left),t.set({top:o.top,left:o.left})}function snapScaleToGrid(e){var t=e.target,a=t.getWidth(),i=t.getHeight(),o={top:roundToGrid(t.top),left:roundToGrid(t.left),bottom:roundToGrid(t.top+i),right:roundToGrid(t.left+a)},n={top:Math.abs(o.top-t.top),left:Math.abs(o.left-t.left),bottom:Math.abs(o.bottom-t.top-i),right:Math.abs(o.right-t.left-a)},s={scaleX:t.scaleX,scaleY:t.scaleY,top:t.top,left:t.left};switch(t.__corner){case"tl":n.left<n.top&&n.left<threshold?(s.scaleX=(a-(o.left-t.left))/t.width,s.scaleY=s.scaleX/t.scaleX*t.scaleY,s.top=t.top+(i-t.height*s.scaleY),s.left=o.left):n.top<threshold&&(s.scaleY=(i-(o.top-t.top))/t.height,s.scaleX=s.scaleY/t.scaleY*t.scaleX,s.left=s.left+(a-t.width*s.scaleX),s.top=o.top);break;case"mt":n.top<threshold&&(s.scaleY=(i-(o.top-t.top))/t.height,s.top=o.top);break;case"tr":n.right<n.top&&n.right<threshold?(s.scaleX=(o.right-t.left)/t.width,s.scaleY=s.scaleX/t.scaleX*t.scaleY,s.top=t.top+(i-t.height*s.scaleY)):n.top<threshold&&(s.scaleY=(i-(o.top-t.top))/t.height,s.scaleX=s.scaleY/t.scaleY*t.scaleX,s.top=o.top);break;case"ml":n.left<threshold&&(s.scaleX=(a-(o.left-t.left))/t.width,s.left=o.left);break;case"mr":n.right<threshold&&(s.scaleX=(o.right-t.left)/t.width);break;case"bl":n.left<n.bottom&&n.left<threshold?(s.scaleX=(a-(o.left-t.left))/t.width,s.scaleY=s.scaleX/t.scaleX*t.scaleY,s.left=o.left):n.bottom<threshold&&(s.scaleY=(o.bottom-t.top)/t.height,s.scaleX=s.scaleY/t.scaleY*t.scaleX,s.left=s.left+(a-t.width*s.scaleX));break;case"mb":n.bottom<threshold&&(s.scaleY=(o.bottom-t.top)/t.height);break;case"br":n.right<n.bottom&&n.right<threshold?(s.scaleX=(o.right-t.left)/t.width,s.scaleY=s.scaleX/t.scaleX*t.scaleY):n.bottom<threshold&&(s.scaleY=(o.bottom-t.top)/t.height,s.scaleX=s.scaleY/t.scaleY*t.scaleX)}t.set(s)}function artboardScale(){var e=(canvas.width/canvas.height,canvas.width/container.clientWidth),t=canvas.height/container.clientHeight;console.log("W:"+e),console.log("H:"+t);var a;e>=t?e>1?(e=container.clientWidth/canvas.width,a=e*e,console.log(e),a>1&&(a=1),paintArea.style.transform="scale("+a+")",paintArea.style.transformOrigin="25% 25%"):(a=1,paintArea.style.transform="scale("+a+")",paintArea.style.transformOrigin="25% 25%"):t>e&&(t>1?(t=container.clientHeight/canvas.height,a=t*t,console.log(t),a>1&&(a=1),paintArea.style.transform="scale("+a+")",paintArea.style.transformOrigin="45% 25%"):(a=1,paintArea.style.transform="scale("+a+")",paintArea.style.transformOrigin="25% 25%"))}function getIdx(e,t,a){return _.chain(e).pluck(t).indexOf(a).value()}function in_array(e,t){for(var a=0;a<e.length;a++)if(console.log(e[a]),e[a].id===t)return!0;return!1}function bindEvents(e){e.on("selected",function(){console.log("selected"),$(".objectControl").addClass("active"),instantMeta.log(e)}),canvas.on("before:selection:cleared",function(){console.log("deselected"),$(".objectControl").removeClass("active"),instantMeta.clean()}),e.on("scaling",function(){console.log("scaling"),instantMeta.log(e)}),e.on("moving",function(){console.log("moving"),instantMeta.log(e)}),e.on("rotating",function(){console.log("rotating"),instantMeta.log(e)})}function logObj(){$("#console .shapeobj .content").html(JSON.stringify(canvas.toJSON())),$("#console .canvasobj .content").html(JSON.stringify(canvas))}fabric.Object.prototype.id={},fabric.Object.prototype.media={slider:"",slides:[],video:""};var canvas=new fabric.Canvas("c",{selectionColor:"blue",selectionLineWidth:2,width:800,height:600}),grid=50,threshold=.2*grid;canvas.on("object:moving",snapMoveToGrid),canvas.on("object:scaling",snapScaleToGrid),canvas.on("object:moving",fixBoundaries),canvas.on("object:scaling",fixBoundaries);var container=document.getElementById("artboard"),paintArea=document.getElementById("canvas");artboardScale(),$(window).resize(function(){artboardScale()}),$("#canvasWidth").on("change paste keyup",function(){canvas.setWidth($(this).val()),canvas.renderAll(),artboardScale(),$(".sizeTag .tag.width span").html($(this).val())}),$("#canvasHeight").on("change paste keyup",function(){canvas.setHeight($(this).val()),canvas.renderAll(),artboardScale(),$(".sizeTag .tag.height span").html($(this).val())}),$("#canvas-select").change(function(){var e=$("#canvas-select option:selected").attr("data-width"),t=$("#canvas-select option:selected").attr("data-height");$("#widthValue").val(e),$("#heightValue").val(t),canvas.setWidth(e),canvas.setHeight(t),canvas.renderAll(),artboardScale(),$(".sizeTag .tag.width span").html(e),$(".sizeTag .tag.height span").html(t)}),$(".js-library").on("click",function(){$("#mediaLibrary").addClass("active"),selected.length=0,$("#mediaLibrary .selection").empty(),$("#mediaLibrary .resources a").removeClass("active")}),$("#mediaLibrary .js-close").on("click",function(){$("#mediaLibrary").removeClass("active")});var selected=[];$("#mediaLibrary .resources").on("click","a",function(){$(this).toggleClass("active");var e,t,a,i;t=$(this).attr("data-src"),e=$(this).find(".filename").html(),i=$(this).attr("data-resourceid"),a="5";var o="<li data-resourceid="+i+"><div class='order'><div class='continued'><input type='number' value='"+a+"'></div></div><div class='description'><div class='filename'>"+e+"</div></div></li>";if(in_array(selected,i))$(".settings-container .selection li").each(function(){var e=$(this).attr("data-resourceid");if(e===i){$(this).remove();var t=getIdx(selected,"id",e);t>-1&&selected.splice(t,1),console.log(selected)}});else{$(".settings-container .selection").append(o);var n={id:i,src:t,continued:a};selected.push(n),console.log(selected)}}),$(".js-sendToObj").on("click",function(){if(1===selected.length){var e=selected[0].src;$("#mediaValue").val(e);var t=canvas.getActiveObject(),a=e;console.log(a),null==t?alert("未選取任何物件"):(void 0!==t._element&&"video"===t._element.localName?(t.getElement().pause(),t.remove()):t.remove(),Artboard.addMedia(a),canvas.renderAll(),t.center(),t.setCoords(),logObj()),$(this).parents("#mediaLibrary").removeClass("active")}else if(selected.length>1){var t=canvas.getActiveObject();null==t?alert("未選取任何物件"):t.remove(),Artboard.addMedia(selected),canvas.renderAll(),t.center(),t.setCoords(),logObj(),$(this).parents("#mediaLibrary").removeClass("active")}else alert("未選擇任何素材")}),$(".objectSize").on("change",function(){var e,t,a,i,o=canvas.getActiveObject();e=o.width,t=o.height,a=$("#objectWidth").val()/e,i=$("#objectHeight").val()/t,o.setScaleX(a),o.setScaleY(i),o.setCoords(),canvas.renderAll()});var initRadius=100,Artboard=function(){return{addRect:function(){var e=new fabric.Rect({left:canvas.getWidth()/2-initRadius/2,top:canvas.getHeight()/2-initRadius/2,fill:"rgba(0,0,0,0.33)",width:initRadius,height:initRadius});e.perPixelTargetFind=!0,canvas.add(e),bindEvents(e),canvas.setActiveObject(e),logObj()},addCircle:function(){var e=new fabric.Circle({left:canvas.getWidth()/2-initRadius/2,top:canvas.getHeight()/2-initRadius/2,fill:"rgba(0,0,0,0.33)",radius:initRadius/2});e.perPixelTargetFind=!0,canvas.add(e),bindEvents(e),logObj()},addTriangle:function(){var e=new fabric.Triangle({left:canvas.getWidth()/2-initRadius/2,top:canvas.getHeight()/2-initRadius/2,fill:"rgba(0,0,0,0.33)",width:initRadius,height:initRadius});e.perPixelTargetFind=!0,canvas.add(e),bindEvents(e),logObj()},addMedia:function(e){if((""===e||void 0===e)&&(e="images/uploads/abc.png"),"[object Array]"===Object.prototype.toString.call(e)){var t,a,i,o,n,s,c,l,r,d,g;!function(){var h=function v(e,t,a,n,s,l){o=clearInterval(o),console.log(s.source()),e===t.length&&(e=0),l.setDimensions({width:n.getWidth()+c,height:n.getHeight()+c}),l.renderAll(),canvas.renderAll(),a.setSrc(t[e].src,function(e){a.scaleToWidth(n.getWidth()),l.renderAll(),canvas.renderAll(),logObj()}),console.log(a),i=1e3*t[e].continued,console.log(i),e++,o=setInterval(function(){v(e,t,a,n,s,l)},i)};t=0,a=0,n=e[0].src.split(".").pop(),console.log(n),n.match(/^(gif|png|jpg|jpeg|tiff|svg)$/)?(console.log("match"),c=0,s=new fabric.Image.fromURL(e[0].src,function(t){var i=new fabric.StaticCanvas;i.add(t);var o=new fabric.Pattern({source:function(){return i.setDimensions({width:t.getWidth()+c,height:t.getHeight()+c}),i.getElement()},repeat:"no-repeat"}),n=new fabric.Rect({left:canvas.getWidth()/2-t.getWidth()/2,top:canvas.getHeight()/2-t.getHeight()/2,fill:o,width:t.getWidth()+c,height:t.getHeight()+c});canvas.add(n),n.toObject=function(t){return function(){return fabric.util.object.extend(t.call(this),{id:1,media:{slides:e,video:this.media.video}})}}(n.toObject),canvas.renderAll(),bindEvents(n),h(a,e,t,n,o,i),logObj()})):n.match(/^(mp4|avi|ogg|ogv|webm)$/)?(console.log("match video"),l=1.6*initRadius,r=.9*initRadius,d=document.createElement("video"),d.loop=!0,d.controls=!0,console.log(d),d.innerHTML='<source src="'+e+'">',g=new fabric.Image(d,{left:canvas.getWidth()/2-l/2,top:canvas.getHeight()/2-r/2,angle:0,width:l,height:r}),canvas.add(g),g.getElement().play(),g.toObject=function(t){return function(){return fabric.util.object.extend(t.call(this),{media:{slides:this.media.slides,video:e}})}}(g.toObject),bindEvents(g),canvas.setActiveObject(g),logObj(),fabric.util.requestAnimFrame(function u(){canvas.renderAll(),fabric.util.requestAnimFrame(u)})):console.log("不支援此檔案格式，請重試")}()}else{var s,n=e.split(".").pop();console.log(n);var h=validateYouTubeUrl(e);0!=h&&YoutubeVideo(h,function(e){console.log(e.title);var t=e.getSource("video/webm","medium");console.log("WebM: "+t.url);var a=e.getSource("video/mp4","medium");console.log("MP4: "+a.url)}),n.match(/^(gif|png|jpg|jpeg|tiff|svg)$/)?Multimedia.image(e):n.match(/^(mp4|avi|ogg|ogv|webm)$/)?Multimedia.video(e):console.log("不支援此檔案格式，請重試")}},dispose:function(){for(var e=0;e<canvas._objects.length;e++)void 0!==canvas._objects[e]._element&&"video"===canvas._objects[e]._element.localName?canvas._objects[e].getElement().pause():console.log("error");canvas.clear(),logObj()},removeObject:function(){var e=canvas.getActiveObject();void 0!==e._element&&"video"===e._element.localName?(e.getElement().pause(),e.remove()):e.remove()},reset:function(){var e=canvas.getActiveObject();e.setScaleX("1"),e.setScaleY("1"),e.center(),e.setCoords(),canvas.renderAll()}}}(),Multimedia=function(){return{image:function(e){new fabric.Image.fromURL(e,function(e){e.set({left:canvas.getWidth()/2-e.width/2,top:canvas.getHeight()/2-e.height/2}),canvas.add(e),e.center(),e.setCoords(),e.toObject=function(e){return function(){return fabric.util.object.extend(e.call(this),{id:1,media:{slides:this.media.slides,video:this.media.video}})}}(e.toObject),canvas.renderAll(),bindEvents(e),canvas.setActiveObject(e),logObj()})},video:function e(t){console.log("match video");var a,i,o=document.createElement("video");o.loop=!0,o.controls=!0,console.log(o),o.innerHTML='<source src="'+t+'">';var e=new fabric.Image(o,{});canvas.add(e),o.onloadeddata=function(){a=this.videoWidth,i=this.videoHeight,e.setWidth(a),e.setHeight(i),e.center(),e.setCoords(),canvas.renderAll()},e.getElement().play(),e.toObject=function(e){return function(){return fabric.util.object.extend(e.call(this),{media:{video:t}})}}(e.toObject),bindEvents(e),canvas.setActiveObject(e),logObj(),fabric.util.requestAnimFrame(function n(){canvas.renderAll(),fabric.util.requestAnimFrame(n)})},slider:function(){},clock:function(){},iframe:function(){}}}();canvas.getObjects(),console.log(canvas.getWidth()),$(".tools").on("click","a",function(){var e=$(this).attr("class");switch(e){case"js-add-rect":Artboard.addRect();break;case"js-add-circle":Artboard.addCircle();break;case"js-add-triangle":Artboard.addTriangle();break;case"js-dispose":Artboard.dispose()}}),$(".objectControl").on("click","button",function(){var e=$(this).attr("class");switch(e){case"js-delete":Artboard.removeObject();break;case"js-reset":Artboard.reset()}});var map={8:!1,91:!1};$(document).keydown(function(e){e.keyCode in map&&(map[e.keyCode]=!0,map[8]&&map[91]&&Artboard.removeObject())}).keyup(function(e){e.keyCode in map&&(map[e.keyCode]=!1)});var instantMeta={log:function(e){console.log(e.toObject());var t,a,i,o,n,s,c,l,r;t=e.width*e.scaleX,a=e.height*e.scaleY,i=e.radius,o=e.left,n=e.top,s=e.angle,c=e.type,"image"===c&&(""!=e.toObject().media.video?(l=e.toObject().media.video,r="<video controls autoplay muted><source src="+e.toObject().media.video+"></source></video>",console.log(l)):0!=e.toObject().media.slides.length?(l=e.toObject().media.slides,r=""):""!=e.toObject().src?(l=e.toObject().src,r="<img src="+e.toObject().src+">"):alert("Type Error")),$(".attributes-wrapper .type input").val(c),$(".attributes-wrapper .width input").val(t),$(".attributes-wrapper .height input").val(a),$(".attributes-wrapper .radius input").val(i),$(".attributes-wrapper .angle input").val(s),$(".attributes-wrapper .top input").val(n),$(".attributes-wrapper .left input").val(o),$(".attributes-wrapper .media input").val(l),$(".attributes-wrapper .mediaPreview").html(r),logObj()},clean:function(e){$(".attributes-wrapper input").val(""),$(".attributes-wrapper .mediaPreview").empty(),console.log("clean")}},el=document.getElementById("selectionOrder"),sortable=Sortable.create(el),Typekit;!function(e){var t,a={kitId:"daf4cqp",scriptTimeout:3e3,async:!0},i=e.documentElement,o=setTimeout(function(){i.className=i.className.replace(/\bwf-loading\b/g,"")+" wf-inactive"},a.scriptTimeout),n=e.createElement("script"),s=!1,c=e.getElementsByTagName("script")[0];i.className+=" wf-loading",n.src="https://use.typekit.net/"+a.kitId+".js",n.async=!0,n.onload=n.onreadystatechange=function(){if(t=this.readyState,!(s||t&&"complete"!=t&&"loaded"!=t)){s=!0,clearTimeout(o);try{Typekit.load(a)}catch(e){}}},c.parentNode.insertBefore(n,c)}(document);