# 日々の割引コード反映済みのプロテインの値段を知らせるLINE Bot

MechanizeとNokogiriを使って Myprotein(https://www.myprotein.jp/) のサイトの割引コードを取得、
自分のアカウントでログイン、割引コードを入力し最終的な値段をLINE Messaging APIを使って、
毎晩LINEに通知する。
Herokuにてデプロイし、Heroku Schedulerを使って定時実行するように構築
