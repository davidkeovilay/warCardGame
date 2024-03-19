
document.querySelector('button').addEventListener('click', War)
 let deckId='',
  val1 = 0,
  val2 = 0,
  war=0;
  if (!localStorage.getItem('p1win')){
    localStorage.setItem('p1win',0)
    localStorage.setItem('p2win',0)
  }
  


 fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(res => res.json()) // parse response as JSON
      .then(data => {
       deckID=data.deck_id
       console.log(data)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
function War(){
  
  const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        if(data.remaining <2 ){
          if(val1 > val2 ){
            let win = Number(localStorage.getItem('p1win')) + 1 
            localStorage.setItem('p1win', win)
            document.querySelector('h4').innerText='Game over!!! Player 1 Wins'
          }else if(val1 < val2 ){
            let win = Number(localStorage.getItem('p2win')) + 1 
            localStorage.setItem('p2win', win)
            document.querySelector('h4').innerText='Game over!!! Player 2 Wins'
          }
          fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/shuffle/`)
          .then(res => res.json()) // parse response as JSON
          .then(data => {
           deckID=data.deck_id
           console.log(data)
          })
          .catch(err => {
              console.log(`error ${err}`)
          });
  
          
        }
        let p1Val = convertToNum(data.cards[0].value),
            p2Val = convertToNum(data.cards[1].value);
            
            pool = p1Val+p2Val + war;
             if (p1Val>p2Val){
              val1=val1 +Number(pool)
              document.querySelector('.p1val').innerText= val1
              document.querySelector('h4').innerText='Player 1 Wins'
              war = 0
            }else if (p2Val>p1Val){
              val2=val2 +Number(pool)
              document.querySelector('.p2val').innerText= val2
              document.querySelector('h4').innerText='Player 2 Wins'
              war = 0
            }else{
              document.querySelector('h4').innerText='Time for War!'
              war = war + (p1Val*2) +(p2Val*2)
              
            }
       
        document.querySelector('.card1').src=data.cards[0].image
        document.querySelector('.card2').src=data.cards[1].image
  
     
      console.log(data)
      })
      .catch(err => {
          console.log(`error ${err}`)
     
      });
 
}
 
function convertToNum(val){
  switch (val) {
    case 'ACE':
      return 14;
      break;
      case 'KING':
        return 13;
        break;
      case 'QUEEN':
      return 12;
      break;
      case 'JACK':
      return 11;
      break;
    default:
      return Number(val)
  }
  
}