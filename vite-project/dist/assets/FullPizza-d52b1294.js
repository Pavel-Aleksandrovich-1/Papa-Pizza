import{R as i,u as d,a as l,j as t,F as u,b as e,L as h,c as m}from"./index-16fdaad3.js";const f=()=>{const[a,n]=i.useState(),{id:c}=d(),r=l();return i.useEffect(()=>{async function o(){try{const{data:s}=await m.get("https://6427dbb846fd35eb7c46d36b.mockapi.io/items/"+c);n(s)}catch{alert("Ошибка"),r("/")}}o()},[]),a?e("div",{className:"container",children:[t("img",{src:a.imageUrl}),t("h2",{children:a.title}),e("h4",{children:[a.price," ₽ "]}),e(h,{to:"/",children:[" ",t("button",{className:"button button--outline button--add",children:t("span",{children:"Назад"})})]})]}):t(u,{children:"Загрузка..."})};export{f as default};