import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import Message from '@/components/Message'
import { uploadUserAvatar } from '@/api/user'
import { setUser, getUser } from '@/utils/auth'
export default function AvatarUpload() {
    let fileEl = null
    const [userInfo, setUserInfo] = useState({})
    const [isUpload, setIsUpload] = useState(false)
    const [curPhoto, setCurPhoto] = useState(require('@/common/images/default_avatar.png'))
    useEffect(() => {
        getUser() && setUserInfo(getUser())
    }, [])    
    const selectFile = () => {        
        fileEl.click()
    }
    const fileChange = (e) => {        
        let files = e.target.files
        let file = e.target.files[0]
        const formData = new FormData()
        formData.append('avatar', file)                                            
        formData.append('userId', userInfo.userId)
        uploadUserAvatar(formData).then(res => {
            if (res.code === 200 ) {
                setUser(res.data)
                setUserInfo(res.data)
                Message.success('头像上传成功!')
            }
            res.code !== 200 && (Message.error('头像上传失败!'))
            setIsUpload(true)
        })                                                    
        setCurPhoto(window.URL.createObjectURL(files[0]))        
    }
    const fileError = () => {

    }
    return (
        <div className={style['avatar-upload']}>            
                <input ref={(e) => { fileEl = e} } type="file" multiple="multiple" name="avatar" style={{display: 'none'}} onChange={(e) => { fileChange(e) }}/>                
                <div className={style['avatar-upload_area']}>
                    {curPhoto? <img className={style['avatar-upload_area__avatar']} src={!isUpload? (userInfo.userAvatar? '/api' + userInfo.userAvatar : curPhoto) : (curPhoto)} onError={fileError} alt=""/> : ''}                    
                    <div className={style['avatar-upload_area__mask']} onClick={selectFile}>
                        <span className='iconfont icon-camera'></span>
                    </div>                
                </div>                        
        </div>
    )
}

