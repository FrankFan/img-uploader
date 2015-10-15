
var ajaxUrl = 'http://upload.cnblogs.com/imageuploader/processupload?host=www.cnblogs.com';

$(function() {

    handleLogin();

    initClipboard();
});


function handleLogin() {
    var url = 'http://upload.cnblogs.com/imageuploader/upload?host=www.cnblogs.com&editor=4#Editor_Edit_EditorBody';
    $.get(url, function(response) {
        if (response.indexOf('未登录，请先') > -1) {
            response = response.replace('<link href="/css/base.css" rel="stylesheet">', '');
            $('body').html(response);
        } else {

            $('.wrap').show();
            uploader();
        }
    })
}

function uploader() {
    $('#jquery-wrapped-fine-uploader').fineUploader({
        validation: {
            allowedExtensions: ['png', 'gif', 'jpg', 'jpeg'],
            sizeLimit: 10 * 1024 * 1024
        },
        request: {
            endpoint: ajaxUrl
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
            addItem(responseJSON.message);
        } else {
            addItem('出错了 ~~~~(>_<)~~~~ ');
        }
    });
}

function addItem(message) {
    var button = '<div class="copy btn btn-success" data-toggle="tooltip" data-placement="right" data-original-title="复制到剪贴板" alt="复制" data-clipboard-text="' + message + '"><i class="icon-hand-left icon-white"></i>复制</div>';
    // 
    // var item = '<div contenteditable="false" class="message"><span class="imgUrl">' + message + '</span><i class="copy btn btn-success" data-toggle="tooltip" data-placement="right" data-original-title="复制到剪贴板" alt="复制" data-clipboard-text="' + message + '">复制</i></div>';
    var item = '<div contenteditable="false" class="message"><span class="imgUrl">' + message + '</span>' + button;
    $('.show-area').append(item);
    $('[data-toggle="tooltip"]').tooltip();
}

function initClipboard() {
    var clipboard = new Clipboard('.copy');

    clipboard.on('success', function(e) {
        var $trigger = $(e.trigger);
        $trigger.attr("data-original-title", "Copyied!").tooltip('show').attr("data-original-title", "复制到剪贴板").tooltip("fixTitle");
        // $('[data-toggle="tooltip"]').attr("data-original-title", "复制到剪贴板").tooltip("fixTitle");
    });
}