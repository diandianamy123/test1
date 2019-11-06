<template>
    <div>
        <div style="margin-bottom:20px;">
            <Button type="primary" @click="add">新增</Button>
        </div>

        <Table stripe :columns="columns" :data="tableData"></Table>

        <!-- 新增 -->
        <Modal
            v-model="modalAdd"
            title="新增版本"
            :loading="loadingAdd"
            :mask-closable="false"
            @on-ok="okAdd">
                <Form ref="formAdd" :model="formAdd" :rules="rules" :label-width="80">
                    <FormItem label="版本号" prop="versionNo">
                        <Input v-model="formAdd.versionNo" placeholder="请输入版本号" />
                    </FormItem>
                    <FormItem label="app类型" prop="types">
                        <Select v-model="formAdd.types" placeholder="请输入app类型">
                            <Option value="IOS">IOS</Option>
                            <Option value="ANDROID">ANDROID</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="更新类型" prop="updateType">
                        <Select v-model="formAdd.updateType" placeholder="请输入更新类型">
                            <Option value="COMMON">普通更新</Option>
                            <Option value="FORCE">强制更新</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="下载地址" prop="addressUrl">
                        <Input v-model="formAdd.addressUrl" placeholder="请输入下载地址" />
                    </FormItem>
                    <FormItem label="说明" prop="explains">
                        <Input v-model="formAdd.explains" type="textarea" :rows="2" placeholder="请输入说明" />
                    </FormItem>
                </Form>
        </Modal>

        <!-- 修改 -->
        <Modal
            v-model="modalEdit"
            title="修改版本"
            :loading="loadingEdit"
            :mask-closable="false"
            @on-ok="okEdit">
                <Form ref="formEdit" :model="formEdit" :rules="rules" :label-width="80">
                    <FormItem label="版本号" prop="versionNo">
                        <Input v-model="formEdit.versionNo" placeholder="请输入版本号" />
                    </FormItem>
                    <FormItem label="app类型" prop="types">
                        <Select v-model="formEdit.types" disabled placeholder="请输入app类型">
                            <Option value="IOS">IOS</Option>
                            <Option value="ANDROID">ANDROID</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="更新类型" prop="updateType">
                        <Select v-model="formEdit.updateType" placeholder="请输入更新类型">
                            <Option value="COMMON">普通更新</Option>
                            <Option value="FORCE">强制更新</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="下载地址" prop="addressUrl">
                        <Input v-model="formEdit.addressUrl" placeholder="请输入下载地址" />
                    </FormItem>
                    <FormItem label="说明" prop="explains">
                        <Input v-model="formEdit.explains" type="textarea" :rows="2" placeholder="请输入说明" />
                    </FormItem>
                </Form>
        </Modal>
    </div>
</template>
<script>
import {
    editionAdd,
    editionModify,
    editionDelete,
    editionList,
    editionDetails
} from "@/api/api"

export default {
    data () {
        return {
            columns: [
                {
                    title: '序号',
                    type: "index"
                },
                {
                    title: 'app类型',
                    key: 'types'
                },
                {
                    title: '更新类型',
                    key: 'updateType',
                     render: (h, params) => {
                        let text = "";
                        switch (params.row.updateType) {
                            case "COMMON":
                                text = "普通更新";
                                break;
                            case "FORCE":
                                text = "强制更新";
                                break;
                        }
                        return h("span", text)
                    }
                },
                {
                    title: '版本号',
                    key: 'versionNo'
                },
                {
                    title: '下载地址',
                    key: 'addressUrl'
                },
                {
                    title: '时间',
                    key: 'updateDate',
                    render: (h, params) => {
                        return h("span", this.$public.timestampToTime2(params.row.updateDate))
                    }
                },
                {
                    title: "操作",
                    render: (h, params) => {
                        return h("div", [
                            h("Button", {
                                props: {
                                    size: "small",
                                    type: "success"
                                },
                                style: {
                                    marginRight: "10px"
                                },
                                on: {
                                    click: () => {
                                        this.edit(params.row.id)
                                    }
                                }
                            }, "修改"),
                            h("Button", {
                                props: {
                                    size: "small",
                                    type: "error"
                                },
                                style: {
                                    marginRight: "10px"
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.row.id)
                                    }
                                }
                            }, "删除")
                        ])
                    }
                }
            ],
            tableData: [],
            modalAdd: false,
            modalEdit: false,
            loadingAdd: true,
            loadingEdit: true,
            formAdd: {
                versionNo: "",
                types: "",
                updateType: "",
                addressUrl: "",
                explains: ""
            },
            formEdit: {},
            rules: {
                versionNo: [
                    { required: true, message: "版本号不能为空", trigger: "change" } 
                ],
                types: [
                    { required: true, message: "app类型不能为空", trigger: "change" } 
                ],
                updateType: [
                    { required: true, message: "更新类型不能为空", trigger: "change" } 
                ],
                addressUrl: [
                    { required: true, message: "下载地址不能为空", trigger: "change" } 
                ],
                explains: [
                    { required: true, message: "更新内容不能为空", trigger: "change" } 
                ]
            }
        }
    },
    methods: {
        // 新增
        add() {
            this.$refs.formAdd.resetFields();
            this.modalAdd = true;
        },
        okAdd() {
            this.loadingAdd = false;
            this.$nextTick(() => {
                this.loadingAdd = true;
            });

            this.$refs.formAdd.validate(valid => {
                if (valid) {
                    editionAdd(this.formAdd).then(res => {
                        if (res.data.code == "200") {
                            this.$Message.success("新增成功");
                            this.modalAdd = false;
                            this.showTable();
                        } else {
                            this.$Message.warning(res.data.msg);
                        }
                    }).catch(err => {})
                }
            })
        },
        // 修改
        edit(id) {
            this.$refs.formEdit.resetFields();
            this.modalEdit = true;
            editionDetails({id: id}).then(res => {
                if (res.data.code == "200") {
                    this.formEdit = res.data.data;
                } else {
                    this.$Message.warning(res.data.msg);
                }
            }).catch(err => {})
        },
        okEdit() {
            this.loadingEdit = false;
            this.$nextTick(() => {
                this.loadingEdit = true;
            });

            this.$refs.formEdit.validate(valid => {
                if (valid) {
                    editionModify({
                        id: this.formEdit.id,
                        versionNo: this.formEdit.versionNo,
                        types: this.formEdit.types,
                        updateType: this.formEdit.updateType,
                        addressUrl: this.formEdit.addressUrl,
                        explains: this.formEdit.explains
                    }).then(res => {
                        if (res.data.code == "200") {
                            this.$Message.success("修改成功");
                            this.modalEdit = false;
                            this.showTable();
                        } else {
                            this.$Message.warning(res.data.msg);
                        }
                    }).catch(err => {})
                }
            })
        },
        // 删除
        remove(id) {
            this.$Modal.confirm({
                title: "提示",
                content: "您确定要删除该项吗？",
                onOk: () => {
                    editionDelete({id: id}).then(res => {
                        if (res.data.code == "200") {
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
        // 列表
        showTable() {
            editionList({}).then(res => {
                if (res.data.code == "200") {
                    this.tableData = res.data.data;
                } else {
                    this.$Message.warning(res.data.msg);
                    this.tableData = [];
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
