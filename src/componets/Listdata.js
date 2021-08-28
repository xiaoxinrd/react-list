export const getListData = function() {
    // 先拿到本地的数据
    if(!localStorage.getItem('listData')){
        return []
    }else{
        const data = JSON.parse(localStorage.getItem('listData'))
        return data
    }
    // 3.如果有list数据将其取出并转化为数组并返回
}