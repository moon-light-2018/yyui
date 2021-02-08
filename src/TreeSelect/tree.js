export const tree = [
    {
        value: '1',
        name: '河北',
        children: [
            {
                value: '10',
                name: '沧州',
                children: [
                    { value: '101', name: '沧县' },
                    { value: '102', name: '泊头' },
                    { value: '103', name: '衡水' }
                ]
            }
        ]
    },
    {
        value: '2',
        name: '北京',
        children: [
            { value: '20', name: '朝阳区' },
            { value: '21', name: '西城区', },
            { value: '22', name: '东城区', }
        ]
    },
    {
        value: '3',
        name: '天津',
        children: [
            { value: '31', name: '武清区' },
            { value: '32', name: '津南区' },
            { value: '33', name: '津北区' }
        ]
    }
]
/**
 *  转换tree为obj，obj的key为value，parentIds存储所有父类的value，无父类则返回[]
 * @param {*} tree 树形节点
 * @param {*} parentIds 父级ID
 * @param {*} obj 上一次处理后obj的结果
 */
export const getObjByTree = (tree, parentIds = [], obj = {}) => {
    //遍历树形下的元素结构
    for (let i = 0; i < tree.length; i++) {
        const item = tree[i];
        obj[item.value] = {//设置转换后的属性和值
            ...item,//保存当前数据结构
            parentIds: parentIds //存储所有的父级ID
        }
        if (item.children) {//如果存在子集则递归执行以上逻辑
            getObjByTree(item.children, [...parentIds, item.value], obj)
        }
    }
    return obj
} 