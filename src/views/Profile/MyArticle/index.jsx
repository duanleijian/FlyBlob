import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import style from './index.module.scss'
import { getUser } from '@/utils/auth'
import { delArticle, getArticlesByUser } from '@/api/article'
import NoData from '@/components/NoData'
import Message from '@/components/Message'
import Modal from '@/components/Modal'
export default function MyArticle({ author }) {
    const nav = useNavigate()
    const [artId, setArtId] = useState(0)
    const [list, setList] = useState([])
    const [open, setOpen] = useState(false)
    useEffect(() => {
        fetchDetail()
    }, [])
    const fetchDetail = () => {
        if (author) {
            getArticlesByUser(author.userId).then(res => {
                res.code === 200 && (setList(res.data))
            })
        } else {
            let user = getUser()
            if (user) {
                getArticlesByUser(user.userId).then(res => {
                    res.code === 200 && (setList(res.data))
                })
            }
        }
    }
    const toDetail = (id) => {
        nav(`/detail/${id}`, {})
    }
    const toEditDetail = (detail) => {
        nav('/update', {state: {detail}})
    }
    const removeDetail = () => {
        delArticle(artId).then(res => {
            res.code === 200 &&  (Message.success('文章删除成功!'))
            res.code !== 200 &&  (Message.error('文章删除失败!'))
            setOpen(false)
            fetchDetail()
        })
    }
    const modalToggle = (flag, id) => {
        id && (setArtId(id))
        setOpen(flag)
    }
    return (
        <div className={style['myarticle-list']}>
            {list.length ? '' : <NoData />}
            {
                list.map(i => {
                    return <div key={i.articleId} className={style['myarticle-list_item']} onClick={() => { toDetail(i.articleId) }}>
                        <div className={style['myarticle-list_item__title']}>{i.articleTitle}</div>
                        <div className={style['myarticle-list_item__content']}>{i.articleTip.length > 150 ? i.articleTip.substring(0, 150) + '...' : i.articleTip}</div>
                        <div className={style['myarticle-list_item__info']}>
                            <div className={style['myarticle-list_item__info___icon']}>
                                <span className='iconfont icon-zuozhe'></span>
                                <span>{i.userNickName}</span>
                            </div>
                            <div className={style['myarticle-list_item__info___icon']}>
                                <span className='iconfont icon-liulan'></span>
                                <span>{i.articleViews}</span>
                            </div>
                            <div className={style['myarticle-list_item__info___icon']}>
                                <span className='iconfont icon-dianzan'></span>
                                <span>{i.articleLikes}</span>
                            </div>
                            <div className={style['myarticle-list_item__info___icon']}>
                                <span className='iconfont icon-pinglun'></span>
                                <span>{i.articleComments}</span>
                            </div>
                            <div className={style['myarticle-list_item__info___action']} onClick={e => e.stopPropagation()}>
                                <div className={style['myarticle-list_item__info___action____box']}>
                                    <div className={style['myarticle-list_item__info___action____box_____edit']} onClick={() => { toEditDetail(i) }}>
                                        <span className='iconfont icon-bianji'></span>
                                        <span>编辑</span>
                                    </div>
                                    <div className={style['myarticle-list_item__info___action____box_____remove']} onClick={() => { modalToggle(true, i.articleId) }}>
                                        <span className='iconfont icon-shanchu'></span>
                                        <span>删除</span>
                                    </div>
                                </div>                                
                                <span className='iconfont icon-youcecaidan'></span>                                
                            </div>
                        </div>

                    </div>
                })
            }
            <Modal open={open} title='提示' height="auto" onClose={() => { modalToggle(false) }} onCancel={() => { modalToggle(false) }} onConfirm={() => { removeDetail() }}>
                <div style={{fontSize: '15px', textAlign: 'center'}}>确认是否删除该条文章?</div>
            </Modal>
        </div>
    )
}
MyArticle.propTypes = {
    author: PropTypes.object
}
MyArticle.defaultProps = {
    author: null
}