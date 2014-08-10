/*! grafana - v1.7.0-rc1 - 2014-08-05
 * Copyright (c) 2014 Torkel Ödegaard; Licensed Apache License */

function createHttpBackendMock(a,b,c){function d(a,b,c){return angular.isFunction(a)?a:function(){return angular.isNumber(a)?[a,b,c]:[200,a,b]}}function e(a,d,e,f,k,l){function m(a){return angular.isString(a)||angular.isFunction(a)||a instanceof RegExp?a:angular.toJson(a)}function n(b){function g(){var c=b.response(a,d,e,k);o.$$respHeaders=c[2],f(c[0],c[1],o.getAllResponseHeaders())}function h(){for(var a=0,b=i.length;b>a;a++)if(i[a]===g){i.splice(a,1),f(-1,void 0,"");break}}return!c&&l&&l.then&&l.then(h),g}var o=new MockXhr,p=h[0],q=!1;if(p&&p.match(a,d)){if(!p.matchData(e))throw Error("Expected "+p+" with different data\nEXPECTED: "+m(p.data)+"\nGOT:      "+e);if(!p.matchHeaders(k))throw Error("Expected "+p+" with different headers\nEXPECTED: "+m(p.headers)+"\nGOT:      "+m(k));if(h.shift(),p.response)return void i.push(n(p));q=!0}for(var r,s=-1;r=g[++s];)if(r.match(a,d,e,k||{})){if(r.response)(c?c.defer:j)(n(r));else{if(!r.passThrough)throw Error("No response defined !");b(a,d,e,f,k,l)}return}throw Error(q?"No response defined !":"Unexpected request: "+a+" "+d+"\n"+(p?"Expected "+p:"No more request expected"))}function f(a){angular.forEach(["GET","DELETE","JSONP"],function(b){e[a+b]=function(c,d){return e[a](b,c,void 0,d)}}),angular.forEach(["PUT","POST","PATCH"],function(b){e[a+b]=function(c,d,f){return e[a](b,c,d,f)}})}var g=[],h=[],i=[],j=angular.bind(i,i.push);return e.when=function(a,b,e,f){var h=new MockHttpExpectation(a,b,e,f),i={respond:function(a,b,c){h.response=d(a,b,c)}};return c&&(i.passThrough=function(){h.passThrough=!0}),g.push(h),i},f("when"),e.expect=function(a,b,c,e){var f=new MockHttpExpectation(a,b,c,e);return h.push(f),{respond:function(a,b,c){f.response=d(a,b,c)}}},f("expect"),e.flush=function(b){if(a.$digest(),!i.length)throw Error("No pending request to flush !");if(angular.isDefined(b))for(;b--;){if(!i.length)throw Error("No more pending request to flush !");i.shift()()}else for(;i.length;)i.shift()();e.verifyNoOutstandingExpectation()},e.verifyNoOutstandingExpectation=function(){if(a.$digest(),h.length)throw Error("Unsatisfied requests: "+h.join(", "))},e.verifyNoOutstandingRequest=function(){if(i.length)throw Error("Unflushed requests: "+i.length)},e.resetExpectations=function(){h.length=0,i.length=0},e}function MockHttpExpectation(a,b,c,d){this.data=c,this.headers=d,this.match=function(b,c,d,e){return a!=b?!1:this.matchUrl(c)?angular.isDefined(d)&&!this.matchData(d)?!1:angular.isDefined(e)&&!this.matchHeaders(e)?!1:!0:!1},this.matchUrl=function(a){return b?angular.isFunction(b.test)?b.test(a):b==a:!0},this.matchHeaders=function(a){return angular.isUndefined(d)?!0:angular.isFunction(d)?d(a):angular.equals(d,a)},this.matchData=function(a){return angular.isUndefined(c)?!0:c&&angular.isFunction(c.test)?c.test(a):c&&!angular.isString(c)?angular.toJson(c)==a:c==a},this.toString=function(){return a+" "+b}}function MockXhr(){MockXhr.$$lastInstance=this,this.open=function(a,b,c){this.$$method=a,this.$$url=b,this.$$async=c,this.$$reqHeaders={},this.$$respHeaders={}},this.send=function(a){this.$$data=a},this.setRequestHeader=function(a,b){this.$$reqHeaders[a]=b},this.getResponseHeader=function(a){var b=this.$$respHeaders[a];return b?b:(a=angular.lowercase(a),(b=this.$$respHeaders[a])?b:(b=void 0,angular.forEach(this.$$respHeaders,function(c,d){b||angular.lowercase(d)!=a||(b=c)}),b))},this.getAllResponseHeaders=function(){var a=[];return angular.forEach(this.$$respHeaders,function(b,c){a.push(c+": "+b)}),a.join("\n")},this.abort=angular.noop}angular.mock={},angular.mock.$BrowserProvider=function(){this.$get=function(){return new angular.mock.$Browser}},angular.mock.$Browser=function(){var a=this;this.isMock=!0,a.$$url="http://server/",a.$$lastUrl=a.$$url,a.pollFns=[],a.$$completeOutstandingRequest=angular.noop,a.$$incOutstandingRequestCount=angular.noop,a.onUrlChange=function(b){return a.pollFns.push(function(){a.$$lastUrl!=a.$$url&&(a.$$lastUrl=a.$$url,b(a.$$url))}),b},a.cookieHash={},a.lastCookieHash={},a.deferredFns=[],a.deferredNextId=0,a.defer=function(b,c){return c=c||0,a.deferredFns.push({time:a.defer.now+c,fn:b,id:a.deferredNextId}),a.deferredFns.sort(function(a,b){return a.time-b.time}),a.deferredNextId++},a.defer.now=0,a.defer.cancel=function(b){var c;return angular.forEach(a.deferredFns,function(a,d){a.id===b&&(c=d)}),void 0!==c?(a.deferredFns.splice(c,1),!0):!1},a.defer.flush=function(b){if(angular.isDefined(b))a.defer.now+=b;else{if(!a.deferredFns.length)throw Error("No deferred tasks to be flushed");a.defer.now=a.deferredFns[a.deferredFns.length-1].time}for(;a.deferredFns.length&&a.deferredFns[0].time<=a.defer.now;)a.deferredFns.shift().fn()},a.$$baseHref="",a.baseHref=function(){return this.$$baseHref}},angular.mock.$Browser.prototype={poll:function(){angular.forEach(this.pollFns,function(a){a()})},addPollFn:function(a){return this.pollFns.push(a),a},url:function(a){return a?(this.$$url=a,this):this.$$url},cookies:function(a,b){return a?void(void 0==b?delete this.cookieHash[a]:angular.isString(b)&&b.length<=4096&&(this.cookieHash[a]=b)):(angular.equals(this.cookieHash,this.lastCookieHash)||(this.lastCookieHash=angular.copy(this.cookieHash),this.cookieHash=angular.copy(this.cookieHash)),this.cookieHash)},notifyWhenNoOutstandingRequests:function(a){a()}},angular.mock.$ExceptionHandlerProvider=function(){var a;this.mode=function(b){switch(b){case"rethrow":a=function(a){throw a};break;case"log":var c=[];a=function(a){c.push(1==arguments.length?a:[].slice.call(arguments,0))},a.errors=c;break;default:throw Error("Unknown mode '"+b+"', only 'log'/'rethrow' modes are allowed!")}},this.$get=function(){return a},this.mode("rethrow")},angular.mock.$LogProvider=function(){function a(a,b,c){return a.concat(Array.prototype.slice.call(b,c))}this.$get=function(){var b={log:function(){b.log.logs.push(a([],arguments,0))},warn:function(){b.warn.logs.push(a([],arguments,0))},info:function(){b.info.logs.push(a([],arguments,0))},error:function(){b.error.logs.push(a([],arguments,0))}};return b.reset=function(){b.log.logs=[],b.warn.logs=[],b.info.logs=[],b.error.logs=[]},b.assertEmpty=function(){var a=[];if(angular.forEach(["error","warn","info","log"],function(c){angular.forEach(b[c].logs,function(b){angular.forEach(b,function(b){a.push("MOCK $log ("+c+"): "+String(b)+"\n"+(b.stack||""))})})}),a.length)throw a.unshift("Expected $log to be empty! Either a message was logged unexpectedly, or an expected log message was not checked and removed:"),a.push(""),new Error(a.join("\n---------\n"))},b.reset(),b}},function(){function a(a){var c;if(c=a.match(d)){var e=new Date(0),f=0,g=0;return c[9]&&(f=b(c[9]+c[10]),g=b(c[9]+c[11])),e.setUTCFullYear(b(c[1]),b(c[2])-1,b(c[3])),e.setUTCHours(b(c[4]||0)-f,b(c[5]||0)-g,b(c[6]||0),b(c[7]||0)),e}return a}function b(a){return parseInt(a,10)}function c(a,b,c){var d="";for(0>a&&(d="-",a=-a),a=""+a;a.length<b;)a="0"+a;return c&&(a=a.substr(a.length-b)),d+a}var d=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?:\:?(\d\d)(?:\:?(\d\d)(?:\.(\d{3}))?)?)?(Z|([+-])(\d\d):?(\d\d)))?$/;angular.mock.TzDate=function(b,d){var e=new Date(0);if(angular.isString(d)){var f=d;if(e.origDate=a(d),d=e.origDate.getTime(),isNaN(d))throw{name:"Illegal Argument",message:"Arg '"+f+"' passed into TzDate constructor is not a valid date string"}}else e.origDate=new Date(d);var g=new Date(d).getTimezoneOffset();e.offsetDiff=60*g*1e3-1e3*b*60*60,e.date=new Date(d+e.offsetDiff),e.getTime=function(){return e.date.getTime()-e.offsetDiff},e.toLocaleDateString=function(){return e.date.toLocaleDateString()},e.getFullYear=function(){return e.date.getFullYear()},e.getMonth=function(){return e.date.getMonth()},e.getDate=function(){return e.date.getDate()},e.getHours=function(){return e.date.getHours()},e.getMinutes=function(){return e.date.getMinutes()},e.getSeconds=function(){return e.date.getSeconds()},e.getMilliseconds=function(){return e.date.getMilliseconds()},e.getTimezoneOffset=function(){return 60*b},e.getUTCFullYear=function(){return e.origDate.getUTCFullYear()},e.getUTCMonth=function(){return e.origDate.getUTCMonth()},e.getUTCDate=function(){return e.origDate.getUTCDate()},e.getUTCHours=function(){return e.origDate.getUTCHours()},e.getUTCMinutes=function(){return e.origDate.getUTCMinutes()},e.getUTCSeconds=function(){return e.origDate.getUTCSeconds()},e.getUTCMilliseconds=function(){return e.origDate.getUTCMilliseconds()},e.getDay=function(){return e.date.getDay()},e.toISOString&&(e.toISOString=function(){return c(e.origDate.getUTCFullYear(),4)+"-"+c(e.origDate.getUTCMonth()+1,2)+"-"+c(e.origDate.getUTCDate(),2)+"T"+c(e.origDate.getUTCHours(),2)+":"+c(e.origDate.getUTCMinutes(),2)+":"+c(e.origDate.getUTCSeconds(),2)+"."+c(e.origDate.getUTCMilliseconds(),3)+"Z"});var h=["getUTCDay","getYear","setDate","setFullYear","setHours","setMilliseconds","setMinutes","setMonth","setSeconds","setTime","setUTCDate","setUTCFullYear","setUTCHours","setUTCMilliseconds","setUTCMinutes","setUTCMonth","setUTCSeconds","setYear","toDateString","toGMTString","toJSON","toLocaleFormat","toLocaleString","toLocaleTimeString","toSource","toString","toTimeString","toUTCString","valueOf"];return angular.forEach(h,function(a){e[a]=function(){throw Error("Method '"+a+"' is not implemented in the TzDate mock")}}),e},angular.mock.TzDate.prototype=Date.prototype}(),angular.mock.createMockWindow=function(){var a={},b=[];return a.document=window.document,a.getComputedStyle=angular.bind(window,window.getComputedStyle),a.scrollTo=angular.bind(window,window.scrollTo),a.navigator=window.navigator,a.setTimeout=function(a,c){b.push({fn:a,delay:c})},a.setTimeout.queue=b,a.setTimeout.expect=function(a){return b.length>0?{process:function(){var c=b.shift();expect(c.delay).toEqual(a),c.fn()}}:void expect("SetTimoutQueue empty. Expecting delay of ").toEqual(a)},a},angular.mock.dump=function(a){function b(a){var d;return angular.isElement(a)?(a=angular.element(a),d=angular.element("<div></div>"),angular.forEach(a,function(a){d.append(angular.element(a).clone())}),d=d.html()):angular.isArray(a)?(d=[],angular.forEach(a,function(a){d.push(b(a))}),d="[ "+d.join(", ")+" ]"):d=angular.isObject(a)?angular.isFunction(a.$eval)&&angular.isFunction(a.$apply)?c(a):a instanceof Error?a.stack||""+a.name+": "+a.message:angular.toJson(a,!0):String(a),d}function c(a,b){b=b||"  ";var d=[b+"Scope("+a.$id+"): {"];for(var e in a)a.hasOwnProperty(e)&&!e.match(/^(\$|this)/)&&d.push("  "+e+": "+angular.toJson(a[e]));for(var f=a.$$childHead;f;)d.push(c(f,b+"  ")),f=f.$$nextSibling;return d.push("}"),d.join("\n"+b)}return b(a)},angular.mock.$HttpBackendProvider=function(){this.$get=["$rootScope",createHttpBackendMock]},angular.mock.$TimeoutDecorator=function(a,b){function c(a){var b=[];return angular.forEach(a,function(a){b.push("{id: "+a.id+", time: "+a.time+"}")}),b.join(", ")}return a.flush=function(){b.defer.flush()},a.verifyNoPendingTasks=function(){if(b.deferredFns.length)throw Error("Deferred tasks to flush ("+b.deferredFns.length+"): "+c(b.deferredFns))},a},angular.mock.$RootElementProvider=function(){this.$get=function(){return angular.element("<div ng-app></div>")}},angular.module("ngMock",["ng"]).provider({$browser:angular.mock.$BrowserProvider,$exceptionHandler:angular.mock.$ExceptionHandlerProvider,$log:angular.mock.$LogProvider,$httpBackend:angular.mock.$HttpBackendProvider,$rootElement:angular.mock.$RootElementProvider}).config(function(a){a.decorator("$timeout",angular.mock.$TimeoutDecorator)}),angular.module("ngMockE2E",["ng"]).config(["$provide",function(a){a.decorator("$httpBackend",angular.mock.e2e.$httpBackendDecorator)}]),angular.mock.e2e={},angular.mock.e2e.$httpBackendDecorator=["$rootScope","$delegate","$browser",createHttpBackendMock],angular.mock.clearDataCache=function(){var a,b=angular.element.cache;for(a in b)if(b.hasOwnProperty(a)){var c=b[a].handle;c&&angular.element(c.elem).unbind(),delete b[a]}},window.jstestdriver&&function(a){a.dump=function(){var b=[];angular.forEach(arguments,function(a){b.push(angular.mock.dump(a))}),jstestdriver.console.log.apply(jstestdriver.console,b),a.console&&a.console.log.apply(a.console,b)}}(window),(window.jasmine||window.mocha)&&function(a){function b(){return c&&(a.mocha||c.queue.running)}var c=null;beforeEach(function(){c=this}),afterEach(function(){var a=c.$injector;c.$injector=null,c.$modules=null,c=null,a&&(a.get("$rootElement").unbind(),a.get("$browser").pollFns.length=0),angular.mock.clearDataCache(),angular.forEach(angular.element.fragments,function(a,b){delete angular.element.fragments[b]}),MockXhr.$$lastInstance=null,angular.forEach(angular.callbacks,function(a,b){delete angular.callbacks[b]}),angular.callbacks.counter=0}),a.module=angular.mock.module=function(){function a(){if(c.$injector)throw Error("Injector already created, can not register a module!");var a=c.$modules||(c.$modules=[]);angular.forEach(d,function(b){a.push(b)})}var d=Array.prototype.slice.call(arguments,0);return b()?a():a},a.inject=angular.mock.inject=function(){function a(){var a=c.$modules||[];a.unshift("ngMock"),a.unshift("ng");var b=c.$injector;b||(b=c.$injector=angular.injector(a));for(var f=0,g=d.length;g>f;f++)try{b.invoke(d[f]||angular.noop,this)}catch(h){throw h.stack&&e&&(h.stack+="\n"+e.stack),h}finally{e=null}}var d=Array.prototype.slice.call(arguments,0),e=new Error("Declaration Location");return b()?a():a}}(window);