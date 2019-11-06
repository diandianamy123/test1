<template>
    <div>
        <Form ref="formEdit" :model="formEdit" :rules="rules" :label-width="90" style="width:800px; margin:0 auto;">
            <FormItem label="标题：" prop="title">
                <Input v-model="formEdit.title" placeholder="请输入标题" />
            </FormItem>
            <FormItem label="中文内容：" prop="content">
                <wang-editor v-model="formEdit.content"></wang-editor>
            </FormItem>
            <FormItem label="">
                <Button type="primary" @click="submit">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import wangEditor from "@/components/wangEditor/wangEditor";
import config from "@/config"
import { 
    platformAdd,
    platformModify,
    platformDetails
} from "@/api/api"

export default {
    data () {
        return {
            formEdit: {
                title: "",
                content: "",
            },
            rules: {
                title: [
                    { required: true, message: "中文标题不能为空", trigger: "change" } 
                ],
                content: [
                    { required: true, message: "中文内容不能为空", trigger: "change" } 
                ],
            },
        }
    },
    components: {
        wangEditor
    },
    methods: {
        // 保存
        submit() {
            this.$refs.formEdit.validate(valid => {
                if (valid) {
                    platformModify({
                        id: this.formEdit.id,
                        title: this.formEdit.title,
                        content: this.formEdit.content
                    }).then(res => {
                        if (res.data.code == "200") {
                            this.$Message.success("修改成功");
                            this.$router.push("/content-manager/platform-info");
                        } else {
                            this.$Message.warning(res.data.msg);
                        }
                    }).catch(err => {})
                }
            })
        },
        // 获取详情
        obntainDetails(id) {
            platformDetails({id: id}).then(res => {
                if (res.data.code == "200") {
                    this.formEdit = res.data.data;
                } else {
                    this.$Message.warning(res.data.msg);
                }
            }).catch(err => {})
        },
    },
    mounted() {
        if (this.$route.query.id) {
            this.obntainDetails(this.$route.query.id);
        }
    }
}
</script>
<style lang="less" scoped>
.file-img {
    width: auto;
    height: 90px;
}
</style>
