<template>
  <div class="from-distribution">
    <Form ref="formObj" :model="formObj" :rules="rules" :label-width="150">
      <!-- <FormItem label="QQ二维码" prop="qqCode">
        <!--<Input v-model="formObj.qqCode" placeholder="QQ二维码" />-->
        <!-- <img style="height: 50px" v-if="formObj.qqCode" :src="upUrl + '/file/'+formObj.qqCode" />
        <Upload
          ref="upload"
          multiple
          type="drag"
          :format="['jpg','jpeg','png']"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :on-format-error="handleFormatError"
          :before-upload="handleBeforeUpload"
          :action="updateUrl"
        > -->
          <!-- <div style="padding: 20px 0;">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          </div>
        </Upload> -->
      <!-- </FormItem> --> 
      <!-- <FormItem label="微信二维码" prop="weixinCode"> -->
        <!--<Input v-model="formObj.bb" placeholder="微信二维码" />-->
        <!-- <img
          style="height: 50px"
          v-if="formObj.weixinCode"
          :src="upUrl + '/file/'+formObj.weixinCode"
        /> -->
        <!-- <Upload
          ref="upload2"
          multiple
          type="drag"
          :format="['jpg','jpeg','png']"
          :show-upload-list="false"
          :on-success="handleSuccess2"
          :on-format-error="handleFormatError"
          :before-upload="handleBeforeUpload"
          :action="updateUrl"
        > -->
          <!-- <div style="padding: 20px 0;">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          </div>
        </Upload>
      </FormItem> -->
      <FormItem label="客服邮箱" prop="serviceEmail">
        <Input v-model="formObj.serviceEmail" placeholder="客服邮箱" />
      </FormItem>
      <FormItem label="资讯奖励总金额" prop="infoSumMoney">
        <Input v-model="formObj.infoSumMoney" placeholder="资讯奖励总金额" />
      </FormItem>
      <FormItem label="资讯奖励每天条数" prop="infoNum">
        <Input v-model="formObj.infoNum" placeholder="资讯奖励每天条数" />
      </FormItem>
      <FormItem label="最小提现数" prop="minRmb">
        <Input v-model="formObj.minRmb" placeholder="最小提现数" />
      </FormItem>
      <FormItem label="最小提币数量" prop="minMoney">
        <Input v-model="formObj.minMoney" placeholder="最小提币数量" />
      </FormItem>
      <FormItem label="提现手续费比例" prop="outRmbRatio">
        <Input v-model="formObj.outRmbRatio" placeholder="提现手续费比例" />
      </FormItem>
      <FormItem label="提币手续费比例" prop="outCoinRatio">
        <Input v-model="formObj.outCoinRatio" placeholder="提币手续费比例" />
      </FormItem>
      <FormItem label="一代返利返佣百分比(%)" prop="oneReturn">
        <Input v-model="formObj.oneReturn" placeholder="一代返利返佣百分比" />
      </FormItem>
      <FormItem label="二代返利返佣百分比(%)" prop="twoReturn">
        <Input v-model="formObj.twoReturn" placeholder="二代返利返佣百分比" />
      </FormItem>
      <FormItem label="三代返利返佣百分比(%)" prop="threeReturn">
        <Input v-model="formObj.threeReturn" placeholder="三代返利返佣百分比" />
      </FormItem>
       <FormItem label="一代充值返佣百分比(%)" prop="oneInReturn">
        <Input v-model="formObj.oneInReturn" placeholder="一代充值返佣百分比" />
      </FormItem>
       <FormItem label="二代充值返佣百分比(%)" prop="twoInReturn">
        <Input v-model="formObj.twoInReturn" placeholder="二代充值返佣百分比" />
      </FormItem>
       <FormItem label="三代充值返佣百分比(%)" prop="threeInReturn">
        <Input v-model="formObj.threeInReturn" placeholder="三代充值返佣百分比" />
      </FormItem>
       <FormItem label="买币最小USDT" prop="payMinUsdt">
        <Input v-model="formObj.payMinUsdt" placeholder="买币最小USDT" />
      </FormItem>
      <FormItem label="提现开始时间" prop="outRmbStartTime">
        <TimePicker
          v-model="formObj.outRmbStartTime"
          format="HH:mm"
          placeholder="Select time"
          style="width: 112px"
        ></TimePicker>
      </FormItem>
      <FormItem label="提现结束时间" prop="outRmbEndTime">
        <TimePicker
          v-model="formObj.outRmbEndTime"
          format="HH:mm"
          placeholder="Select time"
          style="width: 112px"
        ></TimePicker>
      </FormItem>
      <FormItem label="提币开始时间" prop="outCoinStartTime">
        <TimePicker
          v-model="formObj.outCoinStartTime"
          format="HH:mm"
          placeholder="Select time"
          style="width: 112px"
        ></TimePicker>
      </FormItem>
      <FormItem label="提币结束时间" prop="outCoinEndTime">
        <TimePicker
          v-model="formObj.outCoinEndTime"
          format="HH:mm"
          placeholder="Select time"
          style="width: 112px"
        ></TimePicker>
      </FormItem>

      <!-- <Divider orientation="left">推荐15人以上</Divider>
      </FormItem>-->
      <FormItem>
        <Button type="primary" @click="submit">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import config from "@/config";
