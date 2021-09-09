const css = '#chrome-hosts-manager-ipaddr{display:inline-block;position:fixed;bottom:15px;left:5px;z-index:2147483647;width:auto;height:auto;margin:0;padding:0 .5em;border:0;border-radius:6px;background:rgba(0,0,0,.3);-webkit-transition:background 1s;cursor:pointer;line-height:1.3em;letter-spacing:normal;text-align:center;text-indent:0;text-decoration:none;font-family:tahoma,arial;font-size:20px;font-weight:bold;color:#fff}#chrome-hosts-manager-ipaddr:hover{background:rgba(0,0,0,.7)}';

function reddenPage(ip) {
  console.log(ip)
  let ipTarget = document.getElementById("chrome-hosts-manager-ipaddr")
  if(ipTarget){
    ipTarget.innerHTML=ip
  }else{
    ipTarget=document.createElement("div");            
    ipTarget.innerHTML=ip;            
    ipTarget.id="chrome-hosts-manager-ipaddr";
    ipTarget.title= "点击隐藏"       
    document.body.appendChild(ipTarget)
    ipTarget.addEventListener("click",function(){
      ipTarget.parentNode.removeChild(ipTarget);            
    }); 
  }
}

function handleScipt(current){
  chrome.scripting.executeScript({
    target: { tabId: current.tabId},
    function: reddenPage,
    args: [current.ip],
  });
  chrome.scripting.insertCSS({
      target: {tabId: current.tabId},
      css: css,
  })
}




chrome.webRequest.onCompleted.addListener(function(current1){
  chrome.webNavigation.onCompleted.addListener(function(current2){
    handleScipt(Object.assign({},current2,current1))
  })
},{urls: ["http://*/*","https://*/*"],types:["main_frame"]});

