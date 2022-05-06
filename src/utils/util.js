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

export function throttle(func, wait, mustRun) {
    var timeout,
        startTime = new Date();
    return function() {
        var context = this,
            args = arguments,
            curTime = new Date();
        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if (curTime - startTime >= mustRun){
            func.apply(context,args);
            startTime = curTime;            
        // 没达到触发间隔，重新设定定时器
        } else{            
            timeout = setTimeout(func, wait);
        }
    };
};