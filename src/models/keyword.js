// eslint-disable-next-line import/no-anonymous-default-export
export default {    
    namespace: 'keyword',
    state: '',
    reducers: {
        updateKeyWord (state, action) {                       
            return action.payload.val
        }
    }
}