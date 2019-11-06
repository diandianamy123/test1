<template>
    <div>
        <Form ref="formEdit" :model="formEdit" :rules="rules" :label-width="90" style="width:800px; margin:0 auto;">
            <FormItem label="中文标题：" prop="zhTitle">
                <Input v-model="formEdit.zhTitle" placeholder="请输入中文标题" />
            </FormItem>
            <FormItem label="中文内容：" prop="zhContent">
                <vue-ueditor-wrap v-model="formEdit.zhContent" :config="myConfig" :destroy="true"></vue-ueditor-wrap>
            </FormItem>
            <FormItem label="英文标题：" prop="enTitle">
                <Input v-model="formEdit.enTitle" placeholder="请输入英文标题" />
            </FormItem>
            <FormItem label="英文内容：" prop="enContent">
                <vue-ueditor-wrap v-model="formEdit.enContent" :config="myConfig" :destroy="true"></vue-ueditor-wrap>
            </FormItem>
            <FormItem label="">
                <Button type="primary" @click="submit">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
    data () {
        return {
            msg: "<h2><img src='http://img.baidu.com/hi/jx2/j_0003.gif'/>Vue + UEditor + v-model双向绑定</h2>",
            myConfig: {
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 240,
                // 初始容器宽度
                initialFrameWidth: 710,
            },
            formEdit: {
                zhTitle: "",
                enTitle: "",
                zhContent: "",
                enContent: ""
            },
            rules: {
                zhTitle: [
                    { required: true, message: "中文标题不能为空", trigger: "change" } 
                ],
                zhContent: [
                    { required: true, message: "中文内容不能为空", trigger: "change" } 
                ],
                enTitle: [
                    { required: true, message: "英文标题不能为空", trigger: "change" } 
                ],
                enContent: [
                    { required: true, message: "英文内容不能为空", trigger: "change" } 
                ]
            },
        }
    },
    components: {
        VueUeditorWrap
    },
    methods: {
        // 保存
        submit() {
            this.$refs.formEdit.validate(valid => {
                if (valid) {

                }
            })
        }
    },
    mounted() {}
}
</script>
