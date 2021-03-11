function setTrigger() {

  const date = new Date();

  //トリガーの起動時間を設定
    let time = new Date();
    time.setHours(21);
    time.setMinutes(15);

    //新しいトリガーを作成
    ScriptApp.newTrigger('').timeBased().at(time).create();
}

function delTrigger() {
  //現在のプロジェクトのトリガーすべてを配列で取得
  const triggers = ScriptApp.getProjectTriggers();
  for(const trigger of triggers){
    if(trigger.getHandlerFunction() == ''){
      ScriptApp.deleteTrigger(trigger);
    }
  }
}