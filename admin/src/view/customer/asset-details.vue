<template>
    <div>
        <Form ref="formObj" :model="formObj" :label-width="70" inline>
            <FormItem label="手机号">
                <Input v-model="formObj.phone" />
            </FormItem>
            <FormItem label="明细类型">
                <Select v-model="formObj.tradeType" clearable style="width:162px">
                    <Option value="ACCOUNTTYPE_INCOIN">买币</Option>
                    <Option value="ACCOUNTTYPE_REBATE">充值返利</Option>
                    <Option value="ACCOUNTTYPE_BUYPACKAGE">充值</Option>
                    <Option value="ACCOUNTTYPE_UPLEVEL">会员升级</Option>
                    <Option value="ACCOUNTTYPE_OUTCOIN">提币</Option>
                    <Option value="ACCOUNTTYPE_OUTMONEY">提现</Option>
                    <Option value="ACCOUNTTYPE_OUTCOIN_REFUSE">提币拒绝退款</Option>
                    <Option value="ACCOUNTTYPE_OUTMONEY_REFUSE">提现拒绝退款</Option>
                    <Option value="ACCOUNTTYPE_OUTCOIN_RATE">提币手续费</Option>
                    <Option value="ACCOUNTTYPE_OUTMONEY_RATE">提现手续费</Option>
                     <Option value="ACCOUNTTYPE_OUTCOIN_REFUSE_RATE">提币拒绝手续费退款</Option>
                     <Option value="ACCOUNTTYPE_OUTMONEY_REFUSE_RATE">提现拒绝手续费退款</Option>
                      <Option value="ACCOUNTTYPE_TEAMREBATE">团队奖励</Option>
                      <Option value="ACCOUNTTYPE_SPREADREBATE">推广返利返佣</Option>
                      <Option value="ACCOUNTTYPE_SPREADINCOIN">推广充值返佣</Option>
                      <Option value="ACCOUNTTYPE_READNEWS">阅读新闻</Option>
                </Select>
            </FormItem>
            <FormItem :label-width="20">
                <Button type="primary" @click="search">搜索</Button>
            </FormItem>
           <FormItem :label-width="20">
                <Button type="primary" :loading="exportLoad" @click="exportExcel">导出</Button>
            </FormItem>
        </Form>
        <Table :columns="columns" :data="tableData" stripe></Table>
         <p class="totle">
      <span>统计: {{count.total}}条</span>&ensp; &ensp;
     
    </p>
        <Page :current="page.current" :total="page.total" @on-change="changePage" class-name="custom-page" />
    </div>
</template>

