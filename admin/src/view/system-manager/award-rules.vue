<template>
    <div>
        <Form :model="formObj" ref="formObj" :label-width="80" :rules="rules" class="rewardRule-form">
            <FormItem label="奖励规则" prop="rewardRule">
                <wang-editor v-model="formObj.rewardRule"></wang-editor>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="submit">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import wangEditor from "@/components/wangEditor/wangEditor";
import { updateConfig,getConfig } from "@/api/api"

export default {
    data () {
        return {
            formObj: {
                rewardRule: ""
            },
            rules: {
                rewardRule: [
                    { required: true, message: "内容不能为空", triggle: "change" }
                ]
            }
        }
    },
     computed: {
        updateUrl() {
            this.upUrl = process.env.NODE_ENV === 'development' ? '/api' : config.baseUrl.pro
            return this.upUrl + config.uploadUrl
        }
    },
    components: {
        wangEditor
    },
    methods: {
          // 查询
        showDisbution() {
            getConfig().then(res => {
                if (res.data.state == "200") {
                    this.formObj.rewardRule = res.data.data.rewardRule;  
                }
            }).catch(err => {})
        },
        submit() {
            this.$refs.formObj.validate(valid => {
                   if (valid) {
                    let _data = 
                        {
                         rewardRule: this.formObj.rewardRule,//用户协议
                        };
                    
                    updateConfig(_data).then(res => {
                        if (res.data.state == "1") {
                            this.$Message.success("保存成功");
                           
                        } else {
                            this.$Message.warning(res.data.msg);
                        }
                         this.showDisbution();
                    }).catch(err => {})
                }
            })
        }
    },
     mounted() {
        this.showDisbution();
    }
}
</script>
<style lang="less" scoped>
.rewardRule-form {
    width: 80%;
    margin: 0 auto;
}
</style>
