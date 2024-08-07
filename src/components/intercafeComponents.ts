// MODAL CREAR MES

export interface ModalCreateMesProps {
    estado: boolean;     
    modificador: (arg: boolean) => void;
    fn: () => void;          
  }
  
export   interface OnSubmitMesParams {
    name: string; 
  }

export interface OptionItem {
    id: string | number; 
    name: string;
}
