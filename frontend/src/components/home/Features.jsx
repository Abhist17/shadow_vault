import {
    Lock,
    ShieldCheck,
    Database,
} from "lucide-react";

const cards = [
{
title:"Private Ownership",
icon:<Lock size={42}/>,
desc:"Only commitments are stored on-chain."
},
{
title:"ZK Verified",
icon:<ShieldCheck size={42}/>,
desc:"Proofs are verified directly on Stellar."
},
{
title:"Replay Protection",
icon:<Database size={42}/>,
desc:"Nullifiers prevent double withdrawals."
}
]

export default function Features(){

return(

<section
id="features"
style={{
padding:"120px 80px"
}}
>

<h2
style={{
fontSize:52,
marginBottom:60,
textAlign:"center"
}}
>
Features
</h2>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:30
}}
>

{
cards.map(card=>(

<div
key={card.title}
style={{
border:"1px solid #222",
padding:35,
borderRadius:18,
background:"#111"
}}
>

{card.icon}

<h3
style={{
marginTop:20
}}
>
{card.title}
</h3>

<p
style={{
color:"#888",
marginTop:12,
lineHeight:1.7
}}
>
{card.desc}
</p>

</div>

))
}

</div>

</section>

)

}