/*
 * @Description: 
 * @Autor: 张津瑞
 * @Date: 2021-08-13 22:16:02
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-15 15:08:21
 */
export function filterGroupClassificationList(data) {
    //挂载子节点与父节点
    let filter = (father_id) => {
            let array = []
            data.forEach(item => {
                if (item.parentId === father_id) {
                    array.push(item)
                }
            })
            array.forEach(item => {
                let temp = filter(item.id)
                if (temp.length != 0) {
                    item.children = temp
                }
            })
            return array
        }
        //排序
    let sortWay = array => {
            array.sort(function(a, b) {
                return a.sort - b.sort
            })
            array.forEach(item => {
                item.children && sortWay(item.children)
            })
            return array
        }
        //赋值第一层的id和parentId
    let temp = filter(0)

    return sortWay(temp)
}