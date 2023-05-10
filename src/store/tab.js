// import router from '@/router'
import Cookie from 'js-cookie'
export default{
    namespaced: true,
    state:{
        isCollapse:false,
        // 面包屑数据
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        // tags当前高亮
        currentMenu: null,
        // 菜单配置
        menu:[],
    },
    mutations:{
        // aside是否折叠
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        // 点击左侧菜单存储面包屑数据
        selectMenu(state,val){
            if(val.name !== 'home'){
                // 点击的不是首页home
                state.currentMenu = val
                // 点击的菜单是否已经存在
                const result = state.tabsList.findIndex(item => item.name === val.name)
                // 不存在
                if(result === -1){
                    // 存入数据
                    state.tabsList.push(val)
                }
            }else{
                // 重置
                state.currentMenu = null
            }
        },
        closeTag(state,val){
            // 将传入的tag与传入路由中name进行比较，存在的话result为非-1的值
            const result = state.tabsList.findIndex(item => item.name === val.name)
            // 将result这个索引的值删除
            state.tabsList.splice(result,1)
        },
        // 动态添加路由
        setMenu(state,val){
            state.menu = val
            Cookie.set('menu',JSON.stringify(val))
        },
        clearMenu(state){
            state.menu = []
            Cookie.remove('menu')
        },
        // 处理后台返回的menu
        addMenu(state,router){
            if(!Cookie.get('menu')){
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray =[]
            menu.forEach(item => {
                // 添加路由指向
                if(item.children){
                    item.children = item.children.map(item => {
                        item.component = () => import (`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component = () => import (`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            //动态路由添加
            menuArray.forEach(item => {
                router.addRoute('Main',item)
            })
        }
    }
}