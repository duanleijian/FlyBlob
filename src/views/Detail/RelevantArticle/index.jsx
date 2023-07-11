import React, { useState, useEffect, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './index.module.scss'
import PropTypes from 'prop-types'
import { getConcatArticles } from '@/api/article'
import Loading from '@/components/Loading'
function RelevantArticle(props) {
    let { top, article } = props
    const nav = useNavigate()
    const [data, setData] = useState({
        load: false,
        list: []
    })
    useEffect(() => {        
        if (JSON.stringify(article) !== "{}") {
            setData({ ...data, load: true })
            getConcatArticles(article.articleId).then(res => {                
                setData({ load: false, list: res.data })
            })
        }
    }, [article])
    const toDetail = (id) => {
        nav(`/detail/${id}`, {})
    }
    return (
        <div className={style['relevant-article']} style={{marginTop: top}}>
            <div className={style['relevant-article_header']}>相关文章</div>
            <div className={style['relevant-article_cont']}>
                <Loading show={data.load} width="15%" loadType="bubbles" boxHeight="50px"/>
                {
                    data.list.slice(0, 5).map(i => {
                        return  <div key={i.articleId} className={style['relevant-article_cont__item']} onClick={() => { toDetail(i.articleId) }}>
                                    <div className={style['relevant-article_cont__item___title']}>{i.articleTitle.length > 15? i.articleTitle.substr(0, 15) + '...' : i.articleTitle}</div>
                                    <div className={style['relevant-article_cont__item___counts']}>
                                        <div className={style['relevant-article_cont__item___counts____item']}>
                                            {/* <span className='iconfont icon-liulan'></span> */}
                                            <span>浏览</span>
                                            <span>{i.articleViews}</span>
                                        </div>                                        
                                    </div>
                                </div>
                    })
                }
                
            </div>
        </div>
    )
}
RelevantArticle.propTypes = {
    top: PropTypes.string,
    article: PropTypes.object
}
RelevantArticle.defaultProps = {
    top: '0',
    article: {}
}

export default memo(RelevantArticle)
