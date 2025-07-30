// arquivos .d.ts são utilizados para definir tipos TypeScript
// para bibliotecas JavaScript que não possuem tipos embutidos
// ou para estender tipos existentes. Eles ajudam o TypeScript a entender


//eslint-disable-next-line
import  { Knex } from 'knex';

declare  module  'knex/types/tables'{
    export interface  tables {
        transactions: {
            id: string;
            title: string;
            amount: number;
            created_at: string;
            session_id?: string | null;
        };
    }
}