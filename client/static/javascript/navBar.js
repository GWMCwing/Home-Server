async function updateActiveItem() {
    const path = window.location.pathname;
    const itemList = document
        .getElementById('navBar')
        .getElementsByTagName('a');
    for (let i = 0; i < itemList.length; i++) {
        let itemDom = itemList[i];
        let tempDom = document.createElement('a');
        tempDom.href = itemDom.href;
        if (tempDom.pathname === path) {
            itemDom.classList.add('active');
        } else {
            itemDom.classList.remove('active');
        }
    }
}
window.addEventListener('load', updateActiveItem);
