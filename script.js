$(function(){
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
    }
  ]
  let html = getCardHtml(data)
  $('#access .container-item-title span').text(data.length)
  $('#access .container-item-body').html(html)
})

function getCardHtml (data) {
  let html = ''
  data.forEach(item => {
    let card = `<div class="card">
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
