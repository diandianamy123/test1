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
        <Page :current="page.current" :total="page.total" @on-change="changePage" class-name="custom-page" />
    </div>
</template>

<script>
import { myTeamList } from "@/api/api"

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
                    title: "下级层级",
                    key: "levels"
                },
                {
                    title: "时间",
                    key: "createDate",
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
                pageIndex: this.page.current,
                pageSize: this.page.size
            };

            for (let i in _data) {
                if (!_data[i]) delete _data[i]
            }

            myTeamList(_data).then(res => {
                if (res.data.code == "200") {
                    this.tableData = res.data.data.dataList;
                    this.page.current = res.data.data.pageIndex;
                    this.page.total = res.data.data.total;
                } else {
                    this.$Message.warning(res.data.msg);
                    this.tableData = [];
                    this.page.current = 1;
                    this.page.total = 0;
                }
            }).catch(err => {})
        },
        // 分页
        changePage(num) {
            this.page.current = num;
            this.showTable();
        }
    },
    mounted() {
        // 输入手机号才请求  默认不请求
        // this.showTable();
    }
};
</script>
