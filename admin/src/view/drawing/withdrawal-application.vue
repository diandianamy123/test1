<template>
    <div>
        <Form ref="formObj" :model="formObj" :label-width="60" inline>
            <FormItem label="手机号">
                <Input v-model="formObj.phone" />
            </FormItem>
            <FormItem label="审核状态">
                <Select v-model="formObj.status" clearable style="width:162px;">
                    <Option value="NO_APPLY">未审核</Option>
                    <Option value="ADOPT">通过</Option>
                    <Option value="REFUSE">拒绝</Option>
                </Select>
            </FormItem>
            <FormItem :label-width="20">
                <Button type="primary" @click="search">搜索</Button>
            </FormItem>
        </Form>

        <Table :columns="columns" :data="tableData" stripe></Table>
        <p class="totle">
            <span>USDT总数: {{count.usdtMoney}}</span>&ensp; &ensp;
            <span>手续费总数: {{count.serviceMoney}}</span>&ensp; &ensp;
            <span>统计: {{count.total}}条</span>&ensp; &ensp;
        </p>
        <Page :current="page.current" :total="page.total" @on-change="changePage" class-name="custom-page" />

        <!-- 审核 -->
        <Modal
            v-model="modalExamine"
            title="审核"
            :mask-closable="false"
            width="500">
            <Form ref="examineObj" :model="examineObj" label-position="top">
                <FormItem label="拒绝原因" prop="reason">
                    <Input type="textarea" :rows="2" v-model="examineObj.reason" placeholder="请输入拒绝原因" />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelExamine">拒绝</Button>
                <Button type="primary" @click="okExamine">通过</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { withdrawalCashList, withdrawalCashExamine } from "@/api/api"

export default {
    data () {
        return {
            formObj: {
                phone: "",
                status: ""
            },
            columns: [
                {
                    title: '手机号',
                    key: 'phone',
                    minWidth: 110
                },
                {
                    title: '提币地址',
                    key: 'addressUrl',
                    minWidth: 120
                },
                {
                    title: 'USDT金额',
                    key: 'moneys',
                    minWidth: 90
                },
                {
                    title: '手续费',
                    key: 'serviceMoney',
                    minWidth: 90
                },
                {
                    title: '审核状态',
                    key: 'status',
                    minWidth: 90,
                    render: (h, params) => {
                        let text = "";
                        switch (params.row.status) {
                            case "NO_APPLY":
                                text = "未审核";
                                break;
                            case "ADOPT":
                                text = "通过";
                                break;
                            case "REFUSE":
                                text = "拒绝";
                                break;
                        }

                        return h("span", text)
                    }
                },
                {
                    title: "拒绝原因",
                    key: "reason",
                    minWidth: 110
                },
                {
                    title: "创建时间",
                    key: "createDate",
                    minWidth: 150,
                    render: (h, params) => {
                        return h("span", this.$public.timestampToTime2(params.row.createDate))
                    }
                },
                {
                    title: "操作",
                    minWidth: 90,
                    render: (h, params) => {
                        if (params.row.status == "NO_APPLY") {
                            return h("div", [
                                h("Button", {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.examine(params.row.id);
                                        }
                                    }
                                }, "审核")
                            ])
                        } else {
                            return h("span", "")
                        }
                    }
                }
            ],
            tableData: [],
            count: { 
                usdtMoney: 0,//USDT总数
                serviceMoney: 0,//手续费总数
                total: 0
            },
            page: {
                current: 1,
                size: 10,
                total: 0
            },
            examineObj: {
                id: "",
                reason: ""
            },
            modalExamine: false
        };
    },
    methods: {
        // 搜索
        search() {
            this.page.current = 1;
            this.showTable();
        },
        // 列表
        showTable() {
            let _data = {
                phone: this.formObj.phone,
                status: this.formObj.status,
                type: "ACCOUNT_APPLY_TYPE_OUTCOIN",
                pageIndex: this.page.current,
                pageSize: this.page.size
            };

            for (let i in _data) {
                if (!_data[i]) delete _data[i]
            }

            withdrawalCashList(_data).then(res => {
                if (res.data.code == "200") {
                    this.tableData = res.data.data.page.dataList;
                    this.page.current = res.data.data.page.pageIndex;
                    this.page.total = res.data.data.page.total;
                    this.count.usdtMoney = res.data.data.moneys ? res.data.data.moneys.usdtMoney : 0;
                    this.count.serviceMoney = res.data.data.moneys ? res.data.data.moneys.serviceMoney : 0; 
                    this.count.total = res.data.data.page.total ? res.data.data.page.total :0;
                } else {
                    this.$Message.warning(res.data.msg);
                    this.tableData = [];
                    this.page.current = 1;
                    this.page.total = 0;
                    this.count.usdtMoney = 0;
                    this.count.serviceMoney = 0;
                    this.count.total = 0;
                }
            }).catch(err => {})
        },
        // 分页
        changePage(num) {
            this.page.current = num;
            this.showTable();
        },
        // 审核
        examine(id) {
            this.modalExamine = true;
            this.examineObj.id = id;
        },
        okExamine() {
            this.examineFn(this.examineObj.id, "ADOPT");
        },
        cancelExamine() {
            if (!this.examineObj.reason) {
                this.$Message.warning("请输入拒绝原因");
                return
            }
            this.examineFn(this.examineObj.id, "REFUSE", this.examineObj.reason);
        },
        // 审核函数
        examineFn(id, status, reason) {
            withdrawalCashExamine({
                id: id,
                status: status,
                reason: reason || ""
            }).then(res => {
                if (res.data.code == "200") {
                    this.$Message.success("操作成功");
                    this.showTable();
                } else {
                    this.$Message.warning(res.data.msg)
                }
                this.modalExamine = false;
            }).catch(err => {
                this.modalExamine = false;
            })
        },
    },
    mounted(){
        this.showTable();
    }
};
</script>
<style scoped>
.totle{
  color:red;
  font-size: 20px;
}
</style>
