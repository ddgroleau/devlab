export default class SelectOption {
    public innerText: string;
    public value: string;
    private constructor(value:string, innerText:string) {
        this.value = value;
        this.innerText = innerText;
    }
    public static create(value:string, innerText:string) : SelectOption {
        return new SelectOption(value,innerText);
    }
}
