$(function() {
  //HTML的にonload属性に対応している要素名の配列
  var STD_ONLOAD_TAGS = [
        'BODY', 'APPLET', 'EMBED', 'FRAMESET',
        'IMG', 'LINK', 'SCRIPT', 'STYLE'];
  //onload属性がつけられた要素を選択
  $('[onload]').each(function(){
    //もともとonload属性が無い要素だけを処理する。
    if($.inArray(this.tagName, STD_ONLOAD_TAGS) < 0) {
      //onloadハンドラを取り出す
      var f = $(this).attr('onload');
      //タイプがfunctionならそのまま呼び出す。そうでないなら
      //文字列と仮定してevalする無名関数を定義して呼び出す。
      if(typeof(f) == 'function') {
        f.call(this);
      } else {
        (function() {eval(f);}).call(this);
      }
    }
  });
});