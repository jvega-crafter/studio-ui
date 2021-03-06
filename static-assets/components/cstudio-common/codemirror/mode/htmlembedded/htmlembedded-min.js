CodeMirror.defineMode("htmlembedded",function(c,e){var a=e.scriptStartRegex||/^<%/i,b=e.scriptEndRegex||/^%>/i;
var h,f;
function g(j,i){if(j.match(a,false)){i.token=d;
return h.token(j,i.scriptState)
}else{return f.token(j,i.htmlState)
}}function d(j,i){if(j.match(b,false)){i.token=g;
return f.token(j,i.htmlState)
}else{return h.token(j,i.scriptState)
}}return{startState:function(){h=h||CodeMirror.getMode(c,e.scriptingModeSpec);
f=f||CodeMirror.getMode(c,"htmlmixed");
return{token:e.startOpen?d:g,htmlState:f.startState(),scriptState:h.startState()}
},token:function(j,i){return i.token(j,i)
},indent:function(j,i){if(j.token==g){return f.indent(j.htmlState,i)
}else{return h.indent(j.scriptState,i)
}},copyState:function(i){return{token:i.token,htmlState:CodeMirror.copyState(f,i.htmlState),scriptState:CodeMirror.copyState(h,i.scriptState)}
},electricChars:"/{}:",innerMode:function(i){if(i.token==d){return{state:i.scriptState,mode:h}
}else{return{state:i.htmlState,mode:f}
}}}
},"htmlmixed");
CodeMirror.defineMIME("application/x-ejs",{name:"htmlembedded",scriptingModeSpec:"javascript"});
CodeMirror.defineMIME("application/x-aspx",{name:"htmlembedded",scriptingModeSpec:"text/x-csharp"});
CodeMirror.defineMIME("application/x-jsp",{name:"htmlembedded",scriptingModeSpec:"text/x-java"});