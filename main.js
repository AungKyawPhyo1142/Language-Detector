
document.getElementById('submit').onclick = function(){

    var text = new String(document.getElementById('input').value);

    const encodedParams = new URLSearchParams();
    encodedParams.append("q", text);

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
            'X-RapidAPI-Key': '6169aadcffmsh8201ee1b7ee4d24p169ad6jsn791ddc2045f4'
        },
        body: encodedParams
    };
    fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/detect', options)
        .then(response => response.json())
        .then(response => displayLang(response.data.detections[0][0].language))
        .catch(err => console.error(err));

}


function displayLang(lang){
    console.log('It is in '+lang)
    switch(lang){
        case 'en': displayHTML("English"); break;
        case 'my': displayHTML("Burmese"); break;
        case 'fr': displayHTML("French"); break;
        case 'zh-TW': displayHTML("Chinese(Traditional)"); break;
        case 'zh-CN': displayHTML("Chinese(Simplified)"); break;
        default: ErrorMessage(); break;
    }
}

function displayHTML(text){
    var outputText = "It is in "+new String(text)+".";
    outputText += "\n\nLength of the input word: "+new String(document.getElementById('input').value).length;
    outputText+="\n\nOccurences of characters:\n\t"+countCharacters();
document.getElementById('textArea').value = outputText;
}

function ErrorMessage(){
    document.getElementById('textArea').value = "Sorry, I don't recognize the language.";
}

// counting the frequencies of a character
function countCharacters(){
    var string = new String(document.getElementById('input').value);
    const histogram = {};
    for(let i=0;i<string.length;i++){
        const ch = string[i];
        if(!histogram[ch]){
            histogram[ch]=0;
        }
        histogram[ch]++;
    }

    var result="";
    for(var i in histogram){
        result += i+":"+histogram[i]+" ";
    }
    return result;
}

// Clear the Input-TextField and Ouput-TextArea when you click the Clear Btn
document.getElementById('clearAll').onclick = function(){
    document.getElementById('input').value = "";
    document.getElementById('textArea').value ="";
} 