
// 组件样式
export const styles = {
    Link: { color: '#3b5998', textDecoration: 'underline'},
    Image: { width: '100%', height: 'auto'}
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
    H1: {
        display: 'block',
        fontSize: '26px',
        textRendering: 'optimizelegibility',
        lineHeight: '1.7',
        margin: '0 0 15px',
        color: 'rgba(0,0,0,.85)'
    },
    H2: {
        display: 'block',
        fontSize: '24px',
        textRendering: 'optimizelegibility',
        lineHeight: '1.7',
        margin: '0 0 15px',
        color: 'rgba(0,0,0,.85)'
    },
    H3: {
        display: 'block',
        fontSize: '22px',
        textRendering: 'optimizelegibility',
        lineHeight: '1.7',
        margin: '0 0 15px',
        color: 'rgba(0,0,0,.85)'
    },
    H4: {
        display: 'block',
        fontSize: '20px',
        textRendering: 'optimizelegibility',
        lineHeight: '1.7',
        margin: '0 0 15px',
        color: 'rgba(0,0,0,.85)'
    }
}