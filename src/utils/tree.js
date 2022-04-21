export function handleTree(data, parent, parentId, id) {
    let vm = this, tree = [], temp;
    for (let i = 0; i < data.length; i++) {        
        if (data[i][parentId] == parent) {            
            let obj = data[i];
            temp = handleTree(data, data[i][id], parentId, id);            
            if (temp.length > 0) {
                obj.children = temp;
            }
            tree.push(obj);
        }
    }    
    return tree;
}