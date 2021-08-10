/*
 * @Descripttion:
 * @Author: 林舒恒
 * @Date: 2021-07-18 16:03:21
 * @LastEditors: 林舒恒
 * @LastEditTime: 2021-08-05 14:50:23
 */
export function filterCourseClassificationList(obj) {
    //挂载子节点与父节点
    let filter = (father, layer) => {
        let array = []
        obj.data.forEach(item => {
            if (item.pid === layer) {
                array.push(item)
            }
        })
        array.forEach(item => {
            let temp = filter(item, item.id)
            if (temp.length != 0) {
                item.children = temp
            }
            // item.__parent__ = father
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
    let temp = filter(null, 0)

    return sortWay(temp)
}

/* map版本 */
// function filter(layer) {
//     let array = []
//     let map = new Map()
//     test.data.forEach((item, index) => {
//         if (item.pid === layer) {
//             map.set(item.id, [])
//         }
//     })
//     array.push(map)
//     map.forEach((value, key, map) => {
//         map.set(key, filter(key))
//     })

//     return array
//         // console.log(map)
// }
