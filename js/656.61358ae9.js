"use strict";(self["webpackChunksocial_networking_site"]=self["webpackChunksocial_networking_site"]||[]).push([[656],{656:function(o,l,t){t.r(l),t.d(l,{default:function(){return k}});var e=t(3396),s=t(7139);const a=o=>((0,e.dD)("data-v-12a63059"),o=o(),(0,e.Cn)(),o),n=a((()=>(0,e._)("div",{class:"following-title"},[(0,e._)("h2",{class:"mt-3"},"追蹤名單")],-1))),i={class:"content"},c=["src"],r={key:1,class:"mt-1",src:"https://upload.cc/i1/2022/05/31/dVpHNT.png",alt:""},u={class:"ms-3"},g={class:"name"},d={class:"date"},w={class:"ms-auto"},f=["onClick"];function m(o,l,t,a,m,h){const _=(0,e.up)("router-link");return(0,e.wg)(),(0,e.iD)("div",null,[n,((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(m.allFollowing,(o=>((0,e.wg)(),(0,e.iD)("div",{class:"following-block border-radius mt-3",key:o._id},[(0,e._)("div",i,[(0,e.Wm)(_,{class:"ms-3",to:`/user/${o.user._id}`,href:"#"},{default:(0,e.w5)((()=>[o.user.image?((0,e.wg)(),(0,e.iD)("img",{key:0,class:"mt-1",src:o.user.image,alt:""},null,8,c)):((0,e.wg)(),(0,e.iD)("img",r))])),_:2},1032,["to"]),(0,e._)("div",u,[(0,e.Wm)(_,{to:`/user/${o.user._id}`,href:"#"},{default:(0,e.w5)((()=>[(0,e._)("p",g,(0,s.zw)(o.user.name),1)])),_:2},1032,["to"]),(0,e._)("p",d,"發文時間 "+(0,s.zw)(h.formatDate(o.createdAt)),1)]),(0,e._)("div",w,[(0,e._)("button",{onClick:l=>h.unfollow(o.user),class:"follow-unfollow me-3"}," 取消追蹤 ",8,f)])])])))),128))])}var h={data(){return{allFollowing:[]}},methods:{getFollowing(){this.axios.get("https://ciye-social-site-api.herokuapp.com/users/following").then((o=>{console.log(o,"following"),this.allFollowing=o.data.data})).catch((o=>{alert("token過期，請先登入"),console.log(o,"error")}))},unfollow(o){this.axios.delete(`https://ciye-social-site-api.herokuapp.com/users/${o._id}/unfollow`).then((o=>{this.getFollowing(),console.log(o,"unfollow")})).catch((o=>{console.log(o,"unfollow")}))},formatDate(o){const l=new Date,t=`${l.getFullYear(o)}-${l.getMonth(o)+1}-${l.getDate(o)} ${l.getHours(o)}:${l.getMinutes(o)}:${l.getSeconds(o)}`;return console.log(t,"formattedDate"),t}},mounted(){this.getFollowing()}},_=t(89);const p=(0,_.Z)(h,[["render",m],["__scopeId","data-v-12a63059"]]);var k=p}}]);
//# sourceMappingURL=656.61358ae9.js.map