function tellMoeGr(Grp) {	var moe_num = moeNum(Grp);	return characters[rdNum(moe_num[0],moe_num[1])];};function rdNum(minNum,maxNum){     switch(arguments.length){         case 1:             return parseInt(Math.random()*minNum+1,10);         break;         case 2:             return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);         break;             default:                 return 0;             break;     };};function placeMoe(Callback) {    var Width = MoePara.width;    var Height = MoePara.height;    var Position = MoePara.position;    var PositionX = MoePara.positionX;    var PositionY = MoePara.positionY;    var Enable_Msg = MoePara.enablemsg;	switch (Position) {		case "LeftTop":		case "Lt":		    var attr1 = "left";		    var attr2 = "top";		     break;        case "LeftBottom":		case "Lb":		    var attr1 = "left";		    var attr2 = "bottom";		     break;		case "RightTop":		case "Rt":		    var attr1 = "right";		    var attr2 = "top";		     break;		case "RightBottom":		case "Rb":		    var attr1 = "right";		    var attr2 = "bottom";		     break;		default:		    var attr1 = "right";		    var attr2 = "bottom";		     break;	};	var all = autoClarity();    var idleBox = document.createElement("div");        idleBox.id = "Live2D";        idleBox.style.position = "fixed";        idleBox.style[attr1] = PositionX;        idleBox.style[attr2] = PositionY;    document.body.appendChild(idleBox);    var msgbox = document.createElement("div");		msgbox.className = "message";		msgbox.style.zIndex = 1e9;	document.getElementById("Live2D").appendChild(msgbox);    if (LAppDefine.IS_ENABLE_MESSAGE || Enable_Msg) {    	moeStyle(host+"/api/Live2D/message.css","moeMsg",function(){			moeJs("https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js",function(){				moeJs(host+"/api/Live2D/message.js");			});		});    }    var myIdle = document.createElement("canvas");        myIdle.id = "aLive2D";        myIdle.setAttribute("width",all.width);        myIdle.setAttribute("height",all.height);        myIdle.style.width = Width;        myIdle.style.height = Height;        myIdle.style.position = "fixed";        myIdle.style[attr1] = PositionX;        myIdle.style[attr2] = PositionY;        myIdle.style.zIndex = 1e9;    document.getElementById("Live2D").appendChild(myIdle);    var myAudio = document.createElement("audio");        myAudio.id = "aAudio";    document.getElementById("Live2D").appendChild(myAudio);    if (typeof(Callback)==='function') Callback();}function moeJs(Adr,Callback) {    var moe = document.createElement("script");    moe.src = Adr;    if (typeof(Callback)==='function') {    	moe.onload = Callback;    }    document.body.appendChild(moe);}function moeStyle(Adr,Name,Callback) {	var moe = document.createElement("link");	moe.rel = "stylesheet";	moe.type = "text/css";	moe.href = Adr;	moe.id = Name;	document.head.appendChild(moe);	var moestyle = document.getElementById(Name);	styleOnload(moestyle,Callback);}// This function is from sea.js// It is very useful for dealing with dynamic loading issues of css stylesfunction styleOnload(node, callback) {    // for IE6-9 and Opera    if (node.attachEvent) {      node.attachEvent('onload', callback);      // NOTICE:      // 1. "onload" will be fired in IE6-9 when the file is 404, but in      // this situation, Opera does nothing, so fallback to timeout.      // 2. "onerror" doesn't fire in any browsers!    }    // polling for Firefox, Chrome, Safari    else {      setTimeout(function() {        poll(node, callback);      }, 0); // for cache    }  }  function poll(node, callback) {    if (callback.isCalled) {      return;    }    var isLoaded = false;    if (/webkit/i.test(navigator.userAgent)) {//webkit      if (node['sheet']) {        isLoaded = true;      }    }    // for Firefox    else if (node['sheet']) {      try {        if (node['sheet'].cssRules) {          isLoaded = true;        }      } catch (ex) {        // NS_ERROR_DOM_SECURITY_ERR        if (ex.code === 1000) {          isLoaded = true;        }      }    }    if (isLoaded) {      // give time to render.      setTimeout(function() {        callback();      }, 1);    }    else {      setTimeout(function() {        poll(node, callback);      }, 1);    }}