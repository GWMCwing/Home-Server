async function updateActiveItem() {
    const path = window.location.pathname;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const itemList = document
        .getElementById('navBar')!
        .getElementsByTagName('a');
    for (let i = 0; i < itemList.length; i++) {
        const itemDom = itemList[i];
        const tempDom = document.createElement('a');
        tempDom.href = itemDom.href;
        if (tempDom.pathname === path) {
            itemDom.classList.add('active');
        } else {
            itemDom.classList.remove('active');
        }
    }
}
window.addEventListener('load', updateActiveItem);
