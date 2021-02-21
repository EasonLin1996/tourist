//抓dom
let listDom = document.querySelector('.tour__list');
let selectDom = document.querySelector('.header__select');
let titleDom =document.querySelector('.tour__title');
let hotArea = document.querySelectorAll('.popular__btn');
let pageDom = document.querySelector('.tour__pagelist');
let nextDom =document.querySelector('.next');
let prevDom =document.querySelector('.prev');
let nowPageDom = document.querySelector('.nowpage');
let loadDom =document.querySelector('.loading');

//建立data接資料
let data = {};
let datafilter = {};

//建立currentpage
let currentPage = 1;

//偵聽事件
selectDom.addEventListener('change',showSelect);
pageDom.addEventListener('click',switchPage);
nextDom.addEventListener('click',togglePage);
prevDom.addEventListener('click',togglePage);
listDom.addEventListener('click',totop)
hotArea.forEach((items)=>{
  items.addEventListener('click',showSelect)
})

//make request(new)
function fetchReq(){
  let url ='https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c'
  fetch(url,{method:'get'})
  .then((res)=>{
    return res.json();
  }).then((json)=>{
    loadDom.style.display='none';
    data = json.data.XML_Head.Infos.Info;
    datafilter = data;
    let startPage = 1;
    pageList(data,startPage);
  })
}

//返回最上層
function totop(e){
  if(e.target.getAttribute('alt') === 'totop'){
    window.scroll(0,0);
  }
}

//上下一頁切換
function togglePage(e){
  e.preventDefault();
  if(e.target.textContent==='下一頁'){
    currentPage +=1
    pageList(datafilter,currentPage);
    shownowPage();
  }else if(e.target.textContent==='上一頁'){
    currentPage -=1
    pageList(datafilter,currentPage);
    shownowPage();
  }
}


//顯示現在第幾頁
function shownowPage(){
  nowPageDom.innerHTML = `現在是第${currentPage}頁`
}

//頁面的顯示
function pageList(data,page){
  let perPage = 10;
  let maxPage = Math.ceil(data.length / perPage);
  let minPage = 1; 
  currentPage = page;
  prevDom.removeAttribute("disabled");
  nextDom.removeAttribute("disabled");
  if (currentPage > maxPage){
    currentPage = maxPage ;
    nextDom.setAttribute("disabled", "");
  }else if(currentPage < minPage){
    currentPage = minPage;
    prevDom.setAttribute("disabled", "");
  }
  let maxData = currentPage * perPage;
  let minData = (currentPage * perPage) - perPage 
  let str = `<img src="img/btn_goTop.png" alt="totop" class="tour____list-totop">`;
  for(let i = minData ; i < maxData ; i++){
    if(data[i]){
    let name = data[i].Name;
    let time = data[i].Opentime;
    let tel = data[i].Tel;
    let area = data[i].Zipcode;
    let add = data[i].Add;
    let pic = data[i].Picture1;
    area = getArea(area);
    str +=`
    <li class="tour__item">
      <div class="tour__imgbox" style='background-image:url(${pic});'>
        <h3 class="tour__name">${name}</h3>
        <p class="tour__area">${area}</p>
      </div>
      <div class="tour__txtbox">
        <div class="tour__dis">
          <img src="img/icons_clock.png" alt="clock">
          <p>
            ${time}
          </p>
        </div>
        <div class="tour__dis">
          <img src="img/icons_pin.png" alt="clock">
          <p>${add}</p>
        </div>
        <div class="tour__dis">
          <img src="img/icons_phone.png" alt="clock">
          <p>${tel}</p>
        </div>
        <div class="tour__dis">
          <img src="img/icons_tag.png" alt="tag">
          <p>免費參觀</p>
        </div>
      </div>
    </li>
    `
    }
  }
  listDom.innerHTML = str;
  pageBtn(maxPage);
  shownowPage();
}

//Pagebtn的顯示
function pageBtn(page){
  let str = ``;
  for(i = 1; i < page + 1 ; i++){
    str += `
    <li class='tour__pagelist__item'><a href='#' class='tour__pagelist____link' data-index=${i}>${i}</a></li>
    `
  }
  pageDom.innerHTML = str;
}

//換頁數
function switchPage(e){
  e.preventDefault();
  if(e.target.nodeName !== 'A'){return}
  currentPage = e.target.dataset.index
  pageList(datafilter,currentPage)
}

//看選擇的區域
function showSelect(e){
  e.preventDefault();
  let selectArea = e.target.value;
  if (selectArea === '全區'){
    datafilter = data
  }else if(selectArea){
    datafilter = data.filter((items)=>{
      return getArea(items.Zipcode) === selectArea;
    })
  }
  // showList(datafilter)

  titleDom.innerHTML = selectArea || '全區';
  pageList(datafilter,currentPage);
}

