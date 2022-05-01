export const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        console.log(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

export const getStrLen = (str) => {
    let count = 0
    for (let i = 0, len = str.length; i < len; i++) {
        if(/[\u4e00-\u9fa5]/.test(str.charAt(i))) {
            count += 2
        } else if(str.charAt(i) === " ")  {
            count += 0
        } else {
            count += 1
        }
                
    }    
    return count
}