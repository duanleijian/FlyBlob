import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Separate from '@/components/Separate/index.jsx'
import Message from '@/components/Message'
import Modal from '@/components/Modal'
import { getUser } from '@/utils/auth'
import style from './index.module.scss'
import { dateFormat } from '@/utils/date'
import { delArticle } from '@/api/article'
import { getAuthorCount } from '@/api/action'
import { getArticleWeek } from '@/api/article'


export default function DataCenter() {
    const nav = useNavigate()
    const [user, setUser] = useState(null)
    const [artId, setArtId] = useState(0)
    const [open, setOpen] = useState(false)
    const [overviews, setOverviews] = useState([
        {
            sub: "关注数",
            count: 0,
            column: 'follows'
        },
        {
            sub: "文章发布数",
            count: 0,
            column: 'articles'
        },
        {
            sub: "文章阅读数",
            count: 0,
            column: 'views'
        },
        {
            sub: "文章点赞数",
            count: 0,
            column: 'loves'
        },
        {
            sub: "文章收藏数",
            count: 0,
            column: 'collects'
        }
    ])
    const [articles, setArticles] = useState([])
   
    useEffect(() => {
        const user = getUser()
        user && setUser(user)
        getAuthorCount(user.userId).then(res => {
            let newOverviews = overviews.concat()
            newOverviews = newOverviews.map((i) => {
                res.data[i.column] && (i.count = res.data[i.column])
                return i
            })
            setOverviews(newOverviews)
        })
        getArticleWeek({ userId: user.userId }).then(res => {
            res.code === 200 && setArticles(res.data)
            console.log('getArticleWeek', res);
        })
    }, [])

    const removeDetail = () => {
        delArticle(artId).then(res => {
            res.code === 200 &&  (Message.success('文章删除成功!'))
            res.code !== 200 &&  (Message.error('文章删除失败!'))
            setOpen(false)
            getArticleWeek({ userId: user.userId }).then(res => {
                res.code === 200 && setArticles(res.data)
            })
        })
    }

    const toDetail = (id) => {
		nav(`/detail/${id}`, {})
	}

    const toEdit = (detail) => {
        console.log('toEdit', detail);
        nav('/update', {state: {detail}})
    }

    const modalToggle = (flag, id) => {
        id && (setArtId(id))
        setOpen(flag)
    }

    return (
        <div className={style['data-center']}>
            <div className={style['data-sub']}>数据概览</div>
            <div className={style['data-overview']}>
                {overviews.map(i => {
                    return  <div className={style['data-overview__item']}>
                                <div className={style['data-overview__item___sub']}>{i.sub}</div>
                                <div className={style['data-overview__item___count']}>{i.count}</div>
                            </div>
                })}
            </div>
            <div className={style['data-sub']}>近期发布</div>
            <div className={style['data-articles']}>
                {
                    articles.map(i => {
                        return  <div className={style['data-articles__item']} key={i.articleId} onClick={() => { toDetail(i.articleId) }}>
                                    <div className={style['data-articles__item___title']}>{ i.articleTitle }</div>
                                    <div className={style['data-articles__item___date']}>{ dateFormat(i.articleDate) } | { i.articleViews }阅读<Separate/>{ i.articleComments }评论<Separate/>{ i.articleLikes }<Separate/>点赞</div>
                                    <div className={style['data-articles__item___actions']} onClick={e => e.stopPropagation()}>
                                        <i className='iconfont icon-caidan'></i>
                                        <div className={style['data-articles__item___actions____menu']}>
                                            <div className={style['data-articles__item___actions____menu_____edit']} onClick={() => { toEdit(i) }}>
                                                <span className='iconfont icon-bianji'></span>
                                                <span>编辑</span>
                                            </div>
                                            <div className={style['data-articles__item___actions____menu_____remove']} onClick={() => { modalToggle(true, i.articleId) }}>
                                                <span className='iconfont icon-shanchu'></span>
                                                <span>删除</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    })
                }
                
            </div>
            <Modal open={open} title='提示' height="auto" onClose={() => { modalToggle(false) }} onCancel={() => { modalToggle(false) }} onConfirm={() => { removeDetail() }}>
                <div style={{fontSize: '15px', textAlign: 'center'}}>确认是否删除该条文章?</div>
            </Modal>
        </div>
    )
}
