import { useEffect, useState } from 'react';
import './App.css';
import {getSentiment} from "./SentimentService";

const App = () => {

  const [status, setStatus] = useState(false); //false => wait 
  
  const [inputText, setInputText] = useState(""); //initially input text is empty 

  //set default message for user 
  const [source, setSource] = useState("https://webstockreview.net/images/hello-clipart-animated-gif-1.gif");

  useEffect(()=>{
    if(status){ //true => fire => start doing something 
      getSentiment(inputText).then((result)=> { //attempt to get sentiment 

        const respSentiment = result[0].sentiment; //get sentiment from response 

        setStatus(false); //wait until user requests to re-find sentiment 

        //sentiment is either positive or negative 
        if(respSentiment == "positive"){ //something nice happend to user 
          //display something nice to user ..
          setSource("https://www.icegif.com/wp-content/uploads/coffee-icegif-7.gif");
        }
        if(respSentiment == "negative"){ //something bad happened to user
          //display something encouraging to user 
          setSource("https://www.wishafriend.com/inspirational/uploads/25908-inspirational-gifs.gif");
        }
      })
    }
  }, [status])

  return (
    <div className="App">
       <div> How are you feeling today: </div> <br /> <div><input placeholder="e.g. I had a good sleep.." width="500px" type="text" value={inputText} 
       onKeyPress = {(u)=>{
         if(u.code == "Enter"){
          setStatus(true);
         }

       }}
       onChange={(u)=>{
         setInputText(u.target.value);
         debugger //if enter initiate sentiment 
       }}/></div> <br />

       <br />
   
       <br />
        <br />
       <img src={source} height="300" width="300"/>
       <br />
       
    </div>
  );
}

export default App;
