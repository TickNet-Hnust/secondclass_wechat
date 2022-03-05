/*
 * @Descripttion: 
 * @Author: peterroe
 * @Date: 2022-01-02 15:08:30
 * @LastEditors: peterroe
 * @LastEditTime: 2022-01-02 19:50:24
 */
export default {
    title: '第二课堂小程序端文档',
    themeConfig: {
        nav: [
            { text: 'Guide', link: '/', activeMatch: '^/$|^/guide/' },
            {
                text: 'Address',
                link: 'https://gitlab.com/peterroe/second_class_front_weapp'
            }

        ],
        sidebar: {
            '/': [{
                text: '引导',
                children: [
                    { text: '安装与启动', link: '/guide/dir' },
                    { text: '本地开发', link: '/guide/dev' }
                ]
            }, {
                text: '其他',
                children: [
                    { text: '登录流程', link: '/guide/login' },
                    { text: 'request请求', link: '/guide/request' }
                ]
            }, ]
        }
    }
}