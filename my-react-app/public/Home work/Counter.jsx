import { useState } from "react";

function Counter(){


    const [count,setCount] = useState(0);
    return(

   <div>

    <h1>{count}</h1>
<button  className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=>setCount(count+1)}>increment</button><br />
<button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={()=>setCount(count -1)}>decrement</button>
<button className="bg-red-500 text-white px-4 py-2 rounded" onClick={()=>setCount(0)}>Reset</button>
   </div>

    )
}

export default Counter;