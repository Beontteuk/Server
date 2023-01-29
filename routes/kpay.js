let headers = {
    'Authorization': 'KakaoAK '+'8dfa7d987b860ee6c90e4497d8b70a46',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
};

let params = {
    'cid': 'TC0ONETIME', // 테스트 코드
    'partner_order_id': '111',
    'partner_user_id': '222',
    'item_name': '5000포인트 충전',
    'quantity': 1,
    'total_amount': 5000,
    'vat_amount': 200,
    'tax_free_amount': 0,
    'approval_url': 'http://54.83.101.17:8080',
    'fail_url': 'http://54.83.101.17:8080',
    'cancel_url': 'http://54.83.101.17:8080',
};

let options = {
    url: 'https://kapi.kakao.com/v1/payment/ready',
    method: 'POST',
    headers: headers,
    form: params
};
const change_points = function (points) { 
    let option = options;
    console.log(option);
  }

// change_points (points) => {
//     option = options;
//     console.log(option);
// }

const express = require("express")
const router = express.Router()
const path = require("path")
const request = require('request-promise-native');

router.get('/', (req,res) => {
    token =req.query.pg_token
    if(token===undefined){
        res.sendFile(path.join(__dirname, "../views/kpay.html"));
    }
    else {
        res.send("결제 성공")
    }
    
});

router.get('purchase/5000', (req, res)=>{
    get_info(req, res);
});

async function get_info(req, res){
    try {
        let result = await request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                return body;
            }
        });
        //console.log(JSON.parse(result))
        
        data = JSON.parse(result)
        console.log(data)
        //console.log(data.next_redirect_pc_url)
        res.redirect(data.next_redirect_pc_url)
        // redir_address = result.next_redirect_pc_url;
        // res.send(redir_address);
        //res.send(JSON.parse(result));
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = router