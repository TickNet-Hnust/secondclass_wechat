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
                link: 'https://github.com/peterroe/secondClass_vue2'
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
                text: '目录结构',
                children: [
                    { text: 'src', link: '/guide/src' },
                    { text: 'src/views', link: '/guide/views' },
                    { text: 'src/api', link: '/guide/api' },
                ]
            }, ]
        }
    }
}