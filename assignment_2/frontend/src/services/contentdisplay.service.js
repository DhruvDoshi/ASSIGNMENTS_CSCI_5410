export default function contentdisplay(){
    if(!localStorage.getItem("UserID")){
        return false;
    }else{
        return true;
    }
}