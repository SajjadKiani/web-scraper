import fetch from "node-fetch";

export async function login(username, password) {
    try {
      // Make a Fetch request to the login endpoint
      const response = await fetch("https://www.ponisha.ir/login", {
        "headers": {
          "accept": "application/json, application/json;q=0.8, text/plain;q=0.5, */*;q=0.2",
          "accept-language": "fa,en-US;q=0.9,en;q=0.8",
          "cache-control": "no-cache",
          "content-type": "application/json",
          "p-textarea": "undefined",
          "pragma": "no-cache",
          "sec-ch-ua": "\"Google Chrome\";v=\"111\", \"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"111\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-csrf-token": "BcQ9JHLPnaFOyv99IvRqaoOgCcog2skGxGnqgZZl",
          "x-requested-with": "rest.js"
        },
        "referrer": "https://www.ponisha.ir/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `{\"username\":\"${username}\",\"password\":\"${password}\",\"remember\":true}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
      })

      if (!response.ok) {
        const result = await response.text()
        throw new Error(result);
      }

      const cookies = response.headers.get('Set-Cookie');
      return cookies
    } catch (error) {
      console.log(error);
    }
  }

  export async function data_request(cookie) {
    const response = await fetch("https://www.ponisha.ir/search/projects/my-skills", {
                "headers": {
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                        "accept-language": "fa,en-US;q=0.9,en;q=0.8",
                        "cache-control": "no-cache",
                        "pragma": "no-cache",
                        "sec-ch-ua": "\"Google Chrome\";v=\"111\", \"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"111\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"Windows\"",
                        "sec-fetch-dest": "document",
                        "sec-fetch-mode": "navigate",
                        "sec-fetch-site": "same-origin",
                        "sec-fetch-user": "?1",
                        "upgrade-insecure-requests": "1",
                        "cookie": cookie
                    },
                    "referrer": "https://www.ponisha.ir/",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": null,
                    "method": "GET",
                    "mode": "cors",
                    "credentials": "include"
                })
    
    if (!response.ok) {
        throw new Error('Get data faild!');
    }

    const result = await response.text()

    return result
}