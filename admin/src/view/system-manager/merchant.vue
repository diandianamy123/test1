<template>
    <div>
        <div style="margin-bottom:20px;">
            <Button type="primary" @click="add">新增</Button>
        </div>

        <Table stripe :columns="columns" :data="tableData"></Table>

        <!-- 新增 -->
        <Modal
            v-model="modalAdd"
            title="新增"
            :loading="loadingAdd"
            :mask-closable="false"
            @on-ok="okAdd"
        >
            <Form ref="formAdd" :model="formAdd" :rules="rules" :label-width="90">
                <FormItem label="等级名称" prop="types">
                    <Input v-model="formAdd.types" />
                </FormItem>
                <FormItem label="升级金额" prop="moneys">
                    <Input v-model="formAdd.moneys" />
                </FormItem>
                <FormItem label="团队人数" prop="teamNo">
                    <Input v-model="formAdd.teamNo" />
                </FormItem>
                <FormItem label="返佣百分比" prop="returnRatio">
                    <Input v-model="formAdd.returnRatio" />
                </FormItem>
            </Form>
        </Modal>
        <!-- 修改 -->
        <Modal
            v-model="modalEdit"
            title="修改"
            :loading="loadingEdit"
            :mask-closable="false"
            @on-ok="okEdit"
        >
            <Form ref="formEdit" :model="formEdit" :rules="rules" :label-width="90">
                <FormItem label="等级名称" prop="types">
                    <Input v-model="formEdit.types" disabled />
                </FormItem>
                <FormItem label="升级金额" prop="moneys">
                    <Input v-model="formEdit.moneys" />
                </FormItem>
                <FormItem label="团队人数" prop="teamNo">
                    <Input v-model="formEdit.teamNo" />
                </FormItem>
                <FormItem label="返佣百分比" prop="returnRatio">
                    <Input v-model="formEdit.returnRatio" />
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
import {
  merchantAdd,
  merchantModify,
  merchantDelete,
  merchantList,
  merchantDetails
} from "@/api/api"

export default {
    data() {
        const validateNumber = (rule, value, callback) => {
            if (!this.$public.Ints(value)) {
                callback(new Error('请输入数字'));
            } else {
                callback();
            }
        };

        return {
            modalAdd: false,
            modalEdit: false,
            loadingAdd: true,
            loadingEdit: true,
            formAdd: {
                types: "",
                moneys: "",
                teamNo: "",
                returnRatio: ""
            },
            formEdit: {},
            rules: {
                types: [
                    { required: true, message: "等级名称不能为空", trigger: "change" }
                ],
                moneys: [
                    { required: true, message: "升级金额不能为空" },
                    { validator: validateNumber, trigger: "change" }
                ],
                teamNo: [
                    { required: true, message: "团队人数不能为空" },
                    { validator: validateNumber, trigger: "change" }
                ],
                returnRatio: [
                    { required: true, message: "返佣百分比不能为空" },
                    { validator: validateNumber, trigger: "change" }
                ]
            },
            columns: [
                {
                    title: "等级",
                    key: "types"
                },
                {
                    title: "升级金额",
                    key: "moneys"
                },
                {
                    title: "团队人数",
                    key: "teamNo"
                },
                {
                    title: "返佣百分比",
                    key: "returnRatio"
                },
                {
                    title: "时间",
                    key: "updateDate",
                    render: (h, params) => {
                        return h(
                            "span",
                            this.$public.timestampToTime2(params.row.updateDate)
                        );
                    }
                },
                {
                    title: "操作",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        size: "small",
                                        type: "success"
                                    },
                                    style: {
                                        marginRight: "10px"
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.row.id);
                                        }
                                    }
                                },
                                "修改"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        size: "small",
                                        type: "error"
                                    },
                                    style: {
                                        marginRight: "10px"
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row.id);
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ],
            tableData: []
        };
    },
    methods: {
        // 新增
        add() {
            this.modalAdd = true;
            this.$refs.formAdd.resetFields();
        },
        okAdd() {
            this.loadingAdd = false;
            this.$nextTick(() => {
                this.loadingAdd = true;
            });

            this.$refs.formAdd.validate(valid => {
                if (valid) {
                      merchantAdd(this.formAdd).then(res => {
                          if (res.data.code == "200") {
                            this.$Message.success("新增成功");
                            this.modalAdd = false;
                            this.showTable();
                          } else {
                            this.$Message.warning(res.data.msg);
                          }
                      }).catch(err => {});
                }
            });
        },
        // 修改
        edit(id) {
            this.$refs.formEdit.resetFields();
            this.modalEdit = true;
            merchantDetails({ id: id }).then(res => {
                if (res.data.code == "200") {
                    this.formEdit = res.data.data;
                } else {
                    this.$Message.warning(res.data.msg);
                }
            }).catch(err => {});  
        },
        okEdit() {
            this.loadingEdit = false;
            this.$nextTick(() => {
                this.loadingEdit = true;
            });

            this.$refs.formEdit.validate(valid => {
                if (valid) {
                    merchantModify({
                        id: this.formEdit.id,
                        types: this.formEdit.types,
                        moneys: this.formEdit.moneys,
                        teamNo: this.formEdit.teamNo,
                        returnRatio: this.formEdit.returnRatio
                    }).then(res => {
                        if (res.data.code == "200") {
                            this.$Message.success("修改成功");
                            this.modalEdit = false;
                            this.showTable();
                        } else {
                            this.$Message.warning(res.data.msg);
                        }
                    }).catch(err => {});
                }
            });
        },
        // 删除
        remove(id) {
            this.$Modal.confirm({
                title: "提示",
                content: "您确定要删除该项吗？",
                onOk: () => {
                    merchantDelete({ id: id }).then(res => {
                        if (res.data.code == "200") {
                            this.$Message.success("操作成功");
                            this.showTable();
                        } else {
                            this.$Message.warning(res.data.msg);
                        }
                    }).catch(err => {});
                },
                onCancel: () => {
                    this.$Message.info("已取消操作");
                }
            });
        },
        // 列表
        showTable() {
            merchantList({}).then(res => {
                if (res.data.code == "200") {
                    this.tableData = res.data.data;
                } else {
                    this.$Message.warning(res.data.msg);
                    this.tableData = [];
                }
            }).catch(err => {})
        }
    },
    mounted() {
        this.showTable();
    }
};
</script>
