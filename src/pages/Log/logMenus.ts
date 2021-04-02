import { DropdownItem } from "../../components/DropDown"

interface Menu {
    id: MENU_TYPE,
    text: string,
    dropdown?: DropdownItem<LOG_OPERATIONS>[]
}
export enum LOG_OPERATIONS {
    DELETE_ALL_BRACKETS = 'DELETE_ALL_BRACKETS',
    DELETE_ALL_BRACKETS_BUT_NOT_SPACE = 'DELETE_ALL_BRACKETS_BUT_NOT_SPACE',
    SHOW_ALL_BRACKETS = 'SHOW_ALL_BRACKETS',
    ALL_BLACK = 'ALL_BLACK',
    GREY = 'GREY',
    FONT_SIZE_INCREASE = 'FONT_SIZE_INCREASE',
    FONT_SIZE_DECREASE = 'FONT_SIZE_DECREASE',
    FONT_FAMILY_HEI = 'FONT_FAMILY_HEI',
    FONT_FAMILY_SONG = 'FONT_FAMILY_SONG',
}
export enum MENU_TYPE {
    BRACKETS,
    COLOR,
    FONT_FAMILY,
    FONT_SIZE,
}
export default [
    {
        id: MENU_TYPE.BRACKETS,
        text: '去除括号',
        dropdown: [
            {
                id: LOG_OPERATIONS.DELETE_ALL_BRACKETS,
                text: '去除所有括号',
            },
            {
                id: LOG_OPERATIONS.DELETE_ALL_BRACKETS_BUT_NOT_SPACE,
                text: '去除括号但保留位置'
            },
            {
                id: LOG_OPERATIONS.SHOW_ALL_BRACKETS,
                text: '显示括号',
            }
        ]
    },
    {
        id: MENU_TYPE.COLOR,
        text: '颜色',
        dropdown: [
            {
                id: LOG_OPERATIONS.ALL_BLACK,
                text: '清除颜色'
            },
            {
                id: LOG_OPERATIONS.GREY,
                text: '灰度化'
            }
        ]
    },
    {
        id: MENU_TYPE.FONT_FAMILY,
        text: '字体',
        dropdown: [
            {
                id: LOG_OPERATIONS.FONT_FAMILY_HEI,
                text: '黑体'
            },
            {
                id: LOG_OPERATIONS.FONT_FAMILY_SONG,
                text: '宋体'
            }
        ]
    },
    {
        id: MENU_TYPE.FONT_SIZE,
        text: '字号',
        dropdown: [
            {
                id: LOG_OPERATIONS.FONT_SIZE_INCREASE,
                text: '字号+'
            },
            {
                id: LOG_OPERATIONS.FONT_SIZE_DECREASE,
                text: '字号-'
            }
        ]
    }
] as Menu[]