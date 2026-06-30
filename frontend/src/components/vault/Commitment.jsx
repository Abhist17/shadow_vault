import { useEffect, useState } from "react";
import { Copy } from "lucide-react";

export default function Commitment() {

  const [commitment, setCommitment] = useState("");

  useEffect(() => {

    const update = () => {

      setCommitment(
        localStorage.getItem("commitment") || ""
      );

    };

    update();

    window.addEventListener("commitment", update);

    return () =>
      window.removeEventListener(
        "commitment",
        update
      );

  }, []);

  return (

    <div
      style={{
        background:"#101010",
        border:"1px solid #222",
        borderRadius:18,
        padding:30
      }}
    >

      <h2>Commitment</h2>

      <div
        style={{
          marginTop:20,
          background:"#181818",
          padding:20,
          borderRadius:12,
          wordBreak:"break-all"
        }}
      >
        {commitment || "No commitment generated yet"}
      </div>

      <button
        style={{
          marginTop:20,
          width:"100%",
          padding:16,
          borderRadius:12,
          border:0,
          cursor:"pointer"
        }}
        onClick={()=>{
          navigator.clipboard.writeText(commitment);
          alert("Copied!");
        }}
      >

        <Copy size={18}/>

        Copy Commitment

      </button>

    </div>

  );

}