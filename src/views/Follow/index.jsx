import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import { getUser } from '@/utils/auth'
import { getConcatUser, updateUserRelate } from '@/api/user'
import NoData from '@/components/NoData'
import FollowBtn from '@/components/FollowBtn'
import Message from '@/components/Message'
import defaultAvatar from  "@/common/images/default_avatar.png"
export default function Follow() {    
    const [follows, setFollow] = useState(true)
    const [list, setList] = useState([])
    useEffect(() => {
        if (getUser()) {            
            getConcatUser(getUser()['userRelate']).then(res => {
                res.code === 200 && (setList(res.data))
            })
        }        
    }, [])
    const toggleFollow = (targetId) => {
        let curUserRelate = getUser()['userRelate'].split(',')
        let curUserId =  getUser()['userId']
        if (follows) {
            let cursor = list.findIndex(i => i.userId === targetId)                      
            let index = curUserRelate.findIndex(i => i.userId === targetId)
            curUserRelate.splice(index, 1)
            updateUserRelate({userId: curUserId, userRelate: curUserRelate.join(',')}).then(res => {
                if (res.code === 200) {
                    setFollow(false)
                    setList(list.filter((i, cur) => cur !== cursor))
                    Message.success('取消关注成功!')
                } else {
                    Message.error('取消关注失败!')
                }
            })
        } else {
            curUserRelate.push(targetId)
            updateUserRelate({userId: curUserId, userRelate: curUserRelate.join(',')}).then(res => {
                if (res.code === 200) {
                    setFollow(true)
                    Message.success('关注成功!')
                } else {
                    Message.error('关注失败!')
                }
            })
        }
    }
    return (
        <div className={style['follow']}>
            <div className={style['follow-title']}>我的关注({list.length})</div>
            {list.length ? '' : <NoData />}
            <div className={style['follow-list']}>
                {
                    list.map(i => {
                        return  <div key={i.userId} className={style['follow-list_item']} >
                                    <div className={style['follow-list_item__avatar']}>
                                        <img src={clearInterval.userAvatar? '/api' + i.userAvatar : defaultAvatar} alt="" />
                                    </div>
                                    <div className={style['follow-list_item__info']}>
                                        <div className={style['follow-list_item__info___name']}>{i.userNickName}</div>
                                        <div className={style['follow-list_item__info___introduct']}>{i.userIntroduct? i.userIntroduct : '暂无个人简介'}</div>
                                    </div>
                                    <div className={style['follow-list_item__btn']}>
                                        <FollowBtn curUser={i} click={() => { toggleFollow(i.userId) }}/>
                                    </div>                                    
                                </div>
                    })
                }                
            </div>
        </div>
    )
}
