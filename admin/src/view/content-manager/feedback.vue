<template>
    <div>
        <Form ref="formObj" :model="formObj" :label-width="70" inline>
            <FormItem label="手机号">
                <Input v-model="formObj.phone" />
            </FormItem>
           <FormItem :label-width="20">
                <Button type="primary" @click="search">搜索</Button>
            </FormItem>
        </Form>
        <Table stripe :columns="columns" :data="tableData"></Table>
        <Page :current="page.current" :total="page.total" @on-change="changePage" class-name="custom-page" />

        <!--用户信息弹框-->
        <Modal
            v-model="usershell.modal2"
            title="问题反馈详情"
            class-name="dankedaun"
            :footer-hide="true"
        >
        <Form :label-width="120" v-if="usershell.personal">
                <FormItem label="内容：">
                    <textarea rows="6" cols="40">{{usershell.personal.content}}</textarea>
                </FormItem>
        </Form>
        </Modal>
    </div>
</template>
<script>
import { feedbackList, platformDelete,readfeedback } from "@/api/api"
export default {
    data () {
        return {
             formObj: {
                phone: "",
            },
            columns: [
                {
                    title: '手机号',
                    key:'phone'
                },
                 {
                    title: '内容',
                    key:'content'
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
                        return h("div", [
                            // h('Button', {
                            //     props: {
                            //         type: 'error',
                            //         size: 'small'
                            //     },
                            //     style: {
                            //         marginRight: '5px'
                            //     },
                            //     on: {
                            //         click: () => {
                            //             this.remove(params.row.id)
                            //         }
                            //     }
                            // }, '删除'),
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
                        this.seedetails(params.row.id)
                      }
                    }
                  }, '详情'),
                        ])
                    }
                }
            ],
             usershell:
          {
            modal1: false,
            modal2:
              false,
            personal: {}
            ,//个人信息
          }
        ,
            tableData: [],
            page: {
                current: 1,
                size: 10,
                total: 0
            }
        }
    },
    methods: {
        // 搜索
        search() {
            this.page.current = 1;
            this.showTable();
        },
        // 删除
        remove(id) {
            this.$Modal.confirm({
                title: "提示",
                content: "您确定要删除该项吗？",
                onOk: () => {
                    platformDelete({where:{id: id}}).then(res => {
                        if (res.data.state == "200") {
                            this.$Message.success("操作成功");
                            this.showTable();
                        } else {
                            this.$Message.warning(res.data.msg);
                        }
                    }).catch(err => {})
                },
                onCancel: () => {
                    this.$Message.info("已取消操作");
                }
            })
        },
        //查看用户详情
      seedetails(id) {
        let _this = this;
        _this.usershell.personal = {};
        readfeedback({id: id}).then(function (response) {
          if (response.data.code == 200) {
            _this.usershell.personal = response.data.data;
             } else {
            _this.$Message.info(response.data.message);
          }
          ;
          _this.usershell.modal2 = true;
        })
      },
        // 列表
        showTable() {
                    feedbackList({
                    phone:this.formObj.phone,
                    pageIndex: this.page.current,
                    pageSize: this.page.size
                }).then(res => {
                if (res.data.code == 200) {
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
        this.showTable();
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
