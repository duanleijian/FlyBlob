import React, { useEffect } from 'react'
import style from './index.module.scss'
import { connect } from 'dva'
import PersonAside from './PersonAside'
import PersonContent from './PersonContent'
import { emit } from '@/utils/connect'
import { EmitterEvent } from '@/utils/connect/enum'

function PersonInfo({ setCurAuthor }) {
    useEffect(() => {
        return () => {
            setCurAuthor(null)
            emit(EmitterEvent.SET_AUTHOR_EMPTY, null)
            console.log('卸载');
        }
    }, [])
    return (
        <div className={style['person-info']}>            
            <div className={style['person-info_cont']}>
                <PersonAside width='240px' height='800px' left='0' top='0'/>
                <PersonContent width='800px' height='800px' left='20px' top='0'/>
            </div>            
        </div>
    )
}
const mapStateToProps = (state) => {
    const { user: {curAuthor } } = state
    return { curAuthor }
}
const mapDispatchToProps = (dispatch) => ({
	setCurAuthor(author) {
		dispatch({ type: 'user/updateAuthor', payload: { author }})
	}
})
export default connect(mapStateToProps, mapDispatchToProps)(PersonInfo);
