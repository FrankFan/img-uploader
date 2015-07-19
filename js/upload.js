// var ajaxUrl = '/imageuploader/processupload?host=www.cnblogs.com';
var ajaxUrl = 'http://upload.cnblogs.com/imageuploader/processupload?host=www.cnblogs.com';
$(function() {
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
            $('#message').html(message);
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
        if (responseJSON.success) {
            $('#message').html(responseJSON.message);
        } else {
            $('#message').html(responseJSON.message);
        }
    });
});