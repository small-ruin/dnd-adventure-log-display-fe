import { LOG_OPERATIONS } from './logMenus';
import { greyFilter } from '../../utils'

const logOperations = {
    [LOG_OPERATIONS.DELETE_ALL_BRACKETS]: () => toggleAllBrackets(false),
    [LOG_OPERATIONS.DELETE_ALL_BRACKETS_BUT_NOT_SPACE]: () => hideBrackets(),
    [LOG_OPERATIONS.SHOW_ALL_BRACKETS]: () => toggleAllBrackets(true),
    [LOG_OPERATIONS.FONT_SIZE_DECREASE]: () => stepFontSize(-1),
    [LOG_OPERATIONS.FONT_SIZE_INCREASE]: () => stepFontSize(1),
    [LOG_OPERATIONS.COLOR_GREY]: () => setColor(greyFilter),
    [LOG_OPERATIONS.COLOR_ALL_BLACK]: () => setColor('#333'),
    [LOG_OPERATIONS.COLOR_RESTORE]: () => restoreColor(),
    [LOG_OPERATIONS.FONT_FAMILY_HEI]: () => setFontFamily('Helvetica Neue, Microsoft YaHei, PingFang SC, Heiti SC, sans-serif'),
    [LOG_OPERATIONS.FONT_FAMILY_SONG]: () => setFontFamily('Georgia,Times New Roman,Times,Songti SC,serif'),
}

export default logOperations;

function toggleAllBrackets(visible = false) {
    const eles: HTMLElement[] = Array.from(document.querySelectorAll('font, br'));
    eles.forEach(ele => {
        const text = ele.textContent;
        if (text && text.match(/.*> [（()].*[)）]?/)) {
            ele.style.display = visible ? 'inline' : 'none'
            let prev = ele.previousElementSibling as HTMLElement | null;
            while (prev && prev.textContent?.match(/^\s+$|\d+:\d+:\d+|<br>|^$/)) {
                prev.style.display = visible ? 'inline' : 'none'
                prev = prev.previousElementSibling as HTMLElement | null;
            }
        } else {
            ele.textContent && (ele.textContent = ele.textContent.replace(/（.*）/g, ''));
        }
    })
}
function hideBrackets() {
    const eles: HTMLElement[] = Array.from(document.querySelectorAll('font, br'));
    eles.forEach(ele => {
        const text = ele.textContent;
        if (text && text.match(/.*> [（()].*[)）]?/)) {
            ele.style.display = 'none'
        } else {
            ele.textContent && (ele.textContent = ele.textContent.replace(/（.*）/g, ''));
        }
    })
}
function setColor(color: string | ((color: string) => string)) {
    document.querySelectorAll('font').forEach(ele => {
        let originColor = ele.getAttribute('data-origin-color') || ele.getAttribute('color');
        if (originColor) {
            if (!ele.getAttribute('data-origin-color')) {
                ele.setAttribute('data-origin-color', originColor);
            }
            if (typeof color === 'string') {
                ele.setAttribute('color', color);
            } else {
                ele.setAttribute('color', color(originColor));
            }
        }
    }); 
}
function restoreColor() {
    document.querySelectorAll('font').forEach(ele => {
        let originColor = ele.getAttribute('data-origin-color');
        if (originColor) {
            ele.setAttribute('color', originColor);
        }
    })
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