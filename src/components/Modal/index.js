import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import PropTypes from 'prop-types'
export default function Modal(props) {
    let { open, title, classes, btnClose, onCancel, onConfirm, onClose, openChange, openText, cancalText, children, height } = props
    const [show, setShow] = useState(open)
    useEffect(() => {        
        setShow(open)
    }, [open])
    useEffect(() => {
        openChange(show)
    }, [show])
    const close = () => {
        setShow(false)
        onClose(false)
    }
    return (
        <div className={`${style['modal']} ${classes} ${show ? style['modal-open'] : ''}`}>
            <div className={style['modal-mask']} onClick={close}></div>
            <div className={style['modal-box']}>
                <div className={style['modal-box_title']}>
                    <span className=''>{title}</span>
                    <div className={style['modal-box_title__close']} onClick={close}>
                        <span className='iconfont icon-guanbi'></span>
                    </div>
                </div>
                <div className={style['modal-box_cont']} style={{height}}>{children}</div>
                {!btnClose ? <div className={style['modal-box_footer']}>
                    <div className={style['modal-box_footer__cancel']} onClick={onCancel}>{cancalText}</div>
                    <div className={style['modal-box_footer__ok']} onClick={onConfirm}>{openText}</div>
                </div> : ''}

            </div>
        </div>
    )
}
Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    classes: PropTypes.string,
    maskClose: PropTypes.bool,
    btnClose: PropTypes.bool,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    onClose: PropTypes.func,
    openText: PropTypes.string,
    cancalText: PropTypes.string,
    openChange: PropTypes.func
}
Modal.defaultProps = {
    open: false,
    title: '标题',
    height: 'auto',
    classes: '',
    maskClose: false,
    btnClose: false,
    onCancel: () => { },
    onConfirm: () => { },
    onClose: () => { },
    openText: '确定',
    cancalText: '取消',
    openChange: () => { }
}
