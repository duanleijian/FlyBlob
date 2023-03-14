import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import MessageCont from './MessageCont'
import style from './index.module.scss'
let notification = null
class Message extends Component {
    msgNo = 0
    state = {doms: []}
    getUuid() {
        return "notification-" + new Date().getTime() + "-" + this.msgNo++;
    }
    add (uuid, type, content) {
        let {doms} = this.state               
        this.setState({doms: [...doms, {uuid, type, content}]})
    }
    remove(uuid) {
        let {doms} = this.state
        this.setState({doms: doms.filter(i => i.uuid !== uuid)})
    }
    render() {
        let {doms} = this.state
        return (
            <div ref='domBox' className={style['message']}>
                {
                    doms.map((i, cur) => {
                        return <MessageCont key={i.uuid} {...i} len={doms.length} preTop={cur === 0? 0 : this.refs['domBox'].children[cur - 1].offsetTop}/>
                    })
                }
            </div>
        )
    }
}
Message.getNewNotification = () => {        
    if(!notification) {
        let div = document.createElement('div');
        div.setAttribute('id', 'message-box')
        document.body.appendChild(div)        
        ReactDOM.render(<Message ref={(e) => { notification = e }}/>, div)                   
        return notification
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {    
    success: (content) => { 
        Message.getNewNotification()  
        let uuid = notification.getUuid()
        notification.add(uuid, 'success', content)        
        setTimeout(() => {
            notification.remove(uuid)
        }, 3000);
    },
    error: (content) => {
        Message.getNewNotification()
        let uuid = notification.getUuid()
        notification.add(uuid, 'error', content)
        setTimeout(() => {
            notification.remove(uuid)
        }, 3000);
    },
    warn: (content) => { 
        Message.getNewNotification()       
        let uuid = notification.getUuid()
        notification.add(uuid, 'warn', content)
        setTimeout(() => {
            notification.remove(uuid)
        }, 3000);
    }
}

