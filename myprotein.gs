function discounted_price() {

  // ログイン後のレスポンスを取得
  const response = login();

  // 割引コードを取得
  const discountCode = find_code(response);

  // レスポンスヘッダーからcookieを取得
  let cookies = response.getHeaders()["Set-Cookie"];
  
  // ログインで認証されたcookieはヘッダーで使用
  const headers = {
    "Cookie": "cookies",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36"
  };

  const BASKET_URL = "https://www.myprotein.jp/my.basket";
  
  // POSTデータ
  const payload_data = {
    discountCode: discountCode
  };
  
  // POSTオプション
  const post_options = {
    method: "post",
    headers: headers,
    payload: payload_data,
    // falseにしておかないと、リダイレクト処理が実行され、ログイン画面へ戻ることとなり、ログイン処理のレスポンスではなく、ログイン画面表示のレスポンスが取得される
    followRedirects: false
  };
  
  // POSTリクエスト
  const discountResponse = UrlFetchApp.fetch(BASKET_URL, post_options);
  const content = discountResponse.getContentText("UTF-8");
  cookies = discountResponse.getHeaders()["Set-Cookie"];

  // 値段を取得
  priceRegExp = /¥[0-9],[0-9]{3}/
  const price = content.match(priceRegExp);
  Logger.log(price);
}

function find_code(response) {
  
  // レスポンスヘッダーからcookieを取得
  let cookies = response.getHeaders()["Set-Cookie"];
  
  // ログインで認証されたcookieはヘッダーで使用
  let headers = { 
    "Cookie": cookies,
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36"
  }; 
  let get_options = {
    method: "get",
    headers: headers,
    followRedirects: true,
  };
  let SCRAPING_URL = "https://www.myprotein.jp/my.basket";
  
  response = UrlFetchApp.fetch(SCRAPING_URL, get_options);
  let content = response.getContentText("UTF-8");
  
  //' 割引コード：{コード}で○%オフ'を取得
  widgetRegExp = /\s割引コード：[A-Z]{3,8}[0-9]{1,2}で[0-9]{1,2}%オフ/
  let discountWidget = content.match(widgetRegExp);

  codeRegExp = /[A-Z]{3,8}[0-9]{1,2}/
  let discountCode = discountWidget[0].match(codeRegExp);
  
  // 割引コードを返す
  return discountCode[0];
}

function login() {
  const LOGIN_URL = "https://www.myprotein.jp/elysiumAuthentication.login";
  
  // POSTデータ
  const payload_data = {
    elysium_username: get_property('elysium_username'),
    elysium_password: get_property('elysium_password')
  };
  
  // POSTオプション
  const post_options = {
    method: "post",
    payload: payload_data,
    // falseにしておかないと、リダイレクト処理が実行され、ログイン画面へ戻ることとなり、ログイン処理のレスポンスではなく、ログイン画面表示のレスポンスが取得される
    followRedirects: false
  };
  
  // POSTリクエスト
  let response = UrlFetchApp.fetch(LOGIN_URL, post_options);

  // ログイン後のレスポンスを返す
  return response
}