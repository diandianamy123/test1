<template>
    <div>
        <Form ref="formObj" :model="formObj" :label-width="60" inline>
            <FormItem label="手机号">
                <Input v-model="formObj.phone" />
            </FormItem>
            <FormItem :label-width="20">
                <Button type="primary" @click="search">搜索</Button>
            </FormItem>
        </Form>

        <Table :columns="columns" :data="tableData" stripe></Table>
         <p class="totle">
      <span>USDT总数: {{count.sumMoneys}}</span>&ensp; &ensp;
        <span>统计: {{count.total}}条</span>&ensp; &ensp;
    </p>
        <Page :current="page.current" :total="page.total" @on-change="changePage" class-name="custom-page" />
    </div>
</template>

<script>
import { customerList,updateFunPw } from "@/api/api"
import { fiveMd5 } from '@/libs/public'
export default {
    data () {
        return {
            formObj: {
                phone: ""
            },
            columns: [
                {
                    title: '手机号',
                    key: 'phone'
                },
                {
                    title: 'USDT资产',
                    key: 'account'
                },
                {
                    title: "等级",
                    key: "leve",
                    render: (h, params) => {
                        let text = "";
                        switch (params.row.leve) {
                            case "GUEST":
                                text = "游客";
                                break;
                            case "VIP":
                                text = "普通会员";
                                break;
                            default: 
                                text = params.row.leve;
                                break;
                        }
                        return h("span", text)
                    }
                },
                {
                    title: "时间",
                    key: "createDate",
                    render: (h, params) => {
                        return h("span", this.$public.timestampToTime2(params.row.createDate))
                    }
                },
                 {
                    title: '操作',
                    key: 'action',
                    render: (h, params) => {
                        let btnArray = [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.reset(params.row)
                                    }
                                }
                            }, '资金密码重置')
                        ];
                            // btnArray.push(
                            //     h('Button', {
                            //         props: {
                            //             type: 'error',
                            //             size: 'small'
                            //         },
                            //         style: {
                            //             marginRight: '5px'
                            //         },
                            //         on: {
                            //             click: () => {
                            //                 this.remove(params.row.id)
                            //             }
                            //         }
                            //     }, '删除')
                            // )
                        return h('div', btnArray);
                    }
                }
            ],
            tableData: [],
             count: {
                sumMoneys: 0,
                total: 0,
            },
            page: {
                current: 1,
                size: 10,
                total: 0
            }
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
                pageIndex: this.page.current,
                pageSize: this.page.size
            };

            for (let i in _data) {
                if (!_data[i]) delete _data[i]
            }

            customerList(_data).then(res => {
                if (res.data.code == "200") {
                    this.tableData = res.data.data.page.dataList;
                    this.page.current = res.data.data.page.pageIndex;
                    this.page.total = res.data.data.page.total;
                     this.count.sumMoneys = res.data.data.sumMoneys ? res.data.data.sumMoneys : 0;
                     this.count.total = res.data.data.page.total ? res.data.data.page.total : 0;
                } else {
                    this.$Message.warning(res.data.msg);
                    this.tableData = [];
                    this.page.current = 1;
                    this.page.total = 0;
                    this.count.sumMoneys = 0;
                    this.count.total = 0;
                }
            }).catch(err => {})
        },
        // 分页
        changePage(num) {
            this.page.current = num;
            this.showTable();
        },
        //资金密码重置
        reset(row) {
            updateFunPw({
                id: row.id,
                fundpassword: this.$public.fiveMd5("123456aa",this),
                }).then(res => {
                if (res.data.code == "200") {
                   this.$Message.success("资金密码重置重置成功");
                } else {
                    this.$Message.warning(res.data.msg);
                }
            }).catch(err => {})
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
