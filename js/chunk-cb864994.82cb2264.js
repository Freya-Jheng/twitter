(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cb864994"],{"0c72":function(t,e,n){"use strict";n("2bdd")},"2bdd":function(t,e,n){},"8cbb":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"user-following"},[t.followings.length>0?t._l(t.followings,(function(e){return n("div",{key:e.followingId,staticClass:"user-following-card"},[n("router-link",{staticClass:"user-following-card__avatar",attrs:{to:{name:"sub-profile",params:{id:e.id}}}},[e.avatar?n("img",{staticClass:"user-following-card__avatar--img",attrs:{src:e.avatar,alt:""}}):t._e()]),n("div",{staticClass:"user-following-card__container"},[n("div",{staticClass:"user-following-card__container__info"},[n("div",{staticClass:"user-following-card__container__info__user"},[n("router-link",{staticClass:"user-following-card__container__info__user--name",attrs:{to:{name:"sub-profile",params:{id:e.id}}}},[t._v(" "+t._s(e.name)+" ")]),n("router-link",{staticClass:"user-following-card__container__info__user--account",attrs:{to:{name:"sub-profile",params:{id:e.id}}}},[t._v(" "+t._s("@"+e.account)+" ")])],1),e.isFollowing?n("button",{staticClass:"user-following-card__container__info__button button button-followed",on:{click:function(n){return n.stopPropagation(),n.preventDefault(),t.deleteFollowing(e.id)}}},[t._v(" 正在跟隨 ")]):t._e(),e.isFollowing?t._e():n("button",{staticClass:"user-following-card__container__info__button button button-not-followed",on:{click:function(n){return n.stopPropagation(),n.preventDefault(),t.addFollowing(e.followingId)}}},[t._v(" 跟隨 ")])]),n("div",{staticClass:"user-following-card__container--text"},[t._v(" "+t._s(e.introduction?e.introduction:"")+" ")])])],1)})):n("div",[n("h5",{staticClass:"mt-6 text-center"},[t._v("目前沒有追隨中的帳號")])])],2)},r=[],a=n("5530"),i=n("1da1"),s=(n("96cf"),n("d9e2"),n("4e82"),n("d81d"),n("4de4"),n("d3b7"),n("4cce")),l=n("2fa3"),c={name:"UserFollowings",data:function(){return{followings:[]}},methods:{fetchFollowings:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,s["a"].getFollowings({userId:t});case 3:if(o=n.sent,200===o.status){n.next=6;break}throw new Error(o.statusText);case 6:e.followings=o.data,e.followings=e.followings.sort((function(t,e){return t.createdAt>e.createdAt?-1:t.createdAt<e.createdAt?1:0})),n.next=14;break;case 10:n.prev=10,n.t0=n["catch"](0),console.log(n.t0),l["a"].fire({icon:"error",title:"無法取得追蹤資料，請稍後再試"});case 14:case"end":return n.stop()}}),n,null,[[0,10]])})))()},addFollowing:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,s["a"].addFollowing({followerId:t});case 3:if(o=n.sent,200===o.status){n.next=6;break}throw new Error(o.statusText);case 6:e.followings=e.followings.map((function(e){return e.followingId!=t?e:Object(a["a"])(Object(a["a"])({},e),{},{isFollowing:!0})})),n.next=13;break;case 9:n.prev=9,n.t0=n["catch"](0),console.log(n.t0),l["a"].fire({icon:"error",title:"無法追蹤使用者，請稍後再試"});case 13:case"end":return n.stop()}}),n,null,[[0,9]])})))()},deleteFollowing:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,s["a"].deleteFollowing({followingId:t});case 3:if(o=n.sent,200===o.status){n.next=6;break}throw new Error(o.statusText);case 6:e.followings=e.followings.filter((function(e){return e.followingId!==t})),n.next=13;break;case 9:n.prev=9,n.t0=n["catch"](0),console.log(n.t0),l["a"].fire({icon:"error",title:"無法取消追蹤使用者，請稍後再試"});case 13:case"end":return n.stop()}}),n,null,[[0,9]])})))()}},created:function(){var t=this.$route.params.id;this.fetchFollowings(t)}},u=c,f=(n("0c72"),n("2877")),d=Object(f["a"])(u,o,r,!1,null,"30dc0a6d",null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-cb864994.82cb2264.js.map