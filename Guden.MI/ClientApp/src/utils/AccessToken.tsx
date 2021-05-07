
const AccessTokenValidations =(statusCode:number)=>
{
    if(statusCode==401){
        localStorage.clear(); 
        window.location.reload();
    }
}
const setAccessToken = (token: string,isLogin: boolean) => 
{
   if(isLogin)//logout ise false gelir ve token silinir.
   {
    localStorage.setItem("accessToken", token)
   }
   else
   {
    localStorage.removeItem("accessToken");
   }
}
export  {AccessTokenValidations,setAccessToken} 