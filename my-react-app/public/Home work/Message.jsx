import { useState } from "react";

function Message(){

    const [show,setShow] = useState(false);
    return(

    <button  className = "bg-blue-500 text-white px-4 py-2 rounded" onClick={()=>setShow(!show)}>
        {show ? "hide" : "Show"} Message
    </button>
    )
}
export default Message;