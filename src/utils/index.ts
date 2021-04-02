import colorParse from 'parse-color';

export function removeElement(ele: HTMLElement) {
    ele.parentElement?.removeChild(ele);
}

export function greyFilter(colorStr: string) {
    const { rgb } = colorParse(colorStr)
    const Red = rgb[0], Green = rgb[1], Blue = rgb[2]
    // const GREY = (Red + Green + Blue) / 3
    const NumberOfShades = 10;
    const ConversionFactor = 255 / (NumberOfShades - 1)
    const AverageValue = (Red + Green + Blue) / 3
    const GREY = Math.round((AverageValue / ConversionFactor) + 0.5) * ConversionFactor
    return colorParse(`rgba(${GREY},${GREY},${GREY})`).hex;
}

export function throttle(cb: Function, wait: number, immediate = false) {
    let timeout: null | NodeJS.Timeout = null;
    let initialCall = true;

    return function (...args: any[]) {
        const callNow = immediate && initialCall
        const next = () => {
            cb.apply(this, args)
            timeout = null
        }

        if (callNow) {
            initialCall = false
            next()
        }

        if (!timeout) {
            timeout = setTimeout(next, wait)
        }
    }
}
