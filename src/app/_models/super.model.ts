export class Super<T> {

    public id: number;
    public created_at: Date;
    public updated_at: Date;

    public constructor(init?: Partial<T>) {
        let object =  Object.assign(this, init);
        let date: any = new Date(object.created_at);
        date = this.pad(date.getDate(), 2, '0') +'-'+this.pad(date.getMonth() + 1, 2, '0')+'-'+ date.getFullYear()+' at '+date.getHours()+':'+date.getMinutes();
        object.created_at = date;
        return object;
    }

    pad(s, width, character) {
        return new Array(width - s.toString().length + 1).join(character) + s;
    }
}