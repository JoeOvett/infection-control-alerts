import"./modulepreload-polyfill-3cfb730f.js";/* empty css              */function X(n,t,e,s){function r(i){return i instanceof e?i:new e(function(a){a(i)})}return new(e||(e=Promise))(function(i,a){function c(h){try{u(s.next(h))}catch(l){a(l)}}function o(h){try{u(s.throw(h))}catch(l){a(l)}}function u(h){h.done?i(h.value):r(h.value).then(c,o)}u((s=s.apply(n,t||[])).next())})}function tt(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var et=function n(t,e){if(t===e)return!0;if(t&&e&&typeof t=="object"&&typeof e=="object"){if(t.constructor!==e.constructor)return!1;var s,r,i;if(Array.isArray(t)){if(s=t.length,s!=e.length)return!1;for(r=s;r--!==0;)if(!n(t[r],e[r]))return!1;return!0}if(t.constructor===RegExp)return t.source===e.source&&t.flags===e.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===e.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===e.toString();if(i=Object.keys(t),s=i.length,s!==Object.keys(e).length)return!1;for(r=s;r--!==0;)if(!Object.prototype.hasOwnProperty.call(e,i[r]))return!1;for(r=s;r--!==0;){var a=i[r];if(!n(t[a],e[a]))return!1}return!0}return t!==t&&e!==e},st=tt(et);const G="__googleMapsScriptId";var x;(function(n){n[n.INITIALIZED=0]="INITIALIZED",n[n.LOADING=1]="LOADING",n[n.SUCCESS=2]="SUCCESS",n[n.FAILURE=3]="FAILURE"})(x||(x={}));class I{constructor({apiKey:t,authReferrerPolicy:e,channel:s,client:r,id:i=G,language:a,libraries:c=[],mapIds:o,nonce:u,region:h,retries:l=3,url:p="https://maps.googleapis.com/maps/api/js",version:f}){if(this.callbacks=[],this.done=!1,this.loading=!1,this.errors=[],this.apiKey=t,this.authReferrerPolicy=e,this.channel=s,this.client=r,this.id=i||G,this.language=a,this.libraries=c,this.mapIds=o,this.nonce=u,this.region=h,this.retries=l,this.url=p,this.version=f,I.instance){if(!st(this.options,I.instance.options))throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(I.instance.options)}`);return I.instance}I.instance=this}get options(){return{version:this.version,apiKey:this.apiKey,channel:this.channel,client:this.client,id:this.id,libraries:this.libraries,language:this.language,region:this.region,mapIds:this.mapIds,nonce:this.nonce,url:this.url,authReferrerPolicy:this.authReferrerPolicy}}get status(){return this.errors.length?x.FAILURE:this.done?x.SUCCESS:this.loading?x.LOADING:x.INITIALIZED}get failed(){return this.done&&!this.loading&&this.errors.length>=this.retries+1}createUrl(){let t=this.url;return t+="?callback=__googleMapsCallback&loading=async",this.apiKey&&(t+=`&key=${this.apiKey}`),this.channel&&(t+=`&channel=${this.channel}`),this.client&&(t+=`&client=${this.client}`),this.libraries.length>0&&(t+=`&libraries=${this.libraries.join(",")}`),this.language&&(t+=`&language=${this.language}`),this.region&&(t+=`&region=${this.region}`),this.version&&(t+=`&v=${this.version}`),this.mapIds&&(t+=`&map_ids=${this.mapIds.join(",")}`),this.authReferrerPolicy&&(t+=`&auth_referrer_policy=${this.authReferrerPolicy}`),t}deleteScript(){const t=document.getElementById(this.id);t&&t.remove()}load(){return this.loadPromise()}loadPromise(){return new Promise((t,e)=>{this.loadCallback(s=>{s?e(s.error):t(window.google)})})}importLibrary(t){return this.execute(),google.maps.importLibrary(t)}loadCallback(t){this.callbacks.push(t),this.execute()}setScript(){var t,e;if(document.getElementById(this.id)){this.callback();return}const s={key:this.apiKey,channel:this.channel,client:this.client,libraries:this.libraries.length&&this.libraries,v:this.version,mapIds:this.mapIds,language:this.language,region:this.region,authReferrerPolicy:this.authReferrerPolicy};Object.keys(s).forEach(i=>!s[i]&&delete s[i]),!((e=(t=window==null?void 0:window.google)===null||t===void 0?void 0:t.maps)===null||e===void 0)&&e.importLibrary||(i=>{let a,c,o,u="The Google Maps JavaScript API",h="google",l="importLibrary",p="__ib__",f=document,d=window;d=d[h]||(d[h]={});const m=d.maps||(d.maps={}),g=new Set,y=new URLSearchParams,w=()=>a||(a=new Promise((v,O)=>X(this,void 0,void 0,function*(){var _;yield c=f.createElement("script"),c.id=this.id,y.set("libraries",[...g]+"");for(o in i)y.set(o.replace(/[A-Z]/g,$=>"_"+$[0].toLowerCase()),i[o]);y.set("callback",h+".maps."+p),c.src=this.url+"?"+y,m[p]=v,c.onerror=()=>a=O(Error(u+" could not load.")),c.nonce=this.nonce||((_=f.querySelector("script[nonce]"))===null||_===void 0?void 0:_.nonce)||"",f.head.append(c)})));m[l]?console.warn(u+" only loads once. Ignoring:",i):m[l]=(v,...O)=>g.add(v)&&w().then(()=>m[l](v,...O))})(s);const r=this.libraries.map(i=>this.importLibrary(i));r.length||r.push(this.importLibrary("core")),Promise.all(r).then(()=>this.callback(),i=>{const a=new ErrorEvent("error",{error:i});this.loadErrorCallback(a)})}reset(){this.deleteScript(),this.done=!1,this.loading=!1,this.errors=[],this.onerrorEvent=null}resetIfRetryingFailed(){this.failed&&this.reset()}loadErrorCallback(t){if(this.errors.push(t),this.errors.length<=this.retries){const e=this.errors.length*Math.pow(2,this.errors.length);console.error(`Failed to load Google Maps script, retrying in ${e} ms.`),setTimeout(()=>{this.deleteScript(),this.setScript()},e)}else this.onerrorEvent=t,this.callback()}callback(){this.done=!0,this.loading=!1,this.callbacks.forEach(t=>{t(this.onerrorEvent)}),this.callbacks=[]}execute(){if(this.resetIfRetryingFailed(),this.done)this.callback();else{if(window.google&&window.google.maps&&window.google.maps.version){console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match."),this.callback();return}this.loading||(this.loading=!0,this.setScript())}}}function rt(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var it=function n(t,e){if(t===e)return!0;if(t&&e&&typeof t=="object"&&typeof e=="object"){if(t.constructor!==e.constructor)return!1;var s,r,i;if(Array.isArray(t)){if(s=t.length,s!=e.length)return!1;for(r=s;r--!==0;)if(!n(t[r],e[r]))return!1;return!0}if(t.constructor===RegExp)return t.source===e.source&&t.flags===e.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===e.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===e.toString();if(i=Object.keys(t),s=i.length,s!==Object.keys(e).length)return!1;for(r=s;r--!==0;)if(!Object.prototype.hasOwnProperty.call(e,i[r]))return!1;for(r=s;r--!==0;){var a=i[r];if(!n(t[a],e[a]))return!1}return!0}return t!==t&&e!==e};const K=rt(it),z=[Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array],j=1,C=8;class U{static from(t){if(!(t instanceof ArrayBuffer))throw new Error("Data must be an instance of ArrayBuffer.");const[e,s]=new Uint8Array(t,0,2);if(e!==219)throw new Error("Data does not appear to be in a KDBush format.");const r=s>>4;if(r!==j)throw new Error(`Got v${r} data when expected v${j}.`);const i=z[s&15];if(!i)throw new Error("Unrecognized array type.");const[a]=new Uint16Array(t,2,1),[c]=new Uint32Array(t,4,1);return new U(c,a,i,t)}constructor(t,e=64,s=Float64Array,r){if(isNaN(t)||t<0)throw new Error(`Unpexpected numItems value: ${t}.`);this.numItems=+t,this.nodeSize=Math.min(Math.max(+e,2),65535),this.ArrayType=s,this.IndexArrayType=t<65536?Uint16Array:Uint32Array;const i=z.indexOf(this.ArrayType),a=t*2*this.ArrayType.BYTES_PER_ELEMENT,c=t*this.IndexArrayType.BYTES_PER_ELEMENT,o=(8-c%8)%8;if(i<0)throw new Error(`Unexpected typed array class: ${s}.`);r&&r instanceof ArrayBuffer?(this.data=r,this.ids=new this.IndexArrayType(this.data,C,t),this.coords=new this.ArrayType(this.data,C+c+o,t*2),this._pos=t*2,this._finished=!0):(this.data=new ArrayBuffer(C+a+c+o),this.ids=new this.IndexArrayType(this.data,C,t),this.coords=new this.ArrayType(this.data,C+c+o,t*2),this._pos=0,this._finished=!1,new Uint8Array(this.data,0,2).set([219,(j<<4)+i]),new Uint16Array(this.data,2,1)[0]=e,new Uint32Array(this.data,4,1)[0]=t)}add(t,e){const s=this._pos>>1;return this.ids[s]=s,this.coords[this._pos++]=t,this.coords[this._pos++]=e,s}finish(){const t=this._pos>>1;if(t!==this.numItems)throw new Error(`Added ${t} items when expected ${this.numItems}.`);return R(this.ids,this.coords,this.nodeSize,0,this.numItems-1,0),this._finished=!0,this}range(t,e,s,r){if(!this._finished)throw new Error("Data not yet indexed - call index.finish().");const{ids:i,coords:a,nodeSize:c}=this,o=[0,i.length-1,0],u=[];for(;o.length;){const h=o.pop()||0,l=o.pop()||0,p=o.pop()||0;if(l-p<=c){for(let g=p;g<=l;g++){const y=a[2*g],w=a[2*g+1];y>=t&&y<=s&&w>=e&&w<=r&&u.push(i[g])}continue}const f=p+l>>1,d=a[2*f],m=a[2*f+1];d>=t&&d<=s&&m>=e&&m<=r&&u.push(i[f]),(h===0?t<=d:e<=m)&&(o.push(p),o.push(f-1),o.push(1-h)),(h===0?s>=d:r>=m)&&(o.push(f+1),o.push(l),o.push(1-h))}return u}within(t,e,s){if(!this._finished)throw new Error("Data not yet indexed - call index.finish().");const{ids:r,coords:i,nodeSize:a}=this,c=[0,r.length-1,0],o=[],u=s*s;for(;c.length;){const h=c.pop()||0,l=c.pop()||0,p=c.pop()||0;if(l-p<=a){for(let g=p;g<=l;g++)q(i[2*g],i[2*g+1],t,e)<=u&&o.push(r[g]);continue}const f=p+l>>1,d=i[2*f],m=i[2*f+1];q(d,m,t,e)<=u&&o.push(r[f]),(h===0?t-s<=d:e-s<=m)&&(c.push(p),c.push(f-1),c.push(1-h)),(h===0?t+s>=d:e+s>=m)&&(c.push(f+1),c.push(l),c.push(1-h))}return o}}function R(n,t,e,s,r,i){if(r-s<=e)return;const a=s+r>>1;J(n,t,a,s,r,i),R(n,t,e,s,a-1,1-i),R(n,t,e,a+1,r,1-i)}function J(n,t,e,s,r,i){for(;r>s;){if(r-s>600){const u=r-s+1,h=e-s+1,l=Math.log(u),p=.5*Math.exp(2*l/3),f=.5*Math.sqrt(l*p*(u-p)/u)*(h-u/2<0?-1:1),d=Math.max(s,Math.floor(e-h*p/u+f)),m=Math.min(r,Math.floor(e+(u-h)*p/u+f));J(n,t,e,d,m,i)}const a=t[2*e+i];let c=s,o=r;for(S(n,t,s,e),t[2*r+i]>a&&S(n,t,s,r);c<o;){for(S(n,t,c,o),c++,o--;t[2*c+i]<a;)c++;for(;t[2*o+i]>a;)o--}t[2*s+i]===a?S(n,t,s,o):(o++,S(n,t,o,r)),o<=e&&(s=o+1),e<=o&&(r=o-1)}}function S(n,t,e,s){F(n,e,s),F(t,2*e,2*s),F(t,2*e+1,2*s+1)}function F(n,t,e){const s=n[t];n[t]=n[e],n[e]=s}function q(n,t,e,s){const r=n-e,i=t-s;return r*r+i*i}const nt={minZoom:0,maxZoom:16,minPoints:2,radius:40,extent:512,nodeSize:64,log:!1,generateId:!1,reduce:null,map:n=>n},V=Math.fround||(n=>t=>(n[0]=+t,n[0]))(new Float32Array(1)),b=2,k=3,Z=4,M=5,W=6;class ot{constructor(t){this.options=Object.assign(Object.create(nt),t),this.trees=new Array(this.options.maxZoom+1),this.stride=this.options.reduce?7:6,this.clusterProps=[]}load(t){const{log:e,minZoom:s,maxZoom:r}=this.options;e&&console.time("total time");const i=`prepare ${t.length} points`;e&&console.time(i),this.points=t;const a=[];for(let o=0;o<t.length;o++){const u=t[o];if(!u.geometry)continue;const[h,l]=u.geometry.coordinates,p=V(L(h)),f=V(T(l));a.push(p,f,1/0,o,-1,1),this.options.reduce&&a.push(0)}let c=this.trees[r+1]=this._createTree(a);e&&console.timeEnd(i);for(let o=r;o>=s;o--){const u=+Date.now();c=this.trees[o]=this._createTree(this._cluster(c,o)),e&&console.log("z%d: %d clusters in %dms",o,c.numItems,+Date.now()-u)}return e&&console.timeEnd("total time"),this}getClusters(t,e){let s=((t[0]+180)%360+360)%360-180;const r=Math.max(-90,Math.min(90,t[1]));let i=t[2]===180?180:((t[2]+180)%360+360)%360-180;const a=Math.max(-90,Math.min(90,t[3]));if(t[2]-t[0]>=360)s=-180,i=180;else if(s>i){const l=this.getClusters([s,r,180,a],e),p=this.getClusters([-180,r,i,a],e);return l.concat(p)}const c=this.trees[this._limitZoom(e)],o=c.range(L(s),T(a),L(i),T(r)),u=c.data,h=[];for(const l of o){const p=this.stride*l;h.push(u[p+M]>1?H(u,p,this.clusterProps):this.points[u[p+k]])}return h}getChildren(t){const e=this._getOriginId(t),s=this._getOriginZoom(t),r="No cluster with the specified id.",i=this.trees[s];if(!i)throw new Error(r);const a=i.data;if(e*this.stride>=a.length)throw new Error(r);const c=this.options.radius/(this.options.extent*Math.pow(2,s-1)),o=a[e*this.stride],u=a[e*this.stride+1],h=i.within(o,u,c),l=[];for(const p of h){const f=p*this.stride;a[f+Z]===t&&l.push(a[f+M]>1?H(a,f,this.clusterProps):this.points[a[f+k]])}if(l.length===0)throw new Error(r);return l}getLeaves(t,e,s){e=e||10,s=s||0;const r=[];return this._appendLeaves(r,t,e,s,0),r}getTile(t,e,s){const r=this.trees[this._limitZoom(t)],i=Math.pow(2,t),{extent:a,radius:c}=this.options,o=c/a,u=(s-o)/i,h=(s+1+o)/i,l={features:[]};return this._addTileFeatures(r.range((e-o)/i,u,(e+1+o)/i,h),r.data,e,s,i,l),e===0&&this._addTileFeatures(r.range(1-o/i,u,1,h),r.data,i,s,i,l),e===i-1&&this._addTileFeatures(r.range(0,u,o/i,h),r.data,-1,s,i,l),l.features.length?l:null}getClusterExpansionZoom(t){let e=this._getOriginZoom(t)-1;for(;e<=this.options.maxZoom;){const s=this.getChildren(t);if(e++,s.length!==1)break;t=s[0].properties.cluster_id}return e}_appendLeaves(t,e,s,r,i){const a=this.getChildren(e);for(const c of a){const o=c.properties;if(o&&o.cluster?i+o.point_count<=r?i+=o.point_count:i=this._appendLeaves(t,o.cluster_id,s,r,i):i<r?i++:t.push(c),t.length===s)break}return i}_createTree(t){const e=new U(t.length/this.stride|0,this.options.nodeSize,Float32Array);for(let s=0;s<t.length;s+=this.stride)e.add(t[s],t[s+1]);return e.finish(),e.data=t,e}_addTileFeatures(t,e,s,r,i,a){for(const c of t){const o=c*this.stride,u=e[o+M]>1;let h,l,p;if(u)h=Y(e,o,this.clusterProps),l=e[o],p=e[o+1];else{const m=this.points[e[o+k]];h=m.properties;const[g,y]=m.geometry.coordinates;l=L(g),p=T(y)}const f={type:1,geometry:[[Math.round(this.options.extent*(l*i-s)),Math.round(this.options.extent*(p*i-r))]],tags:h};let d;u||this.options.generateId?d=e[o+k]:d=this.points[e[o+k]].id,d!==void 0&&(f.id=d),a.features.push(f)}}_limitZoom(t){return Math.max(this.options.minZoom,Math.min(Math.floor(+t),this.options.maxZoom+1))}_cluster(t,e){const{radius:s,extent:r,reduce:i,minPoints:a}=this.options,c=s/(r*Math.pow(2,e)),o=t.data,u=[],h=this.stride;for(let l=0;l<o.length;l+=h){if(o[l+b]<=e)continue;o[l+b]=e;const p=o[l],f=o[l+1],d=t.within(o[l],o[l+1],c),m=o[l+M];let g=m;for(const y of d){const w=y*h;o[w+b]>e&&(g+=o[w+M])}if(g>m&&g>=a){let y=p*m,w=f*m,v,O=-1;const _=((l/h|0)<<5)+(e+1)+this.points.length;for(const $ of d){const A=$*h;if(o[A+b]<=e)continue;o[A+b]=e;const B=o[A+M];y+=o[A]*B,w+=o[A+1]*B,o[A+Z]=_,i&&(v||(v=this._map(o,l,!0),O=this.clusterProps.length,this.clusterProps.push(v)),i(v,this._map(o,A)))}o[l+Z]=_,u.push(y/g,w/g,1/0,_,-1,g),i&&u.push(O)}else{for(let y=0;y<h;y++)u.push(o[l+y]);if(g>1)for(const y of d){const w=y*h;if(!(o[w+b]<=e)){o[w+b]=e;for(let v=0;v<h;v++)u.push(o[w+v])}}}}return u}_getOriginId(t){return t-this.points.length>>5}_getOriginZoom(t){return(t-this.points.length)%32}_map(t,e,s){if(t[e+M]>1){const a=this.clusterProps[t[e+W]];return s?Object.assign({},a):a}const r=this.points[t[e+k]].properties,i=this.options.map(r);return s&&i===r?Object.assign({},i):i}}function H(n,t,e){return{type:"Feature",id:n[t+k],properties:Y(n,t,e),geometry:{type:"Point",coordinates:[at(n[t]),ct(n[t+1])]}}}function Y(n,t,e){const s=n[t+M],r=s>=1e4?`${Math.round(s/1e3)}k`:s>=1e3?`${Math.round(s/100)/10}k`:s,i=n[t+W],a=i===-1?{}:Object.assign({},e[i]);return Object.assign(a,{cluster:!0,cluster_id:n[t+k],point_count:s,point_count_abbreviated:r})}function L(n){return n/360+.5}function T(n){const t=Math.sin(n*Math.PI/180),e=.5-.25*Math.log((1+t)/(1-t))/Math.PI;return e<0?0:e>1?1:e}function at(n){return(n-.5)*360}function ct(n){const t=(180-n*360)*Math.PI/180;return 360*Math.atan(Math.exp(t))/Math.PI-90}/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function lt(n,t){var e={};for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&t.indexOf(s)<0&&(e[s]=n[s]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,s=Object.getOwnPropertySymbols(n);r<s.length;r++)t.indexOf(s[r])<0&&Object.prototype.propertyIsEnumerable.call(n,s[r])&&(e[s[r]]=n[s[r]]);return e}class E{static isAdvancedMarkerAvailable(t){return google.maps.marker&&t.getMapCapabilities().isAdvancedMarkersAvailable===!0}static isAdvancedMarker(t){return google.maps.marker&&t instanceof google.maps.marker.AdvancedMarkerElement}static setMap(t,e){this.isAdvancedMarker(t)?t.map=e:t.setMap(e)}static getPosition(t){if(this.isAdvancedMarker(t)){if(t.position){if(t.position instanceof google.maps.LatLng)return t.position;if(t.position.lat&&t.position.lng)return new google.maps.LatLng(t.position.lat,t.position.lng)}return new google.maps.LatLng(null)}return t.getPosition()}static getVisible(t){return this.isAdvancedMarker(t)?!0:t.getVisible()}}class N{constructor({markers:t,position:e}){this.markers=t,e&&(e instanceof google.maps.LatLng?this._position=e:this._position=new google.maps.LatLng(e))}get bounds(){if(this.markers.length===0&&!this._position)return;const t=new google.maps.LatLngBounds(this._position,this._position);for(const e of this.markers)t.extend(E.getPosition(e));return t}get position(){return this._position||this.bounds.getCenter()}get count(){return this.markers.filter(t=>E.getVisible(t)).length}push(t){this.markers.push(t)}delete(){this.marker&&(E.setMap(this.marker,null),this.marker=void 0),this.markers.length=0}}class ht{constructor({maxZoom:t=16}){this.maxZoom=t}noop({markers:t}){return ut(t)}}const ut=n=>n.map(e=>new N({position:E.getPosition(e),markers:[e]}));class Q extends ht{constructor(t){var{maxZoom:e,radius:s=60}=t,r=lt(t,["maxZoom","radius"]);super({maxZoom:e}),this.state={zoom:-1},this.superCluster=new ot(Object.assign({maxZoom:this.maxZoom,radius:s},r))}calculate(t){let e=!1;const s={zoom:t.map.getZoom()};if(!K(t.markers,this.markers)){e=!0,this.markers=[...t.markers];const r=this.markers.map(i=>{const a=E.getPosition(i);return{type:"Feature",geometry:{type:"Point",coordinates:[a.lng(),a.lat()]},properties:{marker:i}}});this.superCluster.load(r)}return e||(this.state.zoom<=this.maxZoom||s.zoom<=this.maxZoom)&&(e=!K(this.state,s)),this.state=s,e&&(this.clusters=this.cluster(t)),{clusters:this.clusters,changed:e}}cluster({map:t}){return this.superCluster.getClusters([-180,-90,180,90],Math.round(t.getZoom())).map(e=>this.transformCluster(e))}transformCluster({geometry:{coordinates:[t,e]},properties:s}){if(s.cluster)return new N({markers:this.superCluster.getLeaves(s.cluster_id,1/0).map(i=>i.properties.marker),position:{lat:e,lng:t}});const r=s.marker;return new N({markers:[r],position:E.getPosition(r)})}}class pt{constructor(t,e){this.markers={sum:t.length};const s=e.map(i=>i.count),r=s.reduce((i,a)=>i+a,0);this.clusters={count:e.length,markers:{mean:r/e.length,sum:r,min:Math.min(...s),max:Math.max(...s)}}}}class ft{render({count:t,position:e},s,r){const a=`<svg fill="${t>Math.max(10,s.clusters.markers.mean)?"#ff0000":"#0000ff"}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="50" height="50">
<circle cx="120" cy="120" opacity=".6" r="70" />
<circle cx="120" cy="120" opacity=".3" r="90" />
<circle cx="120" cy="120" opacity=".2" r="110" />
<text x="50%" y="50%" style="fill:#fff" text-anchor="middle" font-size="50" dominant-baseline="middle" font-family="roboto,arial,sans-serif">${t}</text>
</svg>`,c=`Cluster of ${t} markers`,o=Number(google.maps.Marker.MAX_ZINDEX)+t;if(E.isAdvancedMarkerAvailable(r)){const l=new DOMParser().parseFromString(a,"image/svg+xml").documentElement;l.setAttribute("transform","translate(0 25)");const p={map:r,position:e,zIndex:o,title:c,content:l};return new google.maps.marker.AdvancedMarkerElement(p)}const u={position:e,zIndex:o,title:c,icon:{url:`data:image/svg+xml;base64,${btoa(a)}`,anchor:new google.maps.Point(25,25)}};return new google.maps.Marker(u)}}function dt(n,t){for(let e in t.prototype)n.prototype[e]=t.prototype[e]}class D{constructor(){dt(D,google.maps.OverlayView)}}var P;(function(n){n.CLUSTERING_BEGIN="clusteringbegin",n.CLUSTERING_END="clusteringend",n.CLUSTER_CLICK="click"})(P||(P={}));const gt=(n,t,e)=>{e.fitBounds(t.bounds)};class mt extends D{constructor({map:t,markers:e=[],algorithmOptions:s={},algorithm:r=new Q(s),renderer:i=new ft,onClusterClick:a=gt}){super(),this.markers=[...e],this.clusters=[],this.algorithm=r,this.renderer=i,this.onClusterClick=a,t&&this.setMap(t)}addMarker(t,e){this.markers.includes(t)||(this.markers.push(t),e||this.render())}addMarkers(t,e){t.forEach(s=>{this.addMarker(s,!0)}),e||this.render()}removeMarker(t,e){const s=this.markers.indexOf(t);return s===-1?!1:(E.setMap(t,null),this.markers.splice(s,1),e||this.render(),!0)}removeMarkers(t,e){let s=!1;return t.forEach(r=>{s=this.removeMarker(r,!0)||s}),s&&!e&&this.render(),s}clearMarkers(t){this.markers.length=0,t||this.render()}render(){const t=this.getMap();if(t instanceof google.maps.Map&&t.getProjection()){google.maps.event.trigger(this,P.CLUSTERING_BEGIN,this);const{clusters:e,changed:s}=this.algorithm.calculate({markers:this.markers,map:t,mapCanvasProjection:this.getProjection()});if(s||s==null){const r=new Set;for(const a of e)a.markers.length==1&&r.add(a.markers[0]);const i=[];for(const a of this.clusters)a.marker!=null&&(a.markers.length==1?r.has(a.marker)||E.setMap(a.marker,null):i.push(a.marker));this.clusters=e,this.renderClusters(),requestAnimationFrame(()=>i.forEach(a=>E.setMap(a,null)))}google.maps.event.trigger(this,P.CLUSTERING_END,this)}}onAdd(){this.idleListener=this.getMap().addListener("idle",this.render.bind(this)),this.render()}onRemove(){google.maps.event.removeListener(this.idleListener),this.reset()}reset(){this.markers.forEach(t=>E.setMap(t,null)),this.clusters.forEach(t=>t.delete()),this.clusters=[]}renderClusters(){const t=new pt(this.markers,this.clusters),e=this.getMap();this.clusters.forEach(s=>{s.markers.length===1?s.marker=s.markers[0]:(s.marker=this.renderer.render(s,t,e),s.markers.forEach(r=>E.setMap(r,null)),this.onClusterClick&&s.marker.addListener("click",r=>{google.maps.event.trigger(this,P.CLUSTER_CLICK,s),this.onClusterClick(r,s,e)})),E.setMap(s.marker,e)})}}const yt=new I({apiKey:"AIzaSyCMlg3335BMxPO51I7ZMpp-OXsTYCAaxYw",version:"weekly",libraries:["places","marker"]});yt.load().then(async()=>{const n=new google.maps.Map(document.getElementById("map"),{center:{lat:51.13531071,lng:.001977888},zoom:8,mapId:"8e6deb7a6acd250c"});try{const t=await fetch("https://jo435.brighton.domains/ci601/get-locations.php");if(!t.ok)throw new Error(`Failed to fetch location data: ${t.statusText}`);const s=(await t.json()).slice(0,1e3);console.log(`Number of locations received: ${s.length}`);const r=s.map(a=>{const c={lat:parseFloat(a.Latitude),lng:parseFloat(a.Longitude)};console.log("Marker position:",c);const o=wt(a),u=new google.maps.InfoWindow({content:o}),h=new google.maps.Marker({position:c,map:n,title:a.Name});return h.addListener("click",()=>{u.open(n,h)}),h});console.log(`Number of markers created: ${r.length}`);const i=new mt({map:n,markers:r,algorithm:new Q({maxZoom:16,radius:60})})}catch(t){console.error(t)}});function wt(n){let t=`
    <div>
      <h2>${n.Name.trim()}</h2>
      <p><strong>Lab No:</strong> ${n.LabNo.trim()}</p>
      <p><strong>Sex:</strong> ${n.Sex.trim()}</p>
      <p><strong>Age:</strong> ${n.Age.trim()}</p>
      <p><strong>Collected:</strong> ${n.Collected.trim()}</p>
      <p><strong>Received:</strong> ${n.Received.trim()}</p>
      <p><strong>Sample:</strong> ${n.Sample.trim()}</p>
      <p><strong>Isolate:</strong> ${n.Isolate.trim()}</p>
      <p><strong>Antibiotics:</strong></p><ul>`;for(let e=1;e<=18;e++){const s=`Antibiotic${e}`;n[s].trim()&&(t+=`<li><strong>Antibiotic ${e}:</strong> ${n[s].trim()}</li>`)}return t+="</ul></div>",t}
//# sourceMappingURL=map-a26f82bd.js.map