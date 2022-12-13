//************************************************** 
//事前定義
let Toku = []; //各党の得票数を格納する
let Get = []; //獲得議席数を格納する

//********************************************************************************************** 
function Kuiki(){
    let Text = document.getElementById('text1');
    let S = Text.value;
    if(Search(S) == -1){ //自然数以外で入力されたときは
        alert("値は1以上の自然数で入力してください！！");
        S = ""; //アラートで注意して値を空にする
    }
    else{
        console.log("選挙区域数は" + S + "です");
    }
}
    
function People(){
    let Text = document.getElementById('text1');
    let S = Text.value;
    let T = 0; //得票数を格納する
    for(let i = 0; i < S; i++){
        T = prompt(i+1 + "区域目の総人口を入力してください");
        if(Search(T) == -1){ //同上
            alert("値は1以上の自然数で入力してください！！");
            i = i - 1; //もう一度同じ党で実行する
        }
        else{
            Toku[i] = T; //正常な数値時のみ配列に格納する
        }
    }
    console.log(Toku);
}

function Jyosuu(){
    let Text = document.getElementById('text2');
    let H = Text.value;
    if(Search(H) == -1){ //自然数以外で入力されたときは
        alert("値は1以上の自然数で入力してください！！");
        H = ""; //アラートで注意して値を空にする
    }
    else{
        console.log("除数は" + H + "です");
    }
}

function Haibun(){
    let Z = document.getElementById('text3').value;
    console.log("配分議席数は" + Z + "議席です");
}

function Search(x){ //1以上の自然数が入力されているかを調べる
    let a = x.search(/^([1-9]\d*)$/);
    return a;
}

function Webster(){
    let st = document.getElementById('text1').value;
    let HH = document.getElementById('text2').value;

    for(let i = 0; i < st; i++){
        Get[i] = 0;
    }

    for(let i = 0; i < st; i++){
        let k = Toku[i] / HH;
        console.log(k);
        const kk = parseFloat(`0.${('' + k).split('.')[1]}`); // 小数点以下の数値(0.XXXX)を算出
        console.log(kk); //確認用
        if(k == 0){
            Get[i] = Math.floor(k); // 変数kの小数点以下を切り捨て
        }
        else if(k != 0){
            if((kk * 10) >= 5){ // kkを10倍してX.XXXの状態にする。1桁目が5以上なら切り上げる
                Get[i] = Math.floor(k) + 1; // 変数kの小数点以下を切り捨てて1足す ⇒ 四捨五入
            }
            else{ // X.XXXの状態で1桁目が4以下の時
                Get[i] = Math.floor(k); // 変数kの小数点以下を切り捨て ⇒ 四捨五入
            }
        }
    }
    
    for(let k = 0; k < Toku.length; k++){ //結果表示
        let add = document.createElement("p");
        add.textContent = (k+1) + "区域目の獲得議席は" + Get[k] + "議席です！";
        let base = document.getElementById('kekka');
        document.body.insertBefore(add, base);  //"kekka"idの後ろに追加していく
    }

    let total = Get.reduce(function(sum, element){ //配列内の数値の合計を算出
        return sum + element;
    }, 0);
    let Z = document.getElementById('text3').value;
    let add = document.createElement("p");
    add.textContent = "総議席数は" + total + "で、配分議席数との差は" + Math.abs(Z - total) + "議席です";
    let base = document.getElementById('kekka');
    document.body.insertBefore(add, base);  
}