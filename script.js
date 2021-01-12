let addRuleFormObj = null
// 微服务列表
let serverList = {
  product1: [],
  product2: [],
  product3: [],
  product4: []
}
// 已选择微服务
let selectedServerList = []

$(function(){
  // 同步微服务列表
  syncServerList()

  let data = [
    {
      id: 1,
      group: 'NFVO',
      name: '重构规划名称',
      authorName: '杨连刚',
      authorUrl: './avatar.jpeg',
      tag1: '30K',
      tag2: '12-3截止',
      tag3: 'Pinddig',
      desc: '规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述规划描述',
      product: 'product1',
      server: [
        {server: 'product1_server1', codeNumber: 100},
        {server: 'product1_server2', codeNumber: 200},
      ],
      time: '2020年Q1',
      status: 2,
    }
  ]
  let html = getCardHtml(data)
  $('#access .container-item-title span').text(data.length)
  $('#access .container-item-body').html(html)



})

function syncServerList(){
  // TODO: 接口获取微服务列表
  serverList = {
    product1: ['product1_server1', 'product1_server2', 'product1_server3'],
    product2: ['product2_server1', 'product2_server2', 'product2_server3'],
    product3: ['product3_server1', 'product3_server2', 'product3_server3'],
    product4: ['product4_server1', 'product4_server2', 'product4_server3'],
  }
}
function getCardHtml (data) {
  let html = ''
  data.forEach(item => {
    // 把数据存到data中
    let card = `<div class="card" id="${item.id}" data-data='${JSON.stringify(item)}'>
      <div class="card-title">
        <span class="tag tag-blue">${item.group}</span>
        <span class="card-title-text">${item.name}</span>
      </div>
      <div class="card-author">
        <img class="avatar" src="${item.authorUrl}" alt="">
        <span class="name">${item.authorName}</span>
        <span class="tag tag-info">${item.tag1}</span>
        <span class="tag tag-warning">${item.tag2}</span>
        <span class="tag tag-error">${item.tag3}</span>
      </div>
      <div class="card-content">
        ${item.desc}
      </div>
    </div>`
    html += card
  })
  return html
}


// 初始化配置表单
$(function(){
  layui.use(['form'], function(){
    addRuleFormObj = layui.form

      // 绑定添加点击事件
    $('#addRuleBtn').on('click', function(){
      addRuleFormObj.val('addRuleForm', {
        name: '',
        product: '',
        time: '',
        status: '',
        desc: '',
        server: '',
        codeNumber: ''
      });
      // 设置微服务列表
      renderServerList()
      // 设置微服务初始值
      selectedServerList = []
      renderSelectedServer()
      $('#addRuleDialog .modal-title').text('新增')
      $('#addRuleDialog').modal('show')
    })

    // 编辑
    $('.card').on('click', function(){
      // 表单赋值
      let data = $(this).data('data')
      addRuleFormObj.val('addRuleForm', {
        name: data.name,
        product: data.product,
        time: data.time,
        status: data.status,
        desc: data.desc,
        server: '',
        codeNumber: ''
      });
      // 设置微服务列表
      renderServerList()
      // 设置微服务初始值
      selectedServerList = data.server
      renderSelectedServer()
      // 打开dialog
      $('#addRuleDialog .modal-title').text('修改')
      $('#addRuleDialog').modal('show')
    })

    // 提交表单
    layui.$('#submitAddRuleBtn').on('click', function(){
      var data = addRuleFormObj.val('addRuleForm');
      data.server = selectedServerList
      console.log('data', data)
      if (data.name == '') {
        layer.msg('请填写重构事务');
        return
      }
      if (data.produce == '') {
        layer.msg('请选择产品');
        return
      }
      if (data.time == '') {
        layer.msg('请选择完成时间');
        return
      }

      // TODO: 调接口保存数据
    });


    // 监听产品变化
    addRuleFormObj.on('select(product)', function(data){
      renderServerList()
    });

    // 添加微服务
    $('#addServerBtn').click(function(){
      let server = $('#server').val()
      let codeNumber = $('#codeNumber').val()
      if (server === '') {
        layer.msg('请选择微服务');
        return
      }
      if (selectedServerList.find(x => x.server === server)) {
        layer.msg('该微服务已存在');
        return
      }
      if (codeNumber === '') {
        layer.msg('请填写代码量');
        return
      }
      if (!/^\d+$/.test(codeNumber)) {
        layer.msg('代码量必须为数字');
        return
      }
      // 保存数据
      selectedServerList.push({
        server: server,
        codeNumber: codeNumber
      })
      // 更新渲染
      renderSelectedServer()
      // 清空选项
      $('#server').val('')
      $('#codeNumber').val('')
      addRuleFormObj.render('select')
    })
  });
})

// 更新微服务列表
function renderServerList(){
  let produce = $('#product').val()
  let list = []
  if (produce) {
    list = serverList[produce] || []
  }
  // 设置微服务列表
  list = list.map(x => {
    return `<option value="${x}">${x}</option>`
  })
  list = '<option value="">请选择</option>' + list
  $('#server').html(list)
  // 刷新列表
  addRuleFormObj.render('select')
}

// 更新服务渲染
function renderSelectedServer(){
  let html = selectedServerList.map((x, index) => {
    return `<div class="server-item">
      <div class="server-item-text">${x.server}, ${x.codeNumber}</div>
      <div class="server-item-close" onclick="removeSelectedServerItem(${index})">x</div>
    </div>`
  })
  $('#serverContent').html(html)
}
// 删除已选服务
function removeSelectedServerItem (index) {
  selectedServerList.splice(index, 1)
  renderSelectedServer()
}
