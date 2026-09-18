import EmotionCard from "../../diary/EmotionCard"
import type { EmotionCardData } from "./types"
export function EmotionCardGridList({cards}:{cards:EmotionCardData[]}) { return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{cards.map((card,index)=><div key={card.id} className="animate-in fade-in-0 slide-in-from-bottom-2" style={{animationDelay:`${index*100}ms`}}><EmotionCard front={{color:"#CCCCCC",emotion:card.label,image:card.src}} back={{color:"#CCCCCC",date:card.date,hashtags:card.hashtags || []}}/></div>)}</div> }

