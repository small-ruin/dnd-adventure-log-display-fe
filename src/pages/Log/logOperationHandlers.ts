import { LOG_OPERATIONS } from './logMenus';
import { greyFilter } from '../../utils'

export default {
    [LOG_OPERATIONS.DELETE_ALL_BRACKETS]: () => hideBrackets(),
    [LOG_OPERATIONS.DELETE_ALL_BRACKETS_BUT_NOT_SPACE]: () => hideBrackets(),
    [LOG_OPERATIONS.FONT_SIZE_DECREASE]: () => stepFontSize(-1),
    [LOG_OPERATIONS.FONT_SIZE_INCREASE]: () => stepFontSize(1),
    [LOG_OPERATIONS.GREY]: () => greyColor(),
    [LOG_OPERATIONS.ALL_BLACK]: () => removeColor(),
    [LOG_OPERATIONS.FONT_FAMILY_HEI]: () => setFontFamily('Helvetica Neue, Microsoft YaHei, PingFang SC, Heiti SC, sans-serif'),
    [LOG_OPERATIONS.FONT_FAMILY_SONG]: () => setFontFamily('Georgia,Times New Roman,Times,Songti SC,serif'),
}

function hideBrackets() {
    const eles: HTMLElement[] = Array.from(document.querySelectorAll('font, br'));
    eles.forEach(ele => {
        const text = ele.textContent;
        if (text && text.match(/.*> [（()].*[)）]?/)) {
            // const prev = ele.previousElementSibling as HTMLElement | null;
            // while (prev && prev.textContent?.match(/&nbsp;|\d+:\d+:\d+|<br>/)) {
            //     prev.style.display = 'none'
            // }
            ele.style.display = 'none'
        } else {
            ele.textContent && (ele.textContent = ele.textContent.replace(/（.*）/g, ''));
        }
    })
}
function showBrackets() {
    const eles: HTMLElement[] = Array.from(document.querySelectorAll('font, br'));
    eles.forEach(ele => {
        if (ele.style.display === 'none')
            ele.style.display = 'inline';
    })
}
function removeColor() {
    document.querySelectorAll('font').forEach(ele => {
        ele.setAttribute('color', '#333');
    });
}
function greyColor() {
    document.querySelectorAll('font').forEach(ele => {
        let originColor = ele.getAttribute('color');
        if (!originColor) return;
        ele.setAttribute('data-origin-color', originColor);
        ele.setAttribute('color', greyFilter(originColor));
    });
}
function stepFontSize(step: number, fontSize = 18) {
    let $contentHook: HTMLElement | null = document.querySelector('.content-hook p');
    fontSize += step;
    if ($contentHook?.style)
        $contentHook.style.fontSize = fontSize + 'px';
}
function setFontFamily(family: string) {
    let $contentHook: HTMLElement | null = document.querySelector('.content-hook p');
    if ($contentHook?.style)
        $contentHook.style.fontFamily = family 
}