import React, { createRef, useEffect, useRef, useState } from "react"
import styled from "styled-components";

function Card() {
    const [cards, setCards] = useState([]);
    const cardRef = useRef([]);
    const countClicksRef = useRef(0);
    const cardsClickedRef = useRef([]);

    useEffect(() => {
        // eslint-disable-next-line
        setCards(populate());
        }, []);

    function populate(){
        let array = [];
        let usedNumbers = [];
        let i = 0;
        while(i<10){
            let random = generateRandomNumber();
                if(!usedNumbers.includes(random)){
                    usedNumbers.push(random)
                    array.push({"value":random, "id": crypto.randomUUID()});
                    array.push({"value":random, "id": crypto.randomUUID()});
                    i++;
                }
        }
        shuffle(array);
        return array;
    }

    function generateRandomNumber(){
        return Math.floor(Math.random() * (20 - 1 + 1) + 1)
    }
    
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
    
        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    function show(id){
        let divs = cardRef.current;
        for(let i=0; i<divs.length; i++){
            if(divs[i].id===id && !cardsClickedRef.current.includes(id)){
                divs[i].firstChild.className="show";
                countClicksRef.current = countClicksRef.current+1;
                cardsClickedRef.current.push(id);
            }
        }
        if(countClicksRef.current===2){
            console.log("???");
            setTimeout(()=>{
                hide(cardsClickedRef.current);
            }, 500)
        }
    }

    // Fix: can click multiple cards fast, it bugs

    function hide(ids){
        let divs = cardRef.current;
        console.log(ids);
        console.log(cardRef.current);
        for(let i=0; i<divs.length; i++){
            if(divs[i].id===ids[0]){
                divs[i].firstChild.className = "hidden";
            }
            if(divs[i].id===ids[1]){
                divs[i].firstChild.className = "hidden";
            }
        }
        countClicksRef.current = 0;
        cardsClickedRef.current = [];
        

       
    }

    return(
        <>
            {cards.map((card, i) => {
                return(
                    
                        <MemoryCard key={card.id} id={card.id} ref={(ref) => (cardRef.current[i] = ref)} onClick={()=>show(card.id)}>
                            <p className="hidden">{card.value}</p>
                        </MemoryCard>
                    
                )
            })}
        </>
    )
}

const MemoryCard = styled.div`
    background-color: #A99985;
    text-align: center;

    :hover{
        background-color: #999999;
        cursor: pointer;
    }
    .hidden{
        opacity: 0;
    }
    .show{
        opacity: 100;
    }
    p{
        font-size: 30px;
        margin-top: 50%;
    }
`


export default Card;