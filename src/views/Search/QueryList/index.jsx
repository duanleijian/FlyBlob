import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import style from './index.module.scss'
import { dateToText } from '@/utils/date'
import Constant from '@/constant/constant'
import Pubsub from 'pubsub-js'
import NoData from '@/components/NoData'
import DateSelect from '@/components/DateSelect'
import Loading  from '@/components/Loading'
import { getSearchArticles } from '@/api/article'
function QueryList(props) {    
    let { tabs, dispatch, keyword } = props    
    const nav = useNavigate()
    const [load, setLoad] = useState(true)
    const [total, setTotal] = useState(0)
    const [list, setList] = useState([])
    const [cursor, setCursor] = useState(0)
    const [range, setRange] = useState('')
    const [page, setPage] = useState({pageNum: 1, pageSize: 7})
    const refUseRef = React.useRef()
    const pageRef = React.useRef()    
    refUseRef.current = {list: list, total: total}
    pageRef.current = page         
    useEffect(() => {
        // Pubsub.subscribe(Constant.ARTICLE_SEARCH, (msg, data) => {
        //     queryData(false, {pageNum: 1, pageSize: 7})
        // })
        listenScroll()        
    }, [])
    useEffect(() => {
        refUseRef.current = {list: list, total: total}
        pageRef.current = page
    }, [list, total])        
    useEffect(() => {        
        queryData(false, {pageNum: 1, pageSize: 7})
    }, [cursor, keyword, range])
    const listenScroll = () => {        
        window.onscroll = () => {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            let barHeight = document.documentElement.clientHeight || document.body.clientHeight
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
            if (scrollTop + barHeight === scrollHeight) {                                
                if (refUseRef.current.list.length < refUseRef.current.total) {
                    let curPage = {pageNum: pageRef.current.pageNum + 1, pageSize: pageRef.current.pageSize}
                    setPage(curPage)
                    queryData(true, curPage)
                }                
            }
        }
    }
    const queryData = (mode, curPage) => {
        setLoad(true)        
        getSearchArticles({ keyword: keyword, sort: tabs[cursor].key, dateRange: range, ...curPage }).then(res => { 
            setLoad(false)                              
            if (res.code === 200) {                
                if (mode) {
                    setTotal(res.data.total)
                    setList([...refUseRef.current.list, ...res.data.list])
                } else {
                    setTotal(res.data.total)
                    setList(res.data.list)
                }
            }
        })
    }
    const toggleTab = (cur) => {        
        setCursor(cur)        
    }
    const getSelect = (dateRangle) => {        
        setRange(dateRangle)
    }
    const toDetail = (id) => {
        nav(`/detail/${id}`, {})
    }            
    return (
        <div className={style['query']}>
            <div className={style['query-header']}>
                <div className={style['query-header_list']}>
                    {
                        tabs.map((i, cur) => {
                            return <div key={cur} className={classnames(style['query-header_list__item'], {[style['query-header_list__item___active']]: cur === cursor})} onClick={() => toggleTab(cur) }>{i.name}</div>
                        })
                    }
                </div>
                <DateSelect right="20px" width="120px" sendSelect={getSelect}/>
            </div>
            <div className={style['query-list']}>
                <Loading show={load} loadName="检索文章中..."/>                
                {
                    !load? list.length ? list.map(i => {
                        return <div key={i.articleId} className={style['query-list_item']} onClick={() => { toDetail(i.articleId) }}>
                                    <div className={style['query-list_item__top']}>
                                        <h6 className={style['query-list_item__top___info']}>{i.userNickName}</h6>
                                        <h6 className={style['query-list_item__top___info']}>{i.articleDate? dateToText(i.articleDate) : ''}</h6>
                                    </div>
                                    <div className={style['query-list_item__center']}>
                                        <div className={style['query-list_item__center___title']}>{i.articleTitle}</div>
                                        <div className={style['query-list_item__center___content']}>{i.articleTip.length > 150? i.articleTip.substring(0, 150) + '...' : i.articleTip}</div>
                                    </div>
                                    <div className={style['query-list_item__bottom']}>
                                        <div className={style['query-list_item__bottom___icon']}>
                                            <span className='iconfont icon-dianzan1'></span>
                                            <span className=''>{i.articleLikes}</span>
                                        </div>
                                        <div className={style['query-list_item__bottom___icon']}>
                                            <span className='iconfont icon-pinglun1'></span>
                                            <span className=''>{i.articleComments}</span>
                                        </div>
                                    </div>
                                </div>
                    }) : <NoData /> : ''
                }
            </div>
            {!load? (refUseRef.current.list.length >= refUseRef.current.total && list.length > 0 ? <div className={style['query-nomore']}>没有更多了</div> : '') : ''}
        </div>
    )
}
QueryList.propTypes = {
    tabs: PropTypes.array
}
QueryList.defaultProps = {
    tabs: [{ name: '综合排序', key: 'default' }, { name: '最新推荐', key: 'new' }, { name: '最热推荐', key: 'hot' }]
}
export default connect(({ keyword }) => ({ keyword }))(QueryList);
