(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-595f0043"],{"014c":function(t,e,a){},4385:function(t,e,a){"use strict";a("014c")},c7a3:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"profile__tweets"},t._l(t.tweets,(function(e){return r("div",{key:e.id,staticClass:"profile__tweets__tweet"},[r("router-link",{staticClass:"profile__tweets__tweet__avatar",attrs:{to:""}},[r("img",{staticClass:"user-avatar",attrs:{src:t.currentUser.avatar,alt:""}})]),r("div",{staticClass:"profile__tweets__tweet__wrapper"},[r("div",{staticClass:"profile__tweets__tweet__wrapper__info"},[r("router-link",{staticClass:"profile__tweets__tweet__wrapper__info--name",attrs:{to:{name:"sub-profile-tweets",params:{id:t.currentUser.id}}}},[t._v(t._s(e.User.name))]),r("div",{staticClass:"profile__tweets__tweet__wrapper__info--account"},[r("router-link",{staticClass:"router-link",attrs:{to:{name:"sub-profile-tweets",params:{id:t.currentUser.id}}}},[t._v(" "+t._s("@"+e.User.account)+" ")]),t._v(" ・"+t._s(t._f("fromNow")(e.createdAt))+" ")],1)],1),r("router-link",{staticClass:"profile__tweets__tweet__wrapper__tweet",attrs:{to:{name:"individual-tweet",params:{tweet_id:e.id}}}},[t._v(" "+t._s(e.description))]),r("div",{staticClass:"profile__tweets__tweet__wrapper__icons"},[r("router-link",{staticClass:"profile__tweets__tweet__wrapper__icons__comment",attrs:{to:""}},[r("img",{staticClass:"profile__tweets__tweet__wrapper__icons__comment--icon",attrs:{src:a("5845"),alt:"","data-toggle":"modal","data-target":"#tweet-"+e.id},on:{click:function(a){return t.handleClick(e)}}}),r("span",{staticClass:"profile__tweets__tweet__wrapper__icons__comment--count"},[t._v(t._s(e.repliesCount))])]),r("div",{staticClass:"modal fade",attrs:{id:"tweet-"+e.id,tabindex:"-1","aria-labelledby":"replyModal","aria-hidden":"true"}},[r("div",{staticClass:"modal-dialog"},[r("div",{staticClass:"modal-content"},[t._m(0,!0),r("div",{staticClass:"modal-body"},[r("div",{staticClass:"modal-body__tweet"},[r("div",{staticClass:"modal-body__tweet__user-avatar"},[e.User.avatar?r("img",{staticClass:"avatar",attrs:{src:e.User.avatar,alt:""}}):t._e()]),r("div",{staticClass:"modal-body__tweet__content"},[r("div",{staticClass:"modal-body__tweet__content__info"},[r("div",{staticClass:"modal-body__tweet__content__info--name"},[t._v(" "+t._s(e.User.name)+" ")]),r("div",{staticClass:"modal-body__tweet__content__info--account"},[t._v(" "+t._s("@"+e.User.account)+" ")]),r("div",{staticClass:"modal-body__tweet__content__info--time"},[t._v(" "+t._s(t._f("fromNow")(e.createdAt))+" ")])]),r("div",{staticClass:"modal-body__tweet__content__text"},[t._v(" "+t._s(e.description)+" ")]),r("div",{staticClass:"modal-body__tweet__content__reply-to"},[r("div",{staticClass:"modal-body__tweet__content__reply-to--reply"},[t._v(" 回覆給 ")]),r("div",{staticClass:"modal-body__tweet__content__reply-to--account"},[t._v(" "+t._s("@"+e.User.account)+" ")])])])]),r("div",{staticClass:"modal-body__reply"},[r("div",{staticClass:"modal-body__reply__user-avatar"},[t.currentUser.avatar?r("img",{staticClass:"avatar",attrs:{src:t.currentUser.avatar,alt:""}}):t._e()]),r("form",{staticClass:"reply",attrs:{action:""}},[r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.reply,expression:"reply"}],attrs:{placeholder:"推你的回覆",name:"reply-textarea",id:"reply-textarea",cols:"50",rows:"4"},domProps:{value:t.reply},on:{input:function(e){e.target.composing||(t.reply=e.target.value)}}})])])]),r("div",{staticClass:"modal-footer",class:{error:t.reply.length>140}},[r("button",{staticClass:"btn-modal button",attrs:{"data-dismiss":"modal",disabled:t.reply.length>140||0===t.reply.length},on:{click:function(a){return t.handleSubmit(e.id)}}},[t._v(" 回覆 ")])])])])]),r("div",{staticClass:"profile__tweets__tweet__wrapper__icons__like"},[e.isLiked?t._e():r("img",{staticClass:"profile__tweets__tweet__wrapper__icons__like--icon",attrs:{src:a("c20a"),alt:""},on:{click:function(a){return a.stopPropagation(),a.preventDefault(),t.addLike(e.id)}}}),e.isLiked?r("img",{staticClass:"profile__tweets__tweet__wrapper__icons__like--icon",attrs:{src:a("e6bf"),alt:""},on:{click:function(a){return a.stopPropagation(),a.preventDefault(),t.deleteLike(e.id)}}}):t._e(),r("span",{staticClass:"profile__tweets__tweet__wrapper__icons__like--count"},[t._v(t._s(e.likesCount))])])],1)],1)],1)})),0)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal-header"},[a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{staticClass:"close--text",attrs:{"aria-hidden":"true"}},[t._v("×")])])])}],i=a("1da1"),n=a("5530"),o=(a("96cf"),a("d9e2"),a("4e82"),a("d81d"),a("4cce")),c=a("2fa3"),_=a("2708"),l=a("6783"),d=a("2f62"),u={name:"SubProfileTweets",mixins:[_["a"]],data:function(){return{tweets:[],tweetsLength:"",reply:""}},computed:Object(n["a"])({},Object(d["b"])(["currentUser"])),watch:{"$route.params.id":{handler:function(t){this.fetchTweets(t)},deep:!0,immediate:!0}},created:function(){},methods:{fetchTweets:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,o["a"].getUserTweets({userId:t});case 3:if(r=a.sent,s=r.data,"error"!==s.status){a.next=7;break}throw new Error(s.message);case 7:e.tweets=s,e.tweetsLength=e.tweets.length,e.tweets=e.tweets.sort((function(t,e){return t.createdAt>e.createdAt?-1:t.createdAt<e.createdAt?1:0})),a.next=16;break;case 12:a.prev=12,a.t0=a["catch"](0),console.log(a.t0),c["a"].fire({icon:"error",title:"無法成功取得推文資料！"});case 16:case"end":return a.stop()}}),a,null,[[0,12]])})))()},addLike:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,l["a"].addLike({tweetId:t});case 3:if(r=a.sent,s=r.data,"error"!==s.status){a.next=7;break}throw new Error(s.message);case 7:e.tweets=e.tweets.map((function(e){return e.id!==t?e:Object(n["a"])(Object(n["a"])({},e),{},{isLiked:!0,likesCount:e.likesCount+1})})),a.next=14;break;case 10:a.prev=10,a.t0=a["catch"](0),console.log(a.t0),c["a"].fire({icon:"error",title:"無法成功按讚！"});case 14:case"end":return a.stop()}}),a,null,[[0,10]])})))()},deleteLike:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,l["a"].deleteLike({tweetId:t});case 3:if(r=a.sent,s=r.data,"error"!==s.status){a.next=7;break}throw new Error(s.message);case 7:e.tweets=e.tweets.map((function(e){return e.id!==t?e:Object(n["a"])(Object(n["a"])({},e),{},{isLiked:!1,likesCount:e.likesCount-1})})),a.next=14;break;case 10:a.prev=10,a.t0=a["catch"](0),console.log(a.t0),c["a"].fire({icon:"error",title:"無法成功取消按讚！"});case 14:case"end":return a.stop()}}),a,null,[[0,10]])})))()},handleCancel:function(){this.reply=""},handleClick:function(t){this.tweetModal=t},handleSubmit:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var r,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(a.prev=0,e.reply){a.next=3;break}return a.abrupt("return",!1);case 3:return a.next=5,l["a"].reply({tweetId:t,comment:e.reply});case 5:if(r=a.sent,s=r.data,"success"===s.status){a.next=9;break}throw new Error(s.message);case 9:e.tweets=e.tweets.map((function(e){return e.id!==t?e:Object(n["a"])(Object(n["a"])({},e),{},{repliesCount:e.repliesCount+1})})),a.next=16;break;case 12:a.prev=12,a.t0=a["catch"](0),console.log(a.t0),c["a"].fire({icon:"error",title:"無法新增回覆，請稍後再試"});case 16:case"end":return a.stop()}}),a,null,[[0,12]])})))()}}},p=u,w=(a("4385"),a("2877")),m=Object(w["a"])(p,r,s,!1,null,"ed2bf0f6",null);e["default"]=m.exports}}]);
//# sourceMappingURL=chunk-595f0043.c495f6bb.js.map