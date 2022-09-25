import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
}

// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
}

// 完了リストから指定の要素を削除
const deleteFromCompleteList = (target) => {
  document.getElementById("complete-list").removeChild(target);
}

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // liタグ生成
  const li = document.createElement("li")

  // div生成
  const div = document.createElement("div");
  div.className = "list-row"

  // pタグ生成
  const p = document.createElement("p");
  p.className = "todo-item"
  p.innerText = text

  // button(完了)タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了"
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンのliを未完了リストから削除する
    deleteFromIncompleteList(completeButton.closest("li"));

    // 完成したTODOに追加する要素を取得する
    const addTarget = completeButton.closest("li")

    // TODO内容テキストを取得
    const text = addTarget.getElementsByClassName("todo-item")[0].innerText;

    // divタグ以下は削除
    addTarget.childNodes[0].textContent = null;

    // pタグの生成
    const p = document.createElement("p");
    p.className = "todo-item"
    p.innerText = text;

    // buttonタグを生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻る"
    backButton.addEventListener("click", () => {
      // 押された完了ボタンのliを未完了リストから削除する
      deleteFromCompleteList(backButton.closest("li"));

      // テキスト取得
      const text = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    })

    // divタグの子要素に各要素を設定
    addTarget.childNodes[0].appendChild(p);
    addTarget.childNodes[0].appendChild(backButton);

    const completeArea = document.getElementById("complete-list");
    completeArea.appendChild(addTarget);

  })

  // button(削除)タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除"
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンのliを未完了リストから削除
    deleteFromIncompleteList(deleteButton.closest("li"));
  })

  // liタグの子要素にdivを設定していく
  li.appendChild(div);

  // divタグの子要素にpタグを設定する
  div.appendChild(p);

  // divタグの子要素にbuttonタグを設定する
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
}

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());