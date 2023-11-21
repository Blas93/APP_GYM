import { useState } from "react";

export function Counter () {
    const [count, setCount] = useState (0);
    const increment = () => {
        setCount((count) => count +1); 
    }
return (
    <div>
        <h2>Counter</h2>
        <p className="p-counter">(count)</p>
        <button onClick={increment}> Increment </button> 
    </div>

    );
}
