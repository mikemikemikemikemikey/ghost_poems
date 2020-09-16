(this.webpackJsonpgp_frontend=this.webpackJsonpgp_frontend||[]).push([[0],{172:function(e,t){},176:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(18),c=n.n(o),s=n(8),u=(n(85),n(15)),l=n(5),i=(n(86),n(69)),m=n.n(i),p=n(6),f=n(1),d=n.n(f),b=n(2),g=n(10),v=n.n(g),h=function(e){return e.then((function(e){return[e,void 0]})).catch((function(e){return[void 0,e]}))},w={headers:null},E=function(){var e=Object(b.a)(d.a.mark((function e(t,n){var r,a,o,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h(v.a.put("/api/poems/child/".concat(n),{content:t},w));case 2:if(r=e.sent,a=Object(l.a)(r,2),o=a[0],c=a[1],!o){e.next=8;break}return e.abrupt("return");case 8:if(401!==c.response.status){e.next=10;break}throw new Error("wrong user");case 10:throw new Error("sorry lines are too long");case 11:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),k=function(){var e=Object(b.a)(d.a.mark((function e(t,n){var r,a,o,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("test1"),e.next=3,h(v.a.put("/api/poems/title/".concat(n),{title:t},w));case 3:if(r=e.sent,a=Object(l.a)(r,2),o=a[0],c=a[1],!o){e.next=9;break}return e.abrupt("return");case 9:if(401!==c.response.status){e.next=11;break}throw new Error("wrong user");case 11:throw new Error("sorry too long");case 12:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),y=function(){var e=Object(b.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.put("/api/poems/child/".concat(t._id,"/",!0),t,w);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),x=function(){var e=Object(b.a)(d.a.mark((function e(t,n){var r,a,o,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h(v.a.post("api/poems/".concat(n),t,w));case 2:if(r=e.sent,a=Object(l.a)(r,2),o=a[0],c=a[1],!o){e.next=8;break}return e.abrupt("return");case 8:if(!c.response){e.next=10;break}throw new Error("sorry lines are too long");case 10:throw new Error("error");case 11:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),j=function(){var e=Object(b.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.delete("api/poems/".concat(t._id),w);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),O={editTitle:k,addContent:x,setConfig:function(e){w={headers:{Authorization:"bearer ".concat(e)}}},getAll:function(){return v.a.get("/api/poems").then((function(e){return e.data}))},create:function(){var e=Object(b.a)(d.a.mark((function e(t){var n,r,a,o;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h(v.a.post("/api/poems",t,w));case 2:if(n=e.sent,r=Object(l.a)(n,2),a=r[0],o=r[1],!a){e.next=8;break}return e.abrupt("return",a);case 8:if(!o.response){e.next=18;break}if(!o.response.data.error.includes("title")){e.next=13;break}throw new Error("title is too long");case 13:if(!o.response.data.error.includes("content")){e.next=17;break}throw new Error("first lines are too long");case 17:case 18:throw new Error("error");case 19:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),addLike:y,removePoem:j,editContent:E,removeLike:function(){var e=Object(b.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.put("api/poems/unlike/".concat(t),null,w);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},S=function(){return function(){var e=Object(b.a)(d.a.mark((function e(t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O.getAll();case 2:n=e.sent,t({type:"INIT",poems:n});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INIT":case"UPDATE":return t.poems;default:return e}},C=n(38),T=function(e){var t=Object(r.useState)(""),n=Object(l.a)(t,2),a=n[0],o=n[1];return{type:e,value:a,onChange:function(e){o(e.target.value)},onSubmit:function(){o("")}}},_=function(e){var t=e.message,n={color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,paddingBottom:14,marginTop:8,marginBottom:0};return t.error||(n.color="green"),null===t.message?null:a.a.createElement("div",{style:n,className:"error","data-cy":"message"},t.message)},I=n(73),D=n.n(I),U=n(20),L=n(74),P=n(75),W=function(e){return function(t){t({type:"LOGIN",user:e})}},q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN":return t.user;case"LOGOUT":return null;default:return e}},z=function(e,t){return function(n){n({type:"NEW",message:e,error:t})}},A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{message:null,error:!1},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"NEW":return{message:t.message,error:t.error};case"REMOVE":return{message:null,error:!1};default:return e}},G=Object(U.combineReducers)({poems:N,user:q,message:A}),R=Object(U.createStore)(G,Object(P.composeWithDevTools)(Object(U.applyMiddleware)(L.a))),J=R,B=D()("http://localhost:3003/");B.on("data_send",(function(){R.dispatch(S())}));var M=B,F=n(21),V=n(3);function H(){var e=Object(F.a)(["\nbackground-color: transparent;\nborder: 2px solid #f2e8bf;\nfont-size 16px;\ncolor: #f2e8bf;\nmax-width 90%;\n"]);return H=function(){return e},e}function K(){var e=Object(F.a)(["\nposition: absolute;\nwidth: 20%;\ntop: 8.2%;\nright: 8%;\nz-index: 1;\n"]);return K=function(){return e},e}function Q(){var e=Object(F.a)(["\nmax-width: 80%;\nbackground-color: transparent;\nborder-bottom: 2px solid gray;\n\n"]);return Q=function(){return e},e}function X(){var e=Object(F.a)(["\nbackground-color: transparent;\nborder: 2px solid #f2e8bf;\nfont-size 1em;\ncolor: #f2e8bf;\nmax-width 90%;\n"]);return X=function(){return e},e}function Y(){var e=Object(F.a)(["\ndisplay: flex;\njustify-content: space-evenly;\nflex-wrap: wrap;\nbackground: transparent;\npadding: 1em;\nposition: sticky;\ntop: 0;\nz-index: 2;\ntext-align: center;\n"]);return Y=function(){return e},e}function Z(){var e=Object(F.a)(["\n  cursor: pointer;\n  background: ",";\n  font-size 1em;\n  color: ",";\n  border: 2px solid palevioletred;\n  margin: .25em .25em;\n  padding: 0.25em 1em;\n  transition: .5s all ease-out;\n\n  &:hover {\n    background-color: palevioletred;\n    color: white;\n  }\n  &:focus {\n    background-color: palevioletred;\n    color: white;\n  }\n"]);return Z=function(){return e},e}var $=V.default.button(Z(),(function(e){return e.enjoyed?"palevioletred":"transparent"}),(function(e){return e.enjoyed?"white":"#f2e8bf"})),ee=(V.default.div(Y()),V.default.input(X())),te=V.default.div(Q()),ne=(V.default.label(K()),V.default.textarea(H())),re=function(e){var t=e.poem,n=e.user,o=Object(r.useState)({message:null,error:!1}),c=Object(l.a)(o,2),s=c[0],u=c[1],i=Object(r.useState)(!1),m=Object(l.a)(i,2),p=m[0],f=m[1],g=T("text"),v=t.content,h=function(){var e=Object(b.a)(d.a.mark((function e(r){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,r.preventDefault(),n){e.next=4;break}throw new Error("please login to edit");case 4:if(""!==g.value){e.next=6;break}throw new Error("ghostin too hard");case 6:return e.next=8,O.editContent(g.value,t._id);case 8:f(!1),M.emit("data_request"),e.next=19;break;case 12:e.prev=12,e.t0=e.catch(0),f(!1),a=e.t0.message,"wrong user"===e.t0.message&&(a="only ".concat(t.user.username," can edit this")),u({message:a,error:!0}),setTimeout((function(){u({message:null,error:!1})}),5e3);case 19:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}(),w=function(){var e=Object(b.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return f(!1),e.prev=1,e.next=4,O.removePoem(t);case 4:M.emit("data_request"),e.next=12;break;case 7:e.prev=7,e.t0=e.catch(1),console.log(t),u({message:"only ".concat(t.user.username," can delete this content"),error:!0}),setTimeout((function(){u({message:null,error:!1})}),5e3);case 12:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(){return e.apply(this,arguments)}}();return t?a.a.createElement("div",{className:"poem-content"},p?a.a.createElement("form",{onSubmit:h},a.a.createElement("div",null,a.a.createElement(ne,Object.assign({rows:"2",cols:"30"},g))),a.a.createElement("div",null,a.a.createElement($,{type:"submit"},"edit"),a.a.createElement($,{onClick:w},"delete"),a.a.createElement($,{onClick:function(){f(!1)}},"nevermind"))):a.a.createElement("div",{onClick:function(){f(!0),g.onChange({target:{value:v}})}},v),a.a.createElement(_,{message:s})):null},ae=function(e){var t=e.poem,n=e.user,o=Object(s.b)(),c=Object(r.useState)({message:null,error:!1}),u=Object(l.a)(c,2),i=u[0],m=u[1],p=Object(r.useState)(!1),f=Object(l.a)(p,2),g=f[0],v=f[1],h=T("text"),w=t.title,E=function(){var e=Object(b.a)(d.a.mark((function e(r){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,n){e.next=3;break}throw new Error("please login to edit");case 3:if(r.preventDefault(),h.value){e.next=6;break}throw new Error("ghostin too hard");case 6:return e.next=8,O.editTitle(h.value,t._id);case 8:v(!1),o(S()),e.next=19;break;case 12:e.prev=12,e.t0=e.catch(0),v(!1),a=e.t0.message,"wrong user"===e.t0.message&&(a="only ".concat(t.user.username," can edit this")),m({message:a,error:!0}),setTimeout((function(){m({message:null,error:!1})}),5e3);case 19:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}();return t?a.a.createElement("div",{className:"poem-content"},g?a.a.createElement("form",{onSubmit:E},a.a.createElement("div",null,a.a.createElement(ee,Object.assign({},h,{"data-cy":"title-input"}))),a.a.createElement("div",{className:"title-buttons"},a.a.createElement($,{type:"submit","data-cy":"title-submit"},"edit"),a.a.createElement($,{onClick:function(){v(!1)}},"nevermind"))):a.a.createElement("div",{className:"poem-title",onClick:function(){v(!0),h.onChange({target:{value:w}})},"data-cy":"poem-title"},w),a.a.createElement(_,{message:i})):null},oe={getUser:function(){var e=Object(b.a)(d.a.mark((function e(t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.get("/api/users/".concat(t));case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),newUser:function(){var e=Object(b.a)(d.a.mark((function e(t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.post("/api/users/",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},ce=function(e){var t=e.poem,n=Object(s.c)((function(e){return e.user})),o=Object(r.useState)({message:null,error:!1}),c=Object(l.a)(o,2),u=c[0],i=c[1],m=Object(r.useState)(!1),p=Object(l.a)(m,2),f=p[0],g=p[1],v=Object(r.useState)({show:!1,label:"contribute"}),h=Object(l.a)(v,2),w=h[0],E=h[1],k=T("text"),y=Object(r.useRef)(null);Object(r.useEffect)((function(){function e(){return(e=Object(b.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,oe.getUser(n.username);case 2:e.sent.likedPoems.includes(t._id)&&g(!0);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}n&&function(){e.apply(this,arguments)}()}),[t,n]);var x=function(){var e=Object(b.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(y.current.blur(),e.prev=1,n){e.next=4;break}throw new Error("please login to enjoy :)");case 4:if(f){e.next=11;break}return e.next=7,O.addLike(Object(C.a)(Object(C.a)({},t),{},{likes:t.likes+1,user:t.user.id,children:t.children?t.children.map((function(e){return e._id})):null}));case 7:M.emit("data_request"),g(!0),e.next=16;break;case 11:return e.next=13,O.removeLike(t._id);case 13:console.log("test remove"),M.emit("data_request"),g(!1);case 16:e.next=23;break;case 18:e.prev=18,e.t0=e.catch(1),console.log(e.t0),i({message:e.t0.message,error:!0}),setTimeout((function(){i({message:null,error:!1})}),5e3);case 23:case"end":return e.stop()}}),e,null,[[1,18]])})));return function(){return e.apply(this,arguments)}}(),j=function(){n?w.show?(E({show:!1,label:"contribute"}),k.onSubmit()):E({show:!0,label:"cancel"}):(i({message:"please login to contribute",error:!0}),setTimeout((function(){i({message:null,error:!1})}),5e3))},S=function(){var e=Object(b.a)(d.a.mark((function e(n){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.prev=1,e.next=4,O.addContent({content:k.value},t._id);case 4:k.onSubmit(),E({show:!1,label:"contribute"}),M.emit("data_request"),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(1),i({message:e.t0,error:!0}),setTimeout((function(){i({message:null,error:!1})}),5e3);case 13:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}();return t?a.a.createElement("div",{className:"styled-poem"},a.a.createElement(te,null,a.a.createElement("h2",null,a.a.createElement(ae,{poem:t,user:n})),a.a.createElement(re,{poem:t,key:t._id,user:n}),t.children?t.children.map((function(e){return a.a.createElement(re,{poem:e,key:e._id,user:n})})):null,w.show?a.a.createElement("div",null,a.a.createElement("form",{onSubmit:S},a.a.createElement("div",null,a.a.createElement(ne,Object.assign({rows:"2",cols:"30"},k,{"data-cy":"content-input"}))),a.a.createElement("div",null,a.a.createElement($,{type:"submit","data-cy":"content-submit"},"submit!"),a.a.createElement($,{onClick:j},w.label)))):null,a.a.createElement("div",{className:"enjoy-button"}," ","enjoys:",t.likes," ",a.a.createElement($,{onClick:function(){return x()},ref:y,enjoyed:f,"data-cy":"enjoy"}," enjoy "),w.show?null:a.a.createElement($,{onClick:j,"data-cy":"contribute-toggle"},w.label)),a.a.createElement(_,{message:u}))):null},se={login:function(){var e=Object(b.a)(d.a.mark((function e(t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},ue=function(){var e=Object(s.b)(),t=Object(r.useState)({message:null,error:!1}),n=Object(l.a)(t,2),o=n[0],c=n[1],u=Object(p.f)(),i=T("text"),m=T("password"),f=function(){var t=Object(b.a)(d.a.mark((function t(n){var r;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),t.prev=1,t.next=4,se.login({username:i.value,password:m.value});case 4:r=t.sent,window.localStorage.setItem("loggedPoemUser",JSON.stringify(r)),O.setConfig(r.token),e(W(r)),i.onSubmit(),m.onSubmit(),u.push("/"),t.next=17;break;case 13:t.prev=13,t.t0=t.catch(1),c({message:"wrong credentials",error:!0}),setTimeout((function(){c({message:null,error:!1})}),5e3);case 17:case"end":return t.stop()}}),t,null,[[1,13]])})));return function(e){return t.apply(this,arguments)}}();return a.a.createElement("div",{className:"login-and-new"},a.a.createElement("h2",null,"log in to ghost raps"),a.a.createElement("form",{onSubmit:f,"data-cy":"loginForm"},a.a.createElement("label",{classname:"login-and-new-input"},"username \xa0",a.a.createElement(ee,Object.assign({},i,{"data-cy":"login-username"}))),a.a.createElement("label",null,"password \xa0",a.a.createElement(ee,Object.assign({},m,{"data-cy":"login-password"}))),a.a.createElement($,{type:"submit","data-cy":"login-button"},"login")),a.a.createElement(_,{message:o}))},le=function(){return a.a.createElement("p",{className:"about-paragraph"},"Ghost Raps is an anonymous creative space for people to collaborate on lyrics. Anyone can start a rap with a title and a few lines. Then, anyone can contribute by adding lines. So create an account, get creative, be inspired! If all goes according to plan I'll sell the best raps to Drake (jokes) Shout out to ",a.a.createElement("a",{href:"//glowtxt.com"},"Glowtxt")," for the title image")},ie=function(){var e=Object(r.useState)({message:null,error:!1}),t=Object(l.a)(e,2),n=t[0],o=t[1],c=Object(s.b)(),u=Object(p.f)(),i=T("text"),m=T("password"),f=function(){var e=Object(b.a)(d.a.mark((function e(t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),""!==i.value&&""!==m.value){e.next=5;break}return o({message:"ghostin too hard",error:!0}),setTimeout((function(){o({message:null,error:!1})}),5e3),e.abrupt("return");case 5:if(!(m.value.length<=3)){e.next=9;break}return o({message:"need password length longer than 3 characters",error:!0}),setTimeout((function(){o({message:null,error:!1})}),5e3),e.abrupt("return");case 9:return e.prev=9,e.next=12,oe.newUser({username:i.value,password:m.value});case 12:return c(z("new user ".concat(i.value," created!"),!1)),i.onSubmit(),m.onSubmit(),e.next=17,se.login({username:i.value,password:m.value});case 17:n=e.sent,window.localStorage.setItem("loggedPoemUser",JSON.stringify(n)),O.setConfig(n.token),c(W(n)),u.push("/"),e.next=28;break;case 24:e.prev=24,e.t0=e.catch(9),o({message:"username needs to be unique",error:!0}),setTimeout((function(){o({message:null,error:!1})}),5e3);case 28:case"end":return e.stop()}}),e,null,[[9,24]])})));return function(t){return e.apply(this,arguments)}}();return a.a.createElement("div",{className:"login-and-new"},a.a.createElement("h2",null,"create user"),a.a.createElement("form",{onSubmit:f},a.a.createElement("label",{classname:"login-and-new-input"},"username \xa0",a.a.createElement(ee,i)),a.a.createElement("label",null,"password \xa0",a.a.createElement(ee,m)),a.a.createElement($,{type:"submit","data-cy":"create-button"},"create!")),a.a.createElement(_,{message:n}))},me=function(){var e=Object(s.c)((function(e){return e.user})),t=Object(r.useState)({message:null,error:!1}),n=Object(l.a)(t,2),o=n[0],c=n[1],u=Object(s.b)(),i=Object(p.f)(),m=T("text"),f=T("text"),g=function(){var t=Object(b.a)(d.a.mark((function t(n){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n.preventDefault(),!e){t.next=23;break}if(""!==m.value&&""!==f.value){t.next=6;break}return c({message:"ghostin too hard",error:!0}),setTimeout((function(){c({message:null,error:!1})}),5e3),t.abrupt("return");case 6:return t.prev=6,t.next=9,O.create({title:m.value,content:f.value});case 9:u(z("new rap ".concat(m.value," created!"),!1)),m.onSubmit(),f.onSubmit(),M.emit("data_request"),i.push("/"),t.next=21;break;case 16:t.prev=16,t.t0=t.catch(6),console.log(t.t0),c({message:t.t0,error:!0}),setTimeout((function(){c({message:null,error:!1})}),5e3);case 21:t.next=25;break;case 23:c({message:"please login to create a rap",error:!0}),setTimeout((function(){c({message:null,error:!1})}),5e3);case 25:case"end":return t.stop()}}),t,null,[[6,16]])})));return function(e){return t.apply(this,arguments)}}();return a.a.createElement("div",{className:"new-content"},a.a.createElement("h2",null,"create rap"),a.a.createElement("form",{onSubmit:g,"data-cy":"poemForm"},a.a.createElement("div",null,"title",a.a.createElement("br",null),a.a.createElement(ee,Object.assign({},m,{"data-cy":"poemTitle"}))),a.a.createElement("div",null,"first lines...",a.a.createElement("br",null),a.a.createElement(ne,Object.assign({rows:"2",cols:"40"},f,{"data-cy":"poemContent"}))),a.a.createElement($,{type:"submit","data-cy":"create-button"},"create!")),a.a.createElement("div",{className:"notification-wrapper"},a.a.createElement(_,{message:o})))};var pe=function(){var e=Object(s.b)(),t=Object(s.c)((function(e){return e.message})),n=Object(s.c)((function(e){return e.poems})),o=Object(s.c)((function(e){return e.user})),c=Object(r.useState)("new"),i=Object(l.a)(c,2),f=i[0],d=i[1],b=Object(r.useState)("flex"),g=Object(l.a)(b,2),v=g[0],h=g[1];Object(r.useEffect)((function(){var n=window.localStorage.getItem("loggedPoemUser");if(n){var r=JSON.parse(n);e(W(r)),O.setConfig(r.token)}e(S()),t.message&&setTimeout((function(){e((function(e){e({type:"REMOVE"})}))}),5e3)}),[e,t]),Object(r.useEffect)((function(){"/"===window.location.pathname?h("flex"):h("none")}),[]);var w=function(e){h(e)},E={display:v};return a.a.createElement("div",{className:"main-page"},a.a.createElement("div",{className:"left-col"},a.a.createElement("div",null,a.a.createElement("img",{className:"ghost-title",src:"/GhostRaps.gif",alt:"title"}),a.a.createElement("div",{className:"navigation"},a.a.createElement(u.b,{activeStyle:{fontWeight:"bold",color:"gray"},className:"link",to:"/",exact:!0,"data-cy":"link-home",onClick:function(){return w("flex")}},"home"),a.a.createElement(u.b,{activeStyle:{fontWeight:"bold",color:"gray"},className:"link",to:"/new_rap","data-cy":"link-new-rap",onClick:function(){return w("none")}},"new rap"),a.a.createElement(u.b,{activeStyle:{fontWeight:"bold",color:"gray"},className:"link",to:"/about",onClick:function(){return w("none")}},"about"),o?null:a.a.createElement(u.b,{activeStyle:{fontWeight:"bold",color:"gray"},className:"link",to:"/create_user","data-cy":"link-new-user",onClick:function(){return w("none")}},"new user"),o?a.a.createElement("span",{className:"header-span"},o.username," ","logged in"," ",a.a.createElement($,{onClick:function(){e((function(e){e({type:"LOGOUT"})})),O.setConfig(null),window.localStorage.removeItem("loggedPoemUser")}},"logout")):a.a.createElement(u.b,{activeStyle:{fontWeight:"bold",color:"gray"},className:"link",to:"/login","data-cy":"link-login",onClick:function(){return w("none")}},"login")),a.a.createElement("div",{className:"sort-bar",style:E},a.a.createElement("span",{className:"sort-span"}," sort... ")," ",a.a.createElement(m.a,{className:"dark-theme",options:[{label:"new",value:"new"},{label:"top",value:"top"}],label:"sort",onChange:function(e){d(e)},placeholder:f})),a.a.createElement("div",{className:"ghost-div"},a.a.createElement("img",{className:"ghost-image",src:"/spaceghost_purp2.jpg",alt:"ghost"})))),a.a.createElement(p.c,null,a.a.createElement(p.a,{path:"/login"},a.a.createElement("div",{className:"side-content"},a.a.createElement(ue,null))),a.a.createElement(p.a,{path:"/new_rap"},a.a.createElement("div",{className:"side-content"},a.a.createElement(me,null))),a.a.createElement(p.a,{path:"/about"},a.a.createElement("div",{className:"side-content"},a.a.createElement(le,null))),a.a.createElement(p.a,{path:"/create_user"},a.a.createElement("div",{className:"side-content"},a.a.createElement(ie,null))),a.a.createElement(p.a,{exact:!0,path:"/"},a.a.createElement("div",{className:"home-page"},a.a.createElement("p",{className:"main-message"},a.a.createElement(_,{message:t})),a.a.createElement("div",null,function(e,t){return"new"===t?function(e){return e.sort((function(e,t){var n=new Date(e.updatedAt).getTime();return new Date(t.updatedAt).getTime()-n})),e}(e):"top"===t?function(e){return e.sort((function(e,t){return t.likes-e.likes})),e}(e):void 0}(n,f).map((function(e){return a.a.createElement("div",{key:e._id},e.head?null:a.a.createElement(ce,{poem:e}))})))))))};console.log("public url: ",""),c.a.render(a.a.createElement(s.a,{store:J},a.a.createElement(u.a,null,a.a.createElement(pe,null))),document.getElementById("root"))},76:function(e,t,n){e.exports=n(176)},85:function(e,t,n){},86:function(e,t,n){}},[[76,1,2]]]);
//# sourceMappingURL=main.8c1a534e.chunk.js.map