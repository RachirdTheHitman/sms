import axios from "axios";
import hmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";

//helper function to generate token for oauth2.0
function tokenGenarator(method, uri) {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const nonce = nonceGenerator(10);
  const methodToRquest = method;
  const uriToRequest = uri;
  const host = "api.smsglobal.com";
  const port = "443";
  const mac = makeMAC();
  const token = `MAC id="98e7d0dbe5c5d1961459544bd853a855",ts="${timestamp}",nonce="${nonce}",mac="${mac}"`;

  function nonceGenerator(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function makeMAC() {
    const stringToHash = `${timestamp}\n${nonce}\n${methodToRquest}\n${uriToRequest}\n${host}\n${port}\n\n`;

    const hmacDigest = Base64.stringify(
      hmacSHA256(stringToHash, "8f67027f0ef84c33fde172ee2d2b7239")
    );

    return hmacDigest;
  }

  return token;
}

// action creator for message sending
export const sendMessage = (smsInfo) => async (dispatch) => {
  try {
    const response = await axios.post(
      "/v2/sms/",
      {
        origin: smsInfo.from,
        destination: smsInfo.to,
        message: smsInfo.message,
      },
      {
        baseURL: "https://api.smsglobal.com",
        headers: { Authorization: tokenGenarator("POST", "/v2/sms/") },
      }
    );

    dispatch({ type: "ADD_MESSAGE", payload: response.data.messages[0] });
    alert("message sent successfully!");
  } catch (error) {
    console.log(error);
  }
};

// action creator for adding new key
export const addKey = (data) => {
  return {
    type: "ADD_KEY",
    payload: data,
  };
};

export const getMessages = async (dispatch) => {
  const response = await axios.get("/v2/sms/", {
    baseURL: "https://api.smsglobal.com",
    headers: { Authorization: tokenGenarator("GET", "/v2/sms/") },
  });

  dispatch({ type: "GET_MESSAGES", payload: response.data.messages });
};

export const getBalance = async (dispatch) => {
  const response = await axios.get("/v2/user/credit-balance/", {
    baseURL: "https://api.smsglobal.com",
    headers: { Authorization: tokenGenarator("GET", "/v2/user/credit-balance/") },
  });

  dispatch({ type: "GET_BALANCE", payload: response.data.balance });
};
