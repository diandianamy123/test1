<template>
    <div>
        <div style="margin-bottom:20px;">
            <Button type="primary" @click="add">新增</Button>
        </div>

        <Table stripe :columns="columns" :data="tableData"></Table>

        <!-- 新增 -->
        <Modal
            v-model="modalAdd"
            title="新增轮播图"
            :loading="loadingAdd"
            :mask-closable="false"
            @on-ok="okAdd">
                <Form ref="formAdd" :model="formAdd" :rules="rules" :label-width="90">
                    <FormItem label="顺序" prop="resSort">
                        <Input v-model="formAdd.resSort" placeholder="请输入顺序" />
                    </FormItem>
                    <FormItem label="图片" prop="imgUrl" class="upload-img">
                        <img style="height: 50px" v-if="formAdd.imgUrl" :src="upUrl + '/file/' + formAdd.imgUrl">
                        <Upload
                            ref="upload"
                            multiple
                            type="drag"
                            :format="['jpg','jpeg','png']"
                            :show-upload-list="false"
                            :on-success="handleSuccess"
                            :on-format-error="handleFormatError"
                            :before-upload="handleBeforeUpload"
                            :action="updateUrl">
                            <div style="padding: 20px 0;">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            </div>
                        </Upload>
                    </FormItem>
                </Form>
        </Modal>

        <!-- 修改 -->
        <Modal
            v-model="modalEdit"
            title="修改轮播图"
            :loading="loadingEdit"
            :mask-closable="false"
            @on-ok="okEdit">
                <Form ref="formEdit" :model="formEdit" :rules="rules" :label-width="90">
                    <FormItem label="顺序" prop="resSort">
                        <Input type="number" v-model.number="formEdit.resSort" placeholder="请输入顺序" />
                    </FormItem>
                    <FormItem label="图片" prop="imgUrl" class="upload-img">
                        <img v-if="formEdit.imgUrl" :src="upUrl + '/file/' + formEdit.imgUrl">
                        <Upload
                            ref="upload3"
                            multiple
                            type="drag"
                            :format="['jpg','jpeg','png']"
                            :show-upload-list="false"
                            :on-success="handleSuccess2"
                            :on-format-error="handleFormatError"
                            :before-upload="handleBeforeUpload"
                            :action="updateUrl">
                            <div style="padding: 20px 0;">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            </div>
                        </Upload>
                    </FormItem>
                </Form>
        </Modal>
    </div>
</template>
<script>
import config from "@/config"
import { 
    imgAdd,
    imgModify,
    imgDelete,
    imgList,
    imgListDetails
} from "@/api/api"

export default {
    data () {
        const validateNumber = (rule, value, callback) => {
            if (!this.$public.Ints(value)) {
                callback(new Error('请输入数字'));
            } else {
                callback();
            }
        };

        return {
            columns: [
                {
                    title: '顺序',
                    key: "resSort"
                },
                {
                    title: '图片',
                    render: (h, params) => {
                        return h('img', {
                            attrs:{
                                src: this.upUrl + "/file/" + params.row.imgUrl,
                                style: "max-height:25px;margin-top:5px;"
                            }
                        }, params.index);
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
                                        this.edit(params.row)
                                    }
                                }
                            }, '修改')
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
            modalAdd: false,
            modalEdit: false,
            loadingAdd: true,
            loadingEdit: true,
            formAdd: {
                resSort: "",
                imgUrl: "",
            },
            formEdit: {},
            rules: {
                resSort: [
                    { required: true, message: "顺序不能为空" },
                    { validator: validateNumber, trigger: "change" } 
                ],
                imgUrl: [
                    { required: true, message: "图片不能为空", trigger: "change" } 
                ]
            }
        }
    },
    computed: {
        updateUrl() {
            this.upUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev: config.baseUrl.pro
            return this.upUrl + config.uploadUrl
        }
    },
    methods: {
        // 图片上传成功
        handleSuccess (res, file, fileList) {
            this.formAdd.imgUrl = file.response.data;
        },
        handleSuccess2 (res, file, fileList) {
            this.formEdit.imgUrl = file.response.data;
        },
        // 文件格式验证失败
        handleFormatError (file) {
            this.$Message.warning("图片格式为.jpg、.jpeg、.png");
        },
        // 文件上传
        handleBeforeUpload () {},
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
                    imgAdd(this.formAdd).then(res => {
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
        edit(row) {
            this.$refs.formEdit.resetFields();
            this.modalEdit = true;
            imgListDetails({id: row.id}).then(res => {
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
                    imgModify({
                        id: this.formEdit.id,
                        imgUrl: this.formEdit.imgUrl,
                        resSort: this.formEdit.resSort
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
                    imgDelete({id: id}).then(res => {
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
            imgList({}).then(res => {
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
}
</script>
<style lang="less">
.upload-img {
    img {
        height: 50px;
    }
}
</style>
