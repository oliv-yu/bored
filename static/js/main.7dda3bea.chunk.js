(this.webpackJsonpbored=this.webpackJsonpbored||[]).push([[0],{30:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),i=n(19),o=n.n(i),s=(n(30),n(3)),r=n(9),l=n(24),d=n(0),u=["children","size","title","type"];var h=function(e){var t=e.children,n=e.size,a=void 0===n?"lg":n,c=e.title,i=e.type,o=void 0===i?"general":i,s=Object(l.a)(e,u);return Object(d.jsx)("div",Object(r.a)(Object(r.a)({className:"card card-".concat(a," ").concat(o,"-card")},s),{},{children:Object(d.jsxs)("div",{className:"card-body",children:[c&&Object(d.jsx)("p",{className:"card-title",children:c}),t]})}))};var b=function(){var e=Object(a.useState)("Click on Next to get a random activity."),t=Object(s.a)(e,2),n=t[0],c=t[1];return Object(d.jsxs)(h,{title:"DO SOMETHING",children:[Object(d.jsx)("p",{className:"App-card-text card-text",children:n}),Object(d.jsx)("button",{onClick:function(){fetch("https://www.boredapi.com/api/activity").then((function(e){return e.json()})).then((function(e){c(e.activity)})).catch(console.log)},className:"btn btn-sm",children:"Next"})]})},m=n(23),j=n(20),p=n(21),f=n(25),v=n(22);var O=function(e){Object(f.a)(n,e);var t=Object(v.a)(n);function n(e){var a;return Object(j.a)(this,n),(a=t.call(this,e)).mapRef=c.a.createRef(),a.state={behavior:null,ui:null,map:null},a}return Object(p.a)(n,[{key:"generateMap",value:function(){var e=window.H,t=new e.service.Platform({apiId:"".concat("6Yt9RY6at4hZwVH5YKWk"),apikey:"".concat("aycEe3sG00v9c3BiwzXumyIbsXp2yWATGRsVMv6Qf9Y")}).createDefaultLayers(),n=new e.Map(this.mapRef.current,t.vector.normal.map,{center:this.props.center,zoom:14,pixelRatio:window.devicePixelRatio||1}),a=new e.mapevents.Behavior(new e.mapevents.MapEvents(n)),c=e.ui.UI.createDefault(n,t);this.setState({behavior:a,ui:c,map:n})}},{key:"componentDidMount",value:function(){this.generateMap()}},{key:"componentDidUpdate",value:function(e){this.props.center!==e.center&&this.state.map.setCenter(this.props.center),this.props.markers!==e.markers&&(function(e){var t=e.getObjects();e.removeObjects(t)}(this.state.map),function(e,t,n){var a=window.H,c=new a.map.Group;e.addObject(c),c.addEventListener("tap",(function(e){var t=new a.ui.InfoBubble(e.target.getGeometry(),{content:e.target.getData()});n.addBubble(t)}),!1),t.forEach((function(e,t){!function(e,t,n,a,c,i){var o=window.H,s=new o.map.Icon(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"X",t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"black";return'<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg">'+'<rect stroke="black" fill="'.concat(arguments.length>1&&void 0!==arguments[1]?arguments[1]:"white",'" x="1" y="1" width="22" height="22" />')+'<text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" '+'text-anchor="middle" fill="'.concat(t,'" >').concat(e)+"</text></svg>"}(a,c,i)),r=new o.map.Marker(t,{icon:s});r.setData(n),e.addObject(r)}(c,e.coordinate,e.html,t+1)}))}(this.state.map,this.props.markers,this.state.ui))}},{key:"componentWillUnmount",value:function(){this.state.map.dispose()}},{key:"render",value:function(){var e=this;return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("div",{ref:this.mapRef,style:{width:"100%",height:"400px",background:"grey"}}),Object(d.jsx)("button",{className:"btn btn-sm",onClick:function(){e.props.refreshMarkers(e.state.map.getCenter())},children:"Refresh"})]})}}]),n}(a.Component),g=n(4),x=n.n(g);var w=function(e){var t=e.location,n=e.onChangeLocation,c=Object(a.useState)([]),i=Object(s.a)(c,2),o=i[0],r=i[1],l=function(e){var t=e.lat,n=e.lng;x.a.request({method:"GET",url:"https://api.yelp.com/v3/businesses/search",params:{sort_by:"best_match",limit:"10",latitude:t,longitude:n},headers:{accept:"application/json",Authorization:"Bearer S-tx6LFRGRi2UuK-cPVZjuwDvRG6KT_A43lLDo185xF6l1GQePBsQuot6DvBN6kzPq2zrd6P1w9xfQdb6_bXfbj4aUViCys4X3xG14FhFMni1OT9HQME6Cj6PL9KZnYx","Access-Control-Allow-Origin":"*"}}).then((function(e){r(e.data.businesses)})).catch((function(e){console.error(e)}))};return Object(a.useEffect)((function(){l(t)}),[t]),Object(d.jsxs)(h,{type:"business",title:"GO SOMEWHERE",children:[Object(d.jsx)(O,{center:t,markers:o.map((function(e){return{coordinate:{lat:e.coordinates.latitude,lng:e.coordinates.longitude},html:"<div><img src=".concat(e.image_url,' class="business-img" alt="').concat(e.name,'"></div>')+'<div><a class="business-title" href='.concat(e.url,' target="_blank" rel="noopener noreferrer">').concat(e.name,"</a></div>")}})),refreshMarkers:function(e){var t=e.lat,a=e.lng;l({lat:t,lng:a}),n({lat:t,lng:a})}}),Object(d.jsx)("div",{className:"list-group",children:o.map((function(e,t){return Object(d.jsxs)("a",{href:e.url,target:"_blank",className:"App-card-text list-group-item list-group-item-action flex-column align-items-start",rel:"noopener noreferrer",children:[Object(d.jsxs)("div",{className:"d-flex w-100 justify-content-between",children:[Object(d.jsxs)("h5",{className:"mb-1",children:[t+1,". ",e.name]}),Object(d.jsx)("small",{children:e.price})]}),Object(d.jsxs)("div",{className:"d-flex w-100 justify-content-between",children:[Object(d.jsx)("p",{className:"mb-1",children:e.location.display_address.join(", ")}),Object(d.jsx)("small",{children:e.categories.reduce((function(e,t){return[t.title].concat(Object(m.a)(e))}),[]).join(", ")})]})]},t)}))})]})};var y=function(e){var t=e.location,n=e.onChangeLocation,c=Object(a.useState)(""),i=Object(s.a)(c,2),o=i[0],r=i[1],l=Object(a.useState)([]),u=Object(s.a)(l,2),h=u[0],b=u[1],m=Object(a.useState)(-1),j=Object(s.a)(m,2),p=j[0],f=j[1],v=function(e){x.a.get("https://lookup.search.hereapi.com/v1/lookup",{params:{app_id:"".concat("6Yt9RY6at4hZwVH5YKWk"),apiKey:"".concat("aycEe3sG00v9c3BiwzXumyIbsXp2yWATGRsVMv6Qf9Y"),id:e},mode:"cors",credentials:"include"}).then((function(e){n(e.data.position),b([]),f(-1)})).catch(console.log)};return Object(a.useEffect)((function(){r("")}),[t]),Object(d.jsx)("div",{className:"input-group mb-3 search-bar",children:Object(d.jsxs)("div",{className:"dropdown",children:[Object(d.jsx)("input",{type:"text",className:"form-control dropdown-toggle",placeholder:"Search a place","aria-label":"Search a place",onChange:function(e){r(e.target.value),e.target.value&&function(e){x.a.get("https://autocomplete.search.hereapi.com/v1/autocomplete",{params:{app_id:"".concat("6Yt9RY6at4hZwVH5YKWk"),apiKey:"".concat("aycEe3sG00v9c3BiwzXumyIbsXp2yWATGRsVMv6Qf9Y"),q:e},mode:"cors",credentials:"include"}).then((function(e){b(e.data.items)})).catch(console.log)}(e.target.value)},onKeyDown:function(e){"ArrowUp"===e.key&&f(-1===p?h.length-1:p-1),"ArrowDown"===e.key&&f(p===h.length-1?-1:p+1),"Enter"===e.key&&p>-1&&v(h[p].id)},value:o}),h.length>0&&Object(d.jsx)("div",{className:"dropdown-menu show","aria-labelledby":"autocomplete-list",children:h.map((function(e,t){return Object(d.jsx)("button",{onMouseEnter:function(){return f(t)},className:t===p?"active dropdown-item":"dropdown-item",onTouchStart:function(){return v(e.id)},onClick:function(){return v(e.id)},type:"button",children:e.title},e.id)}))})]})})},k=n(5),N=n.n(k),E=n(4);var C=function(e){var t,n=e.location,c=Object(a.useState)({}),i=Object(s.a)(c,2),o=i[0],r=i[1],l=Object(a.useState)(N.a.utc()),u=Object(s.a)(l,2),b=u[0],m=u[1],j=Object(a.useCallback)((function(){E.get("https://api.openweathermap.org/data/2.5/weather",{params:{lat:n.lat,lon:n.lng,appid:"f84bf45b61fb589b35491dccf1e1e216",units:"imperial"}}).then((function(e){r(e.data)})).catch((function(e){console.log(e)}))}),[n]);return Object(a.useEffect)((function(){j()}),[j]),Object(a.useEffect)((function(){var e=setInterval((function(){m(N.a.utc())}),1e3);return function(){clearInterval(e)}})),Object(d.jsx)(h,{title:"TALK ABOUT THE WEATHER",type:"weather",children:(null===(t=o.main)||void 0===t?void 0:t.temp)&&Object(d.jsx)("div",{children:Object(d.jsxs)("div",{children:[Object(d.jsxs)("h4",{children:[Object(d.jsx)("img",{src:"https://openweathermap.org/img/w/".concat(o.weather[0].icon,".png"),alt:o.weather[0].description,title:o.weather[0].main}),Object(d.jsxs)("span",{children:[o.name,", ",o.sys.country," - ",o.main.temp," F"]})]}),Object(d.jsx)("h5",{children:b.utcOffset(o.timezone/3600).format("MMM DD YYYY hh:mm:ss A")}),Object(d.jsxs)("div",{className:"card-text",children:[Object(d.jsxs)("div",{children:["Feels like: ",o.main.feels_like]}),Object(d.jsxs)("div",{children:["Humidity: ",o.main.humidity,"%"]}),Object(d.jsxs)("div",{children:["Wind: ",o.wind.speed," mph"]})]})]})})})},M={lat:40.73,lng:-73.99};var R=function(){var e=Object(a.useState)(M),t=Object(s.a)(e,2),n=t[0],c=t[1];return Object(d.jsxs)("div",{className:"bored-app",children:[Object(d.jsx)("div",{className:"bored-header",children:Object(d.jsx)("span",{children:"Feeling Bored?"})}),Object(d.jsxs)("div",{className:"bored-body",children:[Object(d.jsxs)("div",{className:"bored-search",children:[Object(d.jsxs)("div",{className:"todays-date",children:[N()().format("dddd"),", ",N()().format("LL")]}),Object(d.jsx)(y,{location:n,onChangeLocation:c}),Object(d.jsxs)("button",{onClick:function(){navigator.geolocation.getCurrentPosition((function(e){var t=e.coords;c({lat:t.latitude,lng:t.longitude})}),(function(e){console.log(e)}))},className:"btn btn-sm",children:[Object(d.jsx)("i",{className:"bi bi-geo-alt"}),"Use Current Location"]}),Object(d.jsx)("button",{onClick:function(){document.body.classList.toggle("dark-mode")},style:{marginLeft:"10px"},className:"btn btn-sm",children:"Switch Theme Mode"})]}),Object(d.jsx)(C,{location:n}),Object(d.jsx)(b,{}),Object(d.jsx)(w,{location:n,onChangeLocation:c})]})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(Object(d.jsx)(R,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[52,1,2]]]);
//# sourceMappingURL=main.7dda3bea.chunk.js.map