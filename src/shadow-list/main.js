// https://codepen.io/tocausan/pen/ddKOog

(() => {
    const container = document.getElementsByClassName("container")[0];
    for (let i = 0; i < 50; i++) {
        let item = document.createElement("div"),
            a = document.createElement("a");
        item.classList.add("item");
        a.innerHTML = "hello " + i;
        item.appendChild(a);
        container.appendChild(item);
    }
})();

