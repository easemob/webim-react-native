'use strict';

import 'easemob-websdk/dist/strophe-1.2.8'
import websdk from 'easemob-websdk'
import xmldom from 'xmldom'
import config from './WebIMConfig'

// init DOMParser / document for strophe and sdk
// window.WebIM.config.isDebug = true
let WebIM = window.WebIM = websdk;
window.WebIM.config = config;
window.DOMParser = xmldom.DOMParser;
let document = window.document = new DOMParser().parseFromString("<?xml version='1.0'?>\n", 'text/xml');

if (WebIM.config.isDebug) {

  function ts() {
    var d = new Date();
    var Hours = d.getHours(); //获取当前小时数(0-23)
    var Minutes = d.getMinutes(); //获取当前分钟数(0-59)
    var Seconds = d.getSeconds(); //获取当前秒数(0-59)
    return (Hours < 10 ? "0" + Hours : Hours) + ':' + (Minutes < 10 ? "0" + Minutes : Minutes) + ':' + (Seconds < 10 ? "0" + Seconds : Seconds) + ' ';
  }

  window.Strophe.log = function (level, msg) {
    console.log(ts(), level, msg);
  };
  
  window.Strophe.Connection.prototype.rawOutput = function (data) {
    console.group('%csend # ' + ts(), 'color: blue; font-size: large')
    console.log('%c' + data, 'color: blue');
    console.groupEnd();
  };
}

/**
 * Set autoSignIn as true (autoSignInName and autoSignInPwd are configured below),
 * You can auto signed in each time when you refresh the page in dev model.
 */
WebIM.config.autoSignIn = false;
if (WebIM.config.autoSignIn) {
  WebIM.config.autoSignInName = 'liuwz';
  WebIM.config.autoSignInPwd = '1';
}


// var stropheConn = new window.Strophe.Connection("ws://im-api.easemob.com/ws/", {
//                 inactivity: 30,
//                 maxRetries: 5,
//                 pollingTime: 4500
//             });
//
// stropheConn.connect(
//   'easemob-demo#chatdemoui_liuwz@easemob.com',
//   '$t$' + 'YWMtmbQEBKKIEeaGmMtXyg5n1wAAAVlkQvGO2WOJGlMCEJKM4VV9GCMnb_XLCXU',
//   function() {
//     console.log(arguments, 'ggogogo');
//   }, stropheConn.wait, stropheConn.hold);


WebIM.conn = new WebIM.connection({
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
  url: WebIM.config.xmppURL,
  isAutoLogin: false,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval
});

// async response
// WebIM.conn.listen({
//   onOpened: () => dispatch({type: Types.ON_OPEND})
// })

export default WebIM;
