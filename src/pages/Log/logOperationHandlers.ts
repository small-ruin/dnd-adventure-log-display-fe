import { LOG_OPERATIONS, MENU_TYPE } from './logMenus';
import { greyFilter } from '../../utils'

const voidFunction = () => {}
const logOperations: { [key in LOG_OPERATIONS | MENU_TYPE]: Function } = {
    DELETE_ALL_BRACKETS: () => toggleAllBrackets(false),
    DELETE_ALL_BRACKETS_BUT_NOT_SPACE: () => hideBrackets(),
    SHOW_ALL_BRACKETS: () => toggleAllBrackets(true),
    FONT_SIZE_DECREASE: () => stepFontSize(-1),
    FONT_SIZE_INCREASE: () => stepFontSize(1),
    COLOR_GREY: () => setColor(greyFilter),
    COLOR_ALL_BLACK: () => setColor('#333'),
    COLOR_RESTORE: () => restoreColor(),
    FONT_FAMILY_HEI: () => setFontFamily('Helvetica Neue, Microsoft YaHei, PingFang SC, Heiti SC, sans-serif'),
    FONT_FAMILY_SONG: () => setFontFamily('Georgia,Times New Roman,Times,Songti SC,serif'),
    'TO_TOP': () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    'BRACKETS': voidFunction,
    'COLOR': voidFunction,
    'FONT_FAMILY': voidFunction,
    'FONT_SIZE': voidFunction,
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