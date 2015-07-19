

var return_url = 'http://upload.cnblogs.com/imageuploader/upload?host=www.cnblogs.com&editor=4?host=www.cnblogs.com&editor=4';
var ajax_url = 'http://passport.cnblogs.com/user/signin';
var enable_captcha = false;
var is_in_progress = false;

function setFocus() {
    document.getElementById('input1').focus();
}

function checkParams() {
    if (is_in_progress) {
        return false;
    }

    $('#tip_input1').html('');
    $('#tip_input2').html('');

    var input1 = $.trim($('#input1').val());
    if (!input1) {
        $('#tip_input1').html("请输入登录用户名");
        $('#input1').focus();
        return false;
    }
    var input2 = $.trim($('#input2').val());
    if (!input2) {
        $('#tip_input2').html("请输入密码");
        $('#input2').focus();
        return false;
    }

    if (enable_captcha) {
        var captchaCode = $.trim($('#captcha_code_input').val());
        if (!captchaCode) {
            $('#tip_captcha_code_input').html("请输入验证码");
            $('#captcha_code_input').focus();
            return false;
        }
    }

    return true;    
}

function signin_go() {

    $('#tip_btn').html('提交中...');

    var encrypt = new JSEncrypt();
    encrypt.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCp0wHYbg/NOPO3nzMD3dndwS0MccuMeXCHgVlGOoYyFwLdS24Im2e7YyhB0wrUsyYf0/nhzCzBK8ZC9eCWqd0aHbdgOQT6CuFQBMjbyGYvlVYU2ZP7kG9Ft6YV6oc9ambuO7nPZh+bvXH0zDKfi02prknrScAKC0XhadTHT3Al0QIDAQAB');
    var encrypted_input1 = encrypt.encrypt($('#input1').val());
    var encrypted_input2 = encrypt.encrypt($('#input2').val());
    var ajax_data = {
        input1: encrypted_input1,
        input2: encrypted_input2,
        remember: true
    };

    if (enable_captcha) {
        var captchaObj = $("#captcha_code_input").get(0).Captcha;
        ajax_data.captchaId = captchaObj.Id;
        ajax_data.captchaInstanceId = captchaObj.InstanceId;
        ajax_data.captchaUserInput = '$("#captcha_code_input").val()';
    }
    is_in_progress = true;
    $.ajax({
        url: ajax_url,
        type: 'post',
        data: JSON.stringify(ajax_data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        headers: {
            'VerificationToken': 'uNXJO_0sfoKZ8o-TEjBFHXcfWQRvjC1Ivko63OweA0nncvpJ-yDL8E8zdp8TWDi7AxSnFrPVhSdNX8u6Laa_X2D5kXo1:NW4IL0bnBd_czjxpNnswV47nh7bjN0QoF_yCGxBCQpocfn0uXDgbCOR_2RyRn31p3gnN3Vcg9rLMQaFW00wls_F2jkE1'
            // 'Origin': 'http://passport.cnblogs.com'
        },
        success: function(data) {
            debugger;
            if (data.success) {
                $('#tip_btn').html('登录成功，正在重定向...');
                // location.href = return_url;
            } else {
                $('#tip_btn').html(data.message + "<br/><br/>联系 contact@cnblogs.com");
                is_in_progress = false;
                if (enable_captcha) {
                    captchaObj.ReloadImage();
                }
            }
        },
        error: function(xhr) {
            debugger;
            is_in_progress = false;
            $('#tip_btn').html('抱歉！出错！联系 contact@cnblogs.com');
        }
    });
}

$(function() {
    $('#signin').on('click', function(e) {
        var result = checkParams();
        console.log('check result : ' + result);
        if(result) {
            signin_go();    
        }
        
    }).val('登 录');

    // auto focus
    setFocus();
});