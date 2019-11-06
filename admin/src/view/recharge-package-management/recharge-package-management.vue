<template>
    <div class="from-distribution" >
        <Form ref="formObj" :model="formObj" :rules="rules" :label-width="150">
            <FormItem label="套餐名称" prop="pname">
                <Input v-model="formObj.pname" placeholder="套餐名称" />
            </FormItem>
            <FormItem label="每日返利USDT金额" prop="returnMoney">
                <Input v-model="formObj.returnMoney" placeholder="每日返利USDT金额" />
            </FormItem>
            <FormItem label="充值金额" prop="payMoney">
                <Input v-model="formObj.payMoney" placeholder="充值金额" />
            </FormItem>
            <!-- <FormItem label="开始时间" prop="createDate">
                <Date-picker
                    type="datetime"
                    placeholder="选择日期和时间"
                    v-model="formObj.createDate"
                    style="width: 200px"
                    disabled
                ></Date-picker>
            </FormItem>
            <FormItem label="更新时间" prop="updateDate">
                <Date-picker
                    type="datetime"
                    placeholder="选择日期和时间"
                    v-model="formObj.updateDate"
                    style="width: 200px"
                    disabled
                ></Date-picker>
            </FormItem> -->
            <FormItem>
                <Button type="primary" @click="submit">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import config from "@/config";
import { updateProduct, getProduct } from "@/api/api";
export default {
    data() {
        const validateNumber = (rule, value, callback) => {
            if (!this.$public.Ints(value)) {
                callback(new Error("请输入数字"));
            } else {
                callback();
            }
        };
        return {
            formObj: {
                createDate: "",
                updateDate: "",
                recVer: 0,
                pname: "", //套餐名称
                returnMoney: "", //每日返利USDT金额
                payMoney: "" //充值金额
            },
            rules: {
                recVer: [
                    { required: true, message: "recVer不能为空" },
                    { validator: validateNumber, trigger: "change" }
                ],
                pname: [
                    { required: true, message: "套餐名称不能为空", trigger: "change" }
                ],
                returnMoney: [
                    { required: true, message: "每日返利USDT金额不能为空" },
                    { validator: validateNumber, trigger: "change" }
                ],
                payMoney: [
                    { required: true, message: "充值金额不能为空" },
                    { validator: validateNumber, trigger: "change" }
                ],
                createDate: [{ required: true, message: "开始时间不能为空" }],
                updateDate: [{ required: true, message: "更新时间不能为空" }]
            }
        };
    },
    methods: {
        // 查询
        showDisbution() {
            getProduct()
                .then(res => {
                    if (res.data.code == "200") {
                        this.formObj.createDate = res.data.data.createDate;
                        this.formObj.updateDate = res.data.data.updateDate;
                        this.formObj.recVer = res.data.data.recVer;
                        this.formObj.pname = res.data.data.pname;
                        this.formObj.returnMoney = res.data.data.returnMoney;
                        this.formObj.payMoney = res.data.data.payMoney;
                    }
                })
                .catch(err => {});
        },
        // 保存
        submit() {
            this.$refs.formObj.validate(valid => {
                if (valid) {
                    let _data = {
                        pname: this.formObj.pname,
                        returnMoney: this.formObj.returnMoney,
                        payMoney: this.formObj.payMoney
                    };
                    updateProduct(_data)
                        .then(res => {
                            if (res.data.code == "200") {
                                this.$Message.success("保存成功");
                            } else {
                                this.$Message.warning(res.data.msg);
                            }
                            this.showDisbution();
                        })
                        .catch(err => {});
                }
            });
        }
    },
    mounted() {
        this.showDisbution();
    }
};
</script>
<style lang="less">
.from-distribution {
    width: 600px;
    margin: 0 auto;
    margin-top:100px;
}
</style>
