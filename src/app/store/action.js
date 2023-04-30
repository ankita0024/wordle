
import { FETCH_WORDS_SUCCESS, FETCH_WORDS_FAILURE } from './actionTypes';

export const fetchWordsSuccess = (words) => ({ type: FETCH_WORDS_SUCCESS, payload: words });
export const fetchWordsFailure = (error) => ({ type: FETCH_WORDS_FAILURE, payload: error });

export const fetchWords = (inputParam = 5) => {
  return async (dispatch) => {
    try {
      await fetch(`https://caaqbhvwq2.execute-api.us-east-1.amazonaws.com/prod/wordlist/${inputParam}`,
      {headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      }}).then(response => {
        const stream = response.body;
        const reader = stream.getReader();
        const chunks = [];
        function pump() {
          return reader.read().then(({ done, value }) => {
            if (done) {
              const decoder = new TextDecoder();
              return decoder.decode(chunks[0]);
            }
            chunks.push(value);
            return pump();
          });
        }
        return pump();
      })
      .then(data => {
          dispatch(fetchWordsSuccess(parsePartialJSON(data)));
      })
      .catch(error => console.error(error));;
    } catch (error) {
      dispatch(fetchWordsFailure(error.message));
    }
  };
};

function parsePartialJSON(jsonData) {
  let data;
  try {
    data = JSON.parse(jsonData);
  } catch (error) {
    const partialData = jsonData.slice(0, (error.message.split(" ")[6])) + `\"]`;
    data = JSON.parse(partialData);
  }
  return data;
}