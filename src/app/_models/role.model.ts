export class Role {

    public id: number;
    public name: string;
    public display_name: string;
    public description: string;
    public created_at: Date;
    public updated_at: Date;
    public permissions: any[];
  
    public constructor(init?: Partial<Role>) {
        let role =  Object.assign(this, init);
        let date: any = new Date(role.created_at);
        date = this.pad(date.getDate(), 2, '0') +'-'+this.pad(date.getMonth() + 1, 2, '0')+'-'+ date.getFullYear()+' at '+date.getHours()+':'+date.getMinutes();
        role.created_at = date;
        return role;
    }

    pad(s, width, character) {
        return new Array(width - s.toString().length + 1).join(character) + s;
    }
}