<script>
import { 
    accountPage,
    asssetsExport 
} from "@/api/api"
import excel from '@/libs/excel'
export default {
    data () {
        return {
            formObj: {
                phone: "",
                tradeType: ""
            },
            total: {
                allMoney: 0,
                allReturnMoney: 0,
                allRebateMoney: 0
            },
             count: {
          total: '',
        },
            columns: [
                {
                    title: '手机号',
                    key: 'phone'
                },
                {
                    title: '明细类型',
                    key: 'remark'
                },
                {
                    title: '之前金额(USDT)',
                    key: 'beforeMoney'
                },
                {
                    title: '发生金额(USDT)',
                    key: 'actionMoney'
                },
                {
                    title: '之后金额(USDT)',
                    key: 'afterMoney'
                },
                {
                    title: "创建时间",
                    key: "createDate",
                    minWidth: 120,
                    render: (h, params) => {
                        return h("span", this.$public.timestampToTime2(params.row.createDate))
                    }
                }
            ],
            tableData: [],
            page: {
                current: 1,
                size: 10,
                total: 0
            },
            exportLoad: false
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
                phone:this.formObj.phone,
                tradeType:this.formObj.tradeType,
                pageIndex: this.page.current,
                pageSize: this.page.size,
            };
            for (let i in _data) {
                if (!_data[i]) delete _data[i]
            }
            // if (this.formObj.phone) {
            //     _data.phone = this.formObj.phone;
            // }
            // if (this.formObj.tradeType) {
            //     _data.tradeType = this.formObj.tradeType;
            // }

            accountPage(_data).then(res => {
                if (res.data.code == "200") {
                    this.tableData = res.data.data.dataList;
                    this.page.current = res.data.data.pageIndex;
                    this.page.total = res.data.data.total;
                    this.count.total = res.data.data.total
                } else {
                    this.$Message.warning(res.data.msg);
                    this.tableData = [];
                    this.page.current = 1;
                    this.page.total = 0;
                }
            }).catch(err => {})

            //this.moneyTotal(_data);
        },
        // 分页
        changePage(num) {
            this.page.current = num;
            this.showTable();
        },
        // 导出
        exportExcel() {
            let _data = {
                phone:this.formObj.phone,
                tradeType:this.formObj.tradeType
            };
            for (let i in _data) {
                if (!_data[i]) delete _data[i]
            }
            
            
            this.exportLoad = true;
            asssetsExport(_data).then(res => {
                if (res.data.data && res.data.data.length) {
                    res.data.data.forEach(val => {
                        switch (val.tradeType) {
                            case "ACCOUNTTYPE_INCOIN":
                                val.tradeType = "买币";
                                break;
                            case "ACCOUNTTYPE_REBATE":
                                val.tradeType = "充值返利";
                                break;
                            case "ACCOUNTTYPE_BUYPACKAGE":
                                val.tradeType = "充值";
                                break;
                            case "ACCOUNTTYPE_UPLEVEL":
                                val.tradeType = "会员升级";
                                break;
                            case "ACCOUNTTYPE_OUTCOIN":
                                val.tradeType = "提币";
                                break;
                            case "ACCOUNTTYPE_OUTMONEY":
                                val.tradeType = "提现";
                                break;
                            case "ACCOUNTTYPE_OUTCOIN_REFUSE":
                                val.tradeType = "提币拒绝退款";
                                break;
                            case "ACCOUNTTYPE_OUTCOIN_RATE":
                                val.accountType = "提币手续费";
                                break;
                            case "ACCOUNTTYPE_OUTMONEY_RATE":
                                val.accountType = "提现手续费";
                                break;
                            case "ACCOUNTTYPE_OUTCOIN_REFUSE_RATE":
                                val.accountType = "提币拒绝手续费退款";
                                break;
                            case "ACCOUNTTYPE_OUTMONEY_REFUSE_RATE":
                                val.accountType = "提现拒绝手续费退款";
                                break;
                            case "ACCOUNTTYPE_OUTMONEY_REFUSE_RATE":
                                val.accountType = "提现拒绝手续费退款";
                                break;
                            case "ACCOUNTTYPE_TEAMREBATE":
                                val.accountType = "团队奖励";
                                break;
                            case "ACCOUNTTYPE_SPREADREBATE":
                                val.accountType = "推广返利返佣";
                                break;
                            case "ACCOUNTTYPE_SPREADINCOIN":
                                val.accountType = "推广充值返佣";
                                break;
                             case "ACCOUNTTYPE_READNEWS":
                                val.accountType = "阅读新闻";
                                break;
                        };
                        val.updateDate = this.$public.timestampToTime2(val.updateDate)
                    })
                    const params = {
                        title: ['手机号', '明细类型', '之前金额', '发生金额', '之后金额', '创建时间'],
                        key: ['phone', 'remark', 'beforeMoney', 'actionMoney', 'afterMoney', 'createDate'],
                        data: res.data.data,
                        autoWidth: true,
                        filename: '资产明细' 
                    }
                    excel.export_array_to_excel(params)
                } else {
                    this.$Message.info('表格数据不能为空！')
                }
                this.exportLoad = false;
            }).catch(err => {
                this.exportLoad = false;
            })
        }
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