﻿var host = "https://live2d-api.boboweb.ml";
var message_Path = host+'/api/Live2D/';
var home_Path = host+'/';
var MoePara = {};
function aLive2D(Model,Width,Height,Position,Position_X,Position_Y,Enable_Msg) {
    initMoe();
    function myMoe(Model,Width,Height,Position,Position_X,Position_Y) {
        switch (Model) {
            case (Model.match(/^Random\((.*)\)$/) || {}).input:
                character_src = characters[rdNum(0,characters.length)];
                 break;
            case (Model.match(/^Auto\((.*)\)$/) || {}).input:
                character_src = characters[rdNum(0,characters.length)];
                 break;
            case (Model.match(/^Group\((.*)\)$/) || {}).input:
                var func_paramtrs = Model.substring(6,Model.length-1);
                var paramtrs = func_paramtrs.split(",");
                out_10:
                switch (paramtrs[0]) {
                	case "Defined":
                    case "defined":
                        character_src = tellMoeGr(paramtrs[1]);
                         break out_10;
                    case "Custom":
                    case "custom":
                        var func_paramtrs_2 = "";
                        for (var i=1; i<paramtrs.length; i++)
                        {
                        	if (i == paramtrs.length-1) {
                            	func_paramtrs_2 += paramtrs[i];
                            }
                            else {
                            	func_paramtrs_2 += paramtrs[i]+",";
                            }
                        };
                        out_02:
                        switch (func_paramtrs_2) {
                        	case (func_paramtrs_2.match(/^List\((.*)\)$/) || {}).input:
                                var func_paramtrs_3 = func_paramtrs_2.substring(5,func_paramtrs_2.length-1);
                                var paramtrs_3 = func_paramtrs_3.split(",");
                                var characters_lookup = [];
                                for (var i=0; i<paramtrs_3.length; i++)
                                {
                                	characters_lookup[i] = tellMoe(paramtrs_3[i]);
                                };
                                character_src = characters_lookup[rdNum(0,characters_lookup.length)];
                                 break out_02;
                            default:
                                character_src = characters[0];
                                console.error("TypeError: \""+func_paramtrs_2+"\" is not a array.");
                                 break out_02;
                        };
                         break out_10;
                    case "Redefine":
                    case "redefine":
                        var func_paramtrs_2 = "";
                        for (var i=2; i<paramtrs.length; i++)
                        {
                        	if (i == paramtrs.length-1) {
                            	func_paramtrs_2 += paramtrs[i];
                            }
                            else {
                            	func_paramtrs_2 += paramtrs[i]+",";
                            }
                        };
                         var moe_nums = moeNum(paramtrs[1]);
                         var characters_lookup = [];
                         var moe_num = -1;
                         for (var i=moe_nums[0]; i<moe_nums[1]+1; i++)
                         {
                         	moe_num += 1;
                             characters_lookup[moe_num] = characters[i];
                         };
                         out_05:
                         switch (func_paramtrs_2) {
                         	case (func_paramtrs_2.match(/^List\((.*)\)$/) || {}).input:
                                var func_paramtrs_3 = func_paramtrs_2.substring(5,func_paramtrs_2.length-1);
                                var paramtrs_3 = func_paramtrs_3.split(",");
                                var inc_or_dec = [];
                                var moe_name = [];
                                var moe_inc = [];
                                var moe_dec = [];
                                var moe_inc_num = -1;
                                var moe_dec_num = -1;
                                var arr_del_index = [];
                                for (var i=0; i<paramtrs_3.length; i++)
                                {
                                	inc_or_dec[i] = paramtrs_3[i].substring(0,1);
                                    moe_name[i] = paramtrs_3[i].substring(1,paramtrs_3[i].length);
                                    out_06:
                                    switch (inc_or_dec[i]) {
                                    	case "+":
                                            moe_inc_num += 1;
                                            moe_inc[moe_inc_num] = moe_name[i];
                                            characters_lookup[characters_lookup.length+moe_inc_num] = tellMoe(moe_inc[moe_inc_num]);
                                             break out_06;
                                        case "-":
                                            moe_dec_num += 1;
                                            moe_dec[moe_dec_num] = moe_name[i];
                                            arr_del_index[moe_dec_num] = characters_lookup.indexOf(tellMoe(moe_dec[moe_dec_num]));
                                             break out_06;
                                        default:
                                            console.error("SyntaxError: \""+paramtrs_3[i]+"\" must start with \"+\" or \"-\".");
                                             break out_06;
                                    };
                                };
                                for (var i=0; i<arr_del_index.length; i++)
                                {
                                	delete characters_lookup[arr_del_index[i]];
                                };
                                for(var i=0; i<characters_lookup.length; i++) {  
                                    if (characters_lookup[i] == " " || characters_lookup[i] == null || typeof(characters_lookup[i]) == "undefined") {  
                                        characters_lookup.splice(i,1);  
                                        i= i-1;  
                                    }
                                }
                                character_src = characters_lookup[rdNum(0,characters_lookup.length)];
                                  break out_05;
                             default:
                                  console.error("TypeError: \""+func_paramtrs_2+"\" is not a array.");
                                  break out_05;
                         };
                         break out_10;
                    default:
                        character_src = characters[0];
                        console.error("ReferenceError: \""+paramtrs[0]+"\" is not defined.");
                         break out_10;
                };
                 break;
            default:
                character_src = tellMoe(Model);
                 break;
        };
        moeJs(host+"/js/live2d.min.js",function(){
            moeJs(character_src,function(){
            	MoePara.width = LAppDefine.CANVAS_WIDTH = Width;
                MoePara.height = LAppDefine.CANVAS_HEIGHT = Height;
                MoePara.position = Position;
                MoePara.positionX = Position_X;
                MoePara.positionY = Position_Y;
                MoePara.enablemsg = Enable_Msg;
                placeMoe(function(){
                    eval('InitLive2D();');
                });
            });
        });
    };
	function moeJs(Adr,Callback) {
	    var moe = document.createElement("script");
	    moe.src = Adr;
	    if (typeof(Callback)==='function') {
	    	moe.onload = Callback;
	    }
	    document.body.appendChild(moe);
	}
    function initMoe() {
    	setTimeout(function(){
            moeJs(host+"/api/Live2D/list.js",function(){
                moeJs(host+"/api/Live2D/func.js",function(){
                    myMoe(Model,Width,Height,Position,Position_X,Position_Y);
                })
            })
        },100)
    }
}

console.log(`
  く__,.ヘヽ.        /  ,ー､ 〉
           ＼ ', !-─‐-i  /  /´
           ／｀ｰ'       L/／｀ヽ､
         /   ／,   /|   ,   ,       ',
       ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
        ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
          !,/7 '0'     ´0iソ|    |
          |.从"    _     ,,,, / |./    |
          ﾚ'| i＞.､,,__  _,.イ /   .i   |
            ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
              | |/i 〈|/   i  ,.ﾍ |  i  |
             .|/ /  ｉ：    ﾍ!    ＼  |
              kヽ>､ﾊ    _,.ﾍ､    /､!
              !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
              ﾚ'ヽL__|___i,___,ンﾚ|ノ
                  ﾄ-,/  |___./
                  'ｰ'    !_,.:
`)
