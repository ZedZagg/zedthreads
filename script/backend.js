let username = null;
let baseUrl = null;
let apiKey = null;

function initBackend(connectionString){
  for( const s of connectionString.split(';') ){
    const index = s.indexOf('='); // split based on first equals ONLY
    const key = s.slice(0, index);
    const value = s.slice(index + 1);

    switch(key){
      case 'username':
        username = value;
        break;
      case 'baseUrl':
        baseUrl = value;
        break;
      case 'apiKey':
        apiKey = value;
        break;
      default:
        console.error('Unknown key in connection string', kvp);
        break;
    }
  }

  if(username === null) console.error("Username was not set");
  if(baseUrl === null) console.error("backend url was not set");
  if(apiKey === null) console.error("api key was not set");
}

// checks if we can authenticate to the back end, returns true on success, else false
async function checkAuth(){
  const url = `https://checkauth-${baseUrl}?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("received response: " + response.status);
    return true;
  } 
  catch (error) {
    console.error('Failed to authenticate with back end', error);
    return false;
  }
}

async function listThreads(){
  const url = `https://listthreads-${baseUrl}?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    return await response.json();
  } 
  catch (error) {
    console.error('thread list fetch error', error);
  }
}

async function getThread(threadId){
  const url = `https://getthread-${baseUrl}?api_key=${apiKey}&threadId=${threadId}`;
  try {
    const response = await fetch(url);
    return await response.json();
  } 
  catch (error) {
    console.error('thread fetch error', error, url);
  }
}

async function createThread(threadData){
  const url = `https://createthread-${baseUrl}?api_key=${apiKey}`;

}

async function createComment(threadId, author, text, resourceType, resourceUri){
  const url = `https://createcomment-${baseUrl}?api_key=${apiKey}`;
  
  try{
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        threadId: threadId,
        author: author,
        text: text,
        resourceType: resourceType,
        resourceUri: resourceUri
      })
    });

    if(!response.ok) 
      throw new Error("received unexpected response: " + response.status);

    return true;
  }
  catch (error) {
    console.error("comment post error", error, url);
    return false;
  }
}
