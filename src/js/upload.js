
// 匿名闭包形式，减少全局变量污染
var cnblogsUploader = (function(){

    var _ajaxUrl = 'http://upload.cnblogs.com/imageuploader/processupload?host=www.cnblogs.com';
    var _loginUrl = 'http://upload.cnblogs.com/imageuploader/upload?host=www.cnblogs.com&editor=4#Editor_Edit_EditorBody';

    var initClipboard = function() {
        var clipboard = new Clipboard('.copy');

        clipboard.on('success', function(e) {
            var $trigger = $(e.trigger);
            $trigger.attr("data-original-title", "Copyied!").tooltip('show').attr("data-original-title", "复制到剪贴板").tooltip("fixTitle");
        });
    }

    var handleLogin = function() {
        $.get(_loginUrl)
            .done(function(response) {
                if (response.indexOf('未登录，请先') > -1) {
                    response = response.replace('<link href="/css/base.css" rel="stylesheet">', '');
                    $('body').html(response);
                    $('a').attr('href', 'http://passport.cnblogs.com/login.aspx?ReturnUrl=http%3A%2F%2Fwww.cnblogs.com%2F');
                } else {
                    $('.wrap').show();
                    _uploader();
                }
            });
    }

    var _uploader = function() {
        $('#jquery-wrapped-fine-uploader').fineUploader({
            validation: {
                allowedExtensions: ['png', 'gif', 'jpg', 'jpeg'],
                sizeLimit: 10 * 1024 * 1024
            },
            request: {
                endpoint: _ajaxUrl
            },
            text: {
                uploadButton: '<i class="icon-upload icon-white"></i> 上传本地图片',
                dropProcessing: '（支持文件拖放上传）'
            },
            showMessage: function(message) {
                // $('#message').html(message);
            },
            template: '<div class="qq-uploader span12">' +
                '<pre class="qq-upload-drop-area span12"><span>{dragZoneText}</span></pre>' +
                '<div class="qq-upload-button btn btn-success" style="width: auto;">{uploadButtonText}</div>' +
                '<span class="qq-drop-processing"><span>{dropProcessingText}</span><span class="qq-drop-processing-spinner"></span></span>' +
                '<ul class="qq-upload-list" style="margin-top: 10px;overflow:hidden;"><div style="margin-top: 10px;">只能上传单张10M以下的 png、jpg、gif 格式的图片</div></ul>' +
                '</div>',
            classes: {
                success: 'alert alert-success',
                fail: 'alert alert-error'
            },
            multiple: false
        }).on('complete', function(event, id, fileName, responseJSON) {
            if (responseJSON.message) {
                _addItem(responseJSON.message);
            } else {
                _addItem('出错了 ~~~~(>_<)~~~~ ');
            }
        });
    }

    var _addItem = function(message) {
        var button = '<div class="copy btn btn-success" data-toggle="tooltip" data-placement="right" data-original-title="复制到剪贴板" alt="复制" data-clipboard-text="' + message + '">\
                  <i class="icon-hand-left icon-white"></i>复制</div>';
        var item = '<div contenteditable="false" class="message"><span class="imgUrl">' + message + '</span>' + button;
        $('.show-area').append(item);
        $('[data-toggle="tooltip"]').tooltip();
    }

    return {
        handleLogin: handleLogin,
        initClipboard: initClipboard
    }
})();


$(function() {
    cnblogsUploader.handleLogin();
    cnblogsUploader.initClipboard();
});