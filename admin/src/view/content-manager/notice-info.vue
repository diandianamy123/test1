<template>
    <div>
        <div style="margin-bottom:20px;">
            <Button type="primary" @click="add">新增</Button>
        </div>

        <Table stripe :columns="columns" :data="tableData"></Table>
        <Page :current="page.current" :total="page.total" @on-change="changePage" class-name="custom-page" />
    </div>
</template>
<script>
export default {
    data () {
        return {
            columns: [
                {
                    title: '中文标题',
                    key: "zhTitle"
                },
                {
                    title: '英文标题',
                    key: "enTitle"
                },
                {
                    title: '中文来源',
                    key:'zhSource'
                },
                {
                    title: '英文来源',
                    key:'enSource'
                },
                {
                    title: '时间',
                    key:'createDate',
                    render: (h, params) => {
                        return h("span", this.$public.timestampToTime2(params.row.createDate))
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'left',
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
                                        this.edit(params.row.id)
                                    }
                                }
                            }, '编辑')
                        ];
                            btnArray.push(
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row.id)
                                        }
                                    }
                                }, '删除')
                            )
                        return h('div', btnArray);
                    }
                }
            ],
            tableData: [],
            page: {
                current: 1,
                size: 10,
                total: 0
            }
        }
    },
    methods: {
        // 新增
        add() {
            this.$router.push({
                path: "/notice-manager/n-manager"
            })
        },
        // 修改
        edit(id) {
            this.$router.push({
                path: "/notice-manager/n-manager",
                query: {id: id}
            })
        },
        // 删除
        remove(id) {
            this.$Modal.confirm({
                title: "提示",
                content: "您确定要删除该项吗？",
                onOk: () => {
                    // deleteDictionary({id: id}).then(res => {
                    //     if (res.data.state > 0) {
                    //         this.$Message.success("操作成功");
                    //         this.showTable();
                    //     } else {
                    //         this.$Message.warning(res.data.msg);
                    //     }
                    // }).catch(err => {})
                },
                onCancel: () => {
                    this.$Message.info("已取消操作");
                }
            })
        },
        // 列表
        showTable() {
            // dictionaryList({
            //         pageIndex: this.page.current,
            //         pageSize: this.page.size
            //     }).then(res => {
            //     if (res.data.state > 0) {
            //         this.tableData = res.data.data.dataList;
            //         this.page.current = res.data.data.pageIndex;
            //         this.page.total = res.data.data.total;
            //     } else {
            //         this.$Message.warning(res.data.msg);
            //         this.tableData = [];
            //         this.page.current = 1;
            //         this.page.total = 0;
            //     }
            // }).catch(err => {})
        },
        // 分页
        changePage(num) {
            this.page.current = num;
            this.showTable();
        }
    }
}
</script>
<style lang="less">
.upload-img {
    img {
        height: 90px;
    }
}
</style>
