import React, { useState, useEffect } from 'react'
import BraftEditor from 'braft-editor'
import PropTypes from 'prop-types'
import 'braft-editor/dist/index.css'
import style from './index.module.scss'
import { editorControls } from './editorConfig'
function RichEditor(props) {
    let { html, getText, readOnly } = props
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState(html || null))
    useEffect(() => {
        setEditorState(BraftEditor.createEditorState(html))
    }, [])

    const handleEditorChange = (val) => {
        setEditorState(val)
        submitContent()
    }

    const submitContent = () => {
        const htmlContent = editorState.toHTML()
        getText({content: htmlContent, text: editorState.getCurrentContent().getPlainText()})
    }

    return (
        <div className={style['rich-editor']}>
            {readOnly
            ? <BraftEditor value={editorState} controls={editorControls} contentClassName={style['rich-container']} readOnly={readOnly}/>             
            : <BraftEditor value={editorState} controls={editorControls} onChange={handleEditorChange} onSave={submitContent} contentClassName={style['rich-container']}/>}
            
        </div>
    )
}

RichEditor.propTypes = {
    getText: PropTypes.func,
    html: PropTypes.string,
    readOnly: PropTypes.bool
}

RichEditor.defaultProps = {
    getText: () => {},
    html: "",
    readOnly: false,
}

export default RichEditor
