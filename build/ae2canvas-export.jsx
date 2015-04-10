function removeZValue(a){for(var b=0;b<a.length;b++)a[b].v.length>2&&a[b].v.pop();return a}function roundValue(a,b){for(var c=b||1,d=0;d<a.length;d++)if(a[d].v instanceof Array)for(var e=0;e<a[d].v.length;e++)a[d].v[e]=Math.round(a[d].v[e]*c)/c;else a[d].v=Math.round(a[d].v*c)/c;return a}function divideValue(a,b){for(var c=0;c<a.length;c++)if(a[c].v instanceof Array)for(var d=0;d<a[c].v.length;d++)a[c].v[d]=a[c].v[d]/b;else a[c].v=a[c].v/b;return a}function multiplyValue(a,b){for(var c=0;c<a.length;c++)if(a[c].v instanceof Array)for(var d=0;d<a[c].v.length;d++)a[c].v[d]=a[c].v[d]*b;else a[c].v=a[c].v*b;return a}function clampValue(a,b,c){for(var d=0;d<a.length;d++)if(a[d].v instanceof Array)for(var e=0;e<a[d].v.length;e++)a[d].v[e]>c?a[d].v[e]=c:a[d].v[e]<b&&(a[d].v[e]=b);else a[d].v>c?a[d].v=c:a[d].v<b&&(a[d].v=b);return a}function getArcLength(a){for(var b=500,c=1/b,d=0,e=0,f=a[0],g=a[1],h=0,i=0,j=0,k=0,l=0,m=0;b>m;l+=c)d=cubicN(l,a[0],a[2],a[4],a[6]),e=cubicN(l,a[1],a[3],a[5],a[7]),h=d-f,i=e-g,j=Math.sqrt(h*h+i*i),k+=j,f=d,g=e,m++;return k}function cubicN(a,b,c,d,e){var f=a*a,g=f*a;return b+(3*-b+a*(3*b-b*a))*a+(3*c+a*(-6*c+3*c*a))*a+(3*d-3*d*a)*f+e*g}function getValueDifference(a,b){var c,d,e,f;return b.v instanceof Array&&b.v.length>2?(c=b.v[0]-a.v[0],d=b.v[1]-a.v[1],e=b.v[2]-a.v[2],f=Math.pow(c*c+d*d+e*e,1/3)):b.v instanceof Array&&2===b.v.length?(c=b.v[0]-a.v[0],d=b.v[1]-a.v[1],f=Math.sqrt(c*c+d*d)):f=b.v-a.v,f}function dist2d(a,b,c,d){return Math.sqrt((a-c)*(a-c)+(b-d)*(b-d))}function printObj(a){$.writeln("-----------------------");for(var b in a)a.hasOwnProperty(b)&&$.writeln("function"==typeof a[b]?b+": function":b+": "+a[b]);$.writeln("-----------------------")}function reflectObj(a){for(var b=a.reflect.properties,c=0;c<b.length;c++)$.writeln(b[c].name+": "+f[b[c].name])}function isEmpty(a){for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}function clearConsole(){var a=new BridgeTalk;a.target="estoolkit-4.0",a.body=function(){app.clc()}.toSource()+"()",a.send(5)}function normalizeKeyframes(a){for(var b=1;b<a.length;b++){var c,d,e,f,g,h,i,j=a[b-1],k=a[b],l=k.t-j.t;if(j.outType!==KeyframeInterpolationType.LINEAR||k.inType!==KeyframeInterpolationType.LINEAR){c=j.len?j.len:getValueDifference(j,k);var m=1;if(.01>c&&c>-.01){if(c=.01,k.v instanceof Array)for(var n=0;n<k.v.length;n++)k.v[n]=j.v[n]+.01*m;else k.v=j.v+.01*m;m=-1*m}var o=c/l*1e3;k.easeIn&&(f=k.easeIn[0]/100,g=k.easeIn[1]/o*f,e=[],e[0]=Math.round(1e3*(1-f))/1e3,e[1]=Math.round(1e3*(1-g))/1e3,k.easeIn=e),j.easeOut&&(h=j.easeOut[0]/100,i=j.easeOut[1]/o*h,d=[],d[0]=Math.round(1e3*h)/1e3,d[1]=Math.round(1e3*i)/1e3,j.easeOut=d),j.easeOut&&!k.easeIn?k.easeIn=[.16667,1]:k.easeIn&&!j.easeOut&&(j.easeOut=[.16667,0]),j.easeOut[0]===j.easeOut[1]&&k.easeIn[0]===k.easeIn[1]&&(delete j.easeOut,delete k.easeIn),k.inType&&delete k.inType,k.outType&&delete k.outType,k.inTangent&&delete k.inTangent,k.outTangent&&delete k.outTangent,j.inType&&delete j.inType,j.outType&&delete j.outType,j.inTangent&&delete j.inTangent,j.outTangent&&delete j.outTangent}else delete j.outType,delete j.easeOut,delete j.outTangent,delete k.inType,delete k.easeIn,delete k.inTangent}return a}function getMotionpath(a){function b(a,b,d,e,f,g,h,i){var j=5;return c(a,b,h,i,d,e)>j||c(a,b,h,i,f,g)>j}function c(a,b,c,d,e,f){var g=(d-b)/(c-a),h=b-g*a,i=(g*f+e-g*h)/(g*g+1),j=(g*g*f+g*e+h)/(g*g+1);return dist2d(i,j,a,b)>dist2d(a,b,c,d)||dist2d(i,j,c,d)>dist2d(a,b,c,d)?1/0:dist2d(i,j,e,f)}for(var d=1;d<a.length;d++){var e=a[d-1],f=a[d];if(e&&f){var g=e.v[0],h=e.v[1],i=e.outTangent[0]+e.v[0],j=e.outTangent[1]+e.v[1],k=f.inTangent[0]+f.v[0],l=f.inTangent[1]+f.v[1],m=f.v[0],n=f.v[1];b(g,h,i,j,k,l,m,n)&&(e.motionpath=[g,h,i,j,k,l,m,n],e.len=getArcLength(e.motionpath))}}return a}function getTransform(a){var b={};return getAnchor(a,b),getPosition(a,b),getScale(a,b),getSkew(a,b),getSkewAxis(a,b),getRotation(a,b),getOpacity(a,b),b}function getAnchor(a,b){var c;if(a.property("ADBE Anchor Point")instanceof Property)c=a.property("ADBE Anchor Point");else{if(!(a.property("ADBE Vector Anchor")instanceof Property))return null;c=a.property("ADBE Vector Anchor")}if(c.isTimeVarying||0!==c.value[0]||0!==c.value[1]){var d=getProperty(c);d=removeZValue(d),d=roundValue(d),d=normalizeKeyframes(d),b.anchor=d}}function getScale(a,b){var c;if(a.property("ADBE Scale")instanceof Property)c=a.property("ADBE Scale");else{if(!(a.property("ADBE Vector Scale")instanceof Property))return null;c=a.property("ADBE Vector Scale")}if(c.isTimeVarying||100!==c.value[0]||100!==c.value[1]){var d=getProperty(c,0);d=normalizeKeyframes(d),d=divideValue(d,100),d=roundValue(d,1e4);var e=getProperty(c,1);e=normalizeKeyframes(e),e=divideValue(e,100),e=roundValue(e,1e4),b.scaleX=d,b.scaleY=e}}function getPosition(a,b){var c;if(a.property("ADBE Position")instanceof Property)c=a.property("ADBE Position");else{if(!(a.property("ADBE Vector Position")instanceof Property))return null;c=a.property("ADBE Vector Position")}if(c.isTimeVarying||0!==c.value[0]||0!==c.value[1]){var d=getProperty(c);d=removeZValue(d),d=roundValue(d),d.length>1&&(d=getMotionpath(d),d=normalizeKeyframes(d)),b.position=d}}function getRotation(a,b){var c;if(a.property("ADBE Rotate Z")instanceof Property)c=a.property("ADBE Rotate Z");else{if(!(a.property("ADBE Vector Rotation")instanceof Property))return null;c=a.property("ADBE Vector Rotation")}if(c.isTimeVarying||0!==c.value){var d=getProperty(c);d=roundValue(d,1e4),d.length>1&&(d=normalizeKeyframes(d)),b.rotation=d}}function getOpacity(a,b){var c;if(a.property("ADBE Opacity")instanceof Property)c=a.property("ADBE Opacity");else{if(!(a.property("ADBE Vector Group Opacity")instanceof Property))return null;c=a.property("ADBE Vector Group Opacity")}if(c.isTimeVarying||100!==c.value){var d=getProperty(c);d=normalizeKeyframes(d),d=divideValue(d,100),b.opacity=d}}function getSkew(a,b){var c;if(!(a.property("ADBE Vector Skew")instanceof Property))return null;if(c=a.property("ADBE Vector Skew"),c&&c.isTimeVarying||c&&0!==c.value){var d=getProperty(c);d.length>1&&(d=normalizeKeyframes(d)),b.skew=d}}function getSkewAxis(a,b){var c;if(!(a.property("ADBE Vector Skew Axis")instanceof Property))return null;if(c=a.property("ADBE Vector Skew Axis"),c&&c.isTimeVarying||c&&0!==c.value){var d=getProperty(c);d=normalizeKeyframes(d),b.skewAxis=d}}function getComp(a){function b(a){var b=[],c=a.layers.addNull(a.duration),d=c.property("ADBE Transform Group").property("ADBE Position");d.expression="x = thisComp.marker.numKeys;[x,0];";for(var e=d.value[0],f=1;e>=f;f++){var g=a.layers.addText(),h=g.property("ADBE Transform Group").property("ADBE Position");h.expression="[thisComp.marker.key("+f+").time,0];",g.property("ADBE Text Properties").property("ADBE Text Document").expression="thisComp.marker.key("+f+").comment;";var i=g.property("ADBE Text Properties").property("ADBE Text Document").value.text,j=1e3*g.property("ADBE Transform Group").property("ADBE Position").value[0];i=i.replace(/(\r\n|\n|\r)/gm," "),j=Math.round(j),g.remove(),b.push({comment:i,time:j})}for(var k=1;k<=app.project.numItems;k++){{app.project.item(k)}$.writeln("gg")}return c.remove(),b}var c={};c.groups=[],c.duration=1e3*a.duration,c.width=a.width,c.height=a.height,c.markers=b(a);for(var d=a.numLayers;d>0;d--){var e=a.layer(d);e instanceof ShapeLayer&&e.enabled&&c.groups.push(getGroup(e))}return c}function getGroup(a){function b(a){return a.merge&&a.groups&&(a=c(a)),a}function c(a){for(var b=0;b<a.groups.length;b++)a.groups[b].fill&&delete a.groups[b].fill,a.groups[b].stroke&&delete a.groups[b].stroke,a.groups[b].groups&&(a.groups[b]=c(a.groups[b]));return a}var d={};a.inPoint&&(d["in"]=Math.round(1e3*a.inPoint)),a.outPoint&&(d.out=Math.round(1e3*a.outPoint)),"undefined"!=typeof d["in"]&&d["in"]<0&&(d["in"]=0),d.name=a.name;for(var e=1;e<=a.numProperties;e++){var f=a.property(e),g=f.matchName;if(f.enabled)switch(g){case"ADBE Vector Blend Mode":break;case"ADBE Transform Group":case"ADBE Vector Transform Group":d.transform=getTransform(f);break;case"ADBE Vector Materials Group":break;case"ADBE Root Vectors Group":case"ADBE Vectors Group":for(var h=1;h<=f.numProperties;h++){var i=f.property(h),j=i.matchName;if(i.enabled)switch(j){case"ADBE Vector Group":d.groups||(d.groups=[]),d.groups.unshift(getGroup(i));break;case"ADBE Vector Shape - Group":d.shapes||(d.shapes=[]),d.shapes.unshift(getPath(i));break;case"ADBE Vector Shape - Rect":d.shapes||(d.shapes=[]),d.shapes.unshift(getRect(i));break;case"ADBE Vector Shape - Ellipse":d.shapes||(d.shapes=[]),d.shapes.unshift(getEllipse(i));break;case"ADBE Vector Shape - Star":d.shapes||(d.shapes=[]),d.shapes.unshift(getPolystar(i));break;case"ADBE Vector Graphic - Fill":d.fill||(d.fill=getFill(i));break;case"ADBE Vector Graphic - G-Fill":break;case"ADBE Vector Graphic - Stroke":d.stroke||(d.stroke=getStroke(i));break;case"ADBE Vector Filter - Merge":d.merge=getMerge(i);break;case"ADBE Vector Filter - Trim":d.trim=getVectorTrim(i)}}}}return b(d)}function getPath(a){function b(a){for(var b=[],c=0;c<a.vertices.length;c++){var d=a.vertices[c][0],e=a.vertices[c][1],f=d+a.outTangents[c][0],g=e+a.outTangents[c][1],h=d+a.inTangents[c][0],i=e+a.inTangents[c][1],j=[f,g,h,i,d,e];b.push(j)}return b}function c(a){for(var b=0;b<a.length;b++){a[b].len=[];for(var c=1;c<a[b].v.length;c++){var d,e=a[b].v[c],f=a[b].v[c-1];if(f&&e){var g=f[4],h=f[5],i=f[0],j=f[1],k=e[2],l=e[3],m=e[4],n=e[5];d=[g,h,i,j,k,l,m,n],a[b].len.push(getArcLength(d))}}}return a}function d(a){for(var b=1;b<a.length;b++){var c=a[b],d=a[b-1];d.easeOut&&!c.easeIn?c.easeIn=[.16667,1]:c.easeIn&&!d.easeOut&&(d.easeOut=[.16667,0])}return a}a=a.property("ADBE Vector Shape");var e={};e.name=a.name,e.type="path",e.closed=a.value.closed,e.frames=[];var f=a.numKeys;if(f>1){e.isAnimated=!0;for(var g=1;f>=g;g++){var h={},i=a.keyInInterpolationType(g),j=a.keyOutInterpolationType(g);if(h.v=b(a.keyValue(g)),h.t=Math.round(1e3*a.keyTime(g)),g>1&&i===KeyframeInterpolationType.BEZIER){var k=a.keyInTemporalEase(g)[0];h.easeIn=[],h.easeIn[0]=1-k.influence/100,h.easeIn[1]=1-Math.round(1e4*k.speed)/1e4}if(f>g&&j===KeyframeInterpolationType.BEZIER){var l=a.keyOutTemporalEase(g)[0];h.easeOut=[],h.easeOut[0]=l.influence/100,h.easeOut[1]=Math.round(1e4*l.speed)/1e4}e.frames.push(h)}e.frames=d(e.frames)}else{var h={};e.isAnimated=!1,h.t=0,h.v=b(a.value),e.frames.push(h)}return e.frames=c(e.frames),e}function getRect(a){var b={};b.name=a.name,b.type="rect",b.size=getProperty(a.property("ADBE Vector Rect Size")),b.size=roundValue(b.size),b.size=normalizeKeyframes(b.size);var c=a.property("ADBE Vector Rect Position");(c.isTimeVarying||0!==c.value[0]||0!==c.value[1])&&(c=getProperty(c),c=normalizeKeyframes(c),b.position=c);var d=a.property("ADBE Vector Rect Roundness");return(d.isTimeVarying||0!==d.value)&&(d=getProperty(d),d=normalizeKeyframes(d),b.roundness=d),b}function getEllipse(a){var b={};b.name=a.name,b.index=a.propertyIndex,b.type="ellipse",b.size=getProperty(a.property("ADBE Vector Ellipse Size")),b.size=normalizeKeyframes(b.size);var c=a.property("ADBE Vector Ellipse Position");return(c.isTimeVarying||0!==c.value[0]||0!==c.value[1])&&(b.position=getProperty(c),b.position=normalizeKeyframes(b.position)),b}function getPolystar(a){var b={};b.name=a.name,b.type="polystar",b.starType=a.property("ADBE Vector Star Type").value,b.points=getProperty(a.property("ADBE Vector Star Points")),b.points=normalizeKeyframes(b.points),b.outerRadius=getProperty(a.property("ADBE Vector Star Outer Radius")),b.outerRadius=normalizeKeyframes(b.outerRadius),b.innerRadius=getProperty(a.property("ADBE Vector Star Inner Radius")),b.innerRadius=normalizeKeyframes(b.innerRadius);var c=a.property("ADBE Vector Star Position");(c.isTimeVarying||0!==c.value[0]||0!==c.value[1])&&(b.position=getProperty(c),b.position=normalizeKeyframes(b.position));var d=a.property("ADBE Vector Star Rotation");(d.isTimeVarying||0!==d.value)&&(b.rotation=getProperty(d),b.rotation=normalizeKeyframes(b.rotation));var e=a.property("ADBE Vector Star Inner Roundess");(e.isTimeVarying||0!==e.value)&&(b.innerRoundness=getProperty(e),b.innerRoundness=normalizeKeyframes(b.innerRoundness));var f=a.property("ADBE Vector Star Outer Roundess");return(f.isTimeVarying||0!==f.value)&&(b.outerRoundness=getProperty(f),b.outerRoundness=normalizeKeyframes(b.outerRoundness)),b}function getFill(a){var b={};b.index=a.propertyIndex,b.color=getProperty(a.property("ADBE Vector Fill Color")),b.color=multiplyValue(b.color,255),b.color=normalizeKeyframes(b.color);var c=a.property("ADBE Vector Fill Opacity");return(c.isTimeVarying||100!==c.value)&&(c=getProperty(c),c=normalizeKeyframes(c),c=divideValue(c,100),b.opacity=c),b}function getStroke(a){function b(a){switch(a){case 2:return"round";case 3:return"bevel";default:return"miter"}}function c(a){switch(a){case 2:return"round";case 3:return"square";default:return"butt"}}var d={};d.index=a.propertyIndex,d.join=a.property("ADBE Vector Stroke Line Join").value,1===d.join&&(d.miterLimit=getProperty(a.property("ADBE Vector Stroke Miter Limit"))),d.join=b(d.join),d.cap=a.property("ADBE Vector Stroke Line Cap").value,d.cap=c(d.cap),d.color=getProperty(a.property("ADBE Vector Stroke Color")),d.color=multiplyValue(d.color,255),d.color=normalizeKeyframes(d.color),d.opacity=getProperty(a.property("ADBE Vector Stroke Opacity")),d.opacity=normalizeKeyframes(d.opacity),d.opacity=divideValue(d.opacity,100),d.width=getProperty(a.property("ADBE Vector Stroke Width")),d.width=normalizeKeyframes(d.width);var e=a.property("ADBE Vector Stroke Dash 1");d.dash&&(d.dash=getProperty(e),d.dash=normalizeKeyframes(e));var f=a.property("ADBE Vector Stroke Gap 1");f&&(d.gap=getProperty(f),d.gap=normalizeKeyframes(f));var g=a.property("ADBE Vector Stroke Offset");return g&&(d.offset=getProperty(g),d.offset=normalizeKeyframes(g)),d}function getMerge(a){var b={};return b.type=a.property("ADBE Vector Merge Type").value,b}function getVectorTrim(a){var b={};b.index=a.propertyIndex,b.type=a.property("ADBE Vector Trim Type").value;var c=a.property("ADBE Vector Trim Start");(c.isTimeVarying||0!==c.value)&&(b.start=getProperty(c),b.start=normalizeKeyframes(b.start),b.start=divideValue(b.start,100));var d=a.property("ADBE Vector Trim End");return(d.isTimeVarying||100!==d.value)&&(b.end=getProperty(d),b.end=normalizeKeyframes(b.end),b.end=divideValue(b.end,100)),b}function getProperty(a,b){return a.numKeys<1?getStaticProperty(a,b):getAnimatedProperty(a,b)}function getStaticProperty(a,b){var c=[];return c.push(a.value instanceof Array&&"number"==typeof b?{t:0,v:a.value[b]}:{t:0,v:a.value}),c}function getAnimatedProperty(a,b){for(var c=[],d=a.numKeys,e=1;d>=e;e++){var f,g,h,i,j={};j.t=1e3*a.keyTime(e),f=a.keyInInterpolationType(e),g=a.keyOutInterpolationType(e),"number"==typeof b&&a.keyInTemporalEase(e)[b]&&a.keyOutTemporalEase(e)[b]?(h=a.keyInTemporalEase(e)[b],i=a.keyOutTemporalEase(e)[b]):(h=a.keyInTemporalEase(e)[0],i=a.keyOutTemporalEase(e)[0]),j.v="number"==typeof b?a.keyValue(e)[b]:a.keyValue(e),e>1&&f!==KeyframeInterpolationType.HOLD&&(j.inType=f,j.easeIn=[],j.easeIn[0]=h.influence,j.easeIn[1]=h.speed),d>e&&g!==KeyframeInterpolationType.HOLD&&(j.outType=g,j.easeOut=[],j.easeOut[0]=i.influence,j.easeOut[1]=i.speed),(a.propertyValueType===PropertyValueType.TwoD_SPATIAL||a.propertyValueType===PropertyValueType.ThreeD_SPATIAL)&&(e>1&&(j.inTangent=a.keyInSpatialTangent(e),j.easeIn=[],j.easeIn[0]=h.influence,j.easeIn[1]=h.speed),d>e&&(j.outTangent=a.keyOutSpatialTangent(e),j.easeOut=[],j.easeOut[0]=i.influence,j.easeOut[1]=i.speed)),c.push(j)}return c}function start(){clearConsole();var a=getComp(app.project.activeItem),b=JSON.stringify(a),c=File.saveDialog("Save the json file");null!=c&&(c.open("w","TEXT","????"),c.write(b),c.close())}"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(a){return 10>a?"0"+a:a}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return"string"==typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g,h=gap,i=b[a];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(a)),"function"==typeof rep&&(i=rep.call(b,a,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,g=[],"[object Array]"===Object.prototype.toString.apply(i)){for(f=i.length,c=0;f>c;c+=1)g[c]=str(c,i)||"null";return e=0===g.length?"[]":gap?"[\n"+gap+g.join(",\n"+gap)+"\n"+h+"]":"["+g.join(",")+"]",gap=h,e}if(rep&&"object"==typeof rep)for(f=rep.length,c=0;f>c;c+=1)"string"==typeof rep[c]&&(d=rep[c],e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));return e=0===g.length?"{}":gap?"{\n"+gap+g.join(",\n"+gap)+"\n"+h+"}":"{"+g.join(",")+"}",gap=h,e}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;"function"!=typeof JSON.stringify&&(JSON.stringify=function(a,b,c){var d;if(gap="",indent="","number"==typeof c)for(d=0;c>d;d+=1)indent+=" ";else"string"==typeof c&&(indent=c);if(rep=b,b&&"function"!=typeof b&&("object"!=typeof b||"number"!=typeof b.length))throw new Error("JSON.stringify");return str("",{"":a})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),void 0!==d?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),start();