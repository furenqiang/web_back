export default class WebSocketService{
  /*
  * 单例模式
  */
  static instance=null
  static get Instance(){
    if(!this.instance){
      this.instance= new WebSocketService()
    }
    return this.instance
  }

  ws=null
  callBackMapping={}
  connectRetryCount=1
  sendRetryCount=0
  //连接服务器的方法
  connect(){
    if(!window.WebSocket){
      return "您的浏览器不支持websocket"
    }
    this.ws=new WebSocket("ws://47.97.200.76:9998")
    //this.ws=new WebSocket("wss://localhost:9998")
    this.ws.onopen=()=>{
      window.console.log("连接成功");
    }
    this.ws.onclose=()=>{
      setTimeout(()=>{
        window.console.log("WebSocket服务已关闭,正在尝试第"+this.connectRetryCount+"次重连");
        this.connect()
        this.connectRetryCount++
      },500*this.connectRetryCount)
    }
    this.ws.onmessage=(msg)=>{
      msg=JSON.parse(msg.data)
      let socketType=msg.socketType
      if(this.callBackMapping[socketType]){
        let action=msg.action
        if(action==='getData'){
          let realData=JSON.parse(msg.data)
          this.callBackMapping[socketType].call(this,realData)
        }else if(action==='fullScreen'){
          this.callBackMapping[socketType].call(this,msg)
        }else if(action==='themeChange'){
          this.callBackMapping[socketType].call(this,msg)
        }
      }
    }
  }
  //注册回调函数
  registerCallBack(socketType,callBack){
    this.callBackMapping[socketType]=callBack
  }
  //销毁回调函数
  unRegisterCallBack(socketType){
    this.callBackMapping[socketType]=null
  }
  //定义发送数据事件
  send(data){
    if(this.ws.readyState===1){
      this.ws.send(JSON.stringify(data))
    }else(
      setTimeout(()=>{
        this.send(data)
      },500*this.sendRetryCount)
    )
  }
}

