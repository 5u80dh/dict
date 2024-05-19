document.getElementById('search-btn').addEventListener('click', function() {
    var word = document.getElementById('word-input').value;
    if (word) {
        fetchDefinition(word);
    }
});

async function fetchDefinition(word) {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Word not found');
        }
        const data = await response.json();
        displayDefinitions(data[0]);
    } catch (error) {
        document.getElementById('definition-container').innerHTML = '<h2>Error</h2><p>Definition not found. Please try another word.</p>';
    }
}

function displayDefinitions(data) {
    const container = document.getElementById('definition-container');
    container.innerHTML = '';
    
    const wordTitle = document.createElement('h2');
    wordTitle.innerText = data.word;
    container.appendChild(wordTitle);

    let definitionCount = 0;
    
    data.meanings.forEach(meaning => {
        meaning.definitions.forEach((definitionObj, index) => {
            if (definitionCount < 5) {
                const definition = document.createElement('div');
                definition.className = 'definition';
                definition.innerText = `${definitionCount + 1}. ${definitionObj.definition}`;
                
                const synonymsAntonyms = document.createElement('div');
                synonymsAntonyms.className = 'synonyms-antonyms';
                
                if (definitionObj.synonyms.length > 0) {
                    const synonyms = document.createElement('p');
                    synonyms.innerHTML = `<span>Synonyms:</span> ${definitionObj.synonyms.join(', ')}`;
                    synonymsAntonyms.appendChild(synonyms);
                }
                
                if (definitionObj.antonyms.length > 0) {
                    const antonyms = document.createElement('p');
                    antonyms.innerHTML = `<span>Antonyms:</span> ${definitionObj.antonyms.join(', ')}`;
                    synonymsAntonyms.appendChild(antonyms);
                }
                
                definition.appendChild(synonymsAntonyms);
                definition.addEventListener('click', () => {
                    synonymsAntonyms.style.display = synonymsAntonyms.style.display === 'block' ? 'none' : 'block';
                });
                
                container.appendChild(definition);
                definitionCount++;
            }
        });
    });
}
