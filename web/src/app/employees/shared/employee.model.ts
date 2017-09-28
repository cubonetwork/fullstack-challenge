export class Employee {
    
    constructor(private _id:number, private _nome: string, private _sobrenome: string, private _participacao: number) { }

    get id():number {
        return this._id;
    }
    set id(id:number) {
        this._id = id;
    }

    get nome():string {
        return this._nome;
    }
    set nome(nome:string) {
        this._nome = nome;
    }

    get sobrenome():string {
        return this._sobrenome;
    }
    set sobrenome(sobrenome:string) {
        this._sobrenome = sobrenome;
    }

    get participacao():number {
        return this._participacao;
    }
    set participacao(participacao:number) {
        this._participacao = participacao;
    }

    static empty(): Employee {
        return new Employee(0, '', '', 0.0);
    }
}