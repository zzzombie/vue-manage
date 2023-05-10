<template>
    <div class="tabs">
        <el-tag v-for="(tag,index) in tags" 
        :key="tag.name" 
        :closable="tag.name !== 'home'" 
        :effect="$route.name === tag.name ? 'dark' : 'plain'"
        @click="changeMenu(tag)"
        @close="handleClose(tag,index)"
        size="samll" >{{tag.label}}</el-tag>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'CommonTag',
    data(){
        return{
        }
    },
    computed:{
        ...mapState({
            //获取state中的面包屑列表
            tags: state => state.tab.tabsList
        })
    },
    methods:{
        ...mapMutations({
            // close为别名
            close: 'tab/closeTag'
        }),
        changeMenu(item){
            this.$router.push({name: item.name})
        },
        // 删除tags
        handleClose(tag,index){
            // 获取最后一个tag列表
            const length = this.tags.length -1
            this.close(tag)
            // 删除的不是当前页面的tag，不进行操作
            if(tag.name !== this.$route.name){
                return;
            }
            // 如果当前index是tags里最后一个，删除后向左跳转焦点
            if(index === length){
                this.$router.push({
                    name: this.tags[index -1].name
                })
            }else{
                // 当前tag是在中间，删除后焦点向右跳转
                this.$router.push({
                    name:this.tags[index].name
                })
            }

        }
    }
}
</script>
<style lang="less" scoped>
    .tabs{
        padding: 20px;
        .el-tag{
            margin-right: 15px;
            cursor: pointer;
        }
    }
</style>