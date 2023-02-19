// 判断用户设备类型

let type = 0;

let uA = navigator.userAgent.toLowerCase();
let ipad = uA.match(/ipad/i) == "ipad";
let iphone = uA.match(/iphone os/i) == "iphone os";
let midp = uA.match(/midp/i) == "midp";
let uc7 = uA.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
let uc = uA.match(/ucweb/i) == "ucweb";
let android = uA.match(/android/i) == "android";
let windowsce = uA.match(/windows ce/i) == "windows ce";
let windowsmd = uA.match(/windows mobile/i) == "windows mobile"; 
if (ipad || iphone || midp || uc7 || uc || android || windowsce || windowsmd) {
  if (android) type = 1
  else if (iphone) type = 2
  else if (ipad) type = 3
  else type = 1
}

export default type;
