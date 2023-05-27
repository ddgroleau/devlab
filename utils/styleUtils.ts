export const classNames = (...args:(string|undefined)[]) => args.join(" ");

export const conditional = (condition:boolean,className:string,falsyClassName?:string) => 
    condition ? className : falsyClassName;
