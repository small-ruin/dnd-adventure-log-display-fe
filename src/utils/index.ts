export function removeElement(ele: HTMLElement) {
    ele.parentElement?.removeChild(ele);
}

export * from './request';