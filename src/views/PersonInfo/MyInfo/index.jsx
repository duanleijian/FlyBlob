import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import FormInput from '../FormInput'
import FormText from '../FormText'
import { connect } from 'dva'
import { getToken } from '@/utils/auth'
import { getUser, updateUser } from '@/api/user'
import Message from '@/components/Message'

function MyInfo({ curAuthor }) {
	const [form, setForm] = useState({ 
		userId: undefined,
		userNickName: undefined,				
		userOrgnName: undefined,	
		userAddress: undefined,
		userPosition: undefined, 
		userEmail: undefined,
		userMajor: undefined,
		userIntroduct: undefined 
	})	
	useEffect(() => {
		if (curAuthor) {
			setForm({ ...curAuthor })
		} else {
			let token = getToken()
			getUser(token).then(res => {									
				res.code === 200 && (setForm({
					userId: res.data[0].userId,
					userNickName: res.data[0].userNickName,
					userOrgnName: res.data[0].userOrgnName,
					userAddress: res.data[0].userAddress,
					userPosition: res.data[0].userPosition,
					userEmail: res.data[0].userEmail,
					userMajor: res.data[0].userMajor,
					userIntroduct: res.data[0].userIntroduct,
				}))			
			})
		}
	}, [])	
	const getInputVal = (data) => {		
		setForm({ ...form, [data.key]: data.val })						
	}
	const confirmSubmit = () => {		
		updateUser(form).then(res => {
			res.code === 200? Message.success('保存成功!') : Message.error(`保存失败: ${res.msg}`)
		})
	}	
	return (
		<div className={style['my-info']}>
			<div className={style['my-info_form']}>							
				<FormInput label='昵称' model="userNickName" value={form.userNickName} tip="填写你的昵称" sendValue={getInputVal} width="350px" top="20px" left='20px'/>
				<FormInput label='现居城市' model="userAddress" value={form.userAddress} tip="填写你的现居城市" sendValue={getInputVal} width="350px" top="20px" left='40px'/>
				<FormInput label='公司名称' model="userOrgnName" value={form.userOrgnName} tip="填写你的公司名称" sendValue={getInputVal} width="350px" top="20px" left='20px'/>
				<FormInput label='个人职业' model="userPosition" value={form.userPosition} tip="请填写你的个人职业" sendValue={getInputVal} width="350px" top="20px" left='40px'/>
				<FormInput label='电子邮箱' model="userEmail" value={form.userEmail} tip="填写你的电子邮箱" sendValue={getInputVal} width="350px" top="20px" left='20px'/>
				<FormInput label='所学专业' model="userMajor" value={form.userMajor} tip="填写你的所学专业" sendValue={getInputVal} width="350px" top="20px" left='40px'/>
				<FormText label='个人介绍' model="userIntroduct" value={form.userIntroduct} tip="填写职业技能、个人爱好" sendValue={getInputVal} labelWidth="70px" width="740px" height="200px" top="20px" left='20px' />
				<div className={style['my-info_form__submit']} onClick={confirmSubmit}>保存提交</div>
			</div>			
		</div>
	)
}
const mapStateToProps = (state) => {
    const { user: { curUser, curAuthor } } = state
    return { curUser, curAuthor }
}
export default connect(mapStateToProps)(MyInfo);
