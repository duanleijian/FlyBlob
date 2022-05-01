export function dateFormat(dateStr, mode) {
    let date = !mode? new Date(dateStr) : new Date(new Date(dateStr).getTime() - (1000 * 60 * 60 * 8)),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hours = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    month = String(month).length < 2 ? '0' + month : month
    day = String(day).length < 2 ? '0' + day : day
    hours = String(hours).length < 2 ? '0' + hours : hours
    min = String(min).length < 2 ? '0' + min : min
    sec = String(sec).length < 2 ? '0' + sec : sec
    return year + '-' + month + '-' + day + ' ' + hours + ':' + min
}

export function dateRangle(range) {
    let dateStr = new Date().toLocaleDateString(),
        year = dateStr.split('/')[0],
        month = dateStr.split('/')[1],
        day = dateStr.split('/')[2],
        start = '',
        end = '';        
    if (range.includes('day')) {
        month = month.length < 2 ? '0' + month : month
        day = day.length < 2 ? '0' + day : day
        start = `${year}-${month}-${day} 00:00:00`
        end = `${year}-${month}-${day} 23:59:59`
        return `${start},${end}`        
    } else if (range.includes('week')) {
        let startStr = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7).toLocaleDateString(),
            startYear = startStr.split('/')[0],
            startMonth = startStr.split('/')[1],
            startDay = startStr.split('/')[2];
            startMonth = startMonth.length < 2 ? '0' + startMonth : startMonth
            startDay = startDay.length < 2 ? '0' + startDay : startDay
            month = month.length < 2 ? '0' + month : month
            day = day.length < 2 ? '0' + day : day
            start = `${startYear}-${startMonth}-${startDay} 00:00:00`
            end = `${year}-${month}-${day} 23:59:59`
            return `${start},${end}`
    } else if (range.includes('month')) {
        let startStr = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30).toLocaleDateString(),
            startYear = startStr.split('/')[0],
            startMonth = startStr.split('/')[1],
            startDay = startStr.split('/')[2];
            startMonth = startMonth.length < 2 ? '0' + startMonth : startMonth
            startDay = startDay.length < 2 ? '0' + startDay : startDay
            month = month.length < 2 ? '0' + month : month
            day = day.length < 2 ? '0' + day : day
            start = `${startYear}-${startMonth}-${startDay} 00:00:00`
            end = `${year}-${month}-${day} 23:59:59`
            return `${start},${end}`
    } else if (range.includes('no')) {
        return ''
    }
     
}

export function getNow() {
    let date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hours = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    month = String(month).length < 2 ? '0' + month : month
    day = String(day).length < 2 ? '0' + day : day
    hours = String(hours).length < 2 ? '0' + hours : hours
    min = String(min).length < 2 ? '0' + min : min
    sec = String(sec).length < 2 ? '0' + sec : sec
    return year + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec
}

export function dateToText(time) {

    let dateTimeStamp = new Date(time).getTime() - 1000 * 60 * 60 * 8    
    let minute = 1000 * 60
    let hour = minute * 60
    let day = hour * 24
    let month = day * 30
    let year = month * 12
    let now = new Date().getTime()
    let diffValue = now - dateTimeStamp
    let result = ""

    if (diffValue < 0) {
        return
    }

    let monthC = diffValue / month
    let weekC = diffValue / (7 * day)
    let dayC = diffValue / day
    let hourC = diffValue / hour
    let minC = diffValue / minute
    let yearC = diffValue / year

    if (yearC >= 1) {
        return "" + parseInt(yearC) + "年前"
    } else if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前"
    } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前"
    } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前"
    } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前"
    } else {
        result = "刚刚";
    }
        
    return result;
}
