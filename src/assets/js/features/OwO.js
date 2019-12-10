/*! handsome 2019-09-18 */

"use strict";function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();!function(){var a=function(){function a(b){var c=this;_classCallCheck(this,a);var d={logo:"OwO表情",container:document.getElementsByClassName("OwO")[0],target:document.getElementsByTagName("textarea")[0],position:"down",width:"100%",maxHeight:"235px",api:"https://api.anotherhome.net/OwO/OwO.json"};for(var e in d)d.hasOwnProperty(e)&&!b.hasOwnProperty(e)&&(b[e]=d[e]);this.container=b.container,this.target=b.target,"up"===b.position&&this.container.classList.add("OwO-up");var f=new XMLHttpRequest;f.onreadystatechange=function(){4===f.readyState&&(f.status>=200&&f.status<300||304===f.status?(c.odata=JSON.parse(f.responseText),c.init(b)):console.log("OwO data request was unsuccessful: "+f.status))},f.open("get",b.api,!0),f.send(null)}return _createClass(a,[{key:"init",value:function(a){var b=this;this.area=a.target,this.packages=Object.keys(this.odata);for(var c='\n            <div class="OwO-logo"><i class="fontello fontello-emo-tongue face"></i><span class="OwOlogotext">'+a.logo+'</span></div>\n            <div class="OwO-body" style="width: '+a.width+'"><div class="OwO-title"><span>OwO</span></div>',d=0;d<this.packages.length;d++){c+='\n                <ul class="OwO-items OwO-'+this.odata[this.packages[d]].name+" OwO-items-"+this.odata[this.packages[d]].type+'" style="max-height: '+(parseInt(a.maxHeight)-53)+'px;">';for(var e=this.odata[this.packages[d]].container,f=0;f<e.length;f++)"image"===this.odata[this.packages[d]].type?c+='\n                    <li class="OwO-item" title="'+e[f].text+'" data-input="'+this.odata[this.packages[d]].name+":"+e[f].icon+'"><img data-original="'+LocalConst.BASE_SCRIPT_URL+"usr/img/emotion/"+this.odata[this.packages[d]].name+"/"+e[f].icon+'.png" src="" icon="'+e[f].text+'"></li>':c+='\n                    <li class="OwO-item" title="'+e[f].text+'">'+e[f].icon+"</li>";c+="\n                </ul>"}c+='\n                <div class="OwO-bar">\n                    <ul class="OwO-packages">';for(var g=0;g<this.packages.length;g++)c+="\n                        <li><span>"+this.packages[g]+"</span></li>";c+="\n                    </ul>\n                </div>\n            </div>\n            ",this.container.innerHTML=c,this.logo=this.container.getElementsByClassName("OwO-logo")[0],this.logo.addEventListener("click",function(){b.toggle()}),this.container.getElementsByClassName("OwO-body")[0].addEventListener("click",function(a){var c=null;if(a.target.classList.contains("OwO-item")?c=a.target:a.target.parentNode.classList.contains("OwO-item")&&(c=a.target.parentNode),c){var d,e=b.area.selectionStart,f=b.area.selectionEnd,g=b.area.value;d=c.dataset.hasOwnProperty("input")?" ::"+c.dataset.input+":: ":c.innerHTML,b.area.value=g.slice(0,e)+d+g.slice(f),b.area.selectionStart=e+d.length,b.area.selectionEnd=e+d.length,b.area.focus(),b.toggle()}}),this.packagesEle=this.container.getElementsByClassName("OwO-packages")[0];for(var h=0;h<this.packagesEle.children.length;h++)!function(a){!function(c){b.packagesEle.children[a].addEventListener("click",function(){b.tab(c)})}(a)}(h);this.tab(0)}},{key:"toggle",value:function(){this.container.classList.contains("OwO-open")?this.container.classList.remove("OwO-open"):this.container.classList.add("OwO-open");var a=document.getElementById("secret_comment");null===a.offsetParent?a.style.display="block":a.style.display="none";try{$("img").lazyload({effect:"fadeIn"})}catch(a){}}},{key:"tab",value:function(a){var b=this.container.getElementsByClassName("OwO-items-show")[0];b&&b.classList.remove("OwO-items-show"),this.container.getElementsByClassName("OwO-items")[a].classList.add("OwO-items-show");var c=this.container.getElementsByClassName("OwO-package-active")[0];c&&c.classList.remove("OwO-package-active"),this.packagesEle.getElementsByTagName("li")[a].classList.add("OwO-package-active");try{$("img").lazyload({effect:"fadeIn"})}catch(a){if(this.container.classList.contains("OwO-open")){var d=this.container.querySelectorAll(".OwO-items.OwO-items-show>li img");[].forEach.call(d,function(a){var b=a.dataset.original;b&&(a.src=b,a.removeAttribute("data-original"))})}}}}]),a}();"undefined"!=typeof module&&void 0!==module.exports?module.exports=a:window.OwO=a}();