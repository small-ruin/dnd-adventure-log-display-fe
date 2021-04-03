import { DropdownItem } from "../../components/DropDown"
import { IsPC } from "../../utils";

interface Menu {
    id: MENU_TYPE,
    text: string,
    dropdown?: DropdownItem<LOG_OPERATIONS>[]
}
export type LOG_OPERATIONS = 'DELETE_ALL_BRACKETS' |
    'DELETE_ALL_BRACKETS_BUT_NOT_SPACE' |
    'SHOW_ALL_BRACKETS' |
    'COLOR_ALL_BLACK' |
    'COLOR_GREY' |
    'COLOR_RESTORE' |
    'FONT_SIZE_INCREASE' |
    'FONT_SIZE_DECREASE' |
    'FONT_FAMILY_HEI' |
    'FONT_FAMILY_SONG'

export type MENU_TYPE =
    'BRACKETS' |
    'COLOR' |
    'FONT_FAMILY' |
    'FONT_SIZE' |
    'TO_TOP'

let menu: Menu[] = [
    {
        id: 'BRACKETS',
        text: '去除括号',
        dropdown: [
            {
                id: 'DELETE_ALL_BRACKETS',
                text: '去除所有括号',
            },
            {
                id: 'DELETE_ALL_BRACKETS_BUT_NOT_SPACE',
                text: '去除括号但保留位置'
            },
            {
                id: 'SHOW_ALL_BRACKETS',
                text: '显示括号',
            }
        ]
    },
    {
        id: 'COLOR',
        text: '颜色',
        dropdown: [
            {
                id: 'COLOR_ALL_BLACK',
                text: '清除颜色'
            },
            {
                id: 'COLOR_GREY',
                text: '灰度化'
            },
            {
                id: 'COLOR_RESTORE',
                text: '恢复颜色'
            }
        ]
    },
    {
        id: 'FONT_FAMILY',
        text: '字体',
        dropdown: [
            {
                id: 'FONT_FAMILY_HEI',
                text: '黑体'
            },
            {
                id: 'FONT_FAMILY_SONG',
                text: '宋体'
            }
        ]
    },
    {
        id: 'FONT_SIZE',
        text: '字号',
        dropdown: [
            {
                id: 'FONT_SIZE_INCREASE',
                text: '字号+'
            },
            {
                id: 'FONT_SIZE_DECREASE',
                text: '字号-'
            }
        ]
    },
    {
        id: 'TO_TOP',
        text: '↑'
    }
]

if (!IsPC()) {
    menu = menu.filter(i => i.id !== 'FONT_FAMILY');
}

export default menu;