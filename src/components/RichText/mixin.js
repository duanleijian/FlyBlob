
export const styles = {
    Link: { color: '#3b5998', textDecoration: 'underline'},
    Image: { width: '100%', height: 'auto'},
    CodeBlock: { padding:'10px', boxSizing: 'border-box', backgroundColor: '#2d2d2d', color: '#ccc'}
}
// 块级
export const blockStyleFn = (block) => {
    
}
// 菜单操作按钮配置
export const inlineStyles = [
    { class: 'iconfont icon-T-jiacu', inlineStyle: 'BOLD', mode: 'style' },
    { class: 'iconfont icon-zitixieti', inlineStyle: 'ITALIC', mode: 'style' },
    { class: 'iconfont icon-strikethrough', inlineStyle: 'STRIKETHROUGH', mode: 'style' },
    { class: 'iconfont icon-T-xiahuaxian', inlineStyle: 'UNDERLINE', mode: 'style' },
    { class: 'iconfont icon-yinyong', inlineStyle: 'REFEREBCEERROR', mode: 'style' },
    { class: 'iconfont icon-h1', inlineStyle: 'H1', mode: 'style' },
    { class: 'iconfont icon-h2', inlineStyle: 'H2', mode: 'style' },
    { class: 'iconfont icon-h3', inlineStyle: 'H3', mode: 'style' },
    { class: 'iconfont icon-h4', inlineStyle: 'H4', mode: 'style' },
    { class: 'iconfont icon-h5', inlineStyle: 'H5', mode: 'style' },
    { class: 'iconfont icon-h6', inlineStyle: 'H6', mode: 'style' },
    { class: 'iconfont icon-lianjie', inlineStyle: '', mode: 'link' },
    { class: 'iconfont icon-tupian', inlineStyle: '', mode: 'image' },
    { class: 'iconfont icon-daimakuai', inlineStyle: 'code-block', mode: 'block'}    
]
// 菜单执行行内样式
export const customStyleMap = {
    BOLD: {
        fontWeight: 'bold'               
    },
    CODE: {
        fontFamily: 'monospace',
        wordWrap: 'break-word'
    },
    ITALIC: {
        fontStyle: 'italic'
    },
    STRIKETHROUGH: {
        textDecoration: 'line-through'
    },
    UNDERLINE: {
        textDecoration: 'underline'
    },
    REFEREBCEERROR: {
        margin: '20px 0 20px 0',
        display: 'block',
        padding: '20px',
        boxSizing: 'border-box',
        backgroundColor: '#f2f2f2',
        borderLeft: '6px solid #b3b3b3',
        wordBreak: 'break-word'
    },
    UNSTYLE: {        
        marginTop: "12px",
        display: 'inline-block',        
    },
    H1: {
        display: 'block',
        fontWeight: 'bold',
        fontSize: '26px',
        textRendering: 'optimizelegibility',
        lineHeight: '1.7',
        margin: '0 0 15px',
        color: 'rgba(0,0,0,.85)'
    },
    H2: {
        display: 'block',
        fontWeight: 'bold',
        fontSize: '24px',
        textRendering: 'optimizelegibility',
        lineHeight: '1.7',
        margin: '0 0 15px',
        color: 'rgba(0,0,0,.85)'
    },
    H3: {
        display: 'block',
        fontWeight: 'bold',
        fontSize: '22px',
        textRendering: 'optimizelegibility',
        lineHeight: '1.7',
        margin: '0 0 15px',
        color: 'rgba(0,0,0,.85)'
    },
    H4: {
        display: 'block',
        fontWeight: 'bold',
        fontSize: '20px',
        textRendering: 'optimizelegibility',
        lineHeight: '1.7',
        margin: '0 0 15px',
        color: 'rgba(0,0,0,.85)'
    },
    H5: {
        display: 'block',
        fontWeight: 'bold',
        fontSize: '18px',
        textRendering: 'optimizelegibility',
        lineHeight: '1.7',
        margin: '0 0 15px',
        color: 'rgba(0,0,0,.85)'
    },
    H6: {
        display: 'block',
        fontWeight: 'bold',
        fontSize: '16px',
        textRendering: 'optimizelegibility',
        lineHeight: '1.7',
        margin: '0 0 15px',
        color: 'rgba(0,0,0,.85)'
    }
}

export const exportInlineStyles = {
    BOLD: {
        style: {
            fontWeight: 'bold'  
        }                     
    },
    CODE: {
        style: {
            fontFamily: 'monospace',
            wordWrap: 'break-word'
        }        
    },
    ITALIC: {
        style: {
            fontStyle: 'italic'
        }        
    },
    STRIKETHROUGH: {
        style: {
            textDecoration: 'line-through'
        }        
    },
    UNDERLINE: {
        style: {
            textDecoration: 'underline'
        }        
    },
    REFEREBCEERROR: {
        style: {
            margin: '20px 0 20px 0',
            display: 'block',
            padding: '20px',
            boxSizing: 'border-box',
            backgroundColor: '#f2f2f2',
            borderLeft: '6px solid #b3b3b3',
            wordBreak: 'break-word'
        }        
    },
    UNSTYLE: {  
        style: {
            marginTop: "12px",
            display: 'inline-block',
        }                      
    },
    H1: {
        style: {
            display: 'block',
            fontWeight: 'bold',
            fontSize: '26px',
            textRendering: 'optimizelegibility',
            lineHeight: '1.7',
            margin: '0 0 15px',
            color: 'rgba(0,0,0,.85)'
        }        
    },
    H2: {
        style: {
            display: 'block',
            fontWeight: 'bold',
            fontSize: '24px',
            textRendering: 'optimizelegibility',
            lineHeight: '1.7',
            margin: '0 0 15px',
            color: 'rgba(0,0,0,.85)'
        }        
    },
    H3: {
        style: {
            display: 'block',
            fontWeight: 'bold',
            fontSize: '22px',
            textRendering: 'optimizelegibility',
            lineHeight: '1.7',
            margin: '0 0 15px',
            color: 'rgba(0,0,0,.85)'
        }        
    },
    H4: {
        style: {
            display: 'block',
            fontWeight: 'bold',
            fontSize: '20px',
            textRendering: 'optimizelegibility',
            lineHeight: '1.7',
            margin: '0 0 15px',
            color: 'rgba(0,0,0,.85)'
        }        
    },
    H5: {
        style: {
            display: 'block',
            fontWeight: 'bold',
            fontSize: '18px',
            textRendering: 'optimizelegibility',
            lineHeight: '1.7',
            margin: '0 0 15px',
            color: 'rgba(0,0,0,.85)'
        }        
    },
    H6: {
        style: {
            display: 'block',
            fontWeight: 'bold',
            fontSize: '16px',
            textRendering: 'optimizelegibility',
            lineHeight: '1.7',
            margin: '0 0 15px',
            color: 'rgba(0,0,0,.85)'
        }
    }
}
// 获取超链接Entitie对象
export const findLinkEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    )
}
// 获取媒体元素Entitie对象
export const getEntityStrategy = (mutability) => {
    return function(contentBlock, callback, contentState) {
      contentBlock.findEntityRanges(
        (character) => {
          const entityKey = character.getEntity();
          if (entityKey === null) {
            return false;
          }
          return contentState.getEntity(entityKey).getMutability() === mutability;
        },
        callback
      )
    }
}