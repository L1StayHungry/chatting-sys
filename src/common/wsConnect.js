// 获取vue实例，用于事件总线、vuex
import App from "@/main.js"

export function wsConnect(ws){
  if(ws == null){
    ws = new WebSocket('ws://127.0.0.1:8082/ws')
    console.log('ws初始化');
    // console.log(ws); 

    ws.onopen = function () {
      let msg = {
        type: "connect",
        dataMap: {
          userid: "1",
        }
      };
      msg.dataMap.userid = sessionStorage.getItem('userId')
      let msgJson = JSON.stringify(msg);
      ws.send(msgJson)
    }

    ws.onmessage = (event) => {
      console.log('onmessage')
      //接收的数据处理
      let msg = JSON.parse(event.data)
      console.log('msg');
      
      window.console.log(msg)

      // 收到的是单聊信息
      if (msg.type == 'singleChat') {
        App.$bus.$emit('get_a_singleChat',msg)
      } 
      // 收到的是群聊信息
      else if(msg.type == 'groupChat'){
        App.$bus.$emit('get_a_groudChat',msg)
      }
      // 收到'添加好友'请求
      else if(msg.type == 'checkAddFriend'){
        console.log('有用户向你发送了好友请求');
        App.$bus.$emit('get_a_addFriend_request',msg)
      }
      // 提交的好友申请得到对方的同意
      else if(msg.type == 'agreeAddFriend'){
        console.log('哈哈哈申请通过');
      }
      // 提交的好友申请被拒绝
      else if(msg.type == 'refuseAddFriend'){
        console.log('呜呜呜被拒绝了');
        
      }
      
    }
    ws.onerror = (error) => {
      console.log(error)
    }
    ws.onclose = function () {
      console.log('连接已关闭')
    }
  }
  return ws;
}