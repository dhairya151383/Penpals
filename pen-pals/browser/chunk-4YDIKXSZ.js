import{a as ui}from"./chunk-S6YN4RDA.js";import{a as ci}from"./chunk-THAV5HDO.js";import{$ as $t,$a as Ee,Aa as W,Ba as Ct,Ca as Pt,D as P,Da as gt,E as at,Ea as v,F as Qe,Fa as mt,Ga as ut,Gb as si,H as C,Ib as li,Ja as z,Ka as Te,La as F,Ma as M,N as it,O as ht,Oa as k,P as ft,Pa as U,Q as st,Ra as Ie,S,T as Ye,Va as Q,W as At,X as ae,Xa as B,Y as vt,Ya as ii,Z as Lt,Za as le,_ as It,_a as Wt,ab as Oe,bb as Ae,c as qe,ca as se,ea as p,fa as Ze,ga as Xe,gb as ni,ha as _t,hb as $,ia as I,ib as ce,ja as lt,jb as oi,ka as ct,kb as Le,la as Je,lb as zt,ma as A,mb as St,na as y,ob as ue,pa as T,pb as de,qa as c,qb as wt,ra as ti,rb as pe,sb as he,ta as ei,ua as R,ub as ri,vb as G,wa as f,wb as dt,xa as m,xb as ai,ya as w,za as V}from"./chunk-NOMZ4WY3.js";import{a as L,b as Ke,h as xe}from"./chunk-MG3ERZGY.js";var fe=class t{transform(o){if(!o)return null;let e=o.updatedAt||o.publishDate;if(e instanceof Date)return e;if(typeof e=="string")try{let i=new Date(e);if(!isNaN(i.getTime()))return i}catch(i){console.error("Error parsing date string in ArticleDatePipe:",e,i)}return null}static \u0275fac=function(e){return new(e||t)};static \u0275pipe=Je({name:"articleDate",type:t,pure:!0})};var di=t=>["/articles",t],pi=t=>({article:t});function yn(t,o){if(t&1&&(f(0,"span",16),k(1),m()),t&2){let e=o.$implicit;p(),U(e)}}function vn(t,o){if(t&1&&(V(0),f(1,"div",14),y(2,yn,2,1,"span",15),m(),W()),t&2){let e=v(2);p(2),c("ngForOf",e.article.tags)}}function _n(t,o){t&1&&(f(0,"span",17),k(1,"\u2605"),m())}function Cn(t,o){if(t&1&&(f(0,"article",2)(1,"div",3),w(2,"img",4),m(),f(3,"div",5),y(4,vn,3,1,"ng-container",6),f(5,"a",7),k(6),m(),f(7,"p",8),k(8),m(),f(9,"div",9)(10,"div",10),w(11,"img",11),f(12,"span",12),k(13),Wt(14,"articleDate"),Wt(15,"date"),m()(),y(16,_n,2,0,"span",13),m()()()),t&2){let e=v();p(2),c("src",e.article.thumbnailUrl||"assets/images/defaultAvatar.jpg",se)("alt",e.article.title),p(2),c("ngIf",e.showTags),p(),c("routerLink",B(16,di,e.article.id))("state",B(18,pi,e.article)),p(),U(e.article.title),p(2),U(e.article.briefDescription),p(3),c("src","assets/images/defaultAvatar.jpg",se),p(2),Ie(" By ",e.article.authorName," on ",Oe(15,13,Ee(14,11,e.article),"mediumDate")," "),p(3),c("ngIf",e.article.isFeatured)}}function Sn(t,o){if(t&1&&(f(0,"span",28),k(1),m()),t&2){let e=o.$implicit;p(),U(e)}}function wn(t,o){if(t&1&&(V(0),f(1,"div",26),y(2,Sn,2,1,"span",27),m(),W()),t&2){let e=v(2);p(2),c("ngForOf",e.article.tags)}}function xn(t,o){if(t&1&&(f(0,"article",18)(1,"div",19)(2,"div",20)(3,"a",7),k(4),m(),f(5,"p",21),k(6),m(),y(7,wn,3,1,"ng-container",6),f(8,"div",22)(9,"div",10),w(10,"img",23),f(11,"span",12),k(12),Wt(13,"articleDate"),Wt(14,"date"),m()()()(),f(15,"div",24),w(16,"img",25),m()()()),t&2){let e=v();p(3),c("routerLink",B(14,di,e.article.id))("state",B(16,pi,e.article)),p(),U(e.article.title),p(2),U(e.article.briefDescription),p(),c("ngIf",e.showTags),p(5),Ie(" By ",e.article.authorName," on ",Oe(14,11,Ee(13,9,e.article),"mediumDate")," "),p(4),c("src",e.article.thumbnailUrl||"assets/images/defaultAvatar.jpg",se)("alt",e.article.title)}}var ge=class t{article;isFeatured=!1;showTags=!0;ngOnChanges(o){"showTags"in o&&o.showTags.currentValue===void 0&&(this.showTags=!0)}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=I({type:t,selectors:[["app-article-card"]],inputs:{article:"article",isFeatured:"isFeatured",showTags:"showTags"},features:[it],decls:2,vars:2,consts:[["class","card",4,"ngIf"],["class","card featured-card",4,"ngIf"],[1,"card"],[1,"thumbnail-container"],[1,"thumbnail",3,"src","alt"],[1,"content"],[4,"ngIf"],[1,"title",3,"routerLink","state"],[1,"brief"],[1,"meta-row"],[1,"author-info"],["alt","Author Avatar",1,"author-avatar",3,"src"],[1,"author-details"],["class","featured-icon",4,"ngIf"],[1,"tags-wrapper","regular-tags-wrapper"],["class","tag regular-tag",4,"ngFor","ngForOf"],[1,"tag","regular-tag"],[1,"featured-icon"],[1,"card","featured-card"],[1,"featured-content"],[1,"text-content"],[1,"brief","featured-brief"],[1,"meta-row","featured-meta"],["src","assets/images/defaultAvatar.jpg","alt","Author Avatar",1,"author-avatar"],[1,"featured-image-container"],[1,"featured-image",3,"src","alt"],[1,"tags-wrapper","featured-tags-wrapper"],["class","tag featured-tag",4,"ngFor","ngForOf"],[1,"tag","featured-tag"]],template:function(e,i){e&1&&y(0,Cn,17,20,"article",0)(1,xn,17,18,"article",1),e&2&&(c("ngIf",!i.isFeatured),p(),c("ngIf",i.isFeatured))},dependencies:[G,de,wt,ri,li,si,fe],styles:['[_nghost-%COMP%]{display:flex;flex-direction:column;width:100%;height:100%;flex-grow:1;flex-shrink:0;box-sizing:border-box;margin:0;padding:0;min-width:0;max-width:none}.card[_ngcontent-%COMP%]{display:flex;flex-direction:column;background-color:#fff;border-radius:8px;box-shadow:0 4px 12px #00000014;overflow:hidden;transition:transform .2s ease-in-out,box-shadow .2s ease-in-out;width:100%;height:100%;flex-grow:1;flex-shrink:0;min-width:0;max-width:none;box-sizing:border-box}.card[_ngcontent-%COMP%]:hover{transform:translateY(-5px);box-shadow:0 8px 20px #00000026}.thumbnail-container[_ngcontent-%COMP%]{width:100%;height:200px;overflow:hidden;flex-shrink:0}.thumbnail[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover;transition:transform .3s ease}.card[_ngcontent-%COMP%]:hover   .thumbnail[_ngcontent-%COMP%]{transform:scale(1.05)}.content[_ngcontent-%COMP%]{padding:15px 20px;display:flex;flex-direction:column;flex-grow:1;justify-content:space-between;min-height:0}.tag[_ngcontent-%COMP%]{border-radius:20px;font-weight:500;white-space:nowrap;border:1px solid;flex-shrink:0;display:inline-flex;align-items:center;margin-bottom:0}.regular-tag[_ngcontent-%COMP%]{background-color:#e6f7ff;color:#1890ff;padding:6px 10px;font-size:.8em;border-color:#91d5ff}.tags-wrapper[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:5px;overflow:hidden;flex-shrink:0;margin-bottom:10px}.regular-tags-wrapper[_ngcontent-%COMP%]{height:75px}.featured-tag[_ngcontent-%COMP%]{background-color:#1890ff;color:#fff;padding:8px 12px;font-size:.9em;border-color:#1890ff}.featured-tags-wrapper[_ngcontent-%COMP%]{height:75px;order:-1;margin-bottom:5px}.title[_ngcontent-%COMP%]{font-size:1.2em;font-weight:700;margin-bottom:0;color:#262626;text-decoration:none;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;line-height:1em;word-break:break-word;min-height:2.1em;flex-shrink:0;margin-top:0}.title[_ngcontent-%COMP%]:hover{color:#1890ff}.brief[_ngcontent-%COMP%]{font-size:.9em;line-height:1.05em;color:#595959;margin-top:5px;margin-bottom:5px;overflow:hidden;position:relative;display:-webkit-box;-webkit-line-clamp:3;line-clamp:3;-webkit-box-orient:vertical;text-overflow:ellipsis;word-break:break-word;white-space:normal;min-height:4.17em;flex-grow:1}.brief[_ngcontent-%COMP%]:after{content:"";position:absolute;bottom:0;right:0;left:0;height:1.4em;background:linear-gradient(to top,#fff 0% 70%,#fff0);pointer-events:none}.meta-row[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding-top:15px;border-top:1px solid #f0f0f0;flex-shrink:0}.author-info[_ngcontent-%COMP%]{display:flex;align-items:center;font-size:.85em;color:#8c8c8c}.author-avatar[_ngcontent-%COMP%]{width:30px;height:30px;border-radius:50%;object-fit:cover;margin-right:10px;border:1px solid #f0f0f0}.author-details[_ngcontent-%COMP%]{white-space:nowrap}.featured-icon[_ngcontent-%COMP%]{color:#ffc107;font-size:1.5em;margin-left:auto;text-shadow:0 1px 2px rgba(0,0,0,.1)}.featured-card[_ngcontent-%COMP%]{flex-direction:row;width:100%;height:100%;flex-grow:1;flex-shrink:0;background-color:#fff;border-radius:8px;box-shadow:0 8px 25px #00000026;transition:transform .2s ease-in-out,box-shadow .2s ease-in-out;overflow:hidden}.featured-card[_ngcontent-%COMP%]:hover{transform:translateY(-5px);box-shadow:0 12px 30px #0003}.featured-content[_ngcontent-%COMP%]{display:flex;flex-direction:row;width:100%;height:100%}.text-content[_ngcontent-%COMP%]{width:50%;display:flex;flex-direction:column;padding:20px;box-sizing:border-box;overflow:hidden;min-width:0;flex-grow:1;justify-content:space-between;flex-wrap:wrap;gap:5px}.featured-image-container[_ngcontent-%COMP%]{width:50%;height:100%;overflow:hidden;flex-shrink:0}.featured-image[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover;transition:transform .3s ease}.featured-card[_ngcontent-%COMP%]:hover   .featured-image[_ngcontent-%COMP%]{transform:scale(1.05)}.featured-card[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:1.5em;min-height:2.14em;max-height:2.6em;flex-shrink:0}.featured-card[_ngcontent-%COMP%]   .brief[_ngcontent-%COMP%]{font-size:.9em;min-height:calc(3 * 1.1em);flex-grow:1}.featured-card[_ngcontent-%COMP%]   .brief[_ngcontent-%COMP%]:after{content:"";position:absolute;bottom:0;right:0;left:0;height:1.4em;background:linear-gradient(to top,#fff 0% 70%,#fff0);pointer-events:none}.featured-card[_ngcontent-%COMP%]   .meta-row[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;font-size:1em;color:#777;padding-top:15px;border-top:1px solid #f0f0f0;margin-top:auto;flex-shrink:0}.featured-card[_ngcontent-%COMP%]   .author-info[_ngcontent-%COMP%]{display:flex;align-items:center}.featured-card[_ngcontent-%COMP%]   .author-avatar[_ngcontent-%COMP%]{width:35px;height:35px;border-radius:50%;object-fit:cover;margin-right:10px}.featured-card[_ngcontent-%COMP%]   .author-details[_ngcontent-%COMP%]{white-space:nowrap}.text-content[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:normal;word-break:break-word}@media (max-width: 992px){.featured-card[_ngcontent-%COMP%]{flex-direction:column;height:auto;max-height:none}.text-content[_ngcontent-%COMP%], .featured-image-container[_ngcontent-%COMP%]{width:100%;height:auto}.featured-image-container[_ngcontent-%COMP%]{height:250px}.featured-card[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:1.5em}.featured-card[_ngcontent-%COMP%]   .brief[_ngcontent-%COMP%]{font-size:1em;-webkit-line-clamp:4;line-clamp:4;min-height:unset;max-height:unset}.featured-card[_ngcontent-%COMP%]   .brief[_ngcontent-%COMP%]:after{height:1.2em;background:linear-gradient(to bottom,#fff0,#fff 50%)}}@media (max-width: 576px){.thumbnail-container[_ngcontent-%COMP%]{height:150px}.content[_ngcontent-%COMP%]{padding:10px 15px}.title[_ngcontent-%COMP%]{font-size:1.3em}.brief[_ngcontent-%COMP%]{font-size:.95em;-webkit-line-clamp:5;line-clamp:5;min-height:unset;max-height:unset}.meta-row[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start;gap:8px}.featured-icon[_ngcontent-%COMP%]{margin-left:0}.featured-card[_ngcontent-%COMP%]{margin:10px}.featured-image-container[_ngcontent-%COMP%]{height:180px}.text-content[_ngcontent-%COMP%]{padding:15px}.featured-card[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:1.3em}.featured-card[_ngcontent-%COMP%]   .brief[_ngcontent-%COMP%]{font-size:.95em;-webkit-line-clamp:5;line-clamp:5}.regular-tags-wrapper[_ngcontent-%COMP%]{height:75px}.featured-tags-wrapper[_ngcontent-%COMP%]{height:70px}}']})};function hi(t,o){return t?t.classList?t.classList.contains(o):new RegExp("(^| )"+o+"( |$)","gi").test(t.className):!1}function me(t,o){if(t&&o){let e=i=>{hi(t,i)||(t.classList?t.classList.add(i):t.className+=" "+i)};[o].flat().filter(Boolean).forEach(i=>i.split(" ").forEach(e))}}function kt(t,o){if(t&&o){let e=i=>{t.classList?t.classList.remove(i):t.className=t.className.replace(new RegExp("(^|\\b)"+i.split(" ").join("|")+"(\\b|$)","gi")," ")};[o].flat().filter(Boolean).forEach(i=>i.split(" ").forEach(e))}}function fi(t,o){if(t instanceof HTMLElement){let e=t.offsetWidth;if(o){let i=getComputedStyle(t);e+=parseFloat(i.marginLeft)+parseFloat(i.marginRight)}return e}return 0}function Ut(t){return typeof HTMLElement=="object"?t instanceof HTMLElement:t&&typeof t=="object"&&t!==null&&t.nodeType===1&&typeof t.nodeName=="string"}function Pe(t,o={}){if(Ut(t)){let e=(i,n)=>{var a,r;let s=(a=t?.$attrs)!=null&&a[i]?[(r=t?.$attrs)==null?void 0:r[i]]:[];return[n].flat().reduce((l,u)=>{if(u!=null){let d=typeof u;if(d==="string"||d==="number")l.push(u);else if(d==="object"){let g=Array.isArray(u)?e(i,u):Object.entries(u).map(([b,h])=>i==="style"&&(h||h===0)?`${b.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}:${h}`:h?b:void 0);l=g.length?l.concat(g.filter(b=>!!b)):l}}return l},s)};Object.entries(o).forEach(([i,n])=>{if(n!=null){let a=i.match(/^on(.+)/);a?t.addEventListener(a[1].toLowerCase(),n):i==="p-bind"||i==="pBind"?Pe(t,n):(n=i==="class"?[...new Set(e("class",n))].join(" ").trim():i==="style"?e("style",n).join(";").trim():n,(t.$attrs=t.$attrs||{})&&(t.$attrs[i]=n),t.setAttribute(i,n))}})}}function Rt(t,o){return Ut(t)?Array.from(t.querySelectorAll(o)):[]}function be(t,o){return Ut(t)?t.matches(o)?t:t.querySelector(o):null}function gi(t,o){if(Ut(t)){let e=t.getAttribute(o);return isNaN(e)?e==="true"||e==="false"?e==="true":e:+e}}function ke(t){if(t){let o=t.offsetHeight,e=getComputedStyle(t);return o-=parseFloat(e.paddingTop)+parseFloat(e.paddingBottom)+parseFloat(e.borderTopWidth)+parseFloat(e.borderBottomWidth),o}return 0}function mi(t){if(t){let o=t.getBoundingClientRect();return{top:o.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:o.left+(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0)}}return{top:"auto",left:"auto"}}function bi(t,o){if(t){let e=t.offsetHeight;if(o){let i=getComputedStyle(t);e+=parseFloat(i.marginTop)+parseFloat(i.marginBottom)}return e}return 0}function Re(t){if(t){let o=t.offsetWidth,e=getComputedStyle(t);return o-=parseFloat(e.paddingLeft)+parseFloat(e.paddingRight)+parseFloat(e.borderLeftWidth)+parseFloat(e.borderRightWidth),o}return 0}function yi(t){var o;t&&("remove"in Element.prototype?t.remove():(o=t.parentNode)==null||o.removeChild(t))}function ye(t,o="",e){Ut(t)&&e!==null&&e!==void 0&&t.setAttribute(o,e)}function vi(){let t=new Map;return{on(o,e){let i=t.get(o);return i?i.push(e):i=[e],t.set(o,i),this},off(o,e){let i=t.get(o);return i&&i.splice(i.indexOf(e)>>>0,1),this},emit(o,e){let i=t.get(o);i&&i.slice().map(n=>{n(e)})},clear(){t.clear()}}}function Z(t){return t==null||t===""||Array.isArray(t)&&t.length===0||!(t instanceof Date)&&typeof t=="object"&&Object.keys(t).length===0}function Tn(t){return!!(t&&t.constructor&&t.call&&t.apply)}function O(t){return!Z(t)}function bt(t,o=!0){return t instanceof Object&&t.constructor===Object&&(o||Object.keys(t).length!==0)}function Y(t,...o){return Tn(t)?t(...o):t}function xt(t,o=!0){return typeof t=="string"&&(o||t!=="")}function _i(t){return xt(t)?t.replace(/(-|_)/g,"").toLowerCase():t}function ve(t,o="",e={}){let i=_i(o).split("."),n=i.shift();return n?bt(t)?ve(Y(t[Object.keys(t).find(a=>_i(a)===n)||""],e),i.join("."),e):void 0:Y(t,e)}function _e(t,o=!0){return Array.isArray(t)&&(o||t.length!==0)}function Ci(t){return O(t)&&!isNaN(t)}function K(t,o){if(o){let e=o.test(t);return o.lastIndex=0,e}return!1}function Et(t){return t&&t.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g,"").replace(/ {2,}/g," ").replace(/ ([{:}]) /g,"$1").replace(/([;,]) /g,"$1").replace(/ !/g,"!").replace(/: /g,":")}function Ce(t){return xt(t)?t.replace(/(_)/g,"-").replace(/[A-Z]/g,(o,e)=>e===0?o:"-"+o.toLowerCase()).toLowerCase():t}function De(t){return xt(t)?t.replace(/[A-Z]/g,(o,e)=>e===0?o:"."+o.toLowerCase()).toLowerCase():t}var Se={};function Ot(t="pui_id_"){return Se.hasOwnProperty(t)||(Se[t]=0),Se[t]++,`${t}${Se[t]}`}function In(){let t=[],o=(r,s,l=999)=>{let u=n(r,s,l),d=u.value+(u.key===r?0:l)+1;return t.push({key:r,value:d}),d},e=r=>{t=t.filter(s=>s.value!==r)},i=(r,s)=>n(r,s).value,n=(r,s,l=0)=>[...t].reverse().find(u=>s?!0:u.key===r)||{key:r,value:l},a=r=>r&&parseInt(r.style.zIndex,10)||0;return{get:a,set:(r,s,l)=>{s&&(s.style.zIndex=String(o(r,!0,l)))},clear:r=>{r&&(e(a(r)),r.style.zIndex="")},getCurrent:r=>i(r,!0)}}var Or=In();var Si=["*"];var N=(()=>{class t{static STARTS_WITH="startsWith";static CONTAINS="contains";static NOT_CONTAINS="notContains";static ENDS_WITH="endsWith";static EQUALS="equals";static NOT_EQUALS="notEquals";static IN="in";static LESS_THAN="lt";static LESS_THAN_OR_EQUAL_TO="lte";static GREATER_THAN="gt";static GREATER_THAN_OR_EQUAL_TO="gte";static BETWEEN="between";static IS="is";static IS_NOT="isNot";static BEFORE="before";static AFTER="after";static DATE_IS="dateIs";static DATE_IS_NOT="dateIsNot";static DATE_BEFORE="dateBefore";static DATE_AFTER="dateAfter"}return t})();var wi=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["p-header"]],standalone:!1,ngContentSelectors:Si,decls:1,vars:0,template:function(i,n){i&1&&(mt(),ut(0))},encapsulation:2})}return t})(),xi=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=I({type:t,selectors:[["p-footer"]],standalone:!1,ngContentSelectors:Si,decls:1,vars:0,template:function(i,n){i&1&&(mt(),ut(0))},encapsulation:2})}return t})(),Dt=(()=>{class t{template;type;name;constructor(e){this.template=e}getType(){return this.name}static \u0275fac=function(i){return new(i||t)(_t(Ze))};static \u0275dir=ct({type:t,selectors:[["","pTemplate",""]],inputs:{type:"type",name:[0,"pTemplate","name"]}})}return t})(),X=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=lt({type:t});static \u0275inj=at({imports:[G]})}return t})();var On=Object.defineProperty,An=Object.defineProperties,Ln=Object.getOwnPropertyDescriptors,we=Object.getOwnPropertySymbols,Ei=Object.prototype.hasOwnProperty,Oi=Object.prototype.propertyIsEnumerable,Ti=(t,o,e)=>o in t?On(t,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[o]=e,ot=(t,o)=>{for(var e in o||(o={}))Ei.call(o,e)&&Ti(t,e,o[e]);if(we)for(var e of we(o))Oi.call(o,e)&&Ti(t,e,o[e]);return t},Ne=(t,o)=>An(t,Ln(o)),yt=(t,o)=>{var e={};for(var i in t)Ei.call(t,i)&&o.indexOf(i)<0&&(e[i]=t[i]);if(t!=null&&we)for(var i of we(t))o.indexOf(i)<0&&Oi.call(t,i)&&(e[i]=t[i]);return e};var $n=vi(),q=$n;function Ii(t,o){_e(t)?t.push(...o||[]):bt(t)&&Object.assign(t,o)}function Pn(t){return bt(t)&&t.hasOwnProperty("value")&&t.hasOwnProperty("type")?t.value:t}function kn(t){return t.replaceAll(/ /g,"").replace(/[^\w]/g,"-")}function Fe(t="",o=""){return kn(`${xt(t,!1)&&xt(o,!1)?`${t}-`:t}${o}`)}function Ai(t="",o=""){return`--${Fe(t,o)}`}function Rn(t=""){let o=(t.match(/{/g)||[]).length,e=(t.match(/}/g)||[]).length;return(o+e)%2!==0}function Li(t,o="",e="",i=[],n){if(xt(t)){let a=/{([^}]*)}/g,r=t.trim();if(Rn(r))return;if(K(r,a)){let s=r.replaceAll(a,d=>{let b=d.replace(/{|}/g,"").split(".").filter(h=>!i.some(_=>K(h,_)));return`var(${Ai(e,Ce(b.join("-")))}${O(n)?`, ${n}`:""})`}),l=/(\d+\s+[\+\-\*\/]\s+\d+)/g,u=/var\([^)]+\)/g;return K(s.replace(u,"0"),l)?`calc(${s})`:s}return r}else if(Ci(t))return t}function Dn(t,o,e){xt(o,!1)&&t.push(`${o}:${e};`)}function Nt(t,o){return t?`${t}{${o}}`:""}var Ft=(...t)=>Nn(x.getTheme(),...t),Nn=(t={},o,e,i)=>{if(o){let{variable:n,options:a}=x.defaults||{},{prefix:r,transform:s}=t?.options||a||{},u=K(o,/{([^}]*)}/g)?o:`{${o}}`;return i==="value"||Z(i)&&s==="strict"?x.getTokenValue(o):Li(u,void 0,r,[n.excludedKeyRegex],e)}return""};function Fn(t,o={}){let e=x.defaults.variable,{prefix:i=e.prefix,selector:n=e.selector,excludedKeyRegex:a=e.excludedKeyRegex}=o,r=(u,d="")=>Object.entries(u).reduce((g,[b,h])=>{let _=K(b,a)?Fe(d):Fe(d,Ce(b)),E=Pn(h);if(bt(E)){let{variables:tt,tokens:rt}=r(E,_);Ii(g.tokens,rt),Ii(g.variables,tt)}else g.tokens.push((i?_.replace(`${i}-`,""):_).replaceAll("-",".")),Dn(g.variables,Ai(_),Li(E,_,i,[a]));return g},{variables:[],tokens:[]}),{variables:s,tokens:l}=r(t,i);return{value:s,tokens:l,declarations:s.join(""),css:Nt(n,s.join(""))}}var nt={regex:{rules:{class:{pattern:/^\.([a-zA-Z][\w-]*)$/,resolve(t){return{type:"class",selector:t,matched:this.pattern.test(t.trim())}}},attr:{pattern:/^\[(.*)\]$/,resolve(t){return{type:"attr",selector:`:root${t}`,matched:this.pattern.test(t.trim())}}},media:{pattern:/^@media (.*)$/,resolve(t){return{type:"media",selector:`${t}{:root{[CSS]}}`,matched:this.pattern.test(t.trim())}}},system:{pattern:/^system$/,resolve(t){return{type:"system",selector:"@media (prefers-color-scheme: dark){:root{[CSS]}}",matched:this.pattern.test(t.trim())}}},custom:{resolve(t){return{type:"custom",selector:t,matched:!0}}}},resolve(t){let o=Object.keys(this.rules).filter(e=>e!=="custom").map(e=>this.rules[e]);return[t].flat().map(e=>{var i;return(i=o.map(n=>n.resolve(e)).find(n=>n.matched))!=null?i:this.rules.custom.resolve(e)})}},_toVariables(t,o){return Fn(t,{prefix:o?.prefix})},getCommon({name:t="",theme:o={},params:e,set:i,defaults:n}){var a,r,s,l,u,d,g;let{preset:b,options:h}=o,_,E,tt,rt,j,Tt,et;if(O(b)&&h.transform!=="strict"){let{primitive:jt,semantic:Gt,extend:Kt}=b,Bt=Gt||{},{colorScheme:qt}=Bt,Qt=yt(Bt,["colorScheme"]),Yt=Kt||{},{colorScheme:Zt}=Yt,Ht=yt(Yt,["colorScheme"]),Vt=qt||{},{dark:Xt}=Vt,Jt=yt(Vt,["dark"]),te=Zt||{},{dark:ee}=te,ie=yt(te,["dark"]),ne=O(jt)?this._toVariables({primitive:jt},h):{},oe=O(Qt)?this._toVariables({semantic:Qt},h):{},re=O(Jt)?this._toVariables({light:Jt},h):{},ze=O(Xt)?this._toVariables({dark:Xt},h):{},Ue=O(Ht)?this._toVariables({semantic:Ht},h):{},je=O(ie)?this._toVariables({light:ie},h):{},Ge=O(ee)?this._toVariables({dark:ee},h):{},[Xi,Ji]=[(a=ne.declarations)!=null?a:"",ne.tokens],[tn,en]=[(r=oe.declarations)!=null?r:"",oe.tokens||[]],[nn,on]=[(s=re.declarations)!=null?s:"",re.tokens||[]],[rn,an]=[(l=ze.declarations)!=null?l:"",ze.tokens||[]],[sn,ln]=[(u=Ue.declarations)!=null?u:"",Ue.tokens||[]],[cn,un]=[(d=je.declarations)!=null?d:"",je.tokens||[]],[dn,pn]=[(g=Ge.declarations)!=null?g:"",Ge.tokens||[]];_=this.transformCSS(t,Xi,"light","variable",h,i,n),E=Ji;let hn=this.transformCSS(t,`${tn}${nn}`,"light","variable",h,i,n),fn=this.transformCSS(t,`${rn}`,"dark","variable",h,i,n);tt=`${hn}${fn}`,rt=[...new Set([...en,...on,...an])];let gn=this.transformCSS(t,`${sn}${cn}color-scheme:light`,"light","variable",h,i,n),mn=this.transformCSS(t,`${dn}color-scheme:dark`,"dark","variable",h,i,n);j=`${gn}${mn}`,Tt=[...new Set([...ln,...un,...pn])],et=Y(b.css,{dt:Ft})}return{primitive:{css:_,tokens:E},semantic:{css:tt,tokens:rt},global:{css:j,tokens:Tt},style:et}},getPreset({name:t="",preset:o={},options:e,params:i,set:n,defaults:a,selector:r}){var s,l,u;let d,g,b;if(O(o)&&e.transform!=="strict"){let h=t.replace("-directive",""),_=o,{colorScheme:E,extend:tt,css:rt}=_,j=yt(_,["colorScheme","extend","css"]),Tt=tt||{},{colorScheme:et}=Tt,jt=yt(Tt,["colorScheme"]),Gt=E||{},{dark:Kt}=Gt,Bt=yt(Gt,["dark"]),qt=et||{},{dark:Qt}=qt,Yt=yt(qt,["dark"]),Zt=O(j)?this._toVariables({[h]:ot(ot({},j),jt)},e):{},Ht=O(Bt)?this._toVariables({[h]:ot(ot({},Bt),Yt)},e):{},Vt=O(Kt)?this._toVariables({[h]:ot(ot({},Kt),Qt)},e):{},[Xt,Jt]=[(s=Zt.declarations)!=null?s:"",Zt.tokens||[]],[te,ee]=[(l=Ht.declarations)!=null?l:"",Ht.tokens||[]],[ie,ne]=[(u=Vt.declarations)!=null?u:"",Vt.tokens||[]],oe=this.transformCSS(h,`${Xt}${te}`,"light","variable",e,n,a,r),re=this.transformCSS(h,ie,"dark","variable",e,n,a,r);d=`${oe}${re}`,g=[...new Set([...Jt,...ee,...ne])],b=Y(rt,{dt:Ft})}return{css:d,tokens:g,style:b}},getPresetC({name:t="",theme:o={},params:e,set:i,defaults:n}){var a;let{preset:r,options:s}=o,l=(a=r?.components)==null?void 0:a[t];return this.getPreset({name:t,preset:l,options:s,params:e,set:i,defaults:n})},getPresetD({name:t="",theme:o={},params:e,set:i,defaults:n}){var a;let r=t.replace("-directive",""),{preset:s,options:l}=o,u=(a=s?.directives)==null?void 0:a[r];return this.getPreset({name:r,preset:u,options:l,params:e,set:i,defaults:n})},applyDarkColorScheme(t){return!(t.darkModeSelector==="none"||t.darkModeSelector===!1)},getColorSchemeOption(t,o){var e;return this.applyDarkColorScheme(t)?this.regex.resolve(t.darkModeSelector===!0?o.options.darkModeSelector:(e=t.darkModeSelector)!=null?e:o.options.darkModeSelector):[]},getLayerOrder(t,o={},e,i){let{cssLayer:n}=o;return n?`@layer ${Y(n.order||"primeui",e)}`:""},getCommonStyleSheet({name:t="",theme:o={},params:e,props:i={},set:n,defaults:a}){let r=this.getCommon({name:t,theme:o,params:e,set:n,defaults:a}),s=Object.entries(i).reduce((l,[u,d])=>l.push(`${u}="${d}"`)&&l,[]).join(" ");return Object.entries(r||{}).reduce((l,[u,d])=>{if(d?.css){let g=Et(d?.css),b=`${u}-variables`;l.push(`<style type="text/css" data-primevue-style-id="${b}" ${s}>${g}</style>`)}return l},[]).join("")},getStyleSheet({name:t="",theme:o={},params:e,props:i={},set:n,defaults:a}){var r;let s={name:t,theme:o,params:e,set:n,defaults:a},l=(r=t.includes("-directive")?this.getPresetD(s):this.getPresetC(s))==null?void 0:r.css,u=Object.entries(i).reduce((d,[g,b])=>d.push(`${g}="${b}"`)&&d,[]).join(" ");return l?`<style type="text/css" data-primevue-style-id="${t}-variables" ${u}>${Et(l)}</style>`:""},createTokens(t={},o,e="",i="",n={}){return Object.entries(t).forEach(([a,r])=>{let s=K(a,o.variable.excludedKeyRegex)?e:e?`${e}.${De(a)}`:De(a),l=i?`${i}.${a}`:a;bt(r)?this.createTokens(r,o,s,l,n):(n[s]||(n[s]={paths:[],computed(u,d={}){var g,b;return this.paths.length===1?(g=this.paths[0])==null?void 0:g.computed(this.paths[0].scheme,d.binding):u&&u!=="none"?(b=this.paths.find(h=>h.scheme===u))==null?void 0:b.computed(u,d.binding):this.paths.map(h=>h.computed(h.scheme,d[h.scheme]))}}),n[s].paths.push({path:l,value:r,scheme:l.includes("colorScheme.light")?"light":l.includes("colorScheme.dark")?"dark":"none",computed(u,d={}){let g=/{([^}]*)}/g,b=r;if(d.name=this.path,d.binding||(d.binding={}),K(r,g)){let _=r.trim().replaceAll(g,rt=>{var j;let Tt=rt.replace(/{|}/g,""),et=(j=n[Tt])==null?void 0:j.computed(u,d);return _e(et)&&et.length===2?`light-dark(${et[0].value},${et[1].value})`:et?.value}),E=/(\d+\w*\s+[\+\-\*\/]\s+\d+\w*)/g,tt=/var\([^)]+\)/g;b=K(_.replace(tt,"0"),E)?`calc(${_})`:_}return Z(d.binding)&&delete d.binding,{colorScheme:u,path:this.path,paths:d,value:b.includes("undefined")?void 0:b}}}))}),n},getTokenValue(t,o,e){var i;let a=(l=>l.split(".").filter(d=>!K(d.toLowerCase(),e.variable.excludedKeyRegex)).join("."))(o),r=o.includes("colorScheme.light")?"light":o.includes("colorScheme.dark")?"dark":void 0,s=[(i=t[a])==null?void 0:i.computed(r)].flat().filter(l=>l);return s.length===1?s[0].value:s.reduce((l={},u)=>{let d=u,{colorScheme:g}=d,b=yt(d,["colorScheme"]);return l[g]=b,l},void 0)},getSelectorRule(t,o,e,i){return e==="class"||e==="attr"?Nt(O(o)?`${t}${o},${t} ${o}`:t,i):Nt(t,O(o)?Nt(o,i):i)},transformCSS(t,o,e,i,n={},a,r,s){if(O(o)){let{cssLayer:l}=n;if(i!=="style"){let u=this.getColorSchemeOption(n,r);o=e==="dark"?u.reduce((d,{type:g,selector:b})=>(O(b)&&(d+=b.includes("[CSS]")?b.replace("[CSS]",o):this.getSelectorRule(b,s,g,o)),d),""):Nt(s??":root",o)}if(l){let u={name:"primeui",order:"primeui"};bt(l)&&(u.name=Y(l.name,{name:t,type:i})),O(u.name)&&(o=Nt(`@layer ${u.name}`,o),a?.layerNames(u.name))}return o}return""}},x={defaults:{variable:{prefix:"p",selector:":root",excludedKeyRegex:/^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states|extend|css)$/gi},options:{prefix:"p",darkModeSelector:"system",cssLayer:!1}},_theme:void 0,_layerNames:new Set,_loadedStyleNames:new Set,_loadingStyles:new Set,_tokens:{},update(t={}){let{theme:o}=t;o&&(this._theme=Ne(ot({},o),{options:ot(ot({},this.defaults.options),o.options)}),this._tokens=nt.createTokens(this.preset,this.defaults),this.clearLoadedStyleNames())},get theme(){return this._theme},get preset(){var t;return((t=this.theme)==null?void 0:t.preset)||{}},get options(){var t;return((t=this.theme)==null?void 0:t.options)||{}},get tokens(){return this._tokens},getTheme(){return this.theme},setTheme(t){this.update({theme:t}),q.emit("theme:change",t)},getPreset(){return this.preset},setPreset(t){this._theme=Ne(ot({},this.theme),{preset:t}),this._tokens=nt.createTokens(t,this.defaults),this.clearLoadedStyleNames(),q.emit("preset:change",t),q.emit("theme:change",this.theme)},getOptions(){return this.options},setOptions(t){this._theme=Ne(ot({},this.theme),{options:t}),this.clearLoadedStyleNames(),q.emit("options:change",t),q.emit("theme:change",this.theme)},getLayerNames(){return[...this._layerNames]},setLayerNames(t){this._layerNames.add(t)},getLoadedStyleNames(){return this._loadedStyleNames},isStyleNameLoaded(t){return this._loadedStyleNames.has(t)},setLoadedStyleName(t){this._loadedStyleNames.add(t)},deleteLoadedStyleName(t){this._loadedStyleNames.delete(t)},clearLoadedStyleNames(){this._loadedStyleNames.clear()},getTokenValue(t){return nt.getTokenValue(this.tokens,t,this.defaults)},getCommon(t="",o){return nt.getCommon({name:t,theme:this.theme,params:o,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},getComponent(t="",o){let e={name:t,theme:this.theme,params:o,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return nt.getPresetC(e)},getDirective(t="",o){let e={name:t,theme:this.theme,params:o,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return nt.getPresetD(e)},getCustomPreset(t="",o,e,i){let n={name:t,preset:o,options:this.options,selector:e,params:i,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}};return nt.getPreset(n)},getLayerOrderCSS(t=""){return nt.getLayerOrder(t,this.options,{names:this.getLayerNames()},this.defaults)},transformCSS(t="",o,e="style",i){return nt.transformCSS(t,o,i,e,this.options,{layerNames:this.setLayerNames.bind(this)},this.defaults)},getCommonStyleSheet(t="",o,e={}){return nt.getCommonStyleSheet({name:t,theme:this.theme,params:o,props:e,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},getStyleSheet(t,o,e={}){return nt.getStyleSheet({name:t,theme:this.theme,params:o,props:e,defaults:this.defaults,set:{layerNames:this.setLayerNames.bind(this)}})},onStyleMounted(t){this._loadingStyles.add(t)},onStyleUpdated(t){this._loadingStyles.add(t)},onStyleLoaded(t,{name:o}){this._loadingStyles.size&&(this._loadingStyles.delete(o),q.emit(`theme:${o}:load`,t),!this._loadingStyles.size&&q.emit("theme:load"))}};var Mn=0,$i=(()=>{class t{document=C(St);use(e,i={}){let n=!1,a=e,r=null,{immediate:s=!0,manual:l=!1,name:u=`style_${++Mn}`,id:d=void 0,media:g=void 0,nonce:b=void 0,first:h=!1,props:_={}}=i;if(this.document){if(r=this.document.querySelector(`style[data-primeng-style-id="${u}"]`)||d&&this.document.getElementById(d)||this.document.createElement("style"),!r.isConnected){a=e,Pe(r,{type:"text/css",media:g,nonce:b});let E=this.document.head;h&&E.firstChild?E.insertBefore(r,E.firstChild):E.appendChild(r),ye(r,"data-primeng-style-id",u)}return r.textContent!==a&&(r.textContent=a),{id:d,name:u,el:r,css:a}}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=P({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Mt={_loadedStyleNames:new Set,getLoadedStyleNames(){return this._loadedStyleNames},isStyleNameLoaded(t){return this._loadedStyleNames.has(t)},setLoadedStyleName(t){this._loadedStyleNames.add(t)},deleteLoadedStyleName(t){this._loadedStyleNames.delete(t)},clearLoadedStyleNames(){this._loadedStyleNames.clear()}},Bn=({dt:t})=>`
*,
::before,
::after {
    box-sizing: border-box;
}

/* Non ng overlay animations */
.p-connected-overlay {
    opacity: 0;
    transform: scaleY(0.8);
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),
        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-connected-overlay-visible {
    opacity: 1;
    transform: scaleY(1);
}

.p-connected-overlay-hidden {
    opacity: 0;
    transform: scaleY(1);
    transition: opacity 0.1s linear;
}

/* NG based overlay animations */
.p-connected-overlay-enter-from {
    opacity: 0;
    transform: scaleY(0.8);
}

.p-connected-overlay-leave-to {
    opacity: 0;
}

.p-connected-overlay-enter-active {
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),
        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-connected-overlay-leave-active {
    transition: opacity 0.1s linear;
}

/* Toggleable Content */
.p-toggleable-content-enter-from,
.p-toggleable-content-leave-to {
    max-height: 0;
}

.p-toggleable-content-enter-to,
.p-toggleable-content-leave-from {
    max-height: 1000px;
}

.p-toggleable-content-leave-active {
    overflow: hidden;
    transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);
}

.p-toggleable-content-enter-active {
    overflow: hidden;
    transition: max-height 1s ease-in-out;
}

.p-disabled,
.p-disabled * {
    cursor: default;
    pointer-events: none;
    user-select: none;
}

.p-disabled,
.p-component:disabled {
    opacity: ${t("disabled.opacity")};
}

.pi {
    font-size: ${t("icon.size")};
}

.p-icon {
    width: ${t("icon.size")};
    height: ${t("icon.size")};
}

.p-unselectable-text {
    user-select: none;
}

.p-overlay-mask {
    background: ${t("mask.background")};
    color: ${t("mask.color")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.p-overlay-mask-enter {
    animation: p-overlay-mask-enter-animation ${t("mask.transition.duration")} forwards;
}

.p-overlay-mask-leave {
    animation: p-overlay-mask-leave-animation ${t("mask.transition.duration")} forwards;
}
/* Temporarily disabled, distrupts PrimeNG overlay animations */
/* @keyframes p-overlay-mask-enter-animation {
    from {
        background: transparent;
    }
    to {
        background: ${t("mask.background")};
    }
}
@keyframes p-overlay-mask-leave-animation {
    from {
        background: ${t("mask.background")};
    }
    to {
        background: transparent;
    }
}*/

.p-iconwrapper {
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
`,Hn=({dt:t})=>`
.p-hidden-accessible {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.p-hidden-accessible input,
.p-hidden-accessible select {
    transform: scale(0);
}

.p-overflow-hidden {
    overflow: hidden;
    padding-right: ${t("scrollbar.width")};
}

/* @todo move to baseiconstyle.ts */

.p-icon {
    display: inline-block;
    vertical-align: baseline;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`,H=(()=>{class t{name="base";useStyle=C($i);theme=void 0;css=void 0;classes={};inlineStyles={};load=(e,i={},n=a=>a)=>{let a=n(Y(e,{dt:Ft}));return a?this.useStyle.use(Et(a),L({name:this.name},i)):{}};loadCSS=(e={})=>this.load(this.css,e);loadTheme=(e={},i="")=>this.load(this.theme,e,(n="")=>x.transformCSS(e.name||this.name,`${n}${i}`));loadGlobalCSS=(e={})=>this.load(Hn,e);loadGlobalTheme=(e={},i="")=>this.load(Bn,e,(n="")=>x.transformCSS(e.name||this.name,`${n}${i}`));getCommonTheme=e=>x.getCommon(this.name,e);getComponentTheme=e=>x.getComponent(this.name,e);getDirectiveTheme=e=>x.getDirective(this.name,e);getPresetTheme=(e,i,n)=>x.getCustomPreset(this.name,e,i,n);getLayerOrderThemeCSS=()=>x.getLayerOrderCSS(this.name);getStyleSheet=(e="",i={})=>{if(this.css){let n=Y(this.css,{dt:Ft}),a=Et(`${n}${e}`),r=Object.entries(i).reduce((s,[l,u])=>s.push(`${l}="${u}"`)&&s,[]).join(" ");return`<style type="text/css" data-primeng-style-id="${this.name}" ${r}>${a}</style>`}return""};getCommonThemeStyleSheet=(e,i={})=>x.getCommonStyleSheet(this.name,e,i);getThemeStyleSheet=(e,i={})=>{let n=[x.getStyleSheet(this.name,e,i)];if(this.theme){let a=this.name==="base"?"global-style":`${this.name}-style`,r=Y(this.theme,{dt:Ft}),s=Et(x.transformCSS(a,r)),l=Object.entries(i).reduce((u,[d,g])=>u.push(`${d}="${g}"`)&&u,[]).join(" ");n.push(`<style type="text/css" data-primeng-style-id="${a}" ${l}>${s}</style>`)}return n.join("")};static \u0275fac=function(i){return new(i||t)};static \u0275prov=P({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Vn=(()=>{class t{theme=It(void 0);csp=It({nonce:void 0});isThemeChanged=!1;document=C(St);baseStyle=C(H);constructor(){zt(()=>{q.on("theme:change",e=>{oi(()=>{this.isThemeChanged=!0,this.theme.set(e)})})}),zt(()=>{let e=this.theme();this.document&&e&&(this.isThemeChanged||this.onThemeChange(e),this.isThemeChanged=!1)})}ngOnDestroy(){x.clearLoadedStyleNames(),q.clear()}onThemeChange(e){x.setTheme(e),this.document&&this.loadCommonTheme()}loadCommonTheme(){if(this.theme()!=="none"&&!x.isStyleNameLoaded("common")){let{primitive:e,semantic:i,global:n,style:a}=this.baseStyle.getCommonTheme?.()||{},r={nonce:this.csp?.()?.nonce};this.baseStyle.load(e?.css,L({name:"primitive-variables"},r)),this.baseStyle.load(i?.css,L({name:"semantic-variables"},r)),this.baseStyle.load(n?.css,L({name:"global-variables"},r)),this.baseStyle.loadGlobalTheme(L({name:"global-style"},r),a),x.setLoadedStyleName("common")}}setThemeConfig(e){let{theme:i,csp:n}=e||{};i&&this.theme.set(i),n&&this.csp.set(n)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=P({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Pi=(()=>{class t extends Vn{ripple=It(!1);platformId=C($t);inputStyle=It(null);inputVariant=It(null);overlayOptions={};csp=It({nonce:void 0});filterMatchModeOptions={text:[N.STARTS_WITH,N.CONTAINS,N.NOT_CONTAINS,N.ENDS_WITH,N.EQUALS,N.NOT_EQUALS],numeric:[N.EQUALS,N.NOT_EQUALS,N.LESS_THAN,N.LESS_THAN_OR_EQUAL_TO,N.GREATER_THAN,N.GREATER_THAN_OR_EQUAL_TO],date:[N.DATE_IS,N.DATE_IS_NOT,N.DATE_BEFORE,N.DATE_AFTER]};translation={startsWith:"Starts with",contains:"Contains",notContains:"Not contains",endsWith:"Ends with",equals:"Equals",notEquals:"Not equals",noFilter:"No Filter",lt:"Less than",lte:"Less than or equal to",gt:"Greater than",gte:"Greater than or equal to",is:"Is",isNot:"Is not",before:"Before",after:"After",dateIs:"Date is",dateIsNot:"Date is not",dateBefore:"Date is before",dateAfter:"Date is after",clear:"Clear",apply:"Apply",matchAll:"Match All",matchAny:"Match Any",addRule:"Add Rule",removeRule:"Remove Rule",accept:"Yes",reject:"No",choose:"Choose",upload:"Upload",cancel:"Cancel",pending:"Pending",fileSizeTypes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],chooseYear:"Choose Year",chooseMonth:"Choose Month",chooseDate:"Choose Date",prevDecade:"Previous Decade",nextDecade:"Next Decade",prevYear:"Previous Year",nextYear:"Next Year",prevMonth:"Previous Month",nextMonth:"Next Month",prevHour:"Previous Hour",nextHour:"Next Hour",prevMinute:"Previous Minute",nextMinute:"Next Minute",prevSecond:"Previous Second",nextSecond:"Next Second",am:"am",pm:"pm",dateFormat:"mm/dd/yy",firstDayOfWeek:0,today:"Today",weekHeader:"Wk",weak:"Weak",medium:"Medium",strong:"Strong",passwordPrompt:"Enter a password",emptyMessage:"No results found",searchMessage:"Search results are available",selectionMessage:"{0} items selected",emptySelectionMessage:"No selected item",emptySearchMessage:"No results found",emptyFilterMessage:"No results found",fileChosenMessage:"Files",noFileChosenMessage:"No file chosen",aria:{trueLabel:"True",falseLabel:"False",nullLabel:"Not Selected",star:"1 star",stars:"{star} stars",selectAll:"All items selected",unselectAll:"All items unselected",close:"Close",previous:"Previous",next:"Next",navigation:"Navigation",scrollTop:"Scroll Top",moveTop:"Move Top",moveUp:"Move Up",moveDown:"Move Down",moveBottom:"Move Bottom",moveToTarget:"Move to Target",moveToSource:"Move to Source",moveAllToTarget:"Move All to Target",moveAllToSource:"Move All to Source",pageLabel:"{page}",firstPageLabel:"First Page",lastPageLabel:"Last Page",nextPageLabel:"Next Page",prevPageLabel:"Previous Page",rowsPerPageLabel:"Rows per page",previousPageLabel:"Previous Page",jumpToPageDropdownLabel:"Jump to Page Dropdown",jumpToPageInputLabel:"Jump to Page Input",selectRow:"Row Selected",unselectRow:"Row Unselected",expandRow:"Row Expanded",collapseRow:"Row Collapsed",showFilterMenu:"Show Filter Menu",hideFilterMenu:"Hide Filter Menu",filterOperator:"Filter Operator",filterConstraint:"Filter Constraint",editRow:"Row Edit",saveEdit:"Save Edit",cancelEdit:"Cancel Edit",listView:"List View",gridView:"Grid View",slide:"Slide",slideNumber:"{slideNumber}",zoomImage:"Zoom Image",zoomIn:"Zoom In",zoomOut:"Zoom Out",rotateRight:"Rotate Right",rotateLeft:"Rotate Left",listLabel:"Option List",selectColor:"Select a color",removeLabel:"Remove",browseFiles:"Browse Files",maximizeLabel:"Maximize"}};zIndex={modal:1100,overlay:1e3,menu:1e3,tooltip:1100};translationSource=new qe;translationObserver=this.translationSource.asObservable();getTranslation(e){return this.translation[e]}setTranslation(e){this.translation=L(L({},this.translation),e),this.translationSource.next(this.translation)}setConfig(e){let{csp:i,ripple:n,inputStyle:a,inputVariant:r,theme:s,overlayOptions:l,translation:u,filterMatchModeOptions:d}=e||{};i&&this.csp.set(i),n&&this.ripple.set(n),a&&this.inputStyle.set(a),r&&this.inputVariant.set(r),l&&(this.overlayOptions=l),u&&this.setTranslation(u),d&&(this.filterMatchModeOptions=d),s&&this.setThemeConfig({theme:s,csp:i})}static \u0275fac=(()=>{let e;return function(n){return(e||(e=S(t)))(n||t)}})();static \u0275prov=P({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Ca=new Qe("PRIME_NG_CONFIG");var ki=(()=>{class t extends H{name="common";static \u0275fac=(()=>{let e;return function(n){return(e||(e=S(t)))(n||t)}})();static \u0275prov=P({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),J=(()=>{class t{document=C(St);platformId=C($t);el=C(Lt);injector=C(Ye);cd=C(ni);renderer=C(Xe);config=C(Pi);baseComponentStyle=C(ki);baseStyle=C(H);scopedStyleEl;rootEl;dt;get styleOptions(){return{nonce:this.config?.csp().nonce}}get _name(){return this.constructor.name.replace(/^_/,"").toLowerCase()}get componentStyle(){return this._componentStyle}attrSelector=Ot("pc");themeChangeListeners=[];_getHostInstance(e){if(e)return e?this.hostName?e.name===this.hostName?e:this._getHostInstance(e.parentInstance):e.parentInstance:void 0}_getOptionValue(e,i="",n={}){return ve(e,i,n)}ngOnInit(){this.document&&this._loadStyles()}ngAfterViewInit(){this.rootEl=this.el?.nativeElement,this.rootEl&&this.rootEl?.setAttribute(this.attrSelector,"")}ngOnChanges(e){if(this.document&&!ai(this.platformId)){let{dt:i}=e;i&&i.currentValue&&(this._loadScopedThemeStyles(i.currentValue),this._themeChangeListener(()=>this._loadScopedThemeStyles(i.currentValue)))}}ngOnDestroy(){this._unloadScopedThemeStyles(),this.themeChangeListeners.forEach(e=>q.off("theme:change",e))}_loadStyles(){let e=()=>{Mt.isStyleNameLoaded("base")||(this.baseStyle.loadGlobalCSS(this.styleOptions),Mt.setLoadedStyleName("base")),this._loadThemeStyles()};e(),this._themeChangeListener(()=>e())}_loadCoreStyles(){!Mt.isStyleNameLoaded("base")&&this._name&&(this.baseComponentStyle.loadCSS(this.styleOptions),this.componentStyle&&this.componentStyle?.loadCSS(this.styleOptions),Mt.setLoadedStyleName(this.componentStyle?.name))}_loadThemeStyles(){if(!x.isStyleNameLoaded("common")){let{primitive:e,semantic:i,global:n,style:a}=this.componentStyle?.getCommonTheme?.()||{};this.baseStyle.load(e?.css,L({name:"primitive-variables"},this.styleOptions)),this.baseStyle.load(i?.css,L({name:"semantic-variables"},this.styleOptions)),this.baseStyle.load(n?.css,L({name:"global-variables"},this.styleOptions)),this.baseStyle.loadGlobalTheme(L({name:"global-style"},this.styleOptions),a),x.setLoadedStyleName("common")}if(!x.isStyleNameLoaded(this.componentStyle?.name)&&this.componentStyle?.name){let{css:e,style:i}=this.componentStyle?.getComponentTheme?.()||{};this.componentStyle?.load(e,L({name:`${this.componentStyle?.name}-variables`},this.styleOptions)),this.componentStyle?.loadTheme(L({name:`${this.componentStyle?.name}-style`},this.styleOptions),i),x.setLoadedStyleName(this.componentStyle?.name)}if(!x.isStyleNameLoaded("layer-order")){let e=this.componentStyle?.getLayerOrderThemeCSS?.();this.baseStyle.load(e,L({name:"layer-order",first:!0},this.styleOptions)),x.setLoadedStyleName("layer-order")}this.dt&&(this._loadScopedThemeStyles(this.dt),this._themeChangeListener(()=>this._loadScopedThemeStyles(this.dt)))}_loadScopedThemeStyles(e){let{css:i}=this.componentStyle?.getPresetTheme?.(e,`[${this.attrSelector}]`)||{},n=this.componentStyle?.load(i,L({name:`${this.attrSelector}-${this.componentStyle?.name}`},this.styleOptions));this.scopedStyleEl=n?.el}_unloadScopedThemeStyles(){this.scopedStyleEl?.remove()}_themeChangeListener(e=()=>{}){Mt.clearLoadedStyleNames(),q.on("theme:change",e),this.themeChangeListeners.push(e)}cx(e,i){let n=this.parent?this.parent.componentStyle?.classes?.[e]:this.componentStyle?.classes?.[e];return typeof n=="function"?n({instance:this}):typeof n=="string"?n:e}sx(e){let i=this.componentStyle?.inlineStyles?.[e];return typeof i=="function"?i({instance:this}):typeof i=="string"?i:L({},i)}get parent(){return this.parentInstance}static \u0275fac=function(i){return new(i||t)};static \u0275dir=ct({type:t,inputs:{dt:"dt"},features:[Q([ki,H]),it]})}return t})();var Ri=(()=>{class t{static zindex=1e3;static calculatedScrollbarWidth=null;static calculatedScrollbarHeight=null;static browser;static addClass(e,i){e&&i&&(e.classList?e.classList.add(i):e.className+=" "+i)}static addMultipleClasses(e,i){if(e&&i)if(e.classList){let n=i.trim().split(" ");for(let a=0;a<n.length;a++)e.classList.add(n[a])}else{let n=i.split(" ");for(let a=0;a<n.length;a++)e.className+=" "+n[a]}}static removeClass(e,i){e&&i&&(e.classList?e.classList.remove(i):e.className=e.className.replace(new RegExp("(^|\\b)"+i.split(" ").join("|")+"(\\b|$)","gi")," "))}static removeMultipleClasses(e,i){e&&i&&[i].flat().filter(Boolean).forEach(n=>n.split(" ").forEach(a=>this.removeClass(e,a)))}static hasClass(e,i){return e&&i?e.classList?e.classList.contains(i):new RegExp("(^| )"+i+"( |$)","gi").test(e.className):!1}static siblings(e){return Array.prototype.filter.call(e.parentNode.children,function(i){return i!==e})}static find(e,i){return Array.from(e.querySelectorAll(i))}static findSingle(e,i){return this.isElement(e)?e.querySelector(i):null}static index(e){let i=e.parentNode.childNodes,n=0;for(var a=0;a<i.length;a++){if(i[a]==e)return n;i[a].nodeType==1&&n++}return-1}static indexWithinGroup(e,i){let n=e.parentNode?e.parentNode.childNodes:[],a=0;for(var r=0;r<n.length;r++){if(n[r]==e)return a;n[r].attributes&&n[r].attributes[i]&&n[r].nodeType==1&&a++}return-1}static appendOverlay(e,i,n="self"){n!=="self"&&e&&i&&this.appendChild(e,i)}static alignOverlay(e,i,n="self",a=!0){e&&i&&(a&&(e.style.minWidth=`${t.getOuterWidth(i)}px`),n==="self"?this.relativePosition(e,i):this.absolutePosition(e,i))}static relativePosition(e,i,n=!0){let a=j=>{if(j)return getComputedStyle(j).getPropertyValue("position")==="relative"?j:a(j.parentElement)},r=e.offsetParent?{width:e.offsetWidth,height:e.offsetHeight}:this.getHiddenElementDimensions(e),s=i.offsetHeight,l=i.getBoundingClientRect(),u=this.getWindowScrollTop(),d=this.getWindowScrollLeft(),g=this.getViewport(),h=a(e)?.getBoundingClientRect()||{top:-1*u,left:-1*d},_,E;l.top+s+r.height>g.height?(_=l.top-h.top-r.height,e.style.transformOrigin="bottom",l.top+_<0&&(_=-1*l.top)):(_=s+l.top-h.top,e.style.transformOrigin="top");let tt=l.left+r.width-g.width,rt=l.left-h.left;r.width>g.width?E=(l.left-h.left)*-1:tt>0?E=rt-tt:E=l.left-h.left,e.style.top=_+"px",e.style.left=E+"px",n&&(e.style.marginTop=origin==="bottom"?"calc(var(--p-anchor-gutter) * -1)":"calc(var(--p-anchor-gutter))")}static absolutePosition(e,i,n=!0){let a=e.offsetParent?{width:e.offsetWidth,height:e.offsetHeight}:this.getHiddenElementDimensions(e),r=a.height,s=a.width,l=i.offsetHeight,u=i.offsetWidth,d=i.getBoundingClientRect(),g=this.getWindowScrollTop(),b=this.getWindowScrollLeft(),h=this.getViewport(),_,E;d.top+l+r>h.height?(_=d.top+g-r,e.style.transformOrigin="bottom",_<0&&(_=g)):(_=l+d.top+g,e.style.transformOrigin="top"),d.left+s>h.width?E=Math.max(0,d.left+b+u-s):E=d.left+b,e.style.top=_+"px",e.style.left=E+"px",n&&(e.style.marginTop=origin==="bottom"?"calc(var(--p-anchor-gutter) * -1)":"calc(var(--p-anchor-gutter))")}static getParents(e,i=[]){return e.parentNode===null?i:this.getParents(e.parentNode,i.concat([e.parentNode]))}static getScrollableParents(e){let i=[];if(e){let n=this.getParents(e),a=/(auto|scroll)/,r=s=>{let l=window.getComputedStyle(s,null);return a.test(l.getPropertyValue("overflow"))||a.test(l.getPropertyValue("overflowX"))||a.test(l.getPropertyValue("overflowY"))};for(let s of n){let l=s.nodeType===1&&s.dataset.scrollselectors;if(l){let u=l.split(",");for(let d of u){let g=this.findSingle(s,d);g&&r(g)&&i.push(g)}}s.nodeType!==9&&r(s)&&i.push(s)}}return i}static getHiddenElementOuterHeight(e){e.style.visibility="hidden",e.style.display="block";let i=e.offsetHeight;return e.style.display="none",e.style.visibility="visible",i}static getHiddenElementOuterWidth(e){e.style.visibility="hidden",e.style.display="block";let i=e.offsetWidth;return e.style.display="none",e.style.visibility="visible",i}static getHiddenElementDimensions(e){let i={};return e.style.visibility="hidden",e.style.display="block",i.width=e.offsetWidth,i.height=e.offsetHeight,e.style.display="none",e.style.visibility="visible",i}static scrollInView(e,i){let n=getComputedStyle(e).getPropertyValue("borderTopWidth"),a=n?parseFloat(n):0,r=getComputedStyle(e).getPropertyValue("paddingTop"),s=r?parseFloat(r):0,l=e.getBoundingClientRect(),d=i.getBoundingClientRect().top+document.body.scrollTop-(l.top+document.body.scrollTop)-a-s,g=e.scrollTop,b=e.clientHeight,h=this.getOuterHeight(i);d<0?e.scrollTop=g+d:d+h>b&&(e.scrollTop=g+d-b+h)}static fadeIn(e,i){e.style.opacity=0;let n=+new Date,a=0,r=function(){a=+e.style.opacity.replace(",",".")+(new Date().getTime()-n)/i,e.style.opacity=a,n=+new Date,+a<1&&(window.requestAnimationFrame&&requestAnimationFrame(r)||setTimeout(r,16))};r()}static fadeOut(e,i){var n=1,a=50,r=i,s=a/r;let l=setInterval(()=>{n=n-s,n<=0&&(n=0,clearInterval(l)),e.style.opacity=n},a)}static getWindowScrollTop(){let e=document.documentElement;return(window.pageYOffset||e.scrollTop)-(e.clientTop||0)}static getWindowScrollLeft(){let e=document.documentElement;return(window.pageXOffset||e.scrollLeft)-(e.clientLeft||0)}static matches(e,i){var n=Element.prototype,a=n.matches||n.webkitMatchesSelector||n.mozMatchesSelector||n.msMatchesSelector||function(r){return[].indexOf.call(document.querySelectorAll(r),this)!==-1};return a.call(e,i)}static getOuterWidth(e,i){let n=e.offsetWidth;if(i){let a=getComputedStyle(e);n+=parseFloat(a.marginLeft)+parseFloat(a.marginRight)}return n}static getHorizontalPadding(e){let i=getComputedStyle(e);return parseFloat(i.paddingLeft)+parseFloat(i.paddingRight)}static getHorizontalMargin(e){let i=getComputedStyle(e);return parseFloat(i.marginLeft)+parseFloat(i.marginRight)}static innerWidth(e){let i=e.offsetWidth,n=getComputedStyle(e);return i+=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight),i}static width(e){let i=e.offsetWidth,n=getComputedStyle(e);return i-=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight),i}static getInnerHeight(e){let i=e.offsetHeight,n=getComputedStyle(e);return i+=parseFloat(n.paddingTop)+parseFloat(n.paddingBottom),i}static getOuterHeight(e,i){let n=e.offsetHeight;if(i){let a=getComputedStyle(e);n+=parseFloat(a.marginTop)+parseFloat(a.marginBottom)}return n}static getHeight(e){let i=e.offsetHeight,n=getComputedStyle(e);return i-=parseFloat(n.paddingTop)+parseFloat(n.paddingBottom)+parseFloat(n.borderTopWidth)+parseFloat(n.borderBottomWidth),i}static getWidth(e){let i=e.offsetWidth,n=getComputedStyle(e);return i-=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight)+parseFloat(n.borderLeftWidth)+parseFloat(n.borderRightWidth),i}static getViewport(){let e=window,i=document,n=i.documentElement,a=i.getElementsByTagName("body")[0],r=e.innerWidth||n.clientWidth||a.clientWidth,s=e.innerHeight||n.clientHeight||a.clientHeight;return{width:r,height:s}}static getOffset(e){var i=e.getBoundingClientRect();return{top:i.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:i.left+(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0)}}static replaceElementWith(e,i){let n=e.parentNode;if(!n)throw"Can't replace element";return n.replaceChild(i,e)}static getUserAgent(){if(navigator&&this.isClient())return navigator.userAgent}static isIE(){var e=window.navigator.userAgent,i=e.indexOf("MSIE ");if(i>0)return!0;var n=e.indexOf("Trident/");if(n>0){var a=e.indexOf("rv:");return!0}var r=e.indexOf("Edge/");return r>0}static isIOS(){return/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream}static isAndroid(){return/(android)/i.test(navigator.userAgent)}static isTouchDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0}static appendChild(e,i){if(this.isElement(i))i.appendChild(e);else if(i&&i.el&&i.el.nativeElement)i.el.nativeElement.appendChild(e);else throw"Cannot append "+i+" to "+e}static removeChild(e,i){if(this.isElement(i))i.removeChild(e);else if(i.el&&i.el.nativeElement)i.el.nativeElement.removeChild(e);else throw"Cannot remove "+e+" from "+i}static removeElement(e){"remove"in Element.prototype?e.remove():e.parentNode.removeChild(e)}static isElement(e){return typeof HTMLElement=="object"?e instanceof HTMLElement:e&&typeof e=="object"&&e!==null&&e.nodeType===1&&typeof e.nodeName=="string"}static calculateScrollbarWidth(e){if(e){let i=getComputedStyle(e);return e.offsetWidth-e.clientWidth-parseFloat(i.borderLeftWidth)-parseFloat(i.borderRightWidth)}else{if(this.calculatedScrollbarWidth!==null)return this.calculatedScrollbarWidth;let i=document.createElement("div");i.className="p-scrollbar-measure",document.body.appendChild(i);let n=i.offsetWidth-i.clientWidth;return document.body.removeChild(i),this.calculatedScrollbarWidth=n,n}}static calculateScrollbarHeight(){if(this.calculatedScrollbarHeight!==null)return this.calculatedScrollbarHeight;let e=document.createElement("div");e.className="p-scrollbar-measure",document.body.appendChild(e);let i=e.offsetHeight-e.clientHeight;return document.body.removeChild(e),this.calculatedScrollbarWidth=i,i}static invokeElementMethod(e,i,n){e[i].apply(e,n)}static clearSelection(){if(window.getSelection)window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().rangeCount>0&&window.getSelection().getRangeAt(0).getClientRects().length>0&&window.getSelection().removeAllRanges();else if(document.selection&&document.selection.empty)try{document.selection.empty()}catch{}}static getBrowser(){if(!this.browser){let e=this.resolveUserAgent();this.browser={},e.browser&&(this.browser[e.browser]=!0,this.browser.version=e.version),this.browser.chrome?this.browser.webkit=!0:this.browser.webkit&&(this.browser.safari=!0)}return this.browser}static resolveUserAgent(){let e=navigator.userAgent.toLowerCase(),i=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:i[1]||"",version:i[2]||"0"}}static isInteger(e){return Number.isInteger?Number.isInteger(e):typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}static isHidden(e){return!e||e.offsetParent===null}static isVisible(e){return e&&e.offsetParent!=null}static isExist(e){return e!==null&&typeof e<"u"&&e.nodeName&&e.parentNode}static focus(e,i){e&&document.activeElement!==e&&e.focus(i)}static getFocusableSelectorString(e=""){return`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        .p-inputtext:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        .p-button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e}`}static getFocusableElements(e,i=""){let n=this.find(e,this.getFocusableSelectorString(i)),a=[];for(let r of n){let s=getComputedStyle(r);this.isVisible(r)&&s.display!="none"&&s.visibility!="hidden"&&a.push(r)}return a}static getFocusableElement(e,i=""){let n=this.findSingle(e,this.getFocusableSelectorString(i));if(n){let a=getComputedStyle(n);if(this.isVisible(n)&&a.display!="none"&&a.visibility!="hidden")return n}return null}static getFirstFocusableElement(e,i=""){let n=this.getFocusableElements(e,i);return n.length>0?n[0]:null}static getLastFocusableElement(e,i){let n=this.getFocusableElements(e,i);return n.length>0?n[n.length-1]:null}static getNextFocusableElement(e,i=!1){let n=t.getFocusableElements(e),a=0;if(n&&n.length>0){let r=n.indexOf(n[0].ownerDocument.activeElement);i?r==-1||r===0?a=n.length-1:a=r-1:r!=-1&&r!==n.length-1&&(a=r+1)}return n[a]}static generateZIndex(){return this.zindex=this.zindex||999,++this.zindex}static getSelection(){return window.getSelection?window.getSelection().toString():document.getSelection?document.getSelection().toString():document.selection?document.selection.createRange().text:null}static getTargetElement(e,i){if(!e)return null;switch(e){case"document":return document;case"window":return window;case"@next":return i?.nextElementSibling;case"@prev":return i?.previousElementSibling;case"@parent":return i?.parentElement;case"@grandparent":return i?.parentElement.parentElement;default:let n=typeof e;if(n==="string")return document.querySelector(e);if(n==="object"&&e.hasOwnProperty("nativeElement"))return this.isExist(e.nativeElement)?e.nativeElement:void 0;let r=(s=>!!(s&&s.constructor&&s.call&&s.apply))(e)?e():e;return r&&r.nodeType===9||this.isExist(r)?r:null}}static isClient(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}static getAttribute(e,i){if(e){let n=e.getAttribute(i);return isNaN(n)?n==="true"||n==="false"?n==="true":n:+n}}static calculateBodyScrollbarWidth(){return window.innerWidth-document.documentElement.offsetWidth}static blockBodyScroll(e="p-overflow-hidden"){document.body.style.setProperty("--scrollbar-width",this.calculateBodyScrollbarWidth()+"px"),this.addClass(document.body,e)}static unblockBodyScroll(e="p-overflow-hidden"){document.body.style.removeProperty("--scrollbar-width"),this.removeClass(document.body,e)}static createElement(e,i={},...n){if(e){let a=document.createElement(e);return this.setAttributes(a,i),a.append(...n),a}}static setAttribute(e,i="",n){this.isElement(e)&&n!==null&&n!==void 0&&e.setAttribute(i,n)}static setAttributes(e,i={}){if(this.isElement(e)){let n=(a,r)=>{let s=e?.$attrs?.[a]?[e?.$attrs?.[a]]:[];return[r].flat().reduce((l,u)=>{if(u!=null){let d=typeof u;if(d==="string"||d==="number")l.push(u);else if(d==="object"){let g=Array.isArray(u)?n(a,u):Object.entries(u).map(([b,h])=>a==="style"&&(h||h===0)?`${b.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}:${h}`:h?b:void 0);l=g.length?l.concat(g.filter(b=>!!b)):l}}return l},s)};Object.entries(i).forEach(([a,r])=>{if(r!=null){let s=a.match(/^on(.+)/);s?e.addEventListener(s[1].toLowerCase(),r):a==="pBind"?this.setAttributes(e,r):(r=a==="class"?[...new Set(n("class",r))].join(" ").trim():a==="style"?n("style",r).join(";").trim():r,(e.$attrs=e.$attrs||{})&&(e.$attrs[a]=r),e.setAttribute(a,r))}})}}static isFocusableElement(e,i=""){return this.isElement(e)?e.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${i},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${i},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${i},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${i},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${i},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${i},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${i}`):!1}}return t})();var Di=(()=>{class t extends J{autofocus=!1;_autofocus=!1;focused=!1;platformId=C($t);document=C(St);host=C(Lt);ngAfterContentChecked(){this.autofocus===!1?this.host.nativeElement.removeAttribute("autofocus"):this.host.nativeElement.setAttribute("autofocus",!0),this.focused||this.autoFocus()}ngAfterViewChecked(){this.focused||this.autoFocus()}autoFocus(){dt(this.platformId)&&this._autofocus&&setTimeout(()=>{let e=Ri.getFocusableElements(this.host?.nativeElement);e.length===0&&this.host.nativeElement.focus(),e.length>0&&e[0].focus(),this.focused=!0})}static \u0275fac=(()=>{let e;return function(n){return(e||(e=S(t)))(n||t)}})();static \u0275dir=ct({type:t,selectors:[["","pAutoFocus",""]],inputs:{autofocus:[2,"autofocus","autofocus",$],_autofocus:[0,"pAutoFocus","_autofocus"]},features:[A]})}return t})();var Wn=({dt:t})=>`
.p-badge {
    display: inline-flex;
    border-radius: ${t("badge.border.radius")};
    justify-content: center;
    padding: ${t("badge.padding")};
    background: ${t("badge.primary.background")};
    color: ${t("badge.primary.color")};
    font-size: ${t("badge.font.size")};
    font-weight: ${t("badge.font.weight")};
    min-width: ${t("badge.min.width")};
    height: ${t("badge.height")};
    line-height: ${t("badge.height")};
}

.p-badge-dot {
    width: ${t("badge.dot.size")};
    min-width: ${t("badge.dot.size")};
    height: ${t("badge.dot.size")};
    border-radius: 50%;
    padding: 0;
}

.p-badge-circle {
    padding: 0;
    border-radius: 50%;
}

.p-badge-secondary {
    background: ${t("badge.secondary.background")};
    color: ${t("badge.secondary.color")};
}

.p-badge-success {
    background: ${t("badge.success.background")};
    color: ${t("badge.success.color")};
}

.p-badge-info {
    background: ${t("badge.info.background")};
    color: ${t("badge.info.color")};
}

.p-badge-warn {
    background: ${t("badge.warn.background")};
    color: ${t("badge.warn.color")};
}

.p-badge-danger {
    background: ${t("badge.danger.background")};
    color: ${t("badge.danger.color")};
}

.p-badge-contrast {
    background: ${t("badge.contrast.background")};
    color: ${t("badge.contrast.color")};
}

.p-badge-sm {
    font-size: ${t("badge.sm.font.size")};
    min-width: ${t("badge.sm.min.width")};
    height: ${t("badge.sm.height")};
    line-height: ${t("badge.sm.height")};
}

.p-badge-lg {
    font-size: ${t("badge.lg.font.size")};
    min-width: ${t("badge.lg.min.width")};
    height: ${t("badge.lg.height")};
    line-height: ${t("badge.lg.height")};
}

.p-badge-xl {
    font-size: ${t("badge.xl.font.size")};
    min-width: ${t("badge.xl.min.width")};
    height: ${t("badge.xl.height")};
    line-height: ${t("badge.xl.height")};
}

/* For PrimeNG (directive)*/

.p-overlay-badge {
    position: relative;
}

.p-overlay-badge > .p-badge {
    position: absolute;
    top: 0;
    inset-inline-end: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
    margin: 0;
}
`,zn={root:({props:t,instance:o})=>["p-badge p-component",{"p-badge-circle":O(t.value)&&String(t.value).length===1,"p-badge-dot":Z(t.value)&&!o.$slots.default,"p-badge-sm":t.size==="small","p-badge-lg":t.size==="large","p-badge-xl":t.size==="xlarge","p-badge-info":t.severity==="info","p-badge-success":t.severity==="success","p-badge-warn":t.severity==="warn","p-badge-danger":t.severity==="danger","p-badge-secondary":t.severity==="secondary","p-badge-contrast":t.severity==="contrast"}]},Ni=(()=>{class t extends H{name="badge";theme=Wn;classes=zn;static \u0275fac=(()=>{let e;return function(n){return(e||(e=S(t)))(n||t)}})();static \u0275prov=P({token:t,factory:t.\u0275fac})}return t})();var Be=(()=>{class t extends J{styleClass=vt();style=vt();badgeSize=vt();size=vt();severity=vt();value=vt();badgeDisabled=vt(!1,{transform:$});_componentStyle=C(Ni);containerClass=Le(()=>{let e="p-badge p-component";return O(this.value())&&String(this.value()).length===1&&(e+=" p-badge-circle"),this.badgeSize()==="large"?e+=" p-badge-lg":this.badgeSize()==="xlarge"?e+=" p-badge-xl":this.badgeSize()==="small"&&(e+=" p-badge-sm"),Z(this.value())&&(e+=" p-badge-dot"),this.styleClass()&&(e+=` ${this.styleClass()}`),this.severity()&&(e+=` p-badge-${this.severity()}`),e});static \u0275fac=(()=>{let e;return function(n){return(e||(e=S(t)))(n||t)}})();static \u0275cmp=I({type:t,selectors:[["p-badge"]],hostVars:6,hostBindings:function(i,n){i&2&&(ei(n.style()),R(n.containerClass()),ti("display",n.badgeDisabled()?"none":null))},inputs:{styleClass:[1,"styleClass"],style:[1,"style"],badgeSize:[1,"badgeSize"],size:[1,"size"],severity:[1,"severity"],value:[1,"value"],badgeDisabled:[1,"badgeDisabled"]},features:[Q([Ni]),A],decls:1,vars:1,template:function(i,n){i&1&&k(0),i&2&&U(n.value())},dependencies:[G,X],encapsulation:2,changeDetection:0})}return t})(),Fi=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=lt({type:t});static \u0275inj=at({imports:[Be,X,X]})}return t})();var jn=["*"],Gn=`
.p-icon {
    display: inline-block;
    vertical-align: baseline;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`,Kn=(()=>{class t extends H{name="baseicon";inlineStyles=Gn;static \u0275fac=(()=>{let e;return function(n){return(e||(e=S(t)))(n||t)}})();static \u0275prov=P({token:t,factory:t.\u0275fac})}return t})();var pt=(()=>{class t extends J{label;spin=!1;styleClass;role;ariaLabel;ariaHidden;ngOnInit(){super.ngOnInit(),this.getAttributes()}getAttributes(){let e=Z(this.label);this.role=e?void 0:"img",this.ariaLabel=e?void 0:this.label,this.ariaHidden=e}getClassNames(){return`p-icon ${this.styleClass?this.styleClass+" ":""}${this.spin?"p-icon-spin":""}`}static \u0275fac=(()=>{let e;return function(n){return(e||(e=S(t)))(n||t)}})();static \u0275cmp=I({type:t,selectors:[["ng-component"]],hostAttrs:[1,"p-component","p-iconwrapper"],inputs:{label:"label",spin:[2,"spin","spin",$],styleClass:"styleClass"},features:[Q([Kn]),A],ngContentSelectors:jn,decls:1,vars:0,template:function(i,n){i&1&&(mt(),ut(0))},encapsulation:2,changeDetection:0})}return t})();var Mi=(()=>{class t extends pt{static \u0275fac=(()=>{let e;return function(n){return(e||(e=S(t)))(n||t)}})();static \u0275cmp=I({type:t,selectors:[["ChevronDownIcon"]],features:[A],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z","fill","currentColor"]],template:function(i,n){i&1&&(st(),f(0,"svg",0),w(1,"path",1),m()),i&2&&(R(n.getClassNames()),T("aria-label",n.ariaLabel)("aria-hidden",n.ariaHidden)("role",n.role))},encapsulation:2})}return t})();var Bi=(()=>{class t extends pt{static \u0275fac=(()=>{let e;return function(n){return(e||(e=S(t)))(n||t)}})();static \u0275cmp=I({type:t,selectors:[["ChevronLeftIcon"]],features:[A],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z","fill","currentColor"]],template:function(i,n){i&1&&(st(),f(0,"svg",0),w(1,"path",1),m()),i&2&&(R(n.getClassNames()),T("aria-label",n.ariaLabel)("aria-hidden",n.ariaHidden)("role",n.role))},encapsulation:2})}return t})();var Hi=(()=>{class t extends pt{static \u0275fac=(()=>{let e;return function(n){return(e||(e=S(t)))(n||t)}})();static \u0275cmp=I({type:t,selectors:[["ChevronRightIcon"]],features:[A],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z","fill","currentColor"]],template:function(i,n){i&1&&(st(),f(0,"svg",0),w(1,"path",1),m()),i&2&&(R(n.getClassNames()),T("aria-label",n.ariaLabel)("aria-hidden",n.ariaHidden)("role",n.role))},encapsulation:2})}return t})();var Vi=(()=>{class t extends pt{static \u0275fac=(()=>{let e;return function(n){return(e||(e=S(t)))(n||t)}})();static \u0275cmp=I({type:t,selectors:[["ChevronUpIcon"]],features:[A],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M12.2097 10.4113C12.1057 10.4118 12.0027 10.3915 11.9067 10.3516C11.8107 10.3118 11.7237 10.2532 11.6506 10.1792L6.93602 5.46461L2.22139 10.1476C2.07272 10.244 1.89599 10.2877 1.71953 10.2717C1.54307 10.2556 1.3771 10.1808 1.24822 10.0593C1.11933 9.93766 1.035 9.77633 1.00874 9.6011C0.982477 9.42587 1.0158 9.2469 1.10338 9.09287L6.37701 3.81923C6.52533 3.6711 6.72639 3.58789 6.93602 3.58789C7.14565 3.58789 7.3467 3.6711 7.49502 3.81923L12.7687 9.09287C12.9168 9.24119 13 9.44225 13 9.65187C13 9.8615 12.9168 10.0626 12.7687 10.2109C12.616 10.3487 12.4151 10.4207 12.2097 10.4113Z","fill","currentColor"]],template:function(i,n){i&1&&(st(),f(0,"svg",0),w(1,"path",1),m()),i&2&&(R(n.getClassNames()),T("aria-label",n.ariaLabel)("aria-hidden",n.ariaHidden)("role",n.role))},encapsulation:2})}return t})();var Wi=(()=>{class t extends pt{pathId;ngOnInit(){this.pathId="url(#"+Ot()+")"}static \u0275fac=(()=>{let e;return function(n){return(e||(e=S(t)))(n||t)}})();static \u0275cmp=I({type:t,selectors:[["SpinnerIcon"]],features:[A],decls:6,vars:7,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(i,n){i&1&&(st(),f(0,"svg",0)(1,"g"),w(2,"path",1),m(),f(3,"defs")(4,"clipPath",2),w(5,"rect",3),m()()()),i&2&&(R(n.getClassNames()),T("aria-label",n.ariaLabel)("aria-hidden",n.ariaHidden)("role",n.role),p(),T("clip-path",n.pathId),p(3),c("id",n.pathId))},encapsulation:2})}return t})();var qn=({dt:t})=>`
/* For PrimeNG */
.p-ripple {
    overflow: hidden;
    position: relative;
}

.p-ink {
    display: block;
    position: absolute;
    background: ${t("ripple.background")};
    border-radius: 100%;
    transform: scale(0);
}

.p-ink-active {
    animation: ripple 0.4s linear;
}

.p-ripple-disabled .p-ink {
    display: none !important;
}

@keyframes ripple {
    100% {
        opacity: 0;
        transform: scale(2.5);
    }
}
`,Qn={root:"p-ink"},zi=(()=>{class t extends H{name="ripple";theme=qn;classes=Qn;static \u0275fac=(()=>{let e;return function(n){return(e||(e=S(t)))(n||t)}})();static \u0275prov=P({token:t,factory:t.\u0275fac})}return t})();var Ui=(()=>{class t extends J{zone=C(ae);_componentStyle=C(zi);animationListener;mouseDownListener;timeout;constructor(){super(),zt(()=>{dt(this.platformId)&&(this.config.ripple()?this.zone.runOutsideAngular(()=>{this.create(),this.mouseDownListener=this.renderer.listen(this.el.nativeElement,"mousedown",this.onMouseDown.bind(this))}):this.remove())})}ngAfterViewInit(){super.ngAfterViewInit()}onMouseDown(e){let i=this.getInk();if(!i||this.document.defaultView?.getComputedStyle(i,null).display==="none")return;if(kt(i,"p-ink-active"),!ke(i)&&!Re(i)){let s=Math.max(fi(this.el.nativeElement),bi(this.el.nativeElement));i.style.height=s+"px",i.style.width=s+"px"}let n=mi(this.el.nativeElement),a=e.pageX-n.left+this.document.body.scrollTop-Re(i)/2,r=e.pageY-n.top+this.document.body.scrollLeft-ke(i)/2;this.renderer.setStyle(i,"top",r+"px"),this.renderer.setStyle(i,"left",a+"px"),me(i,"p-ink-active"),this.timeout=setTimeout(()=>{let s=this.getInk();s&&kt(s,"p-ink-active")},401)}getInk(){let e=this.el.nativeElement.children;for(let i=0;i<e.length;i++)if(typeof e[i].className=="string"&&e[i].className.indexOf("p-ink")!==-1)return e[i];return null}resetInk(){let e=this.getInk();e&&kt(e,"p-ink-active")}onAnimationEnd(e){this.timeout&&clearTimeout(this.timeout),kt(e.currentTarget,"p-ink-active")}create(){let e=this.renderer.createElement("span");this.renderer.addClass(e,"p-ink"),this.renderer.appendChild(this.el.nativeElement,e),this.renderer.setAttribute(e,"aria-hidden","true"),this.renderer.setAttribute(e,"role","presentation"),this.animationListener||(this.animationListener=this.renderer.listen(e,"animationend",this.onAnimationEnd.bind(this)))}remove(){let e=this.getInk();e&&(this.mouseDownListener&&this.mouseDownListener(),this.animationListener&&this.animationListener(),this.mouseDownListener=null,this.animationListener=null,yi(e))}ngOnDestroy(){this.config&&this.config.ripple()&&this.remove(),super.ngOnDestroy()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=ct({type:t,selectors:[["","pRipple",""]],hostAttrs:[1,"p-ripple"],features:[Q([zi]),A]})}return t})();var Yn=["content"],Zn=["loadingicon"],Xn=["icon"],Jn=["*"],Gi=t=>({class:t});function to(t,o){t&1&&Ct(0)}function eo(t,o){if(t&1&&w(0,"span",8),t&2){let e=v(3);c("ngClass",e.iconClass()),T("aria-hidden",!0)("data-pc-section","loadingicon")}}function io(t,o){if(t&1&&w(0,"SpinnerIcon",9),t&2){let e=v(3);c("styleClass",e.spinnerIconClass())("spin",!0),T("aria-hidden",!0)("data-pc-section","loadingicon")}}function no(t,o){if(t&1&&(V(0),y(1,eo,1,3,"span",6)(2,io,1,4,"SpinnerIcon",7),W()),t&2){let e=v(2);p(),c("ngIf",e.loadingIcon),p(),c("ngIf",!e.loadingIcon)}}function oo(t,o){}function ro(t,o){if(t&1&&y(0,oo,0,0,"ng-template",10),t&2){let e=v(2);c("ngIf",e.loadingIconTemplate||e._loadingIconTemplate)}}function ao(t,o){if(t&1&&(V(0),y(1,no,3,2,"ng-container",2)(2,ro,1,1,null,5),W()),t&2){let e=v();p(),c("ngIf",!e.loadingIconTemplate&&!e._loadingIconTemplate),p(),c("ngTemplateOutlet",e.loadingIconTemplate||e._loadingIconTemplate)("ngTemplateOutletContext",B(3,Gi,e.iconClass()))}}function so(t,o){if(t&1&&w(0,"span",8),t&2){let e=v(2);R(e.icon),c("ngClass",e.iconClass()),T("data-pc-section","icon")}}function lo(t,o){}function co(t,o){if(t&1&&y(0,lo,0,0,"ng-template",10),t&2){let e=v(2);c("ngIf",!e.icon&&(e.iconTemplate||e._iconTemplate))}}function uo(t,o){if(t&1&&(V(0),y(1,so,1,4,"span",11)(2,co,1,1,null,5),W()),t&2){let e=v();p(),c("ngIf",e.icon&&!e.iconTemplate&&!e._iconTemplate),p(),c("ngTemplateOutlet",e.iconTemplate||e._iconTemplate)("ngTemplateOutletContext",B(3,Gi,e.iconClass()))}}function po(t,o){if(t&1&&(f(0,"span",12),k(1),m()),t&2){let e=v();T("aria-hidden",e.icon&&!e.label)("data-pc-section","label"),p(),U(e.label)}}function ho(t,o){if(t&1&&w(0,"p-badge",13),t&2){let e=v();c("value",e.badge)("severity",e.badgeSeverity)}}var fo=({dt:t})=>`
.p-button {
    display: inline-flex;
    cursor: pointer;
    user-select: none;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    color: ${t("button.primary.color")};
    background: ${t("button.primary.background")};
    border: 1px solid ${t("button.primary.border.color")};
    padding-block: ${t("button.padding.y")};
    padding-inline: ${t("button.padding.x")};
    font-size: 1rem;
    font-family: inherit;
    font-feature-settings: inherit;
    transition: background ${t("button.transition.duration")}, color ${t("button.transition.duration")}, border-color ${t("button.transition.duration")},
            outline-color ${t("button.transition.duration")}, box-shadow ${t("button.transition.duration")};
    border-radius: ${t("button.border.radius")};
    outline-color: transparent;
    gap: ${t("button.gap")};
}

.p-button-icon,
.p-button-icon:before,
.p-button-icon:after {
    line-height: inherit;
}

.p-button:disabled {
    cursor: default;
}

.p-button-icon-right {
    order: 1;
}

.p-button-icon-right:dir(rtl) {
    order: -1;
}

.p-button:not(.p-button-vertical) .p-button-icon:not(.p-button-icon-right):dir(rtl) {
    order: 1;
}

.p-button-icon-bottom {
    order: 2;
}

.p-button-icon-only {
    width: ${t("button.icon.only.width")};
    padding-inline-start: 0;
    padding-inline-end: 0;
    gap: 0;
}

.p-button-icon-only.p-button-rounded {
    border-radius: 50%;
    height: ${t("button.icon.only.width")};
}

.p-button-icon-only .p-button-label {
    visibility: hidden;
    width: 0;
}

.p-button-sm {
    font-size: ${t("button.sm.font.size")};
    padding-block: ${t("button.sm.padding.y")};
    padding-inline: ${t("button.sm.padding.x")};
}

.p-button-sm .p-button-icon {
    font-size: ${t("button.sm.font.size")};
}

.p-button-sm.p-button-icon-only {
    width: ${t("button.sm.icon.only.width")};
}

.p-button-sm.p-button-icon-only.p-button-rounded {
    height: ${t("button.sm.icon.only.width")};
}

.p-button-lg {
    font-size: ${t("button.lg.font.size")};
    padding-block: ${t("button.lg.padding.y")};
    padding-inline: ${t("button.lg.padding.x")};
}

.p-button-lg .p-button-icon {
    font-size: ${t("button.lg.font.size")};
}

.p-button-lg.p-button-icon-only {
    width: ${t("button.lg.icon.only.width")};
}

.p-button-lg.p-button-icon-only.p-button-rounded {
    height: ${t("button.lg.icon.only.width")};
}

.p-button-vertical {
    flex-direction: column;
}

.p-button-label {
    font-weight: ${t("button.label.font.weight")};
}

.p-button-fluid {
    width: 100%;
}

.p-button-fluid.p-button-icon-only {
    width: ${t("button.icon.only.width")};
}

.p-button:not(:disabled):hover {
    background: ${t("button.primary.hover.background")};
    border: 1px solid ${t("button.primary.hover.border.color")};
    color: ${t("button.primary.hover.color")};
}

.p-button:not(:disabled):active {
    background: ${t("button.primary.active.background")};
    border: 1px solid ${t("button.primary.active.border.color")};
    color: ${t("button.primary.active.color")};
}

.p-button:focus-visible {
    box-shadow: ${t("button.primary.focus.ring.shadow")};
    outline: ${t("button.focus.ring.width")} ${t("button.focus.ring.style")} ${t("button.primary.focus.ring.color")};
    outline-offset: ${t("button.focus.ring.offset")};
}

.p-button .p-badge {
    min-width: ${t("button.badge.size")};
    height: ${t("button.badge.size")};
    line-height: ${t("button.badge.size")};
}

.p-button-raised {
    box-shadow: ${t("button.raised.shadow")};
}

.p-button-rounded {
    border-radius: ${t("button.rounded.border.radius")};
}

.p-button-secondary {
    background: ${t("button.secondary.background")};
    border: 1px solid ${t("button.secondary.border.color")};
    color: ${t("button.secondary.color")};
}

.p-button-secondary:not(:disabled):hover {
    background: ${t("button.secondary.hover.background")};
    border: 1px solid ${t("button.secondary.hover.border.color")};
    color: ${t("button.secondary.hover.color")};
}

.p-button-secondary:not(:disabled):active {
    background: ${t("button.secondary.active.background")};
    border: 1px solid ${t("button.secondary.active.border.color")};
    color: ${t("button.secondary.active.color")};
}

.p-button-secondary:focus-visible {
    outline-color: ${t("button.secondary.focus.ring.color")};
    box-shadow: ${t("button.secondary.focus.ring.shadow")};
}

.p-button-success {
    background: ${t("button.success.background")};
    border: 1px solid ${t("button.success.border.color")};
    color: ${t("button.success.color")};
}

.p-button-success:not(:disabled):hover {
    background: ${t("button.success.hover.background")};
    border: 1px solid ${t("button.success.hover.border.color")};
    color: ${t("button.success.hover.color")};
}

.p-button-success:not(:disabled):active {
    background: ${t("button.success.active.background")};
    border: 1px solid ${t("button.success.active.border.color")};
    color: ${t("button.success.active.color")};
}

.p-button-success:focus-visible {
    outline-color: ${t("button.success.focus.ring.color")};
    box-shadow: ${t("button.success.focus.ring.shadow")};
}

.p-button-info {
    background: ${t("button.info.background")};
    border: 1px solid ${t("button.info.border.color")};
    color: ${t("button.info.color")};
}

.p-button-info:not(:disabled):hover {
    background: ${t("button.info.hover.background")};
    border: 1px solid ${t("button.info.hover.border.color")};
    color: ${t("button.info.hover.color")};
}

.p-button-info:not(:disabled):active {
    background: ${t("button.info.active.background")};
    border: 1px solid ${t("button.info.active.border.color")};
    color: ${t("button.info.active.color")};
}

.p-button-info:focus-visible {
    outline-color: ${t("button.info.focus.ring.color")};
    box-shadow: ${t("button.info.focus.ring.shadow")};
}

.p-button-warn {
    background: ${t("button.warn.background")};
    border: 1px solid ${t("button.warn.border.color")};
    color: ${t("button.warn.color")};
}

.p-button-warn:not(:disabled):hover {
    background: ${t("button.warn.hover.background")};
    border: 1px solid ${t("button.warn.hover.border.color")};
    color: ${t("button.warn.hover.color")};
}

.p-button-warn:not(:disabled):active {
    background: ${t("button.warn.active.background")};
    border: 1px solid ${t("button.warn.active.border.color")};
    color: ${t("button.warn.active.color")};
}

.p-button-warn:focus-visible {
    outline-color: ${t("button.warn.focus.ring.color")};
    box-shadow: ${t("button.warn.focus.ring.shadow")};
}

.p-button-help {
    background: ${t("button.help.background")};
    border: 1px solid ${t("button.help.border.color")};
    color: ${t("button.help.color")};
}

.p-button-help:not(:disabled):hover {
    background: ${t("button.help.hover.background")};
    border: 1px solid ${t("button.help.hover.border.color")};
    color: ${t("button.help.hover.color")};
}

.p-button-help:not(:disabled):active {
    background: ${t("button.help.active.background")};
    border: 1px solid ${t("button.help.active.border.color")};
    color: ${t("button.help.active.color")};
}

.p-button-help:focus-visible {
    outline-color: ${t("button.help.focus.ring.color")};
    box-shadow: ${t("button.help.focus.ring.shadow")};
}

.p-button-danger {
    background: ${t("button.danger.background")};
    border: 1px solid ${t("button.danger.border.color")};
    color: ${t("button.danger.color")};
}

.p-button-danger:not(:disabled):hover {
    background: ${t("button.danger.hover.background")};
    border: 1px solid ${t("button.danger.hover.border.color")};
    color: ${t("button.danger.hover.color")};
}

.p-button-danger:not(:disabled):active {
    background: ${t("button.danger.active.background")};
    border: 1px solid ${t("button.danger.active.border.color")};
    color: ${t("button.danger.active.color")};
}

.p-button-danger:focus-visible {
    outline-color: ${t("button.danger.focus.ring.color")};
    box-shadow: ${t("button.danger.focus.ring.shadow")};
}

.p-button-contrast {
    background: ${t("button.contrast.background")};
    border: 1px solid ${t("button.contrast.border.color")};
    color: ${t("button.contrast.color")};
}

.p-button-contrast:not(:disabled):hover {
    background: ${t("button.contrast.hover.background")};
    border: 1px solid ${t("button.contrast.hover.border.color")};
    color: ${t("button.contrast.hover.color")};
}

.p-button-contrast:not(:disabled):active {
    background: ${t("button.contrast.active.background")};
    border: 1px solid ${t("button.contrast.active.border.color")};
    color: ${t("button.contrast.active.color")};
}

.p-button-contrast:focus-visible {
    outline-color: ${t("button.contrast.focus.ring.color")};
    box-shadow: ${t("button.contrast.focus.ring.shadow")};
}

.p-button-outlined {
    background: transparent;
    border-color: ${t("button.outlined.primary.border.color")};
    color: ${t("button.outlined.primary.color")};
}

.p-button-outlined:not(:disabled):hover {
    background: ${t("button.outlined.primary.hover.background")};
    border-color: ${t("button.outlined.primary.border.color")};
    color: ${t("button.outlined.primary.color")};
}

.p-button-outlined:not(:disabled):active {
    background: ${t("button.outlined.primary.active.background")};
    border-color: ${t("button.outlined.primary.border.color")};
    color: ${t("button.outlined.primary.color")};
}

.p-button-outlined.p-button-secondary {
    border-color: ${t("button.outlined.secondary.border.color")};
    color: ${t("button.outlined.secondary.color")};
}

.p-button-outlined.p-button-secondary:not(:disabled):hover {
    background: ${t("button.outlined.secondary.hover.background")};
    border-color: ${t("button.outlined.secondary.border.color")};
    color: ${t("button.outlined.secondary.color")};
}

.p-button-outlined.p-button-secondary:not(:disabled):active {
    background: ${t("button.outlined.secondary.active.background")};
    border-color: ${t("button.outlined.secondary.border.color")};
    color: ${t("button.outlined.secondary.color")};
}

.p-button-outlined.p-button-success {
    border-color: ${t("button.outlined.success.border.color")};
    color: ${t("button.outlined.success.color")};
}

.p-button-outlined.p-button-success:not(:disabled):hover {
    background: ${t("button.outlined.success.hover.background")};
    border-color: ${t("button.outlined.success.border.color")};
    color: ${t("button.outlined.success.color")};
}

.p-button-outlined.p-button-success:not(:disabled):active {
    background: ${t("button.outlined.success.active.background")};
    border-color: ${t("button.outlined.success.border.color")};
    color: ${t("button.outlined.success.color")};
}

.p-button-outlined.p-button-info {
    border-color: ${t("button.outlined.info.border.color")};
    color: ${t("button.outlined.info.color")};
}

.p-button-outlined.p-button-info:not(:disabled):hover {
    background: ${t("button.outlined.info.hover.background")};
    border-color: ${t("button.outlined.info.border.color")};
    color: ${t("button.outlined.info.color")};
}

.p-button-outlined.p-button-info:not(:disabled):active {
    background: ${t("button.outlined.info.active.background")};
    border-color: ${t("button.outlined.info.border.color")};
    color: ${t("button.outlined.info.color")};
}

.p-button-outlined.p-button-warn {
    border-color: ${t("button.outlined.warn.border.color")};
    color: ${t("button.outlined.warn.color")};
}

.p-button-outlined.p-button-warn:not(:disabled):hover {
    background: ${t("button.outlined.warn.hover.background")};
    border-color: ${t("button.outlined.warn.border.color")};
    color: ${t("button.outlined.warn.color")};
}

.p-button-outlined.p-button-warn:not(:disabled):active {
    background: ${t("button.outlined.warn.active.background")};
    border-color: ${t("button.outlined.warn.border.color")};
    color: ${t("button.outlined.warn.color")};
}

.p-button-outlined.p-button-help {
    border-color: ${t("button.outlined.help.border.color")};
    color: ${t("button.outlined.help.color")};
}

.p-button-outlined.p-button-help:not(:disabled):hover {
    background: ${t("button.outlined.help.hover.background")};
    border-color: ${t("button.outlined.help.border.color")};
    color: ${t("button.outlined.help.color")};
}

.p-button-outlined.p-button-help:not(:disabled):active {
    background: ${t("button.outlined.help.active.background")};
    border-color: ${t("button.outlined.help.border.color")};
    color: ${t("button.outlined.help.color")};
}

.p-button-outlined.p-button-danger {
    border-color: ${t("button.outlined.danger.border.color")};
    color: ${t("button.outlined.danger.color")};
}

.p-button-outlined.p-button-danger:not(:disabled):hover {
    background: ${t("button.outlined.danger.hover.background")};
    border-color: ${t("button.outlined.danger.border.color")};
    color: ${t("button.outlined.danger.color")};
}

.p-button-outlined.p-button-danger:not(:disabled):active {
    background: ${t("button.outlined.danger.active.background")};
    border-color: ${t("button.outlined.danger.border.color")};
    color: ${t("button.outlined.danger.color")};
}

.p-button-outlined.p-button-contrast {
    border-color: ${t("button.outlined.contrast.border.color")};
    color: ${t("button.outlined.contrast.color")};
}

.p-button-outlined.p-button-contrast:not(:disabled):hover {
    background: ${t("button.outlined.contrast.hover.background")};
    border-color: ${t("button.outlined.contrast.border.color")};
    color: ${t("button.outlined.contrast.color")};
}

.p-button-outlined.p-button-contrast:not(:disabled):active {
    background: ${t("button.outlined.contrast.active.background")};
    border-color: ${t("button.outlined.contrast.border.color")};
    color: ${t("button.outlined.contrast.color")};
}

.p-button-outlined.p-button-plain {
    border-color: ${t("button.outlined.plain.border.color")};
    color: ${t("button.outlined.plain.color")};
}

.p-button-outlined.p-button-plain:not(:disabled):hover {
    background: ${t("button.outlined.plain.hover.background")};
    border-color: ${t("button.outlined.plain.border.color")};
    color: ${t("button.outlined.plain.color")};
}

.p-button-outlined.p-button-plain:not(:disabled):active {
    background: ${t("button.outlined.plain.active.background")};
    border-color: ${t("button.outlined.plain.border.color")};
    color: ${t("button.outlined.plain.color")};
}

.p-button-text {
    background: transparent;
    border-color: transparent;
    color: ${t("button.text.primary.color")};
}

.p-button-text:not(:disabled):hover {
    background: ${t("button.text.primary.hover.background")};
    border-color: transparent;
    color: ${t("button.text.primary.color")};
}

.p-button-text:not(:disabled):active {
    background: ${t("button.text.primary.active.background")};
    border-color: transparent;
    color: ${t("button.text.primary.color")};
}

.p-button-text.p-button-secondary {
    background: transparent;
    border-color: transparent;
    color: ${t("button.text.secondary.color")};
}

.p-button-text.p-button-secondary:not(:disabled):hover {
    background: ${t("button.text.secondary.hover.background")};
    border-color: transparent;
    color: ${t("button.text.secondary.color")};
}

.p-button-text.p-button-secondary:not(:disabled):active {
    background: ${t("button.text.secondary.active.background")};
    border-color: transparent;
    color: ${t("button.text.secondary.color")};
}

.p-button-text.p-button-success {
    background: transparent;
    border-color: transparent;
    color: ${t("button.text.success.color")};
}

.p-button-text.p-button-success:not(:disabled):hover {
    background: ${t("button.text.success.hover.background")};
    border-color: transparent;
    color: ${t("button.text.success.color")};
}

.p-button-text.p-button-success:not(:disabled):active {
    background: ${t("button.text.success.active.background")};
    border-color: transparent;
    color: ${t("button.text.success.color")};
}

.p-button-text.p-button-info {
    background: transparent;
    border-color: transparent;
    color: ${t("button.text.info.color")};
}

.p-button-text.p-button-info:not(:disabled):hover {
    background: ${t("button.text.info.hover.background")};
    border-color: transparent;
    color: ${t("button.text.info.color")};
}

.p-button-text.p-button-info:not(:disabled):active {
    background: ${t("button.text.info.active.background")};
    border-color: transparent;
    color: ${t("button.text.info.color")};
}

.p-button-text.p-button-warn {
    background: transparent;
    border-color: transparent;
    color: ${t("button.text.warn.color")};
}

.p-button-text.p-button-warn:not(:disabled):hover {
    background: ${t("button.text.warn.hover.background")};
    border-color: transparent;
    color: ${t("button.text.warn.color")};
}

.p-button-text.p-button-warn:not(:disabled):active {
    background: ${t("button.text.warn.active.background")};
    border-color: transparent;
    color: ${t("button.text.warn.color")};
}

.p-button-text.p-button-help {
    background: transparent;
    border-color: transparent;
    color: ${t("button.text.help.color")};
}

.p-button-text.p-button-help:not(:disabled):hover {
    background: ${t("button.text.help.hover.background")};
    border-color: transparent;
    color: ${t("button.text.help.color")};
}

.p-button-text.p-button-help:not(:disabled):active {
    background: ${t("button.text.help.active.background")};
    border-color: transparent;
    color: ${t("button.text.help.color")};
}

.p-button-text.p-button-danger {
    background: transparent;
    border-color: transparent;
    color: ${t("button.text.danger.color")};
}

.p-button-text.p-button-danger:not(:disabled):hover {
    background: ${t("button.text.danger.hover.background")};
    border-color: transparent;
    color: ${t("button.text.danger.color")};
}

.p-button-text.p-button-danger:not(:disabled):active {
    background: ${t("button.text.danger.active.background")};
    border-color: transparent;
    color: ${t("button.text.danger.color")};
}

.p-button-text.p-button-plain {
    background: transparent;
    border-color: transparent;
    color: ${t("button.text.plain.color")};
}

.p-button-text.p-button-plain:not(:disabled):hover {
    background: ${t("button.text.plain.hover.background")};
    border-color: transparent;
    color: ${t("button.text.plain.color")};
}

.p-button-text.p-button-plain:not(:disabled):active {
    background: ${t("button.text.plain.active.background")};
    border-color: transparent;
    color: ${t("button.text.plain.color")};
}

.p-button-text.p-button-contrast {
    background: transparent;
    border-color: transparent;
    color: ${t("button.text.contrast.color")};
}

.p-button-text.p-button-contrast:not(:disabled):hover {
    background: ${t("button.text.contrast.hover.background")};
    border-color: transparent;
    color: ${t("button.text.contrast.color")};
}

.p-button-text.p-button-contrast:not(:disabled):active {
    background: ${t("button.text.contrast.active.background")};
    border-color: transparent;
    color: ${t("button.text.contrast.color")};
}

.p-button-link {
    background: transparent;
    border-color: transparent;
    color: ${t("button.link.color")};
}

.p-button-link:not(:disabled):hover {
    background: transparent;
    border-color: transparent;
    color: ${t("button.link.hover.color")};
}

.p-button-link:not(:disabled):hover .p-button-label {
    text-decoration: underline;
}

.p-button-link:not(:disabled):active {
    background: transparent;
    border-color: transparent;
    color: ${t("button.link.active.color")};
}

/* For PrimeNG */
.p-button-icon-right {
    order: 1;
}

p-button[iconpos='right'] spinnericon {
    order: 1;
}
`,go={root:({instance:t,props:o})=>["p-button p-component",{"p-button-icon-only":t.hasIcon&&!o.label&&!o.badge,"p-button-vertical":(o.iconPos==="top"||o.iconPos==="bottom")&&o.label,"p-button-loading":o.loading,"p-button-link":o.link,[`p-button-${o.severity}`]:o.severity,"p-button-raised":o.raised,"p-button-rounded":o.rounded,"p-button-text":o.text,"p-button-outlined":o.outlined,"p-button-sm":o.size==="small","p-button-lg":o.size==="large","p-button-plain":o.plain,"p-button-fluid":o.fluid}],loadingIcon:"p-button-loading-icon",icon:({props:t})=>["p-button-icon",{[`p-button-icon-${t.iconPos}`]:t.label}],label:"p-button-label"},ji=(()=>{class t extends H{name="button";theme=fo;classes=go;static \u0275fac=(()=>{let e;return function(n){return(e||(e=S(t)))(n||t)}})();static \u0275prov=P({token:t,factory:t.\u0275fac})}return t})();var He=(()=>{class t extends J{type="button";iconPos="left";icon;badge;label;disabled;loading=!1;loadingIcon;raised=!1;rounded=!1;text=!1;plain=!1;severity;outlined=!1;link=!1;tabindex;size;variant;style;styleClass;badgeClass;badgeSeverity="secondary";ariaLabel;autofocus;fluid;onClick=new At;onFocus=new At;onBlur=new At;contentTemplate;loadingIconTemplate;iconTemplate;_buttonProps;get buttonProps(){return this._buttonProps}set buttonProps(e){this._buttonProps=e,e&&typeof e=="object"&&Object.entries(e).forEach(([i,n])=>this[`_${i}`]!==n&&(this[`_${i}`]=n))}get hasFluid(){let i=this.el.nativeElement.closest("p-fluid");return Z(this.fluid)?!!i:this.fluid}_componentStyle=C(ji);templates;_contentTemplate;_iconTemplate;_loadingIconTemplate;ngAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"content":this._contentTemplate=e.template;break;case"icon":this._iconTemplate=e.template;break;case"loadingicon":this._loadingIconTemplate=e.template;break;default:this._contentTemplate=e.template;break}})}ngOnChanges(e){super.ngOnChanges(e);let{buttonProps:i}=e;if(i){let n=i.currentValue;for(let a in n)this[a]=n[a]}}spinnerIconClass(){return Object.entries(this.iconClass()).filter(([,e])=>!!e).reduce((e,[i])=>e+` ${i}`,"p-button-loading-icon")}iconClass(){return{[`p-button-loading-icon pi-spin ${this.loadingIcon??""}`]:this.loading,"p-button-icon":!0,"p-button-icon-left":this.iconPos==="left"&&this.label,"p-button-icon-right":this.iconPos==="right"&&this.label,"p-button-icon-top":this.iconPos==="top"&&this.label,"p-button-icon-bottom":this.iconPos==="bottom"&&this.label}}get buttonClass(){return{"p-button p-component":!0,"p-button-icon-only":(this.icon||this.iconTemplate||this._iconTemplate||this.loadingIcon||this.loadingIconTemplate||this._loadingIconTemplate)&&!this.label,"p-button-vertical":(this.iconPos==="top"||this.iconPos==="bottom")&&this.label,"p-button-loading":this.loading,"p-button-loading-label-only":this.loading&&!this.icon&&this.label&&!this.loadingIcon&&this.iconPos==="left","p-button-link":this.link,[`p-button-${this.severity}`]:this.severity,"p-button-raised":this.raised,"p-button-rounded":this.rounded,"p-button-text":this.text||this.variant=="text","p-button-outlined":this.outlined||this.variant=="outlined","p-button-sm":this.size==="small","p-button-lg":this.size==="large","p-button-plain":this.plain,"p-button-fluid":this.hasFluid,[`${this.styleClass}`]:this.styleClass}}static \u0275fac=(()=>{let e;return function(n){return(e||(e=S(t)))(n||t)}})();static \u0275cmp=I({type:t,selectors:[["p-button"]],contentQueries:function(i,n,a){if(i&1&&(z(a,Yn,5),z(a,Zn,5),z(a,Xn,5),z(a,Dt,4)),i&2){let r;F(r=M())&&(n.contentTemplate=r.first),F(r=M())&&(n.loadingIconTemplate=r.first),F(r=M())&&(n.iconTemplate=r.first),F(r=M())&&(n.templates=r)}},inputs:{type:"type",iconPos:"iconPos",icon:"icon",badge:"badge",label:"label",disabled:[2,"disabled","disabled",$],loading:[2,"loading","loading",$],loadingIcon:"loadingIcon",raised:[2,"raised","raised",$],rounded:[2,"rounded","rounded",$],text:[2,"text","text",$],plain:[2,"plain","plain",$],severity:"severity",outlined:[2,"outlined","outlined",$],link:[2,"link","link",$],tabindex:[2,"tabindex","tabindex",ce],size:"size",variant:"variant",style:"style",styleClass:"styleClass",badgeClass:"badgeClass",badgeSeverity:"badgeSeverity",ariaLabel:"ariaLabel",autofocus:[2,"autofocus","autofocus",$],fluid:[2,"fluid","fluid",$],buttonProps:"buttonProps"},outputs:{onClick:"onClick",onFocus:"onFocus",onBlur:"onBlur"},features:[Q([ji]),A,it],ngContentSelectors:Jn,decls:7,vars:14,consts:[["pRipple","",3,"click","focus","blur","ngStyle","disabled","ngClass","pAutoFocus"],[4,"ngTemplateOutlet"],[4,"ngIf"],["class","p-button-label",4,"ngIf"],[3,"value","severity",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"ngClass",4,"ngIf"],[3,"styleClass","spin",4,"ngIf"],[3,"ngClass"],[3,"styleClass","spin"],[3,"ngIf"],[3,"class","ngClass",4,"ngIf"],[1,"p-button-label"],[3,"value","severity"]],template:function(i,n){i&1&&(mt(),f(0,"button",0),gt("click",function(r){return n.onClick.emit(r)})("focus",function(r){return n.onFocus.emit(r)})("blur",function(r){return n.onBlur.emit(r)}),ut(1),y(2,to,1,0,"ng-container",1)(3,ao,3,5,"ng-container",2)(4,uo,3,5,"ng-container",2)(5,po,2,3,"span",3)(6,ho,1,2,"p-badge",4),m()),i&2&&(c("ngStyle",n.style)("disabled",n.disabled||n.loading)("ngClass",n.buttonClass)("pAutoFocus",n.autofocus),T("type",n.type)("aria-label",n.ariaLabel)("data-pc-name","button")("data-pc-section","root")("tabindex",n.tabindex),p(2),c("ngTemplateOutlet",n.contentTemplate||n._contentTemplate),p(),c("ngIf",n.loading),p(),c("ngIf",!n.loading),p(),c("ngIf",!n.contentTemplate&&!n._contentTemplate&&n.label),p(),c("ngIf",!n.contentTemplate&&!n._contentTemplate&&n.badge))},dependencies:[G,ue,wt,he,pe,Ui,Di,Wi,Fi,Be,X],encapsulation:2,changeDetection:0})}return t})(),Ki=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=lt({type:t});static \u0275inj=at({imports:[G,He,X,X]})}return t})();var bo=["item"],yo=["header"],vo=["footer"],_o=["previousicon"],Co=["nexticon"],So=["itemsContainer"],wo=["indicatorContent"],xo=[[["p-header"]],[["p-footer"]]],To=["p-header","p-footer"],Io=(t,o)=>({"p-carousel p-component":!0,"p-carousel-vertical":t,"p-carousel-horizontal":o}),Eo=t=>({height:t}),Oo=t=>({"p-carousel-prev-button":!0,"p-disabled":t}),Qi=(t,o,e)=>({"p-carousel-item p-carousel-item-clone":!0,"p-carousel-item-active":t,"p-carousel-item-start":o,"p-carousel-item-end":e}),Ve=t=>({$implicit:t}),Ao=(t,o,e)=>({"p-carousel-item":!0,"p-carousel-item-active":t,"p-carousel-item-start":o,"p-carousel-item-end":e}),Lo=t=>({"p-carousel-next-button":!0,"p-disabled":t}),$o=t=>({"p-carousel-indicator":!0,"p-carousel-indicator-active":t});function Po(t,o){t&1&&Ct(0)}function ko(t,o){if(t&1&&(f(0,"div",14),ut(1),y(2,Po,1,0,"ng-container",15),m()),t&2){let e=v();p(2),c("ngTemplateOutlet",e.headerTemplate)}}function Ro(t,o){t&1&&w(0,"ChevronLeftIcon",20),t&2&&c("styleClass","carousel-prev-icon")}function Do(t,o){t&1&&w(0,"ChevronUpIcon",20),t&2&&c("styleClass","carousel-prev-icon")}function No(t,o){if(t&1&&(V(0),y(1,Ro,1,1,"ChevronLeftIcon",19)(2,Do,1,1,"ChevronUpIcon",19),W()),t&2){let e=v(3);p(),c("ngIf",!e.isVertical()),p(),c("ngIf",e.isVertical())}}function Fo(t,o){}function Mo(t,o){t&1&&y(0,Fo,0,0,"ng-template")}function Bo(t,o){if(t&1&&(f(0,"span",21),y(1,Mo,1,0,null,15),m()),t&2){let e=v(3);p(),c("ngTemplateOutlet",e.previousIconTemplate||e._previousIconTemplate)}}function Ho(t,o){if(t&1&&y(0,No,3,2,"ng-container",17)(1,Bo,2,1,"span",18),t&2){let e=v(2);c("ngIf",!e.previousIconTemplate&&!e._previousIconTemplate&&!(e.prevButtonProps!=null&&e.prevButtonProps.icon)),p(),c("ngIf",(e.previousIconTemplate||e._previousIconTemplate)&&!(e.prevButtonProps!=null&&e.prevButtonProps.icon))}}function Vo(t,o){if(t&1){let e=Pt();f(0,"p-button",16),gt("click",function(n){ht(e);let a=v();return ft(a.navBackward(n))}),y(1,Ho,2,2,"ng-template",null,1,Ae),m()}if(t&2){let e=v();c("ngClass",B(5,Oo,e.isBackwardNavDisabled()))("disabled",e.isBackwardNavDisabled())("text",!0)("buttonProps",e.prevButtonProps),T("aria-label",e.ariaPrevButtonLabel())}}function Wo(t,o){t&1&&Ct(0)}function zo(t,o){if(t&1&&(f(0,"div",5),y(1,Wo,1,0,"ng-container",22),m()),t&2){let e=o.$implicit,i=o.index,n=v();c("ngClass",le(6,Qi,n.totalShiftedItems*-1===n.value.length,i===0,n.clonedItemsForStarting.length-1===i)),T("aria-hidden",n.totalShiftedItems*-1!==n.value.length)("aria-label",n.ariaSlideNumber(i))("aria-roledescription",n.ariaSlideLabel()),p(),c("ngTemplateOutlet",n.itemTemplate||n._itemTemplate)("ngTemplateOutletContext",B(10,Ve,e))}}function Uo(t,o){t&1&&Ct(0)}function jo(t,o){if(t&1&&(f(0,"div",5),y(1,Uo,1,0,"ng-container",22),m()),t&2){let e=o.$implicit,i=o.index,n=v();c("ngClass",le(6,Ao,n.firstIndex()<=i&&n.lastIndex()>=i,n.firstIndex()===i,n.lastIndex()===i)),T("aria-hidden",!(n.firstIndex()<=i&&n.lastIndex()>=i))("aria-label",n.ariaSlideNumber(i))("aria-roledescription",n.ariaSlideLabel()),p(),c("ngTemplateOutlet",n.itemTemplate||n._itemTemplate)("ngTemplateOutletContext",B(10,Ve,e))}}function Go(t,o){t&1&&Ct(0)}function Ko(t,o){if(t&1&&(f(0,"div",5),y(1,Go,1,0,"ng-container",22),m()),t&2){let e=o.$implicit,i=o.index,n=v();c("ngClass",le(3,Qi,n.totalShiftedItems*-1===n.numVisible,i===0,n.clonedItemsForFinishing.length-1===i)),p(),c("ngTemplateOutlet",n.itemTemplate||n._itemTemplate)("ngTemplateOutletContext",B(7,Ve,e))}}function qo(t,o){t&1&&w(0,"ChevronRightIcon",20),t&2&&c("styleClass","carousel-next-icon")}function Qo(t,o){t&1&&w(0,"ChevronDownIcon",20),t&2&&c("styleClass","carousel-next-icon")}function Yo(t,o){if(t&1&&(V(0),y(1,qo,1,1,"ChevronRightIcon",19)(2,Qo,1,1,"ChevronDownIcon",19),W()),t&2){let e=v(3);p(),c("ngIf",!e.isVertical()),p(),c("ngIf",e.isVertical())}}function Zo(t,o){}function Xo(t,o){t&1&&y(0,Zo,0,0,"ng-template")}function Jo(t,o){if(t&1&&(f(0,"span",25),y(1,Xo,1,0,null,15),m()),t&2){let e=v(3);p(),c("ngTemplateOutlet",e.nextIconTemplate||e._nextIconTemplate)}}function tr(t,o){if(t&1&&y(0,Yo,3,2,"ng-container",17)(1,Jo,2,1,"span",24),t&2){let e=v(2);c("ngIf",!e.nextIconTemplate&&!e._nextIconTemplate&&!(e.nextButtonProps!=null&&e.nextButtonProps.icon)),p(),c("ngIf",e.nextIconTemplate||e._nextIconTemplate&&!(e.nextButtonProps!=null&&e.nextButtonProps.icon))}}function er(t,o){if(t&1){let e=Pt();f(0,"p-button",23),gt("click",function(n){ht(e);let a=v();return ft(a.navForward(n))}),y(1,tr,2,2,"ng-template",null,1,Ae),m()}if(t&2){let e=v();c("ngClass",B(5,Lo,e.isForwardNavDisabled()))("disabled",e.isForwardNavDisabled())("buttonProps",e.nextButtonProps)("text",!0),T("aria-label",e.ariaNextButtonLabel())}}function ir(t,o){if(t&1){let e=Pt();f(0,"li",5)(1,"button",27),gt("click",function(n){let a=ht(e).index,r=v(2);return ft(r.onDotClick(n,a))}),m()()}if(t&2){let e=o.index,i=v(2);c("ngClass",B(9,$o,i._page===e)),T("data-pc-section","indicator"),p(),R(i.indicatorStyleClass),c("ngClass","p-carousel-indicator-button")("ngStyle",i.indicatorStyle)("tabindex",i._page===e?0:-1),T("aria-label",i.ariaPageLabel(e+1))("aria-current",i._page===e?"page":void 0)}}function nr(t,o){if(t&1){let e=Pt();f(0,"ul",26,2),gt("keydown",function(n){ht(e);let a=v();return ft(a.onIndicatorKeydown(n))}),y(2,ir,2,11,"li",10),m()}if(t&2){let e=v();R(e.indicatorsContentClass),c("ngClass","p-carousel-indicator-list")("ngStyle",e.indicatorsContentStyle),p(2),c("ngForOf",e.totalDotsArray())}}function or(t,o){t&1&&Ct(0)}function rr(t,o){if(t&1&&(f(0,"div",28),ut(1,1),y(2,or,1,0,"ng-container",15),m()),t&2){let e=v();p(2),c("ngTemplateOutlet",e.footerTemplate||e._footerTemplate)}}var ar=({dt:t})=>`
.p-carousel {
    display: flex;
    flex-direction: column;
}

.p-carousel-content-container {
    display: flex;
    flex-direction: column;
    overflow: auto;
}

.p-carousel-content {
    display: flex;
    flex-direction: row;
    gap: ${t("carousel.content.gap")};
}

.p-carousel-content:dir(rtl) {
    flex-direction: row-reverse;
}

.p-carousel-viewport {
    overflow: hidden;
    width: 100%;
}

.p-carousel-item-list {
    display: flex;
    flex-direction: row;
}

.p-carousel-item-list:dir(rtl) {
    flex-direction: row-reverse;
}

.p-carousel-prev-button,
.p-carousel-next-button {
    align-self: center;
    flex-shrink: 0;
}

.p-carousel-indicator-list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    padding: ${t("carousel.indicator.list.padding")};
    gap: ${t("carousel.indicator.list.gap")};
    margin: 0;
    list-style: none;
}

.p-carousel-indicator-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${t("carousel.indicator.background")};
    width: ${t("carousel.indicator.width")};
    height: ${t("carousel.indicator.height")};
    border: 0 none;
    transition: background ${t("carousel.transition.duration")}, color ${t("carousel.transition.duration")}, outline-color ${t("carousel.transition.duration")}, box-shadow ${t("carousel.transition.duration")};
    outline-color: transparent;
    border-radius: ${t("carousel.indicator.border.radius")};
    padding: 0;
    margin: 0;
    user-select: none;
    cursor: pointer;
}

.p-carousel-indicator-button:focus-visible {
    box-shadow: ${t("carousel.indicator.focus.ring.shadow")};
    outline: ${t("carousel.indicator.focus.ring.width")} ${t("carousel.indicator.focus.ring.style")} ${t("carousel.indicator.focus.ring.color")};
    outline-offset: ${t("carousel.indicator.focus.ring.offset")};
}

.p-carousel-indicator-button:hover {
    background: ${t("carousel.indicator.hover.background")};
}

.p-carousel-indicator-active .p-carousel-indicator-button {
    background: ${t("carousel.indicator.active.background")};
}

.p-carousel-vertical .p-carousel-content {
    flex-direction: column;
}

.p-carousel-vertical .p-carousel-item-list {
    flex-direction: column;
    height: 100%;
}

.p-items-hidden .p-carousel-item {
    visibility: hidden;
}

.p-items-hidden .p-carousel-item.p-carousel-item-active {
    visibility: visible;
}
`,sr={root:({instance:t})=>["p-carousel p-component",{"p-carousel-vertical":t.isVertical(),"p-carousel-horizontal":!t.isVertical()}],header:"p-carousel-header",contentContainer:"p-carousel-content-container",content:"p-carousel-content",pcPrevButton:({instance:t})=>["p-carousel-prev-button",{"p-disabled":t.backwardIsDisabled}],viewport:"p-carousel-viewport",itemList:"p-carousel-item-list",itemClone:({index:t,value:o,totalShiftedItems:e,d_numVisible:i})=>["p-carousel-item p-carousel-item-clone",{"p-carousel-item-active":e*-1===o.length+i,"p-carousel-item-start":t===0,"p-carousel-item-end":o.slice(-1*i).length-1===t}],item:({instance:t,index:o})=>["p-carousel-item",{"p-carousel-item-active":t.firstIndex()<=o&&t.lastIndex()>=o,"p-carousel-item-start":t.firstIndex()===o,"p-carousel-item-end":t.lastIndex()===o}],pcNextButton:({instance:t})=>["p-carousel-next-button",{"p-disabled":t.forwardIsDisabled}],indicatorList:"p-carousel-indicator-list",indicator:({instance:t,index:o})=>["p-carousel-indicator",{"p-carousel-indicator-active":t.d_page===o}],indicatorButton:"p-carousel-indicator-button",footer:"p-carousel-footer"},qi=(()=>{class t extends H{name="carousel";theme=ar;classes=sr;static \u0275fac=(()=>{let e;return function(n){return(e||(e=S(t)))(n||t)}})();static \u0275prov=P({token:t,factory:t.\u0275fac})}return t})();var We=(()=>{class t extends J{el;zone;get page(){return this._page}set page(e){this.isCreated&&e!==this._page&&(this.autoplayInterval&&this.stopAutoplay(),e>this._page&&e<=this.totalDots()-1?this.step(-1,e):e<this._page&&this.step(1,e)),this._page=e}get numVisible(){return this._numVisible}set numVisible(e){this._numVisible=e}get numScroll(){return this._numVisible}set numScroll(e){this._numScroll=e}responsiveOptions;orientation="horizontal";verticalViewPortHeight="300px";contentClass="";indicatorsContentClass="";indicatorsContentStyle;indicatorStyleClass="";indicatorStyle;get value(){return this._value}set value(e){this._value=e}circular=!1;showIndicators=!0;showNavigators=!0;autoplayInterval=0;style;styleClass;prevButtonProps={severity:"secondary",text:!0,rounded:!0};nextButtonProps={severity:"secondary",text:!0,rounded:!0};onPage=new At;itemsContainer;indicatorContent;headerFacet;footerFacet;_numVisible=1;_numScroll=1;_oldNumScroll=0;prevState={numScroll:0,numVisible:0,value:[]};defaultNumScroll=1;defaultNumVisible=1;_page=0;_value;carouselStyle;id;totalShiftedItems;isRemainingItemsAdded=!1;animationTimeout;translateTimeout;remainingItems=0;_items;startPos;documentResizeListener;clonedItemsForStarting;clonedItemsForFinishing;allowAutoplay;interval;isCreated;swipeThreshold=20;itemTemplate;headerTemplate;footerTemplate;previousIconTemplate;nextIconTemplate;_itemTemplate;_headerTemplate;_footerTemplate;_previousIconTemplate;_nextIconTemplate;window;_componentStyle=C(qi);constructor(e,i){super(),this.el=e,this.zone=i,this.totalShiftedItems=this.page*this.numScroll*-1,this.window=this.document.defaultView}ngOnChanges(e){dt(this.platformId)&&(e.value&&this.circular&&this._value&&this.setCloneItems(),this.isCreated&&(e.numVisible&&(this.responsiveOptions&&(this.defaultNumVisible=this.numVisible),this.isCircular()&&this.setCloneItems(),this.createStyle(),this.calculatePosition()),e.numScroll&&this.responsiveOptions&&(this.defaultNumScroll=this.numScroll))),this.cd.markForCheck()}templates;ngAfterContentInit(){this.id=Ot("pn_id_"),dt(this.platformId)&&(this.allowAutoplay=!!this.autoplayInterval,this.circular&&this.setCloneItems(),this.responsiveOptions&&(this.defaultNumScroll=this._numScroll,this.defaultNumVisible=this._numVisible),this.createStyle(),this.calculatePosition(),this.responsiveOptions&&this.bindDocumentListeners()),this.templates?.forEach(e=>{switch(e.getType()){case"item":this._itemTemplate=e.template;break;case"header":this._headerTemplate=e.template;break;case"footer":this._footerTemplate=e.template;break;case"previousicon":this._previousIconTemplate=e.template;break;case"nexticon":this._nextIconTemplate=e.template;break;default:this._itemTemplate=e.template;break}}),this.cd.detectChanges()}ngAfterContentChecked(){if(dt(this.platformId)){let e=this.isCircular(),i=this.totalShiftedItems;if(this.value&&this.itemsContainer&&(this.prevState.numScroll!==this._numScroll||this.prevState.numVisible!==this._numVisible||this.prevState.value.length!==this.value.length)){this.autoplayInterval&&this.stopAutoplay(!1),this.remainingItems=(this.value.length-this._numVisible)%this._numScroll;let n=this._page;this.totalDots()!==0&&n>=this.totalDots()&&(n=this.totalDots()-1,this._page=n,this.onPage.emit({page:this.page})),i=n*this._numScroll*-1,e&&(i-=this._numVisible),n===this.totalDots()-1&&this.remainingItems>0?(i+=-1*this.remainingItems+this._numScroll,this.isRemainingItemsAdded=!0):this.isRemainingItemsAdded=!1,i!==this.totalShiftedItems&&(this.totalShiftedItems=i),this._oldNumScroll=this._numScroll,this.prevState.numScroll=this._numScroll,this.prevState.numVisible=this._numVisible,this.prevState.value=[...this._value],this.totalDots()>0&&this.itemsContainer.nativeElement&&(this.itemsContainer.nativeElement.style.transform=this.isVertical()?`translate3d(0, ${i*(100/this._numVisible)}%, 0)`:`translate3d(${i*(100/this._numVisible)}%, 0, 0)`),this.isCreated=!0,this.autoplayInterval&&this.isAutoplay()&&this.startAutoplay()}e&&(this.page===0?i=-1*this._numVisible:i===0&&(i=-1*this.value.length,this.remainingItems>0&&(this.isRemainingItemsAdded=!0)),i!==this.totalShiftedItems&&(this.totalShiftedItems=i))}}createStyle(){this.carouselStyle||(this.carouselStyle=this.renderer.createElement("style"),this.carouselStyle.type="text/css",ye(this.carouselStyle,"nonce",this.config?.csp()?.nonce),this.renderer.appendChild(this.document.head,this.carouselStyle));let e=`
            #${this.id} .p-carousel-item {
				flex: 1 0 ${100/this.numVisible}%
			}
        `;if(this.responsiveOptions){this.responsiveOptions.sort((i,n)=>{let a=i.breakpoint,r=n.breakpoint,s=null;return a==null&&r!=null?s=-1:a!=null&&r==null?s=1:a==null&&r==null?s=0:typeof a=="string"&&typeof r=="string"?s=a.localeCompare(r,void 0,{numeric:!0}):s=a<r?-1:a>r?1:0,-1*s});for(let i=0;i<this.responsiveOptions.length;i++){let n=this.responsiveOptions[i];e+=`
                    @media screen and (max-width: ${n.breakpoint}) {
                        #${this.id} .p-carousel-item {
                            flex: 1 0 ${100/n.numVisible}%
                        }
                    }
                `}}this.carouselStyle.innerHTML=e}calculatePosition(){if(this.responsiveOptions){let e={numVisible:this.defaultNumVisible,numScroll:this.defaultNumScroll};if(typeof window<"u"){let i=window.innerWidth;for(let n=0;n<this.responsiveOptions.length;n++){let a=this.responsiveOptions[n];parseInt(a.breakpoint,10)>=i&&(e=a)}}if(this._numScroll!==e.numScroll){let i=this._page;i=Math.floor(i*this._numScroll/e.numScroll);let n=e.numScroll*this.page*-1;this.isCircular()&&(n-=e.numVisible),this.totalShiftedItems=n,this._numScroll=e.numScroll,this._page=i,this.onPage.emit({page:this.page})}this._numVisible!==e.numVisible&&(this._numVisible=e.numVisible,this.setCloneItems()),this.cd.markForCheck()}}setCloneItems(){this.clonedItemsForStarting=[],this.clonedItemsForFinishing=[],this.isCircular()&&(this.clonedItemsForStarting.push(...this.value.slice(-1*this._numVisible)),this.clonedItemsForFinishing.push(...this.value.slice(0,this._numVisible)))}firstIndex(){return this.isCircular()?-1*(this.totalShiftedItems+this.numVisible):this.totalShiftedItems*-1}lastIndex(){return this.firstIndex()+this.numVisible-1}totalDots(){return this.value?.length?Math.ceil((this.value.length-this._numVisible)/this._numScroll)+1:0}totalDotsArray(){let e=this.totalDots();return e<=0?[]:Array(e).fill(0)}isVertical(){return this.orientation==="vertical"}isCircular(){return this.circular&&this.value&&this.value.length>=this.numVisible}isAutoplay(){return this.autoplayInterval&&this.allowAutoplay}isForwardNavDisabled(){return this.isEmpty()||this._page>=this.totalDots()-1&&!this.isCircular()}isBackwardNavDisabled(){return this.isEmpty()||this._page<=0&&!this.isCircular()}isEmpty(){return!this.value||this.value.length===0}navForward(e,i){(this.isCircular()||this._page<this.totalDots()-1)&&this.step(-1,i),this.autoplayInterval&&this.stopAutoplay(),e&&e.cancelable&&e.preventDefault()}navBackward(e,i){(this.isCircular()||this._page!==0)&&this.step(1,i),this.autoplayInterval&&this.stopAutoplay(),e&&e.cancelable&&e.preventDefault()}onDotClick(e,i){let n=this._page;this.autoplayInterval&&this.stopAutoplay(),i>n?this.navForward(e,i):i<n&&this.navBackward(e,i)}onIndicatorKeydown(e){switch(e.code){case"ArrowRight":this.onRightKey();break;case"ArrowLeft":this.onLeftKey();break}}onRightKey(){let e=[...Rt(this.indicatorContent.nativeElement,'[data-pc-section="indicator"]')],i=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(i,i+1===e.length?e.length-1:i+1)}onLeftKey(){let e=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(e,e-1<=0?0:e-1)}onHomeKey(){let e=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(e,0)}onEndKey(){let e=[...Rt(this.indicatorContent.nativeElement,'[data-pc-section="indicator"]r')],i=this.findFocusedIndicatorIndex();this.changedFocusedIndicator(i,e.length-1)}onTabKey(){let e=[...Rt(this.indicatorContent.nativeElement,'[data-pc-section="indicator"]')],i=e.findIndex(r=>gi(r,"data-p-highlight")===!0),n=be(this.indicatorContent.nativeElement,'[data-pc-section="indicator"] > button[tabindex="0"]'),a=e.findIndex(r=>r===n.parentElement);e[a].children[0].tabIndex="-1",e[i].children[0].tabIndex="0"}findFocusedIndicatorIndex(){let e=[...Rt(this.indicatorContent.nativeElement,'[data-pc-section="indicator"]')],i=be(this.indicatorContent.nativeElement,'[data-pc-section="indicator"] > button[tabindex="0"]');return e.findIndex(n=>n===i.parentElement)}changedFocusedIndicator(e,i){let n=[...Rt(this.indicatorContent.nativeElement,'[data-pc-section="indicator"]')];n[e].children[0].tabIndex="-1",n[i].children[0].tabIndex="0",n[i].children[0].focus()}step(e,i){let n=this.totalShiftedItems,a=this.isCircular();if(i!=null)n=this._numScroll*i*-1,a&&(n-=this._numVisible),this.isRemainingItemsAdded=!1;else{n+=this._numScroll*e,this.isRemainingItemsAdded&&(n+=this.remainingItems-this._numScroll*e,this.isRemainingItemsAdded=!1);let r=a?n+this._numVisible:n;i=Math.abs(Math.floor(r/this._numScroll))}a&&this.page===this.totalDots()-1&&e===-1?(n=-1*(this.value.length+this._numVisible),i=0):a&&this.page===0&&e===1?(n=0,i=this.totalDots()-1):i===this.totalDots()-1&&this.remainingItems>0&&(n+=this.remainingItems*-1-this._numScroll*e,this.isRemainingItemsAdded=!0),this.itemsContainer&&(this.itemsContainer.nativeElement.style.transform=this.isVertical()?`translate3d(0, ${n*(100/this._numVisible)}%, 0)`:`translate3d(${n*(100/this._numVisible)}%, 0, 0)`,this.itemsContainer.nativeElement.style.transition="transform 500ms ease 0s"),this.totalShiftedItems=n,this._page=i,this.onPage.emit({page:this.page}),this.cd.markForCheck()}startAutoplay(){this.interval=setInterval(()=>{this.totalDots()>0&&(this.page===this.totalDots()-1?this.step(-1,0):this.step(-1,this.page+1))},this.autoplayInterval),this.allowAutoplay=!0,this.cd.markForCheck()}stopAutoplay(e=!0){this.interval&&(clearInterval(this.interval),this.interval=void 0,e&&(this.allowAutoplay=!1)),this.cd.markForCheck()}isPlaying(){return!!this.interval}onTransitionEnd(){this.itemsContainer&&(this.itemsContainer.nativeElement.style.transition="",(this.page===0||this.page===this.totalDots()-1)&&this.isCircular()&&(this.itemsContainer.nativeElement.style.transform=this.isVertical()?`translate3d(0, ${this.totalShiftedItems*(100/this._numVisible)}%, 0)`:`translate3d(${this.totalShiftedItems*(100/this._numVisible)}%, 0, 0)`))}onTouchStart(e){let i=e.changedTouches[0];this.startPos={x:i.pageX,y:i.pageY}}onTouchMove(e){e.cancelable&&e.preventDefault()}onTouchEnd(e){let i=e.changedTouches[0];this.isVertical()?this.changePageOnTouch(e,i.pageY-this.startPos.y):this.changePageOnTouch(e,i.pageX-this.startPos.x)}changePageOnTouch(e,i){Math.abs(i)>this.swipeThreshold&&(i<0?this.navForward(e):this.navBackward(e))}ariaPrevButtonLabel(){return this.config.translation.aria?this.config.translation.aria.prevPageLabel:void 0}ariaSlideLabel(){return this.config.translation.aria?this.config.translation.aria.slide:void 0}ariaNextButtonLabel(){return this.config.translation.aria?this.config.translation.aria.nextPageLabel:void 0}ariaSlideNumber(e){return this.config.translation.aria?this.config.translation.aria.slideNumber.replace(/{slideNumber}/g,e):void 0}ariaPageLabel(e){return this.config.translation.aria?this.config.translation.aria.pageLabel.replace(/{page}/g,e):void 0}bindDocumentListeners(){dt(this.platformId)&&(this.documentResizeListener||(this.documentResizeListener=this.renderer.listen(this.window,"resize",e=>{this.calculatePosition()})))}unbindDocumentListeners(){dt(this.platformId)&&this.documentResizeListener&&(this.documentResizeListener(),this.documentResizeListener=null)}ngOnDestroy(){this.responsiveOptions&&this.unbindDocumentListeners(),this.autoplayInterval&&this.stopAutoplay()}static \u0275fac=function(i){return new(i||t)(_t(Lt),_t(ae))};static \u0275cmp=I({type:t,selectors:[["p-carousel"]],contentQueries:function(i,n,a){if(i&1&&(z(a,wi,5),z(a,xi,5),z(a,bo,4),z(a,yo,4),z(a,vo,4),z(a,_o,4),z(a,Co,4),z(a,Dt,4)),i&2){let r;F(r=M())&&(n.headerFacet=r.first),F(r=M())&&(n.footerFacet=r.first),F(r=M())&&(n.itemTemplate=r.first),F(r=M())&&(n.headerTemplate=r.first),F(r=M())&&(n.footerTemplate=r.first),F(r=M())&&(n.previousIconTemplate=r.first),F(r=M())&&(n.nextIconTemplate=r.first),F(r=M())&&(n.templates=r)}},viewQuery:function(i,n){if(i&1&&(Te(So,5),Te(wo,5)),i&2){let a;F(a=M())&&(n.itemsContainer=a.first),F(a=M())&&(n.indicatorContent=a.first)}},inputs:{page:"page",numVisible:"numVisible",numScroll:"numScroll",responsiveOptions:"responsiveOptions",orientation:"orientation",verticalViewPortHeight:"verticalViewPortHeight",contentClass:"contentClass",indicatorsContentClass:"indicatorsContentClass",indicatorsContentStyle:"indicatorsContentStyle",indicatorStyleClass:"indicatorStyleClass",indicatorStyle:"indicatorStyle",value:"value",circular:[2,"circular","circular",$],showIndicators:[2,"showIndicators","showIndicators",$],showNavigators:[2,"showNavigators","showNavigators",$],autoplayInterval:[2,"autoplayInterval","autoplayInterval",ce],style:"style",styleClass:"styleClass",prevButtonProps:"prevButtonProps",nextButtonProps:"nextButtonProps"},outputs:{onPage:"onPage"},features:[Q([qi]),A,it],ngContentSelectors:To,decls:14,vars:23,consts:[["itemsContainer",""],["icon",""],["indicatorContent",""],["role","region",3,"ngClass","ngStyle"],["class","p-carousel-header",4,"ngIf"],[3,"ngClass"],[1,"p-carousel-content"],[3,"ngClass","disabled","text","buttonProps","click",4,"ngIf"],[1,"p-carousel-viewport",3,"touchend","touchstart","touchmove","ngStyle"],[1,"p-carousel-item-list",3,"transitionend"],[3,"ngClass",4,"ngFor","ngForOf"],["type","button",3,"ngClass","disabled","buttonProps","text","click",4,"ngIf"],[3,"ngClass","class","ngStyle","keydown",4,"ngIf"],["class","p-carousel-footer",4,"ngIf"],[1,"p-carousel-header"],[4,"ngTemplateOutlet"],[3,"click","ngClass","disabled","text","buttonProps"],[4,"ngIf"],["class","p-carousel-prev-icon",4,"ngIf"],[3,"styleClass",4,"ngIf"],[3,"styleClass"],[1,"p-carousel-prev-icon"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["type","button",3,"click","ngClass","disabled","buttonProps","text"],["class","next",4,"ngIf"],[1,"next"],[3,"keydown","ngClass","ngStyle"],["type","button",3,"click","ngClass","ngStyle","tabindex"],[1,"p-carousel-footer"]],template:function(i,n){if(i&1){let a=Pt();mt(xo),f(0,"div",3),y(1,ko,3,1,"div",4),f(2,"div",5)(3,"div",6),y(4,Vo,3,7,"p-button",7),f(5,"div",8),gt("touchend",function(s){return ht(a),ft(n.onTouchEnd(s))})("touchstart",function(s){return ht(a),ft(n.onTouchStart(s))})("touchmove",function(s){return ht(a),ft(n.onTouchMove(s))}),f(6,"div",9,0),gt("transitionend",function(){return ht(a),ft(n.onTransitionEnd())}),y(8,zo,2,12,"div",10)(9,jo,2,12,"div",10)(10,Ko,2,9,"div",10),m()(),y(11,er,3,7,"p-button",11),m(),y(12,nr,3,5,"ul",12),m(),y(13,rr,3,1,"div",13),m()}i&2&&(R(n.styleClass),c("ngClass",ii(18,Io,n.isVertical(),!n.isVertical()))("ngStyle",n.style),T("id",n.id),p(),c("ngIf",n.headerFacet||n.headerTemplate),p(),R(n.contentClass),c("ngClass","p-carousel-content-container"),p(),T("aria-live",n.allowAutoplay?"polite":"off"),p(),c("ngIf",n.showNavigators),p(),c("ngStyle",B(21,Eo,n.isVertical()?n.verticalViewPortHeight:"auto")),p(3),c("ngForOf",n.clonedItemsForStarting),p(),c("ngForOf",n.value),p(),c("ngForOf",n.clonedItemsForFinishing),p(),c("ngIf",n.showNavigators),p(),c("ngIf",n.showIndicators),p(),c("ngIf",n.footerFacet||n.footerTemplate||n._footerTemplate))},dependencies:[G,ue,de,wt,he,pe,Hi,Ki,He,Bi,Mi,Vi,X],encapsulation:2,changeDetection:0})}return t})(),Yi=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=lt({type:t});static \u0275inj=at({imports:[We,X,X]})}return t})();function cr(t,o){t&1&&(V(0),f(1,"p"),k(2,"Loading articles..."),m(),W())}function ur(t,o){if(t&1&&(V(0),f(1,"p",3),k(2),m(),W()),t&2){let e=v();p(2),U(e.error)}}function dr(t,o){if(t&1&&(f(0,"div",8),w(1,"app-article-card",9),m()),t&2){let e=o.$implicit,i=v(3);p(),c("article",e)("isFeatured",i.isFeaturedCarousel)("showTags",i.showCardTags)}}function pr(t,o){if(t&1&&(f(0,"p-carousel",6),y(1,dr,2,3,"ng-template",7),m()),t&2){let e=v(2);c("value",e.articles)("numVisible",e.cardsToShow)("numScroll",(e.cardsToShow===1,1))("responsiveOptions",e.currentResponsiveOptions)("circular",!0)("autoplayInterval",e.isFeaturedCarousel?7e3:5e3)}}function hr(t,o){t&1&&(f(0,"div",10)(1,"p"),k(2,"No articles found for the given criteria."),m()())}function fr(t,o){t&1&&(f(0,"div",10)(1,"p"),k(2,"No articles (published or unpublished) found."),m()())}function gr(t,o){if(t&1&&(V(0),y(1,pr,2,6,"p-carousel",4)(2,hr,3,0,"div",5)(3,fr,3,0,"div",5),W()),t&2){let e=v();p(),c("ngIf",e.articles.length>0),p(),c("ngIf",e.articles.length===0&&!e.noArticle),p(),c("ngIf",e.articles.length===0&&e.noArticle)}}var Zi=class t{constructor(o,e){this.articleService=o;this.authorService=e;this.currentResponsiveOptions=[]}authorId;isFeaturedCarousel=!1;headerText="Articles";currentArticleTags=[];currentArticleAuthorId;currentArticleId;cardsToShow=3;showCardTags=!0;filterPublished=!0;noArticle=!1;articles=[];loading=!0;error=null;currentResponsiveOptions;ngOnInit(){this.updateResponsiveOptions(),this.loadArticles()}ngOnChanges(o){(o.authorId||o.isFeaturedCarousel||o.headerText||o.currentArticleTags||o.currentArticleAuthorId||o.currentArticleId||o.cardsToShow||o.showCardTags||o.filterPublished||o.noArticle)&&(this.updateResponsiveOptions(),this.loadArticles())}updateResponsiveOptions(){let o=this.cardsToShow,e=(this.cardsToShow===1,1);this.currentResponsiveOptions=[{breakpoint:"1199px",numVisible:o,numScroll:e},{breakpoint:"991px",numVisible:Math.min(o,2),numScroll:e},{breakpoint:"767px",numVisible:1,numScroll:1}]}loadArticles(){return xe(this,null,function*(){this.loading=!0,this.error=null;try{let o=yield this.articleService.getAll(),i=(yield Promise.all(o.map(n=>xe(this,null,function*(){if(n.authorId&&!n.authorName){let a=yield this.authorService.getById(n.authorId);return Ke(L({},n),{authorName:a?.name||"Unknown Author"})}return n})))).filter(n=>this.currentArticleId&&n.id===this.currentArticleId?!1:this.noArticle?!0:this.filterPublished===n.isPublished);if(this.isFeaturedCarousel)this.articles=i.filter(n=>n.isFeatured).sort((n,a)=>{let r=n.updatedAt?new Date(n.updatedAt):new Date(n.publishDate||0);return(a.updatedAt?new Date(a.updatedAt):new Date(a.publishDate||0)).getTime()-r.getTime()}).slice(0,10);else if(this.authorId)this.articles=i.filter(n=>n.authorId===this.authorId).sort((n,a)=>{let r=new Date(n.updatedAt||n.publishDate||0);return new Date(a.updatedAt||a.publishDate||0).getTime()-r.getTime()});else if(this.currentArticleId&&this.currentArticleTags.length>0){this.headerText="Related Articles";let n=new Set;this.currentArticleAuthorId&&i.filter(r=>r.authorId===this.currentArticleAuthorId).forEach(r=>n.add(r)),this.currentArticleTags&&this.currentArticleTags.length>0&&i.filter(r=>r.tags&&r.tags.some(s=>this.currentArticleTags.includes(s))).forEach(r=>n.add(r));let a=Array.from(n);a.length>0&&a.sort((r,s)=>{let l=new Date(r.updatedAt||r.publishDate||0),u=new Date(s.updatedAt||s.publishDate||0),d=r.authorId===this.currentArticleAuthorId,g=s.authorId===this.currentArticleAuthorId;if(d&&!g)return-1;if(!d&&g)return 1;let b=r.tags&&r.tags.some(_=>this.currentArticleTags.includes(_)),h=s.tags&&s.tags.some(_=>this.currentArticleTags.includes(_));return b&&!h?-1:!b&&h?1:u.getTime()-l.getTime()}),a.length===0&&(this.headerText="Latest Articles",a=i.sort((r,s)=>{let l=new Date(r.updatedAt||r.publishDate||0);return new Date(s.updatedAt||s.publishDate||0).getTime()-l.getTime()}).slice(0,10)),this.articles=a}else this.articles=i.filter(n=>!n.isFeatured).sort((n,a)=>{let r=new Date(n.updatedAt||n.publishDate||0);return new Date(a.updatedAt||a.publishDate||0).getTime()-r.getTime()})}catch(o){console.error("Failed to load articles:",o),this.error="Failed to load articles. Please try again later."}finally{this.loading=!1}})}static \u0275fac=function(e){return new(e||t)(_t(ui),_t(ci))};static \u0275cmp=I({type:t,selectors:[["app-article-list-carousel"]],inputs:{authorId:"authorId",isFeaturedCarousel:"isFeaturedCarousel",headerText:"headerText",currentArticleTags:"currentArticleTags",currentArticleAuthorId:"currentArticleAuthorId",currentArticleId:"currentArticleId",cardsToShow:"cardsToShow",showCardTags:"showCardTags",filterPublished:"filterPublished",noArticle:"noArticle"},features:[it],decls:7,vars:4,consts:[[1,"article-carousel-container"],[1,"carousel-header"],[4,"ngIf"],[1,"error-message"],[3,"value","numVisible","numScroll","responsiveOptions","circular","autoplayInterval",4,"ngIf"],["class","no-articles-message",4,"ngIf"],[3,"value","numVisible","numScroll","responsiveOptions","circular","autoplayInterval"],["pTemplate","item"],[1,"carousel-item-wrapper"],[3,"article","isFeatured","showTags"],[1,"no-articles-message"]],template:function(e,i){e&1&&(f(0,"div",0)(1,"div",1)(2,"h2"),k(3),m()(),y(4,cr,3,0,"ng-container",2)(5,ur,3,1,"ng-container",2)(6,gr,4,3,"ng-container",2),m()),e&2&&(p(3),U(i.headerText),p(),c("ngIf",i.loading),p(),c("ngIf",i.error),p(),c("ngIf",!i.loading&&!i.error))},dependencies:[G,wt,Yi,We,Dt,ge],styles:[".article-carousel-container[_ngcontent-%COMP%]{padding:20px;background-color:#f9f9f9;border-radius:10px;margin-bottom:30px;box-shadow:0 2px 8px #0000000d}.carousel-header[_ngcontent-%COMP%]{text-align:center;margin-bottom:25px}.carousel-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:2.5em;color:#333;margin-bottom:10px}.carousel-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.1em;color:#555}.error-message[_ngcontent-%COMP%]{color:#d32f2f;text-align:center;font-weight:700;margin-top:20px}.no-articles-message[_ngcontent-%COMP%]{text-align:center;color:#777;font-style:italic;margin-top:20px}.carousel-item-wrapper[_ngcontent-%COMP%]{padding:15px;height:100%;box-sizing:border-box;display:flex;align-items:stretch;flex-grow:1;flex-shrink:0;width:100%;max-width:100%}[_nghost-%COMP%]     .p-carousel-items-content{display:flex;align-items:stretch;flex-wrap:nowrap;width:100%}[_nghost-%COMP%]     .p-carousel .p-carousel-item{display:flex;align-items:stretch;flex-grow:1;flex-shrink:0;flex-basis:0;width:100%!important;max-width:none!important}[_nghost-%COMP%]     .p-carousel .p-carousel-indicators{margin-top:30px}[_nghost-%COMP%]     .p-carousel .p-carousel-indicator-icon{background-color:#ccc;width:10px;height:10px}[_nghost-%COMP%]     .p-carousel .p-carousel-indicator.p-highlight .p-carousel-indicator-icon{background-color:#007bff}[_nghost-%COMP%]     .p-carousel .p-carousel-next, [_nghost-%COMP%]     .p-carousel .p-carousel-prev{background-color:#0009;color:#fff;border-radius:50%;width:40px;height:40px;font-size:1.2em;display:flex;justify-content:center;align-items:center;transition:background-color .3s ease}[_nghost-%COMP%]     .p-carousel .p-carousel-next:hover, [_nghost-%COMP%]     .p-carousel .p-carousel-prev:hover{background-color:#000c}"]})};export{fe as a,ge as b,Zi as c};
