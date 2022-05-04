import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import style from './index.module.scss'
import { Editor, EditorState, RichUtils, AtomicBlockUtils, convertToRaw, Modifier, CompositeDecorator, convertFromRaw, convertFromHTML, createEditorState} from 'draft-js'
import { styles, customStyleMap, inlineStyles, exportInlineStyles,  getEntityStrategy, findLinkEntities } from './mixin'
// import draftToHtml from 'draftjs-to-html'
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import Immutable from 'immutable'
import 'draft-js/dist/Draft.css'
import Modal from '@/components/Modal'

// 超链接组件
const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a href={url} style={styles.Link}>
            {props.children}
        </a>
    );
}
// 图片组件
const Image = (props) => {
    const { src } = props.contentState.getEntity(props.entityKey).getData();
    return <img src={src} style={styles.Image} alt='' />
}
const CodeBlock = (props) => {
    const { block, offsetKey } = props;    
    return <span>{block.text}</span>
}
// 自定义块样式
const blockRendererFn = (contentBlock) => {
    const type = contentBlock.getType()    
    let result = null
    if (type === 'code-block') {
        // result = {
        //     component: CodeBlock,
        //     editable: false,
        // }
        return 'RichEditor-codeblock'
    }    
    return result
}
export default function RichText(props) {
    let { sendContent, html } = props        
    let photoSelect = null
    const nav = useNavigate()
    // 初始化富文本状态
    const initParam = html? EditorState.createWithContent(stateFromHTML(html)) : () => EditorState.createEmpty(new CompositeDecorator([
        {
            strategy: findLinkEntities,
            component: Link,
        },
        {
            strategy: getEntityStrategy('IMMUTABLE'),
            component: Image
        }
    ]))          
    const [editorState, setEditorState] = useState(initParam)    
    const [dialogShow, setDialogShow] = useState(false)
    const [linkVal, setLinkVal] = useState('')
    const [photoSrc, setPhotoSrc] = useState('')
    const [readOnly, setReadOnly] = useState(false)
    // 富文本状态改变
    const editChange = (editorState) => {
        setEditorState(editorState)
    }
    // 链接地址改变
    const linkValChange = (e) => {
        setLinkVal(e.target.value)
    }
    // 选中文本设置行内样式
    const setInlineStyle = (e, type, mode) => {
        e.preventDefault()
        if (mode.includes('style')) {
            setEditorState(RichUtils.toggleInlineStyle(editorState, type))
        } else if (mode.includes('link')) {
            setDialogShow(!dialogShow)
        } else if (mode.includes('image')) {
            openPhotoSelect()
        } else if (mode.includes('block')) {
            setEditorState(RichUtils.toggleBlockType(editorState, type))
        }
    }
    // 添加文本为超链接
    const confirmLink = (url) => {
        const contentState = editorState.getCurrentContent()
        const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url })
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        let nextEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })
        nextEditorState = RichUtils.toggleLink(nextEditorState, nextEditorState.getSelection(), entityKey)
        setEditorState(nextEditorState)
    }
    //打开图片选择器
    const openPhotoSelect = () => {
        photoSelect.click()
    }
    // 获取图片base64
    const getPototFiles = (e) => {
        let files = e.target.files
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function () {
            setPhotoSrc(reader.result)
            insertPhoto(reader.result)
        }
        reader.onerror = function (error) {
            console.log('Error: ', error)
        }
    }
    // 执行插入图片
    const insertPhoto = (base64Src) => {
        const contentState = editorState.getCurrentContent()
        const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', { src: base64Src })
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })
        setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '))
    }
    const getOpen = (show) => {
        setDialogShow(show)
    }
    const dialogConfirm = () => {
        confirmLink(linkVal)
        setDialogShow(false)
    }
    const dialogCancel = () => {
        setDialogShow(false)
    }
    const convertToInlineStyle = (styleObj) => {
        let newStyleObj = {}
        Object.keys(styleObj).forEach(key => {
            newStyleObj[key] = { style: styleObj[key] }
        })
        return newStyleObj
    }
    const toggleRead = () => {
        setReadOnly(!readOnly)
    }
    // 发布文章
    const articlePublish = (mode) => {
        // if (mode === 'json') {
        //     const raw = convertToRaw(editorState.getCurrentContent())
        //     const rawString = JSON.stringify(raw)
        //     sendContent({mode: 'json', content: rawString})
        // } 
        if (mode === 'html') {            
            const htmlStr = stateToHTML(editorState.getCurrentContent(), {inlineStyles: exportInlineStyles})            
            sendContent({mode: 'html', content: htmlStr, text: editorState.getCurrentContent().getPlainText()})
        }             
    }          
    return (
        <div className={style['rich-text']}>            
            <div className={style['rich-text_menu']}>
                <div className={style['rich-text_menu__left']}>
                    {
                        inlineStyles.map((i, cur) => {
                            return <div key={cur} className={style['rich-text_menu__left___item']} onMouseDown={(e) => { setInlineStyle(e, i.inlineStyle, i.mode) }}>
                                <span className={i.class}></span>
                            </div>
                        })
                    }
                </div>
                <div className={style['rich-text_menu__right']}>
                    <div className={style['rich-text_menu__right___item']} onClick={ () => { articlePublish('html') }}>
                        <span className='iconfont icon-zhuanfa'></span>
                        {html? <span>编辑</span> : <span>发布</span>}                        
                    </div>
                </div>
            </div>
            <div className='rich-text_cont'>
                <Editor readOnly={readOnly} editorState={editorState} customStyleMap={customStyleMap} blockRendererFn={blockRendererFn} onChange={editChange}></Editor>
            </div>
            <Modal open={dialogShow} title="链接绑定" openChange={getOpen} onConfirm={dialogConfirm} onCancel={dialogCancel}>
                <div className={style['modal-content']}>
                    <div className={style['modal-content_item']}>
                        <div className={style['modal-content_item__label']}>
                            <span className='iconfont icon-lianjie'></span>
                        </div>
                        <div className={style['modal-content_item__input']}>
                            <input type="text" placeholder='请输入链接地址' value={linkVal} onChange={linkValChange} />
                        </div>
                    </div>
                </div>
            </Modal>
            <input ref={(e) => { photoSelect = e }} type="file" style={{ display: "none" }} onChange={(e) => { getPototFiles(e) }} />
        </div>
    )
}
RichText.propTypes = {
    sendContent: PropTypes.func.isRequired,
    html: PropTypes.string
}
RichText.defaultProps = {
    sendContent: () => { },
    html: ''
}