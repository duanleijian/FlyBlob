import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'
export default function Card(props) {
    let {title, link, linkNoIcon, left, top, contHeight, click} = props
    const triggerClick = () => {
        click()
    }
    return (
        <div className='card' style={{marginLeft: left, marginTop: top}} >
            <div className='card-title'>{title}</div>
            <div className='card-content' style={{height: contHeight}}>{props.children}</div>
            <div className='card-link' onClick={triggerClick}>                
                <span className={linkNoIcon? '' : 'card-link_text'}>{link}</span>                
                {linkNoIcon? <span className='iconfont icon-youjiantou'></span> : ''}                
            </div>
        </div>
    )
}
Card.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    linkNoIcon: PropTypes.bool,
    top: PropTypes.string,
    left: PropTypes.string,
    contentHeight: PropTypes.string,
    click: PropTypes.func
}
Card.defaultProps = {
    title: '推荐作者',
    link: '查看所有作者',
    linkNoIcon: true,
    top: '0px',
    left: '0px',
    contHeight: '200px',
    click: () => {}
}
