<template>
    <div>
        <Form ref="formObj" :model="formObj" :label-width="60" inline>
            <FormItem label="手机号">
                <Input v-model="formObj.phone" />
            </FormItem>
            <FormItem label="状态">
                <Select v-model="formObj.success" clearable style="width:162px;">
                    <Option value="Y">成功</Option>
                    <Option value="N">失败</Option>
                </Select>
            </FormItem>
            <FormItem :label-width="20">
                <Button type="primary" @click="search">搜索</Button>
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
import { buyCoinList } from "@/api/api"

export default {
    data () {
        return {
            formObj: {
                phone: "",
                success: ""
            },
             count: {
                total: 0,
            },
            columns: [
                {
                    title: '手机号',
                    key: 'phone',
                    minWidth: 110
                },
                {
                    title: "订单号",
                    key: 'orderNo',
                    minWidth: 120
                },
                {
                    title: "三方流水号",
                    key: 'bid',
                    minWidth: 120
                },
                {
                    title: 'USDT金额',
                    key: 'usdtMoneys',
                    minWidth: 90
                },
                {
                    title: '人民币金额',
                    key: 'rmbMoneys',
                    minWidth: 90
                },
                {
                    title: '状态',
                    key: 'success',
                    minWidth: 90,
                    render: (h, params) => {
                        let text = "";
                        switch (params.row.success) {
                            case "Y":
                                text = "成功";
                                break;
                            case "N":
                                text = "失败";
                                break;
                        };
                        return h("span", text)
                    }
                },
                {
                    title: "创建时间",
                    key: "createDate",
                    minWidth: 150,
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
                success: this.formObj.success,
                pageIndex: this.page.current,
                pageSize: this.page.size
            };

            for (let i in _data) {
                if (!_data[i]) delete _data[i]
            }

            buyCoinList(_data).then(res => {
                if (res.data.code == "200") {
                    this.tableData = res.data.data.dataList;
                    this.page.current = res.data.data.pageIndex;
                    this.page.total = res.data.data.total;
                    this.count.total = res.data.data.total ? res.data.data.total : 0;
                } else {
                    this.$Message.warning(res.data.msg);
                    this.tableData = [];
                    this.page.current = 1;
                    this.page.total = 0;
                    this.count.total = 0;
                }
            }).catch(err => {})
        },
        // 分页
        changePage(num) {
            this.page.current = num;
            this.showTable();
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
