<template>
    <div class="home">
        <Card>
            <div style="text-align:center">
                <Icon type="ios-people" />
                <h3>客户总数</h3>
                <p>{{ homeObj.userCount }}</p>
            </div>
        </Card>
        <Card>
            <div style="text-align:center">
                <Icon type="logo-usd" />
                <h3>买币总金额</h3>
                <p>{{ homeObj.sumBuyCoinMoney }} USDT</p>
            </div>
        </Card>
        <Card>
            <div style="text-align:center">
                <Icon type="md-cash" />
                <h3>充值总金额</h3>
                <p>{{ homeObj.sumPayMoney }} USDT</p>
            </div>
        </Card>
    </div>
</template>
<script>
import { home } from "@/api/api";

export default {
    data () {
        return {
            homeObj: {
                userCount: 0,
                sumBuyCoinMoney: 0,
                answerCount: 0
            }
        }
    },
    mounted() {
        home().then(res => {
            if (res.data.code == "200") {
                this.homeObj = res.data.data;
            } else {
                this.$Message.warning(res.data.msg);
            }
        }).catch(err => {})
    }
}
</script>
<style lang="less">
.home {
    display: flex;
    justify-content: space-around;
    margin-top: 10%;
    .ivu-card {
        width: 28%;
        .ivu-icon {
            font-size: 60px;
        }
        h3 {
            font-size: 18px;
            font-weight: normal;
            margin: 5px 0;
        }
        p {
            font-size: 15px;
        }
    }
}
</style>
