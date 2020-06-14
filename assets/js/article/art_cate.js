$(function () {
    var layer = layui.layer;
    initTable();

    var addIndex = null;
    $('#showAdd').on('click', function () {
        addIndex = layer.open({
            type: 1, // 页面层
            title: '添加文章分类',
            content: $('#tpl-add').html(), // 弹出层的主体
            area: ['500px', '250px'] // 设置层的宽和高
        });

    })

    // 通过代理的方式，为添加的表单绑定 submit 事件
    $('body').on('submit', '#form-add', function (e) {
        // 1 阻止表单的默认行为
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg('添加文章分类失败!')
                }
                layer.msg('添加文章分类成功!');
                // 关闭弹层
                layer.close(addIndex);
                // 刷新表格数据
                initTable()
            }
        })
    })


    // 初始化表格的数据
    function initTable() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return laryer.msg("获取表格数据失败")
                }
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
            }
        })
    }
})