import { updateConfig, getConfig } from "@/api/api";
export default {
  data() {
    const validateNumber = (rule, value, callback) => {
      if (!this.$public.Ints(value)) {
        callback(new Error("请输入数字"));
      } else {
        callback();
      }
    };

    return {
      formObj: {
        id1: "",
        id2: "",
        id3: "",
        id4: "",
        qqCode: "",
        weixinCode: "",
        serviceEmail: "",
        infoSumMoney: "",
        infoNum: "",
        minRmb: "",
        minMoney:"",
        outRmbRatio:"",
        outCoinRatio: "",
        oneReturn: "",
        twoReturn: "",
        threeReturn: "",
        oneInReturn: "",
        twoInReturn: "",
        threeInReturn: "",
        payMinUsdt: "",
        outRmbStartTime: "", //提现开始时间
        outRmbEndTime: "", //提现结束时间
        outCoinStartTime: "", //提币开始时间
        outCoinEndTime: "" //提币结束时间
      },
      rules: {
        // qqCode: [
        //     { required: true, message: "客服QQ不能为空" },
        //     { validator: validateNumber, trigger: "change" }
        // ],
        // weixinCode: [
        //     { required: true, message: "微信二维码不能为空" },
        //     { validator: validateNumber, trigger: "change" }
        // ],
        serviceEmail: [
          { required: true, message: "客服邮箱不能为空", trigger: "change" }
        ],
        infoSumMoney: [
          { required: true, message: "资讯奖励总金额不能为空" },
          { validator: validateNumber, trigger: "change" }
        ],
        infoNum: [
          { required: true, message: "资讯奖励每天条数不能为空" },
          { validator: validateNumber, trigger: "change" }
        ],
        minRmb: [
          { required: true, message: "提币最小额不能为空" },
          { validator: validateNumber, trigger: "change" }
        ],
         minMoney: [
          { required: true, message: "最小提币数量不能为空" },
          { validator: validateNumber, trigger: "change" }
        ],
        outRmbRatio:[
          { required: true, message: "提现手续费比例不能为空" },
          { validator: validateNumber, trigger: "change" }
        ],
        outCoinRatio: [
          { required: true, message: "提币手续费比例不能为空" },
          { validator: validateNumber, trigger: "change" }
        ],

        oneReturn: [
          { required: true, message: "一代返利返佣百分比不能为空" },
          { validator: validateNumber, trigger: "change" }
        ],
        twoReturn: [
          { required: true, message: "二代返利返佣百分比不能为空" },
          { validator: validateNumber, trigger: "change" }
        ],
        threeReturn: [
          { required: true, message: "三代返利返佣百分比不能为空" },
          { validator: validateNumber, trigger: "change" }
        ],
          oneInReturn: [
          { required: true, message: "一代充值返佣百分比不能为空" },
          { validator: validateNumber, trigger: "change" }
        ],
        twoInReturn: [
          { required: true, message: "二代充值返佣百分比不能为空" },
          { validator: validateNumber, trigger: "change" }
        ],
        threeInReturn: [
          { required: true, message: "三代充值返佣百分比不能为空" },
          { validator: validateNumber, trigger: "change" }
        ],
         payMinUsdt: [
          { required: true, message: "买币最小USDT不能为空" },
          { validator: validateNumber, trigger: "change" }
        ],
        outRmbStartTime: [{ required: true, message: "提现开始时间不能为空" }],
        outRmbEndTime: [{ required: true, message: "提现结束时间不能为空" }],
        outCoinStartTime: [{ required: true, message: "提币开始时间不能为空" }],
        outCoinEndTime: [{ required: true, message: "提币结束时间不能为空" }]
      }
    };
  },
  computed: {
    updateUrl() {
      this.upUrl =
        process.env.NODE_ENV === "development"
          ? config.baseUrl.dev
          : config.baseUrl.pro;
      return this.upUrl + config.uploadUrl;
    }
  },
  methods: {
    // 查询
    showDisbution() {
      getConfig()
        .then(res => {
          if (res.data.state == "200") {
            //this.formObj.id1 = res.data.data.id;
            this.formObj.qqCode = res.data.data.qqCode;
            this.formObj.weixinCode = res.data.data.weixinCode;
            this.formObj.infoSumMoney = res.data.data.infoSumMoney;
            this.formObj.serviceEmail = res.data.data.serviceEmail;

            //this.formObj.id2 = res.data[1].id;
            this.formObj.infoNum = res.data.data.infoNum;
            this.formObj.minRmb = res.data.data.minRmb;
            this.formObj.minMoney = res.data.data.minMoney;
            this.formObj.outRmbRatio = res.data.data.outRmbRatio;
            this.formObj.outCoinRatio = res.data.data.outCoinRatio;

            // this.formObj.id3 = res.data.data[2].id;
            this.formObj.oneReturn = res.data.data.oneReturn;
            this.formObj.twoReturn = res.data.data.twoReturn;
            this.formObj.threeReturn = res.data.data.threeReturn;

             this.formObj.oneInReturn = res.data.data.oneInReturn;
            this.formObj.twoInReturn = res.data.data.twoInReturn;
            this.formObj.threeInReturn = res.data.data.threeInReturn;
            this.formObj.payMinUsdt = res.data.data.payMinUsdt;
            
            // this.formObj.id4 = res.data.data[3].id;
            this.formObj.outRmbStartTime = res.data.data.outRmbStartTime;
            this.formObj.outRmbEndTime = res.data.data.outRmbEndTime;
            this.formObj.outCoinStartTime = res.data.data.outCoinStartTime;
            this.formObj.outCoinEndTime = res.data.data.outCoinEndTime;
          }
        })
        .catch(err => {});
    },
    // 图片上传成功
    handleSuccess(res, file, fileList) {
      this.formObj.qqCode = file.response.data;
    },
    // 文件格式验证失败
    handleFormatError(file) {
      this.$Message.warning("图片格式为.jpg、.jpeg、.png");
    },
    // 文件上传
    handleBeforeUpload() {},
    // 图片上传成功
    handleSuccess2(res, file, fileList) {
      this.formObj.weixinCode = file.response.data;
    },
    // 文件格式验证失败
    handleFormatError2(file) {
      this.$Message.warning("图片格式为.jpg、.jpeg、.png");
    },
    // 文件上传
    handleBeforeUpload2() {},
    // 保存
    submit() {
      this.$refs.formObj.validate(valid => {
        if (valid) {
          let _data = {
            minMoney: this.formObj.minMoney, //最小提币数
            qqCode: this.formObj.qqCode,
            weixinCode: this.formObj.weixinCode,
            oneReturn: this.formObj.oneReturn, //一代返佣百分比
            twoReturn: this.formObj.twoReturn, //二代返佣百分比
            threeReturn: this.formObj.threeReturn, //三代返佣百分比
             oneInReturn: this.formObj.oneInReturn, //一代返佣百分比
            twoInReturn: this.formObj.twoInReturn, //二代返佣百分比
            threeInReturn: this.formObj.threeInReturn, //三代返佣百分比
            payMinUsdt: this.formObj.payMinUsdt, //三代返佣百分比
            outRmbRatio:this.formObj.outRmbRatio,//提现手续费比例
            outCoinRatio: this.formObj.outCoinRatio, //提币手续费比例
            infoSumMoney: this.formObj.infoSumMoney, //资讯奖励总金额
            serviceEmail: this.formObj.serviceEmail, //客服邮箱
            infoNum: this.formObj.infoNum, //资讯奖励每天条数
            minRmb: this.formObj.minRmb, //最小提现数
            minMoney: this.formObj.minMoney, //最小提币数量
            outRmbRatio: this.formObj.outRmbRatio, //提现手续费比例
            outRmbStartTime: this.formObj.outRmbStartTime, //提现开始时间
            outRmbEndTime: this.formObj.outRmbEndTime, //提现结束时间
            outCoinStartTime: this.formObj.outCoinStartTime, //提币开始时间
            outCoinEndTime: this.formObj.outCoinEndTime //提币结束时间
        
          };

          updateConfig(_data)
            .then(res => {
              if (res.data.state == "1") {
                this.$Message.success("保存成功");
              } else {
                this.$Message.warning(res.data.msg);
              }
              this.showDisbution();
            })
            .catch(err => {});
        }
      });
    }
  },
  mounted() {
    this.showDisbution();
  }
};
</script>
<style lang="less">
.from-distribution {
  width: 600px;
  margin: 0 auto;
}
</style>
