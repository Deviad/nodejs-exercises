

function endBracketPos(string, start=0) {
  
  if(!string) {
    throw new Error('You did not provide any string');
  }
  
  let array = string.split('');

  
  let result = array.reduce((acc, char, index)=>{
    if (index >= start) {
      if (char === '[') {
        acc['LEFT'][index] = index;
     
      } else if (char === ']') {
        acc['RIGHT'][index] = index;
      }
    }
      return acc;
  
  }, {'LEFT': {}, 'RIGHT': {}}); 
  

    if (Object.keys(result['LEFT']).length !== Object.keys(result['RIGHT']).length) {
      throw new Error('Syntax error: Square brackets do not match');
    }
    
    const rightBracketArrayLength = Object.keys(result['RIGHT']).length;
    
    const lastRightBracketPos = Object.values(result['RIGHT'])[rightBracketArrayLength-1];
    
    
    return lastRightBracketPos;
  
    
}


string = 'adasdasdasdasd pippo[  asdasdasdasd[asdsada]dasda,sdasdadasdas  ]  '

console.log(endBracketPos(string));

