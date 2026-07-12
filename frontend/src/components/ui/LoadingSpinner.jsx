import { ClipLoader } from "react-spinners";

export default function LoadingSpinner(){

return(

<div className="flex justify-center items-center h-[70vh]">

<ClipLoader
size={70}
color="#0ea5e9"
/>

</div>

);

}