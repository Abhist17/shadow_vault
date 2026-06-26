export default function Architecture(){

const flow=[
"User",
"Secret",
"Poseidon",
"Commitment",
"Vault",
"Noir",
"UltraHonk",
"Stellar",
"Withdraw"
]

return(

<section
id="architecture"
style={{
padding:"120px 80px"
}}
>

<h2
style={{
fontSize:52,
textAlign:"center",
marginBottom:70
}}
>
Architecture
</h2>

<div
style={{
display:"flex",
justifyContent:"center",
alignItems:"center",
gap:18,
flexWrap:"wrap"
}}
>

{
flow.map((x,i)=>(
<>
<div
style={{
padding:"16px 30px",
borderRadius:12,
background:"#111",
border:"1px solid #333"
}}
>
{x}
</div>

{i!==flow.length-1 &&

<div
style={{
fontSize:28
}}
>
→
</div>

}

</>
))
}

</div>

</section>

)

}