$(function (e) {
    var layer = layui.layer;
    var form = layui.form;
    // 定义文章最终的状态
    var art_state = '已发布'

    // 1 初始化分类的下拉菜单
    initCate()
    // 1 初始化富文本编辑器
    initEditor()

    // 2.1获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 2.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 400 / 280,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 2.3 创建裁剪区域
    $image.cropper(options)

    // 更换封面
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })

    // 为文件选择框绑定 change 事件
    $('#coverFile').on('change', function (e) {
        var filelist = e.target.files
        if (filelist.length === 0) {
            return
        }
        // 将文件转为路径
        var newImgURL = URL.createObjectURL(filelist[0])
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    // 为存为草稿按钮，绑定点击事件
    $('#btnSave2').on('click', function () {
        art_state = '草稿';
    })
    // 为发表文章的表单绑定submit事件
    $('#form-pub').on('submit', function (e) {
        // 1. 阻止表单的默认行为
        e.preventDefault();
        // 2. 创建一个formData表单对象
        var fd = new FormData($(this)[0])
        fd.append('state', art_state);
        // 4. 将封面区域，裁剪并输出为一个图片的文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 5. 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                // 6. 发起 ajax 请求
                publishArticle(fd)
            })
    })


    // 发表文章的方法
    function publishArticle(fd) {
        $.ajax({
            type: 'POST',
            url: '/my/article/add',
            data: fd,
            // 注意：如果提交的是 fd 格式的数据，必须有如下两个配置项
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发表文章失败！')
                }
                layer.msg('发表文章成功！')
                // 跳转到文章列表页面
                location.href = '/article/art_list.html'
            }
        })
    }

    // 初始化文章类别
    function initCate() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！')
                }
                // 调用模板引擎渲染结构
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 通知 layui 需要重新渲染下表单的结构
                form.render()
            }
        })
    }
})