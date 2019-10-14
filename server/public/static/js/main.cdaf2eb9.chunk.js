(this["webpackJsonpreact-login"]=this["webpackJsonpreact-login"]||[]).push([[0],{25:function(e,t,a){},29:function(e,t,a){e.exports=a(62)},34:function(e,t,a){},35:function(e,t,a){},54:function(e,t,a){},57:function(e,t,a){},58:function(e,t,a){},59:function(e,t,a){},61:function(e,t,a){},62:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(26),c=a.n(s),l=(a(34),a(2)),i=a(3),o=a(6),u=a(5),m=a(7),h=(a(35),a(66)),p=a(67),g=a(64),d=a(8),f=a(63),v=a(12),b=a.n(v),E=function e(){var t=this;Object(l.a)(this,e),this.signup=function(e,a,n,r,s,c){return t.service.post("/signup",{username:e,password:a,name:n,surname:r,email:s,phone:c}).then((function(e){return e.data}))},this.login=function(e,a){return t.service.post("/login",{username:e,password:a}).then((function(e){return e.data}))},this.loggedin=function(){return t.service.get("/currentuser").then((function(e){return e.data}))},this.logout=function(){return t.service.get("/logout").then((function(e){return e.data}))},this.service=b.a.create({baseURL:"http://localhost:5000/api/auth",withCredentials:!0})};a(54);function O(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var y=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(o.a)(this,Object(u.a)(t).call(this))).handleLogout=function(t){console.log(),e.props.logout(t)},e.state={loggedInUser:null},e.service=new E,e}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.setState(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?O(a,!0).forEach((function(t){Object(d.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):O(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},this.state,{loggedInUser:e.userInSession}))}},{key:"render",value:function(){return this.state.loggedInUser?r.a.createElement("nav",{className:"nav-style flex-column"},r.a.createElement("div",{className:"header flex"},r.a.createElement(f.a,{className:"link",to:"/home"},r.a.createElement("div",{className:"nav-box flex home"},"Home")),r.a.createElement(f.a,{className:"link",to:"/signup"},r.a.createElement("div",{className:"nav-box flex shop"},"Shop")),r.a.createElement(f.a,{className:"link",to:"/test"},r.a.createElement("div",{className:"nav-box flex aboutus"},"About us")),r.a.createElement(f.a,{className:"link",to:"/signup"},r.a.createElement("div",{className:"nav-box flex user"},this.state.loggedInUser.username)),r.a.createElement("ul",{className:"flex"},r.a.createElement("li",null,r.a.createElement("a",{className:"link",href:"/",onClick:this.handleLogout},"Logout"))))):r.a.createElement("div",null,r.a.createElement("nav",{className:"nav-style"},r.a.createElement("ul",{className:"flex"},r.a.createElement("li",null,r.a.createElement(f.a,{className:"link",to:"/signup"},r.a.createElement("div",{className:"nav-box flex signup"},"Sign Up"))),r.a.createElement("li",null,r.a.createElement(f.a,{className:"link",to:"/login"},r.a.createElement("div",{className:"nav-box flex login"},"Log in"))))))}}]),t}(n.Component),S=(a(57),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).handleFormSubmit=function(e){e.preventDefault();var t=a.state,n=t.username,r=t.password,s=t.name,c=t.surname,l=t.email,i=t.phone;a.service.signup(n,r,s,c,l,i).then((function(e){a.setState({username:"",password:"",name:"",surname:"",email:"",phone:""}),a.props.getUser(e.user)})).catch((function(e){a.setState({username:n,password:r,name:s,surname:c,email:l,phone:i,error:!0})}))},a.handleChange=function(e){var t=e.target,n=t.name,r=t.value;a.setState(Object(d.a)({},n,r))},a.state={username:"",password:"",name:"",surname:"",email:"",phone:""},a.service=new E,a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"container-card"},r.a.createElement("h3",null,"Welcome!, create your account next:"),r.a.createElement("form",{className:"signup-form",onSubmit:this.handleFormSubmit},r.a.createElement("fieldset",null,r.a.createElement("label",null,"Username:"),r.a.createElement("input",{type:"text",name:"username",placeholder:"userN...",value:this.state.username,onChange:function(t){return e.handleChange(t)}})),r.a.createElement("fieldset",null,r.a.createElement("label",null,"Name:"),r.a.createElement("input",{type:"text",name:"name",placeholder:"John...",value:this.state.name,onChange:function(t){return e.handleChange(t)}})),r.a.createElement("fieldset",null,r.a.createElement("label",null,"Surname:"),r.a.createElement("input",{type:"text",name:"surname",placeholder:"Wick...",value:this.state.surname,onChange:function(t){return e.handleChange(t)}})),r.a.createElement("fieldset",null,r.a.createElement("label",null,"E-mail:"),r.a.createElement("input",{type:"text",name:"email",placeholder:"something@like.this...",value:this.state.email,onChange:function(t){return e.handleChange(t)}})),r.a.createElement("fieldset",null,r.a.createElement("label",null,"Phone Number:"),r.a.createElement("input",{type:"text",name:"phone",value:this.state.phone,placeholder:"+34 333 911 199...",onChange:function(t){return e.handleChange(t)}})),r.a.createElement("fieldset",null,r.a.createElement("label",null,"Password:"),r.a.createElement("input",{type:"password",name:"password",value:this.state.password,onChange:function(t){return e.handleChange(t)}})),r.a.createElement("input",{type:"submit",value:"Sign up"})),r.a.createElement("h1",null,this.state.error?"Error":""))}}]),t}(n.Component)),j=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).handleFormSubmit=function(e){e.preventDefault();var t=a.state.username,n=a.state.password;a.service.login(t,n).then((function(e){a.setState({username:t,password:n,error:!1}),a.props.getUser(e)})).catch((function(e){a.setState({username:t,password:n,error:!0})}))},a.handleChange=function(e){var t=e.target,n=t.name,r=t.value;a.setState(Object(d.a)({},n,r))},a.state={username:"",password:""},a.service=new E,a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("h3",null,"Please, login to our site"),r.a.createElement("form",{onSubmit:this.handleFormSubmit},r.a.createElement("fieldset",null,r.a.createElement("label",null,"Username:"),r.a.createElement("input",{type:"text",name:"username",value:this.state.username,onChange:function(t){return e.handleChange(t)}})),r.a.createElement("fieldset",null,r.a.createElement("label",null,"Password:"),r.a.createElement("input",{type:"password",name:"password",value:this.state.password,onChange:function(t){return e.handleChange(t)}})),r.a.createElement("input",{type:"submit",value:"Login"})),r.a.createElement("h1",null,this.state.error?"Error":""))}}]),t}(n.Component);a(58),a(59);function C(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var N=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(o.a)(this,Object(u.a)(t).call(this))).state={games:"",search:""},e}return Object(m.a)(t,e),Object(i.a)(t,[{key:"updateSearch",value:function(e){var t=e.target.value;this.setState(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?C(a,!0).forEach((function(t){Object(d.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):C(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},this.state,{search:t}))}},{key:"componentDidMount",value:function(){var e=this;b.a.get("http://localhost:5000/games").then((function(t){var a=t.data;e.setState({games:a}),console.log(a)})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this.state.games;return console.log(e),e?r.a.createElement("div",{className:"gameList"},r.a.createElement("div",{class:"container flex"},this.state.games.map((function(e){return r.a.createElement(f.a,{to:"/game/".concat(e._id),className:"linked"},r.a.createElement("div",{class:"card"},r.a.createElement("img",{src:"https://images.igdb.com/igdb/image/upload/t_cover_big/".concat(e.image[0]),alt:"Cover game"})),r.a.createElement("div",{className:"text-img"},r.a.createElement("h3",null,e.name)))})))):r.a.createElement("h1",null,"NO STOCK.")}}]),t}(n.Component);function w(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var x=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(o.a)(this,Object(u.a)(t).call(this))).state={search:""},e}return Object(m.a)(t,e),Object(i.a)(t,[{key:"updateSearch",value:function(e){var t=e.target.value;this.setState(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?w(a,!0).forEach((function(t){Object(d.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):w(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},this.state,{search:t}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"main flex"},r.a.createElement("div",{className:"flex-colum"},r.a.createElement("div",{className:"flex"},r.a.createElement(f.a,{className:"link",to:"/addgame"},r.a.createElement("button",null,"Add new Game")),r.a.createElement("form",{className:"searchBar"},r.a.createElement("input",{type:"search",name:"search",id:"search",placeholder:"Search game",onChange:function(t){return e.updateSearch(t)}}))),r.a.createElement(N,{filterProducts:this.state.search})))}}]),t}(n.Component),k=a(28),P=a(68),U=(a(25),function e(){var t=this;Object(l.a)(this,e),this.search=function(e){return t.service.get("/search?query=".concat(e),{query:e}).then((function(e){return e.data}))},this.game=function(e){return t.service.get("/game/".concat(e)).then((function(e){return e.data}))},this.genres=function(e){return t.service.get("/genres/".concat(e)).then((function(e){return e.data}))},this.platforms=function(e){return t.service.get("/platforms/".concat(e)).then((function(e){return e.data}))},this.screenshots=function(e){return t.service.get("/screenshots/".concat(e)).then((function(e){return e.data}))},this.collections=function(e){return t.service.get("/collections/".concat(e)).then((function(e){return e.data}))},this.covers=function(e){return t.service.get("/covers/".concat(e)).then((function(e){return e.data}))},this.franchises=function(e){return t.service.get("/franchises/".concat(e)).then((function(e){return e.data}))},this.companies=function(e){return t.service.get("/companies/".concat(e)).then((function(e){return e.data}))},this.similars=function(e){return t.service.get("/similars/".concat(e)).then((function(e){return e.data}))},this.service=b.a.create({baseURL:"http://localhost:5000/api/db",withCredentials:!0})});function D(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function I(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?D(a,!0).forEach((function(t){Object(d.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):D(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var _=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(o.a)(this,Object(u.a)(t).call(this))).handleChange=function(t){var a=t.target,n=a.name,r=a.value;console.log(t.target),e.setState(Object(d.a)({},n,r))},e.handleChangeForArray=function(t,a){var n=Object(k.a)(e.state.screenshots);n[a]=t.target.value,e.setState(I({},e.state,{screenshots:n}))},e.handleFormSubmit=function(t){t.preventDefault();var a=e.state,n=a.name,r=a.platform,s=a.release,c=a.genre,l=a.image,i=a.description,o=a.companies,u=a.screenshots,m=a.similars,h=a.category,p=a.stock,g=a.price;b.a.post("http://localhost:5000/new",{name:n,platform:r,release:s,genre:c,image:l,description:i,companies:o,screenshots:u,similars:m,category:h,stock:p,price:g}).then((function(){e.setState({name:"",platform:[],release:"",genre:"",image:"",description:"",companies:"",screenshots:[],similars:"",price:"",category:"",stock:""}),e.props.history.push("/home")})).catch((function(e){return console.log(e)}))},e.searchFormSubmit=function(t){t.preventDefault();var a=e.state.search;e.service.search(a).then((function(t){console.log(t),e.setState({gamesFound:t,search:a})})).catch((function(t){console.log(t),e.setState({search:a})}))},e.service=new U,e.state={search:"",gamesFound:[],selectedGame:"",name:"",platform:[],release:"",genre:"",image:"",description:"",companies:"",screenshots:[],similars:"",price:"",category:"",stock:""},e}return Object(m.a)(t,e),Object(i.a)(t,[{key:"handleChangeSelect",value:function(e){this.setState({platform:[e.target.value]})}},{key:"updateSearch",value:function(e){var t=e.target.value;this.setState(I({},this.state,{search:t}))}},{key:"setSelectedGame",value:function(e){var t=this;this.setState(I({},this.state,{selectedGame:e})),this.service.platforms(e).then((function(e){t.setState(I({},t.state,{name:e.name,platform:e.platforms}))})).catch((function(e){console.log(e),t.setState({name:""})})),this.service.genres(e).then((function(e){t.setState(I({},t.state,{release:e.first_release_date,genre:e.genres}))})).catch((function(e){console.log(e),t.setState({genres:""})})),this.service.covers(e).then((function(e){t.setState(I({},t.state,{image:e.cover,description:e.summary}))})).catch((function(e){console.log(e),t.setState({covers:""})})),this.service.screenshots(e).then((function(e){t.setState(I({},t.state,{screenshots:e.screenshots}))})).catch((function(e){console.log(e),t.setState({screenshots:""})})),this.service.companies(e).then((function(e){t.setState(I({},t.state,{companies:e.involved_companies}))})).catch((function(e){console.log(e),t.setState({companies:""})})),this.service.similars(e).then((function(e){t.setState(I({},t.state,{similars:e.similar_games}))})).catch((function(e){console.log(e),t.setState({similars:""})}))}},{key:"render",value:function(){var e,t=this;return e=this.state.image?"https://images.igdb.com/igdb/image/upload/t_cover_small_2x/".concat(this.state.image):"#",r.a.createElement("div",{className:"form-section flex-column"},r.a.createElement("form",{onSubmit:this.searchFormSubmit,className:"searchBar"},r.a.createElement("input",{type:"search",name:"search",id:"search",placeholder:"Search game",value:this.state.search,onChange:function(e){return t.updateSearch(e)}})),r.a.createElement("div",{className:"searchResults flex"},this.state.gamesFound.map((function(e,a){return r.a.createElement("div",{className:"linked"},r.a.createElement("div",{key:a,className:"gameCardSmall",onClick:function(){return t.setSelectedGame(e.id)}},r.a.createElement("div",{className:"description-section"},r.a.createElement("h1",null,e.name))))}))),r.a.createElement("form",{onSubmit:this.handleFormSubmit},r.a.createElement("div",{className:"parent"},r.a.createElement("div",{className:"div1 flex-column"},r.a.createElement("label",{for:"name"},"Name:"),r.a.createElement("input",{id:"inputName",type:"text",label:"Name",onChange:function(e){return t.handleChange(e)},name:"name",placeholder:"Name of the Game",value:this.state.name})),r.a.createElement("div",{className:"div2 flex-column"},r.a.createElement("label",{for:"image"},"Image:"),r.a.createElement("input",{id:"inputImage",type:"text",label:"Image",onChange:function(e){return t.handleChange(e)},name:"image",placeholder:"Image URL",value:this.state.image}),r.a.createElement("img",{src:e,alt:"Cover game"})),r.a.createElement("div",{className:"div3 flex-column"},r.a.createElement("label",null,"Platform:"),r.a.createElement("select",{onChange:this.handleChangeSelect.bind(this)},this.state.platform.map((function(e){return r.a.createElement("option",{value:e},e)})))),r.a.createElement("div",{className:"div4 flex-column"},r.a.createElement("label",{for:"genre"},"Genre:"),r.a.createElement("input",{id:"inputGenre",type:"text",label:"Genre",onChange:function(e){return t.handleChange(e)},name:"genre",placeholder:"Genre URL",value:this.state.genre})),r.a.createElement("div",{className:"div5 flex-column"},r.a.createElement("label",{for:"release"},"Release date:"),r.a.createElement("input",{id:"inputRelease",type:"text",label:"Release",onChange:function(e){return t.handleChange(e)},name:"release",placeholder:"Release date",value:this.state.release})),r.a.createElement("div",{className:"div6 flex-column"},r.a.createElement("label",{for:"summary"},"Summary:"),r.a.createElement("textarea",{id:"inputDescription",type:"text",label:"Description",onChange:function(e){return t.handleChange(e)},name:"description",placeholder:"Summary",value:this.state.description})),r.a.createElement("div",{className:"div7 flex-column"},r.a.createElement("input",{id:"inputCompanies",type:"text",label:"Companies",onChange:function(e){return t.handleChange(e)},name:"companies",placeholder:"Companies",value:this.state.companies})),r.a.createElement("div",{className:"div8 flex-column"},r.a.createElement("label",{for:"similars"},"Similar games:"),r.a.createElement("input",{id:"inputSimilars1",type:"text",label:"Similar Games",onChange:function(e){return t.handleChange(e)},name:"similars",placeholder:"Similar Games",value:this.state.similars})),r.a.createElement("div",{className:"div9 flex-column"},r.a.createElement("label",{for:"screenshots"},"Screenshots:"),r.a.createElement("input",{id:"inputScreenshots1",type:"text",label:"Screenshots",onChange:function(e){return t.handleChange(e)},name:"screenshots",placeholder:"Screenshot",value:this.state.screenshots})),r.a.createElement("div",{className:"div10 flex-column"},r.a.createElement("label",null,"Category:"),r.a.createElement("select",{onChange:function(e){return t.handleChange(e)}},r.a.createElement("option",{value:"On Sale"},"On Sale"),r.a.createElement("option",{value:"Recommended"},"Recommended"),r.a.createElement("option",{value:"New"},"New"))),r.a.createElement("div",{className:"div11 flex-column"},r.a.createElement("label",{for:"stock"},"Stock:"),r.a.createElement("input",{id:"inputStock",type:"number",label:"Stock",onChange:function(e){return t.handleChange(e)},name:"stock",placeholder:"Units",value:this.state.stock})),r.a.createElement("div",{className:"div12 flex-column"},r.a.createElement("label",{for:"price"},"Price:"),r.a.createElement("input",{id:"inputPrice",type:"number",label:"Price",onChange:function(e){return t.handleChange(e)},name:"price",placeholder:"...$",value:this.state.price})),r.a.createElement("div",{className:"div13 flex-column"}," "),r.a.createElement("div",{className:"div14 flex-column"},r.a.createElement("button",{type:"submit",value:"Submit"},"Submit")))))}}]),t}(n.Component),G=Object(P.a)(_),R=(a(61),function(){function e(){var t=this;Object(l.a)(this,e),this.getUser=function(e){return t.service.get("/"+e).then((function(e){return e.data}))},this.updateUser=function(e){return t.service.put("/update/"+e.id,e).then((function(e){return e.data}))},this.URL="http://localhost:5000/api/user",this.service=b.a.create({baseURL:this.URL,withCredentials:!0})}return Object(i.a)(e,[{key:"handleUpload",value:function(e){return this.service.post("/upload",e).then((function(e){return e.data}))}}]),e}());function F(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function L(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?F(a,!0).forEach((function(t){Object(d.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):F(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var A=function(e){function t(e){var a,n,r;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).toggleWish=function(e){var t=a.state.loggedInUser.wishlist;t.includes(e)?t.splice(t.indexOf(e),1):t.push(e);var n=L({},a.state.loggedInUser,{wishlist:t});a.setState(L({},a.state,{loggedInUser:n})),a.userService.updateUser(n)},a.getGameDetails=function(){b.a.get("http://localhost:5000/game/".concat(a.props.gameID)).then((function(e){var t=e.data;console.log(t),a.setState({game:t})})).catch((function(e){console.log(e)}))},a.props.userInSession.wishlist.includes(a.props.gameID)?(n=!0,r="like is-wish"):(n=!1,r="like is-blue"),a.state={loggedInUser:a.props.userInSession,game:"",buttonSelected:n,buttonClass:r},a.userService=new R,a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){this.getGameDetails()}},{key:"updateUser",value:function(e){return this.userService.updateUser(e).then().catch()}},{key:"toggleButton",value:function(){this.state.buttonSelected?this.setState({buttonSelected:!1,buttonClass:"like"}):this.setState({buttonSelected:!0,buttonClass:"like is-wish"}),this.toggleWish(this.props.gameID)}},{key:"toggleChart",value:function(){this.state.buttonSelected?this.setState({buttonSelected:!1,buttonClass:"like"}):this.setState({buttonSelected:!0,buttonClass:"like is-wish"}),this.toggleWish(this.props.gameID)}},{key:"render",value:function(){var e=this,t=null;return this.state.game.screenshots&&(t=this.state.game.screenshots.map((function(e,t){return r.a.createElement("div",{className:"size"}," ",t+1,r.a.createElement("img",{src:"https://images.igdb.com/igdb/image/upload/t_cover_big_2x/".concat(e),alt:"Cover game"}))}))),r.a.createElement("div",{className:"container-card"},r.a.createElement("div",{className:"images"},r.a.createElement("img",{src:"https://images.igdb.com/igdb/image/upload/t_cover_big_2x/".concat(this.state.game.image),alt:"Cover game"})),r.a.createElement("p",{className:"pick"},t?"Screenshots":""),r.a.createElement("div",{className:"sizes"},t),r.a.createElement("div",{className:"product"},r.a.createElement("p",null,this.state.game.platform),r.a.createElement("h1",null,this.state.game.name),r.a.createElement("h2",{id:"price"},this.state.game.price," \u20ac"),r.a.createElement("div",{className:"game-info"},r.a.createElement("p",{className:"desc"},this.state.game.description),r.a.createElement("h2",null,"Genres:"),r.a.createElement("p",{className:"desc"},this.state.game.genre),r.a.createElement("h2",null,"Companies:"),r.a.createElement("p",{className:"desc"},this.state.game.companies),r.a.createElement("h2",null,"Similar games:"),r.a.createElement("p",{className:"desc"},this.state.game.similars)),r.a.createElement("div",{className:"buttons"},r.a.createElement("button",{onClick:function(){return e.toggleChart()},className:"add"},"Add to Cart"),r.a.createElement("button",{onClick:function(){return e.toggleButton()},style:this.state.styles,className:this.state.buttonClass},r.a.createElement("span",null,"\u2665")))))}}]),t}(n.Component),W=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).getUser=function(e){a.setState({loggedInUser:e})},a.logout=function(){a.service.logout().then((function(){a.setState({loggedInUser:null})}))},a.state={loggedInUser:null},a.service=new E,a.fetchUser(),a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"fetchUser",value:function(){var e=this;return this.service.loggedin().then((function(t){e.setState({loggedInUser:t})})).catch((function(t){e.setState({loggedInUser:!1})}))}},{key:"render",value:function(){var e=this;return this.state.loggedInUser?r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,{to:"/home"}),r.a.createElement("div",{className:"App flex"},r.a.createElement("header",{className:"App-header"},r.a.createElement(y,{userInSession:this.state.loggedInUser,logout:this.logout}))),r.a.createElement(p.a,null,r.a.createElement(g.a,{exact:!0,path:"/home",component:x}),r.a.createElement(g.a,{exact:!0,path:"/addgame",component:G}),r.a.createElement(g.a,{exact:!0,path:"/game/:id",render:function(t){return r.a.createElement(A,{userInSession:e.state.loggedInUser,gameID:t.match.params.id})}}))):r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,{to:"/login"}),r.a.createElement("div",{className:"App flex"},r.a.createElement("header",{className:"App-header"},r.a.createElement(y,{userInSession:this.state.loggedInUser,logout:this.logout}),r.a.createElement(p.a,null,r.a.createElement(g.a,{exact:!0,path:"/signup",render:function(){return r.a.createElement(S,{getUser:e.getUser})}}),r.a.createElement(g.a,{exact:!0,path:"/login",render:function(){return r.a.createElement(j,{getUser:e.getUser})}})))))}}]),t}(n.Component),B=a(65);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(B.a,null,r.a.createElement(W,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[29,1,2]]]);
//# sourceMappingURL=main.cdaf2eb9.chunk.js.map