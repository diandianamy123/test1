<template>
    <div>
        <Form ref="formAdd" :model="formAdd" :rules="rules" :label-width="90" class="custom-form">
            <!-- <FormItem label="原密码" prop="old">
                <Input v-model="formAdd.old" placeholder="请输入原密码" />
            </FormItem> -->
            <FormItem label="新密码" prop="new">
                <Input v-model="formAdd.new" placeholder="请输入新密码" />
            </FormItem>
            <FormItem label="确认密码" prop="pd">
                <Input v-model="formAdd.pd" placeholder="请再次输入密码" />
            </FormItem>
            <FormItem label="">
                <Button type="primary" @click="submit">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import { modifyPassword } from "@/api/api"
import Cookies from "js-cookie"
export default {
    data () {
        const validateNumber = (rule, value, callback) => {
            if (!this.$public.pwds(value)) {
                callback(new Error('密码格式为8-20数字加字母'));
            } else {
                callback();
            }
        };
        const validateNumber2 = (rule, value, callback) => {
            if (!this.$public.pwds(value)) {
                callback(new Error('密码格式为8-20数字加字母'));
            } else if (value != this.formAdd.new) {
                callback(new Error('两次密码不一致'));
            } else {
                callback();
            }
        };
        
        return {
            formAdd: {
                old: "",
                new: "",
                pd: "",
            },
            rules: {
                old: [
                    { required: true, message: "原密码不能为空" },
                    { validator: validateNumber, trigger: "change" }
                ],
                new: [
                    { required: true, message: "新密码不能为空" },
                    { validator: validateNumber, trigger: "change" }
                ],
                pd: [
                    { required: true, message: "确认密码不能为空" },
                    { validator: validateNumber2, trigger: "change" }
                ],
            }
        }
    },
    methods: {
        // 保存
        submit() {
            this.$refs.formAdd.validate(valid => {
                if (valid) {
                    modifyPassword({
                        id: Cookies.get("userId"),
                        password: this.$public.fiveMd5(this.formAdd.new, this)
                    }).then(res => {
                        if (res.data.state > 0) {
                            this.$Message.success("修改成功");
                            Cookies.remove("token");
                            Cookies.remove("access");
                            Cookies.remove("userId");
                            localStorage.tagNaveList = [];
                            this.$router.push("/login");
                        } else {
                            this.$Message.warning(res.data.msg);
                        }
                    }).catch(err => {})
                }
            })
        }
    }
}
</script>