//判別區域
function getArea(num){
  let obj = {
    807:"三民區",
    814:"仁武區",
    845:"內門區",
    844:"六龜區",
    801:"前金區",
    806:"前鎮區",
    819:"南沙群島",
    831:"大寮區",
    840:"大樹區",
    815:"大社區",
    812:"小港區",
    820:"岡山區",
    813:"左營區",
    827:"彌陀區",
    800:"新興區",
    842:"旗山區",
    805:"旗津區",
    846:"杉林區",
    817:"東沙群島",
    832:"林園區",
    848:"桃源區",
    826:"梓官區",
    811:"楠梓區",
    825:"橋頭區",
    828:"永安區",
    829:"湖內區",
    824:"燕巢區",
    823:"田寮區",
    847:"甲仙區",
    843:"美濃區",
    802:"苓雅區",
    851:"茂林區",
    852:"茄萣區",
    821:"路竹區",
    849:"那瑪夏區",
    822:"阿蓮區",
    833:"鳥松區",
    830:"鳳山區",
    803:"鹽埕區",
    804:"鼓山區",
  }
  let res = obj[num];
  return res
}

//建立selected
function createSelect(){
  let obj = {
    807:"三民區",
    814:"仁武區",
    845:"內門區",
    844:"六龜區",
    801:"前金區",
    806:"前鎮區",
    819:"南沙群島",
    831:"大寮區",
    840:"大樹區",
    815:"大社區",
    812:"小港區",
    820:"岡山區",
    813:"左營區",
    827:"彌陀區",
    800:"新興區",
    842:"旗山區",
    805:"旗津區",
    846:"杉林區",
    817:"東沙群島",
    832:"林園區",
    848:"桃源區",
    826:"梓官區",
    811:"楠梓區",
    825:"橋頭區",
    828:"永安區",
    829:"湖內區",
    824:"燕巢區",
    823:"田寮區",
    847:"甲仙區",
    843:"美濃區",
    802:"苓雅區",
    851:"茂林區",
    852:"茄萣區",
    821:"路竹區",
    849:"那瑪夏區",
    822:"阿蓮區",
    833:"鳥松區",
    830:"鳳山區",
    803:"鹽埕區",
    804:"鼓山區",
  }
  let ary = [];
  for(let i in obj){
    ary.push(obj[i])
  }
  let str = `<option value='全區'>--全區--</option>`;
  for(let i = 0; i < ary.length ; i++){
    str += `<option value="${ary[i]}">${ary[i]}</option>`
  }
  selectDom.innerHTML = str;
};

createSelect();
fetchReq();


//make request(old)
// function makeRequest(selected){
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET','https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c')
//   xhr.send();
//   xhr.onreadystatechange = function(){
//     if(this.readyState === 4){
//       let obj = JSON.parse(this.responseText);
//       let data = obj.data.XML_Head.Infos.Info;
//       if (selected === '全區'){
//         data = data
//       }else if(selected){
//         data = data.filter((items)=>{
//           return getArea(items.Zipcode) === selected;
//         })
//       }
//       let len = data.length;
//       let str = '';
//       console.log(data)
//       for(let i = 0 ; i < data.length ; i++){
//         let name = data[i].Name;
//         let time = data[i].Opentime;
//         let tel = data[i].Tel;
//         let area = data[i].Zipcode;
//         let add = data[i].Add;
//         let pic = data[i].Picture1;
//         area = getArea(area);
//         str +=`
//         <li class="tour__item">
//           <div class="tour__imgbox" style='background-image:url(${pic});'>
//             <h3 class="tour__name">${name}</h3>
//             <p class="tour__area">${area}</p>
//           </div>
//           <div class="tour__txtbox">
//             <div class="tour__dis">
//               <img src="img/icons_clock.png" alt="clock">
//               <p>
//                 ${time}
//               </p>
//             </div>
//             <div class="tour__dis">
//               <img src="img/icons_pin.png" alt="clock">
//               <p>${add}</p>
//             </div>
//             <div class="tour__dis">
//               <img src="img/icons_phone.png" alt="clock">
//               <p>${tel}</p>
//             </div>
//             <div class="tour__dis">
//               <img src="img/icons_tag.png" alt="tag">
//               <p>免費參觀</p>
//             </div>
//           </div>
//         </li>
//         `
//       }
//       listDom.innerHTML = str;
//       titleDom.innerHTML = selected || '全區';
    
//     }
//   }
// }