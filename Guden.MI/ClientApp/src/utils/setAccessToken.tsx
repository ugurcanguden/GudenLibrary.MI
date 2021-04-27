 
const setAccessToken = (token: string,isLogin: boolean) => 
{
   if(isLogin)//logout ise false gelir ve token silinir.
   {
    localStorage.setItem("accessToken", JSON.stringify(token))
   }
   else
   {
    localStorage.removeItem("accessToken");
   }
}
export default setAccessToken;