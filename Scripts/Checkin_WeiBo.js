/*
Weibo Super Talk Check in
Made by NavePnow

[task_local]
0 12 * * * checkin_qx.js
https:\/\/weibo\.com\/p\/aj\/general\/button\?ajwvr=6&api=http:\/\/i\.huati\.weibo\.com\/aj\/super\/checkin url script-response-body get_cookie_qx.js

MITM = weibo.com
*/
var accounts = [
     ["妖风小姐姐", "100808a6e87c33b58f56d859a85953536aad4c"],
     ["许嵩", "100808eef38c55b37f389147e1baf6e48fb794"],
     ["IU", "100808d4151ccebfbae55e8f7c0f68f6d18e4d"],
     ["林更新",
"100808dfb7713cbd19312b0c5f780b89e0287f"],
     ["Apple",
"1008089f6290f4436e5a2351f12e03b6433c3c"],
     ["iPhone",
"100808867e57bd062c7169995dc03cc0541c19"],
     ["iPad",
"1008081b9018182a49e16ba85bb095f224867c"],
     ["万茜",
"100808a8b5756ed2b56a78818cbbeaa8d2a36f"],
     ["何璟昕",
"100808c1805f05e9783a01f4cb879c92567f47"],
     ["陈瑶",
"100808af785981157abb3c84fb63a00ca915dc"],


]
function launch() {
    for (var i in accounts) {
        let name = accounts[i][0]
        let super_id = accounts[i][1]
        weibo_super(name, super_id)
    }
    //$done();
}

launch()

function weibo_super(name, super_id) {
    //$notification.post(name + "的微博超话签到", super_id, "")
    let super_url = {
        url: "https://weibo.com/p/aj/general/button?ajwvr=6&api=http://i.huati.weibo.com/aj/super/checkin&texta=%E7%AD%BE%E5%88%B0&textb=%E5%B7%B2%E7%AD%BE%E5%88%B0&status=0&id=" + super_id + "&location=page_100808_super_index&timezone=GMT+0800&lang=zh-cn&plat=MacIntel&ua=Mozilla/5.0%20(Macintosh;%20Intel%20Mac%20OS%20X%2010_15)%20AppleWebKit/605.1.15%20(KHTML,%20like%20Gecko)%20Version/13.0.4%20Safari/605.1.15&screen=375*812&__rnd=1576850070506",
        headers: {        
            Cookie: $prefs.valueForKey("super_cookie"),
            }
    };

    $task.fetch(super_url).then(response => {
            var obj = JSON.parse(response.body);
            //console.log(obj);
            var code = obj.code;
            var msg = obj.msg;
            //console.log(msg);
            if (code == 100003) {   // 行为异常，需要重新验证
                //console.log("Cookie error response: \n" + data)
                $notify(name + "的微博超话签到", "❕" + msg, obj.data.location)
            } else if (code == 100000) {
                tipMessage = obj.data.tipMessage;
                alert_title = obj.data.alert_title;
                alert_subtitle = obj.data.alert_subtitle;
                $notify(name + "的微博超话签到", "签到成功" + " 🎉", alert_title + "\n" + alert_subtitle)

            } else if (code == 382004){
                msg = msg.replace("(382004)", "")
                $notify(name + "的微博超话签到", "", msg + " 🎉")
            } else{
                $notify(name + "的微博超话签到", "", msg)
            }

        }, reason => {
    //$notify("京东签到错误‼️‼️", "", reason.error);
        $notify(name + "的微博超话签到错误！", "", reason.error)
  });
}
