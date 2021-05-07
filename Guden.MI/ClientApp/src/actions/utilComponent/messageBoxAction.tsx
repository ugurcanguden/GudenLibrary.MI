 
export const SETMESSAGEBOXPROPS="SETMESSAGEBOXPROPS";


 
export const  setMessageBox = (values: any) => 
{

    return  {
                type:"SETMESSAGEBOXPROPS",
                payload: values
            };
    
}

