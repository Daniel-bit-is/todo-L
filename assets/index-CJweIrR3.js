(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const d of t)if(d.type==="childList")for(const r of d.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function l(t){const d={};return t.integrity&&(d.integrity=t.integrity),t.referrerPolicy&&(d.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?d.credentials="include":t.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function s(t){if(t.ep)return;t.ep=!0;const d=l(t);fetch(t.href,d)}})();document.querySelector("#app").innerHTML=`
  <div class="todo-container">
    <h1> Todo List</h1>
    <form class="todo-form" id="todoForm">
      <input 
        type="text" 
        class="todo-input" 
        id="todoInput" 
        placeholder="Add a new task..."
        required
      >
      <button type="submit" class="add-button">Add</button>
    </form>
    <ul class="todo-list" id="todoList"></ul>
  </div>
`;const u=document.getElementById("todoForm"),c=document.getElementById("todoInput"),a=document.getElementById("todoList");let n=[];function p(o){const e={id:Date.now(),text:o,completed:!1};n.push(e),i()}function m(o){n=n.filter(e=>e.id!==o),i()}function f(o){n=n.map(e=>e.id===o?{...e,completed:!e.completed}:e),i()}function i(){a.innerHTML=n.map(o=>`
      <li class="todo-item">
        <input 
          type="checkbox" 
          class="todo-checkbox" 
          ${o.completed?"checked":""}
          onchange="window.toggleTodo(${o.id})"
        >
        <span class="todo-text ${o.completed?"completed":""}">
          ${o.text}
        </span>
        <button 
          class="delete-button"
          onclick="window.deleteTodo(${o.id})"
        >
          Delete
        </button>
      </li>
    `).join("")}u.addEventListener("submit",o=>{o.preventDefault();const e=c.value.trim();e&&(p(e),c.value="")});window.deleteTodo=m;window.toggleTodo=f;i();
